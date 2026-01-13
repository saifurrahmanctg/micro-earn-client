import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MySubmissions = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [page, setPage] = useState(0);
    const size = 10;

    const { data: submissionData = {}, isLoading } = useQuery({
        queryKey: ['my-submissions', user?.email, page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/submissions/worker/${user.email}?page=${page}&size=${size}`);
            return res.data;
        }
    });

    const { result: submissions = [], count = 0 } = submissionData;
    const totalPages = Math.ceil(count / size);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-600 border-green-200';
            case 'pending': return 'bg-yellow-100 text-yellow-600 border-yellow-200';
            case 'rejected': return 'bg-red-100 text-red-600 border-red-200';
            default: return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved': return <FaCheckCircle />;
            case 'pending': return <FaHourglassHalf />;
            case 'rejected': return <FaTimesCircle />;
            default: return null;
        }
    };

    if (isLoading) return <div className="p-10 text-center font-bold">Fetching Submissions...</div>

    return (
        <div className="fade-in">
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-[#333333] dark:text-white">My <span className="text-[#2bb673]">Submissions</span></h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Track the status of your completed tasks</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-premium overflow-hidden transition-colors duration-300">
                <div className="overflow-x-auto">
                    <table className="table w-full border-collapse">
                        <thead>
                            <tr className="bg-[#f9f9f9] dark:bg-gray-700 text-gray-400 uppercase text-[10px] tracking-widest font-black border-b border-gray-100 dark:border-gray-600">
                                <th className="py-6 px-8 text-left">Task Details</th>
                                <th>Buyer</th>
                                <th>Payable</th>
                                <th>Status</th>
                                <th className="text-right px-8">Date Submitted</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                            {submissions.map((sub) => (
                                <tr key={sub._id} className="hover:bg-green-50/20 dark:hover:bg-green-900/10 transition-colors">
                                    <td className="py-5 px-8">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-[#333333] dark:text-white mb-1">{sub.task_title}</span>
                                            <span className="text-xs text-gray-400 font-medium line-clamp-1">Proof: {sub.submission_details}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-sm font-bold text-gray-500 dark:text-gray-400">{sub.buyer_name}</div>
                                    </td>
                                    <td className="font-black text-[#2bb673]">
                                        <div className="flex items-center gap-1">
                                            <span>{sub.payable_amount}</span>
                                            <span className="text-[10px] text-gray-400 uppercase">Coins</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-black uppercase w-fit ${getStatusStyle(sub.status)}`}>
                                            {getStatusIcon(sub.status)}
                                            {sub.status}
                                        </div>
                                    </td>
                                    <td className="text-right px-8 text-gray-400 text-sm font-medium">
                                        {new Date(sub.current_date).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}

                            {submissions.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center">
                                        <p className="text-gray-400 italic">You haven't submitted any tasks yet.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="p-6 bg-[#f9f9f9] dark:bg-gray-800 border-t border-gray-50 dark:border-gray-700 flex justify-center items-center gap-4">
                        <button
                            disabled={page === 0}
                            onClick={() => setPage(p => p - 1)}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-all ${page === 0 ? 'bg-gray-50 dark:bg-gray-700 text-gray-300 dark:text-gray-500 border-gray-100 dark:border-gray-600 cursor-not-allowed' : 'bg-white dark:bg-gray-700 text-[#2bb673] border-gray-200 dark:border-gray-600 hover:bg-[#2bb673] hover:text-white shadow-sm'}`}
                        >
                            <FaChevronLeft />
                        </button>

                        <div className="flex gap-2">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setPage(i)}
                                    className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${page === i ? 'bg-[#2bb673] text-white shadow-lg' : 'bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600 hover:border-[#2bb673] hover:text-[#2bb673]'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            disabled={page === totalPages - 1}
                            onClick={() => setPage(p => p + 1)}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-all ${page === totalPages - 1 ? 'bg-gray-50 dark:bg-gray-700 text-gray-300 dark:text-gray-500 border-gray-100 dark:border-gray-600 cursor-not-allowed' : 'bg-white dark:bg-gray-700 text-[#2bb673] border-gray-200 dark:border-gray-600 hover:bg-[#2bb673] hover:text-white shadow-sm'}`}
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MySubmissions;
