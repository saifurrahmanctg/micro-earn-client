import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSearchParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { FaShieldAlt } from "react-icons/fa";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = () => {
    const [searchParams] = useSearchParams();
    const coins = parseInt(searchParams.get("coins"));
    const price = parseFloat(searchParams.get("price"));

    return (
        <div className="max-w-3xl mx-auto fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-premium border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300">
                <div className="bg-[#333333] dark:bg-black/50 p-10 text-white flex justify-between items-center transition-colors">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Secure <span className="text-[#2bb673]">Checkout</span></h2>
                        <p className="text-gray-400 text-sm font-medium">Complete your purchase to add coins to your wallet</p>
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Amount</div>
                        <div className="text-4xl font-black text-[#2bb673]">${price}</div>
                    </div>
                </div>

                <div className="p-10">
                    <div className="mb-10 bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center justify-between transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-[#2bb673]">
                                <FaShieldAlt />
                            </div>
                            <div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Order Review</span>
                                <p className="text-lg font-bold text-[#333333] dark:text-white">Purchase {coins} Micro-Earn Coins</p>
                            </div>
                        </div>
                    </div>

                    <Elements stripe={stripePromise}>
                        <CheckoutForm price={price} coins={coins} />
                    </Elements>

                    <div className="mt-10 pt-10 border-t border-gray-50 dark:border-gray-700 flex flex-col items-center transition-colors">
                        <div className="flex items-center gap-6 opacity-30 grayscale mb-6">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="visa" className="h-4" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="mastercard" className="h-6" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="paypal" className="h-5" />
                        </div>
                        <p className="text-xs text-gray-400 font-medium text-center max-w-sm">
                            Payments are processed securely by Stripe. Your credit card information is encrypted and never stored on our servers.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
