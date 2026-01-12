import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaPlusCircle, FaCoins, FaCheckCircle } from "react-icons/fa";

const BuyerHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: stats } = useQuery({
        queryKey: ['buyer-stats', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/buyer-stats/${user.email}`);
            return res.data;
        }
    });

    return (
        <div className="fade-in">
            <h2 className="text-3xl font-bold text-[#333333] mb-8">Hello, <span className="text-[#2bb673]">{user?.displayName}</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm flex items-center gap-6">
                    <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center text-3xl">
                        <FaPlusCircle />
                    </div>
                    <div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-1">Tasks Created</p>
                        <h3 className="text-3xl font-black text-[#333333]">{stats?.totalTasks || 0}</h3>
                    </div>
                </div>
                
                <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm flex items-center gap-6">
                    <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center text-3xl">
                        <FaCheckCircle />
                    </div>
                    <div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-1">Pending Workers</p>
                        <h3 className="text-3xl font-black text-[#333333]">{stats?.pendingWorkers || 0}</h3>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm flex items-center gap-6">
                    <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-3xl">
                        <FaCoins />
                    </div>
                    <div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-1">Total Paid</p>
                        <h3 className="text-3xl font-black text-[#333333]">{stats?.totalPayments || 0}</h3>
                    </div>
                </div>
            </div>

            {/* Submissions to Review Stub */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-[#333333]">Pending Submissions to Review</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-gray-50 text-gray-400 uppercase text-[10px] tracking-widest">
                                <th className="py-4">Worker Name</th>
                                <th>Task Title</th>
                                <th>Payable Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-gray-400">
                                <td colSpan="4" className="text-center py-12 italic text-sm">No pending submissions found</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BuyerHome;
