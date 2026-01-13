import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaCalendarAlt, FaDollarSign, FaUsers, FaInfoCircle, FaCheckCircle } from "react-icons/fa";

const TaskDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();

    const { data: task = {}, isLoading } = useQuery({
        queryKey: ['task', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tasks/${id}`);
            return res.data;
        }
    });

    const { data: submissionCheck = { submitted: false } } = useQuery({
        queryKey: ['submission-check', id, user?.email],
        enabled: !!user?.email && !!id,
        queryFn: async () => {
            const res = await axiosSecure.get(`/submissions/check/${id}/${user.email}`);
            return res.data;
        }
    });

    const onSubmit = async (data) => {
        const submissionData = {
            task_id: task._id,
            task_title: task.task_title,
            payable_amount: task.payable_amount,
            worker_email: user?.email,
            worker_name: user?.displayName,
            buyer_email: task.buyer_email,
            buyer_name: task.buyer_name,
            submission_details: data.submission_details,
            current_date: new Date(),
            status: 'pending'
        };

        const res = await axiosSecure.post('/submissions', submissionData);
        if (res.data.insertedId) {
            Swal.fire({
                icon: 'success',
                title: 'Task Submitted!',
                text: 'Wait for the buyer to review your work.',
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/dashboard/my-submissions');
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: res.data.message
            });
        }
    };

    if (isLoading) return <div className="p-10 text-center font-bold">Loading Details...</div>

    return (
        <div className="max-w-5xl mx-auto fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Task Info */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-premium border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300">
                        <div className="h-64 overflow-hidden relative">
                            <img src={task.task_image_url} alt={task.task_title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-6 left-8">
                                <h1 className="text-3xl font-bold text-white mb-2">{task.task_title}</h1>
                                <div className="flex items-center gap-4 text-gray-200 text-sm font-medium">
                                    <span className="flex items-center gap-1"><FaCalendarAlt className="text-[#2bb673]" /> Due: {new Date(task.completion_date).toLocaleDateString()}</span>
                                    <span className="flex items-center gap-1 font-bold"><FaUsers className="text-[#2bb673]" /> Buyer: {task.buyer_name}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="mb-8">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <FaInfoCircle className="text-[#2bb673]" /> Task Description
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium bg-[#f9f9f9] dark:bg-gray-700 p-6 rounded-lg border border-gray-100 dark:border-gray-600 transition-colors">
                                    {task.task_detail}
                                </p>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <FaCheckCircle className="text-[#2bb673]" /> Proof Requirements
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 font-bold bg-green-50 dark:bg-green-900/30 p-6 rounded-lg border border-green-100 dark:border-green-800 transition-colors">
                                    {task.submission_info}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Submission Form */}
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-premium border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                        <h2 className="text-2xl font-bold text-[#333333] dark:text-white mb-6">Submit Your Work</h2>

                        {submissionCheck.submitted ? (
                            <div className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-6 rounded-xl border border-green-100 dark:border-green-800 flex items-center justify-center gap-2 font-bold text-lg transition-colors">
                                <FaCheckCircle className="text-2xl" />
                                You have already submitted this task.
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Work Details / Proof Text</label>
                                    <textarea
                                        {...register("submission_details", { required: true })}
                                        rows="5"
                                        className="w-full px-5 py-4 bg-[#f9f9f9] dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#2bb673] font-medium text-gray-800 dark:text-gray-200 transition-all shadow-sm resize-none"
                                        placeholder="Enter proof details, URLs, or descriptions here..."
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn-primary w-full h-14 text-lg font-bold">
                                    Submit Task for Review
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Right Column: Sidebar Stats */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-premium border border-gray-100 dark:border-gray-700 text-center transition-colors duration-300">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 block">You Will Earn</span>
                        <div className="flex items-center justify-center gap-2 text-[#2bb673] mb-2">
                            <FaDollarSign className="text-3xl" />
                            <span className="text-5xl font-black">{task.payable_amount}</span>
                        </div>
                        <span className="text-xs font-black text-gray-300 uppercase">Premium Coins</span>
                    </div>

                    <div className="bg-[#333333] p-8 rounded-xl shadow-premium text-white">
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#2bb673]"></span> Job Insights
                        </h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400">Slots Remaining</span>
                                <span className="font-bold text-[#2bb673]">{task.required_workers}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400">Submissions</span>
                                <span className="font-bold">Active</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400">Review Time</span>
                                <span className="font-bold text-yellow-500">Fast</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetails;
