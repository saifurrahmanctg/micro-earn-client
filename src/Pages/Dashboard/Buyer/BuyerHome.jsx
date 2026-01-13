import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaPlusCircle, FaCoins, FaCheckCircle, FaEye, FaCheck, FaTimes, FaExclamationTriangle } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";

const BuyerHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user, toast } = useAuth();
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    const { data: stats } = useQuery({
        queryKey: ['buyer-stats', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/buyer-stats/${user.email}`);
            return res.data;
        }
    });

    const { data: submissions = [], refetch } = useQuery({
        queryKey: ['pending-submissions', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/submissions/buyer/${user.email}`);
            return res.data;
        }
    });

    const handleApprove = async (id) => {
        const res = await axiosSecure.patch(`/submissions/approve/${id}`);
        if (res.data.modifiedCount > 0) {
            refetch();
            toast.success('Worker has been paid!');
        }
    };

    const handleReject = async (id) => {
        const res = await axiosSecure.patch(`/submissions/reject/${id}`);
        if (res.data.modifiedCount > 0) {
            refetch();
            toast.error('Submission has been rejected.');
        }
    };

    const handleReport = async (submission) => {
        const { value: reason } = await Swal.fire({
            title: 'Report Submission',
            input: 'textarea',
            inputLabel: 'Reason for reporting',
            inputPlaceholder: 'Why is this submission invalid?',
            showCancelButton: true,
            confirmButtonColor: '#ff7070',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!'
                }
            }
        });

        if (reason) {
            const report = {
                submission_id: submission._id,
                worker_email: submission.worker_email,
                worker_name: submission.worker_name,
                buyer_email: user.email,
                buyer_name: user.displayName,
                task_title: submission.task_title,
                reason: reason
            }
            const res = await axiosSecure.post('/reports', report);
            if (res.data.insertedId) {
                toast.success('Report submitted to admin.');
                // Also reject the submission if not already
                if (submission.status === 'pending') {
                    handleReject(submission._id);
                }
            }
        }
    };

    return (
        <div className="fade-in">
            <h2 className="text-3xl font-bold text-[#333333] dark:text-white mb-8">Hello, <span className="text-[#2bb673]">{user?.displayName}</span></h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-6 transition-colors duration-300">
                    <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 rounded-full flex items-center justify-center text-3xl">
                        <FaPlusCircle />
                    </div>
                    <div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-1">Tasks Created</p>
                        <h3 className="text-3xl font-black text-[#333333] dark:text-white">{stats?.totalTasks || 0}</h3>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-6 transition-colors duration-300">
                    <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/20 text-amber-500 rounded-full flex items-center justify-center text-3xl">
                        <FaCheckCircle />
                    </div>
                    <div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-1">Pending Workers</p>
                        <h3 className="text-3xl font-black text-[#333333] dark:text-white">{stats?.pendingWorkers || 0}</h3>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-6 transition-colors duration-300">
                    <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center text-3xl">
                        <FaCoins />
                    </div>
                    <div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-1">Total Paid</p>
                        <h3 className="text-3xl font-black text-[#333333] dark:text-white">{stats?.totalPaid || 0}</h3>
                    </div>
                </div>
            </div>

            {/* Submissions to Review */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden transition-colors duration-300">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="font-bold text-[#333333] dark:text-white">Pending Submissions to Review</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="table w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-700 text-gray-400 uppercase text-[10px] tracking-widest font-black text-left">
                                <th className="py-5 px-6">Worker Name</th>
                                <th className="py-5 px-6">Task Title</th>
                                <th className="py-5 px-6">Payable</th>
                                <th className="py-5 px-6">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                            {submissions.map((submission) => (
                                <tr key={submission._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <td className="py-4 px-6">
                                        <span className="font-bold text-[#333333] dark:text-white">{submission.worker_name}</span>
                                    </td>
                                    <td>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">{submission.task_title}</span>
                                    </td>
                                    <td className="font-black text-[#2bb673]">{submission.payable_amount} Coins</td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setSelectedSubmission(submission)}
                                                className="p-2 bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                                                title="View Submission"
                                            >
                                                <FaEye />
                                            </button>
                                            <button
                                                onClick={() => handleApprove(submission._id)}
                                                className="p-2 bg-green-50 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition-all shadow-sm"
                                                title="Approve"
                                            >
                                                <FaCheck />
                                            </button>
                                            <button
                                                onClick={() => handleReject(submission._id)}
                                                className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                title="Reject"
                                            >
                                                <FaTimes />
                                            </button>
                                            <button
                                                onClick={() => handleReport(submission)}
                                                className="p-2 bg-amber-50 text-amber-500 rounded-lg hover:bg-amber-500 hover:text-white transition-all shadow-sm"
                                                title="Report Invalid"
                                            >
                                                <FaExclamationTriangle />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {submissions.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center py-20">
                                        <p className="text-gray-400 italic">No pending submissions found</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Submission Detail Modal */}
            {selectedSubmission && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-slide-up transition-colors duration-300">
                        <div className="bg-[#333333] dark:bg-black/50 p-6 text-white flex justify-between items-center transition-colors">
                            <h3 className="text-xl font-bold">Submission Details</h3>
                            <button onClick={() => setSelectedSubmission(null)} className="text-white/50 hover:text-white"><FaTimes /></button>
                        </div>
                        <div className="p-8">
                            <div className="mb-6">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#2bb673] mb-1 block">Proof Provided</span>
                                <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-100 dark:border-gray-600 italic">
                                    "{selectedSubmission.submission_details}"
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedSubmission(null)}
                                className="w-full py-4 bg-[#333333] dark:bg-gray-700 text-white font-black uppercase tracking-widest text-sm rounded-xl hover:bg-black dark:hover:bg-gray-600 transition-all"
                            >
                                Close Details
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuyerHome;

