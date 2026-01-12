import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaCoins, FaDollarSign, FaUniversity, FaMobileAlt, FaWallet } from "react-icons/fa";

const Withdraw = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [coinsToWithdraw, setCoinsToWithdraw] = useState(0);

    const { data: userData = {}, refetch } = useQuery({
        queryKey: [user?.email, 'coins'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    const currentCoins = userData.coins || 0;
    const withdrawalAmount = parseFloat((coinsToWithdraw / 20).toFixed(2));

    const handleWithdraw = async (e) => {
        e.preventDefault();
        const form = e.target;
        const payment_system = form.payment_system.value;
        const account_number = form.account_number.value;

        if (coinsToWithdraw < 200) {
            return Swal.fire({
                icon: 'error',
                title: 'Minimum Withdrawal',
                text: 'You need at least 200 coins to request a withdrawal.',
                confirmButtonColor: '#2bb673'
            });
        }

        if (coinsToWithdraw > currentCoins) {
            return Swal.fire({
                icon: 'error',
                title: 'Insufficient Balance',
                text: "You don't have that many coins!",
                confirmButtonColor: '#2bb673'
            });
        }

        const withdrawalData = {
            worker_email: user.email,
            worker_name: user.displayName,
            withdrawal_coin: parseInt(coinsToWithdraw),
            withdrawal_amount: withdrawalAmount,
            payment_system,
            account_number,
            withdraw_date: new Date(),
            status: 'pending'
        };

        const res = await axiosSecure.post('/withdrawals', withdrawalData);
        if (res.data.insertedId) {
            refetch();
            form.reset();
            setCoinsToWithdraw(0);
            Swal.fire({
                icon: 'success',
                title: 'Request Submitted!',
                text: 'Your withdrawal is pending admin approval.',
                showConfirmButton: false,
                timer: 2000
            });
        }
    };

    return (
        <div className="fade-in max-w-4xl mx-auto">
            {/* Balance Header */}
            <div className="bg-[#333333] p-10 rounded-2xl shadow-premium text-white flex flex-col md:flex-row items-center justify-between gap-8 mb-10 overflow-hidden relative">
                <div className="z-10">
                    <h2 className="text-3xl font-black mb-2">My <span className="text-[#2bb673]">Balance</span></h2>
                    <p className="text-gray-400 font-medium">Convert your hard-earned coins into real cash</p>
                </div>
                <div className="flex items-center gap-6 z-10">
                    <div className="text-right">
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#2bb673] mb-1">Total Available</div>
                        <div className="flex items-center gap-3">
                            <FaCoins className="text-yellow-500 text-3xl" />
                            <span className="text-5xl font-black">{currentCoins}</span>
                        </div>
                    </div>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute -left-10 -top-10 w-48 h-48 bg-[#2bb673]/10 rounded-full blur-3xl"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Conversion Info */}
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-premium">
                        <h3 className="text-lg font-bold text-[#333333] mb-6 flex items-center gap-2">
                            <FaWallet className="text-[#2bb673]" /> Withdrawal Info
                        </h3>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center p-4 bg-[#f9f9f9] rounded-xl border border-gray-100">
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Rate</span>
                                <span className="text-lg font-black text-[#333333]">20 Coins = $1</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl border border-green-100">
                                <span className="text-sm font-bold text-[#2bb673] uppercase tracking-widest">Min Withdraw</span>
                                <span className="text-lg font-black text-[#2bb673]">200 Coins ($10)</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#333333] p-8 rounded-2xl shadow-premium text-white relative overflow-hidden group">
                        <div className="flex flex-col items-center justify-center py-6">
                            <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Preview Amount</span>
                            <div className="flex items-center gap-2 text-6xl font-black text-white group-hover:text-[#2bb673] transition-colors">
                                <FaDollarSign className="text-3xl" />
                                <span>{withdrawalAmount}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-premium">
                    <h3 className="text-lg font-bold text-[#333333] mb-8 uppercase tracking-widest border-b border-gray-50 pb-4">Withdrawal Form</h3>
                    <form onSubmit={handleWithdraw} className="space-y-6">
                        <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Coins to Withdraw</label>
                            <input
                                type="number"
                                name="withdrawal_coin"
                                min="200"
                                required
                                value={coinsToWithdraw}
                                onChange={(e) => setCoinsToWithdraw(e.target.value)}
                                className="w-full px-5 py-4 bg-[#f9f9f9] border border-gray-100 rounded-xl focus:outline-none focus:border-[#2bb673] font-black text-gray-800 transition-all text-xl"
                                placeholder="0"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Payment System</label>
                                <div className="relative">
                                    <select
                                        name="payment_system"
                                        className="w-full px-5 py-4 bg-[#f9f9f9] border border-gray-100 rounded-xl focus:outline-none focus:border-[#2bb673] font-bold text-gray-800 transition-all appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="Stripe">Stripe</option>
                                        <option value="Bkash">Bkash</option>
                                        <option value="Rocket">Rocket</option>
                                        <option value="Nagad">Nagad</option>
                                        <option value="Bank">Bank Transfer</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <FaMobileAlt />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Account Number</label>
                                <input
                                    name="account_number"
                                    type="text"
                                    required
                                    className="w-full px-5 py-4 bg-[#f9f9f9] border border-gray-100 rounded-xl focus:outline-none focus:border-[#2bb673] font-bold text-gray-800 transition-all"
                                    placeholder="Enter details..."
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={currentCoins < 200}
                                className={`w-full h-16 rounded-2xl text-lg font-black uppercase tracking-widest shadow-lg flex items-center justify-center gap-3 transition-all ${currentCoins < 200 ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-[#2bb673] text-white hover:bg-[#249a61] shadow-green-200/50'}`}
                            >
                                Submit Request
                            </button>
                            {currentCoins < 200 && <p className="text-center text-xs text-red-400 font-bold mt-4 uppercase tracking-tighter">You need {200 - currentCoins} more coins to withdraw</p>}
                        </div>
                    </form>
                </div>
            </div>

            {/* Withdrawals List Stub (Optional if they want to see history here) */}
        </div>
    );
};

export default Withdraw;
