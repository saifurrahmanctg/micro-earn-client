import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaCreditCard, FaLock } from "react-icons/fa";

const CheckoutForm = ({ price, coins }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price: price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, price])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        setProcessing(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
            setProcessing(false);
            return;
        } else {
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            setError(confirmError.message);
            setProcessing(false);
        } else {
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);

                // save payment in database
                const payment = {
                    buyer_email: user.email,
                    price: price,
                    transaction_id: paymentIntent.id,
                    date: new Date(),
                    coins_purchased: coins,
                }

                const res = await axiosSecure.post('/payments', payment);
                if (res.data?.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful!',
                        text: `You have successfully purchased ${coins} coins.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/payment-history');
                }
            }
            setProcessing(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-8">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 block flex items-center gap-2">
                    <FaCreditCard className="text-[#2bb673]" /> Credit or Debit Card
                </label>
                <div className="p-5 border-2 border-gray-100 rounded-xl bg-[#f9f9f9] focus-within:border-[#2bb673] transition-all">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#333333',
                                    fontFamily: 'Montserrat, sans-serif',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#ff7070',
                                },
                            },
                        }}
                    />
                </div>
            </div>

            {error && <p className="text-red-500 text-sm font-bold mb-4 bg-red-50 p-4 rounded-lg border border-red-100">{error}</p>}
            
            <button 
                type="submit" 
                disabled={!stripe || !clientSecret || processing}
                className={`w-full h-16 rounded-xl text-lg font-black uppercase tracking-widest shadow-lg flex items-center justify-center gap-3 transition-all ${!stripe || !clientSecret || processing ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-[#2bb673] text-white hover:bg-[#249a61] shadow-green-200/50'}`}
            >
                {processing ? (
                    <span className="loading loading-spinner loading-md"></span>
                ) : (
                    <>
                        <FaLock className="text-sm" /> Pay ${price} Now
                    </>
                )}
            </button>
        </form>
    );
};

export default CheckoutForm;
