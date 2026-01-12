import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaHistory, FaCheckCircle, FaExchangeAlt, FaArrowDown } from "react-icons/fa";

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <div className="p-10 text-center font-bold">Loading History...</div>

    return (
        <div className="fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h2 className="text-3xl font-bold text-[#333333]">Payment <span className="text-[#2bb673]">History</span></h2>
                    <p className="text-gray-500 font-medium">Review your recent coin purchases and transactions</p>
                </div>
                <div className="bg-white px-6 py-3 rounded-xl border border-gray-100 flex items-center gap-3">
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Total Transactions</span>
                    <span className="text-xl font-black text-[#2bb673]">{payments.length}</span>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-premium overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full border-collapse">
                        <thead>
                            <tr className="bg-[#f9f9f9] text-gray-400 uppercase text-[10px] tracking-widest font-black border-b border-gray-100">
                                <th className="py-6 px-8 text-left">Transaction ID</th>
                                <th>Amount Paid</th>
                                <th>Coins Added</th>
                                <th>Status</th>
                                <th className="text-right px-8">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {payments.map((payment) => (
                                <tr key={payment._id} className="hover:bg-green-50/20 transition-colors">
                                    <td className="py-6 px-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 text-xs">
                                                <FaExchangeAlt />
                                            </div>
                                            <span className="font-mono text-xs font-bold text-[#333333] tracking-tighter">{payment.transaction_id}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-lg font-black text-[#333333]">${payment.price}</div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-[#2bb673]"></div>
                                            <span className="font-black text-[#333333]">{payment.coins_purchased} <span className="text-[10px] text-gray-400 font-bold uppercase">Coins</span></span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="px-3 py-1 bg-green-100 text-green-600 border border-green-200 rounded-full text-[10px] font-black uppercase tracking-widest w-fit flex items-center gap-1">
                                            <FaCheckCircle /> Succeeded
                                        </div>
                                    </td>
                                    <td className="text-right px-8 text-gray-400 text-xs font-bold uppercase tracking-tighter">
                                        {new Date(payment.date).toLocaleDateString()} at {new Date(payment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                </tr>
                            ))}

                            {payments.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center">
                                        <p className="text-gray-400 italic">No payment history found.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;
