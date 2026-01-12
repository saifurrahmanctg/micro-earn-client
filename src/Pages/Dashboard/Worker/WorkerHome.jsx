import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaTasks, FaDollarSign, FaHourglassHalf } from "react-icons/fa";

const WorkerHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: stats } = useQuery({
        queryKey: ['worker-stats', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/worker-stats/${user.email}`);
            return res.data;
        }
    });

    return (
        <div className="fade-in">
            <h2 className="text-3xl font-bold text-[#333333] mb-8">Welcome, <span className="text-[#2bb673]">{user?.displayName}</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center text-3xl">
                        <FaTasks />
                    </div>
                    <div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-1">Total Submissions</p>
                        <h3 className="text-3xl font-black text-[#333333]">{stats?.totalSubmissions || 0}</h3>
                    </div>
                </div>
                
                <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm flex items-center gap-6">
                    <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center text-3xl">
                        <FaHourglassHalf />
                    </div>
                    <div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-1">Pending Submissions</p>
                        <h3 className="text-3xl font-black text-[#333333]">{stats?.pendingSubmissions || 0}</h3>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm flex items-center gap-6">
                    <div className="w-16 h-16 bg-green-50 text-[#2bb673] rounded-full flex items-center justify-center text-3xl">
                        <FaDollarSign />
                    </div>
                    <div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-1">Total Earnings</p>
                        <h3 className="text-3xl font-black text-[#333333]">{stats?.totalEarnings || 0}</h3>
                    </div>
                </div>
            </div>

            {/* Approved Submissions Table Stub */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-[#333333]">Recent Approved Submissions</h3>
                    <button className="text-[#2bb673] font-bold text-xs uppercase tracking-widest">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-gray-50 text-gray-400 uppercase text-[10px] tracking-widest">
                                <th className="py-4">Task Title</th>
                                <th>Payable Amount</th>
                                <th>Buyer Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-gray-400">
                                <td colSpan="4" className="text-center py-12 italic text-sm">No data available yet</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default WorkerHome;
