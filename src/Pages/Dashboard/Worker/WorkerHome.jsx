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

    const { data: submissionData = {} } = useQuery({
        queryKey: ['my-submissions-home', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/submissions/worker/${user.email}?page=0&size=5`);
            return res.data;
        }
    });

    const submissions = submissionData.result || [];

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

            {/* Recent Submissions Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-[#333333]">Recent Submissions</h3>
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
                            {submissions.length === 0 ? (
                                <tr className="text-gray-400">
                                    <td colSpan="4" className="text-center py-12 italic text-sm">No submissions yet</td>
                                </tr>
                            ) : (
                                submissions.map((sub) => (
                                    <tr key={sub._id} className="hover:bg-gray-50 border-b border-gray-50 last:border-0">
                                        <td className="font-bold text-[#333333]">{sub.task_title}</td>
                                        <td className="font-bold text-[#2bb673]">{sub.payable_amount} Coins</td>
                                        <td className="text-gray-500 font-medium">{sub.buyer_name}</td>
                                        <td>
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${sub.status === 'approved' ? 'bg-green-100 text-green-600' :
                                                sub.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                                                }`}>
                                                {sub.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default WorkerHome;
