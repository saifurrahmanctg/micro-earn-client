import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaUsers, FaCoins, FaMoneyCheckAlt, FaCheck } from "react-icons/fa";
import Swal from "sweetalert2";

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: stats } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    const { data: withdrawals = [], refetch } = useQuery({
        queryKey: ['pending-withdrawals'],
        queryFn: async () => {
            const res = await axiosSecure.get('/withdrawals');
            return res.data;
        }
    });

    const handleApproveWithdrawal = async (id) => {
        const res = await axiosSecure.patch(`/withdrawals/approve/${id}`);
        if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
                icon: 'success',
                title: 'Payment Confirmed!',
                text: 'The withdrawal has been marked as successful.',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div className="fade-in">
            <h2 className="text-3xl font-bold text-[#333333] dark:text-white mb-8">Admin Dashboard - <span className="text-[#2bb673]">Global Overview</span></h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm transition-colors duration-300">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-full flex items-center justify-center text-xl mb-6">
                        <FaUsers />
                    </div>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-1">Total Workers</p>
                    <h3 className="text-3xl font-black text-[#333333] dark:text-white">{stats?.totalWorkers || 0}</h3>
                </div>

                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm transition-colors duration-300">
                    <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 text-purple-500 rounded-full flex items-center justify-center text-xl mb-6">
                        <FaUsers />
                    </div>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-1">Total Buyers</p>
                    <h3 className="text-3xl font-black text-[#333333] dark:text-white">{stats?.totalBuyers || 0}</h3>
                </div>

                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm transition-colors duration-300">
                    <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 text-amber-500 rounded-full flex items-center justify-center text-xl mb-6">
                        <FaCoins />
                    </div>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-1">Total Coins</p>
                    <h3 className="text-3xl font-black text-[#333333] dark:text-white">{stats?.totalCoins || 0}</h3>
                </div>

                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm transition-colors duration-300">
                    <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 text-[#2bb673] rounded-full flex items-center justify-center text-xl mb-6">
                        <FaMoneyCheckAlt />
                    </div>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-1">Total Payments</p>
                    <h3 className="text-3xl font-black text-[#333333] dark:text-white">{stats?.totalPayments || 0}</h3>
                </div>
            </div>

            {/* Withdraw Requests */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden transition-colors duration-300">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center text-[#333333] dark:text-white">
                    <h3 className="font-bold">Pending Withdrawal Requests</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="table w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-700 text-gray-400 uppercase text-[10px] tracking-widest font-black text-left">
                                <th className="py-5 px-6">Worker Info</th>
                                <th>Amount ($)</th>
                                <th>Coins</th>
                                <th>Method</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                            {withdrawals.map((withdraw) => (
                                <tr key={withdraw._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-[#333333] dark:text-white">{withdraw.worker_name}</span>
                                            <span className="text-xs text-gray-400">{withdraw.worker_email}</span>
                                        </div>
                                    </td>
                                    <td className="font-black text-[#333333] dark:text-white">${withdraw.withdrawal_amount}</td>
                                    <td className="font-bold text-amber-500">{withdraw.withdrawal_coin}</td>
                                    <td className="text-gray-600 dark:text-gray-300 font-medium">
                                        <div className="flex flex-col text-xs">
                                            <span className="font-bold">{withdraw.payment_system}</span>
                                            <span>{withdraw.account_number}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleApproveWithdrawal(withdraw._id)}
                                            className="px-4 py-2 bg-green-50 text-green-500 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-green-500 hover:text-white transition-all shadow-sm flex items-center gap-2"
                                        >
                                            <FaCheck /> Payment Success
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {withdrawals.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center py-20">
                                        <p className="text-gray-400 italic">No withdrawal requests pending</p>
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

export default AdminHome;

