import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaUsers, FaCoins, FaMoneyCheckAlt } from "react-icons/fa";

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

    return (
        <div className="fade-in">
            <h2 className="text-3xl font-bold text-[#333333] mb-8">Admin Dashboard - <span className="text-[#2bb673]">Global Overview</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                    <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center text-xl mb-6">
                        <FaUsers />
                    </div>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-1">Total Workers</p>
                    <h3 className="text-3xl font-black text-[#333333]">{stats?.totalWorkers || 0}</h3>
                </div>
                
                <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                    <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center text-xl mb-6">
                        <FaUsers />
                    </div>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-1">Total Buyers</p>
                    <h3 className="text-3xl font-black text-[#333333]">{stats?.totalBuyers || 0}</h3>
                </div>

                <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                    <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center text-xl mb-6">
                        <FaCoins />
                    </div>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-1">Total Coins</p>
                    <h3 className="text-3xl font-black text-[#333333]">{stats?.totalCoins || 0}</h3>
                </div>

                <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                    <div className="w-12 h-12 bg-green-50 text-[#2bb673] rounded-full flex items-center justify-center text-xl mb-6">
                        <FaMoneyCheckAlt />
                    </div>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-1">Total Payments</p>
                    <h3 className="text-3xl font-black text-[#333333]">{stats?.totalPayments || 0}</h3>
                </div>
            </div>

            {/* Withdraw Requests Stub */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center text-gray-800">
                    <h3 className="font-bold">Pending Withdrawal Requests</h3>
                </div>
                <div className="overflow-x-auto text-gray-800">
                    <table className="table w-full hover:bg-white text-gray-800">
                        <thead>
                            <tr className="bg-gray-50 text-gray-400 uppercase text-[10px] tracking-widest">
                                <th className="py-4">Worker Email</th>
                                <th>Amount ($)</th>
                                <th>Payment System</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-gray-400">
                                <td colSpan="4" className="text-center py-12 italic text-sm">No withdrawal requests pending</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
