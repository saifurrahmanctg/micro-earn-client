import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaCalendarAlt, FaUsers, FaDollarSign } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddTask = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        // 1. Upload image to imgbb
        const imageFile = { image: data.task_image_url[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: { 'content-type': 'multipart/form-data' }
        });

        if (res.data.success) {
            const taskData = {
                task_title: data.task_title,
                task_detail: data.task_detail,
                required_workers: parseInt(data.required_workers),
                payable_amount: parseFloat(data.payable_amount),
                completion_date: data.completion_date,
                submission_info: data.submission_info,
                task_image_url: res.data.data.display_url,
                buyer_email: user?.email,
                buyer_name: user?.displayName,
                created_at: new Date()
            };

            const taskRes = await axiosSecure.post('/tasks', taskData);
            if (taskRes.data.insertedId) {
                reset();
                Swal.fire({
                    icon: 'success',
                    title: 'Task Created Successfully!',
                    text: 'Coins have been deducted from your account.',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/my-tasks');
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto fade-in">
            <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-xl shadow-premium border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-[#333333] dark:text-white mb-2">Create New <span className="text-[#2bb673]">Task</span></h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Post a job to our community of skilled workers</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Task Title</label>
                            <input
                                {...register("task_title", { required: true })}
                                className="w-full px-5 py-4 bg-[#f9f9f9] dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#2bb673] font-medium text-gray-800 dark:text-white transition-all shadow-sm"
                                placeholder="e.g. Subscribe to YouTube Channel"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Completion Date</label>
                            <div className="relative">
                                <FaCalendarAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-[#2bb673]" />
                                <input
                                    type="date"
                                    {...register("completion_date", { required: true })}
                                    className="w-full pl-12 pr-5 py-4 bg-[#f9f9f9] dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#2bb673] font-medium text-gray-800 dark:text-white transition-all shadow-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Task Details */}
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Task Requirements / Details</label>
                        <textarea
                            {...register("task_detail", { required: true })}
                            rows="4"
                            className="w-full px-5 py-4 bg-[#f9f9f9] dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#2bb673] font-medium text-gray-800 dark:text-white transition-all shadow-sm resize-none"
                            placeholder="Describe step by step what workers need to do..."
                        ></textarea>
                    </div>

                    {/* Submission Info */}
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">What to Submit as Proof</label>
                        <input
                            {...register("submission_info", { required: true })}
                            className="w-full px-5 py-4 bg-[#f9f9f9] dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#2bb673] font-medium text-gray-800 dark:text-white transition-all shadow-sm"
                            placeholder="e.g. Screenshot of liked video and subscribe button"
                        />
                    </div>

                    {/* Stats & Image */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Workers Needed</label>
                            <div className="relative">
                                <FaUsers className="absolute left-5 top-1/2 -translate-y-1/2 text-[#2bb673]" />
                                <input
                                    type="number"
                                    {...register("required_workers", { required: true, min: 1 })}
                                    className="w-full pl-12 pr-5 py-4 bg-[#f9f9f9] dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#2bb673] font-black text-gray-800 dark:text-white transition-all shadow-sm"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Amount Per Worker</label>
                            <div className="relative">
                                <FaDollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-[#2bb673]" />
                                <input
                                    type="number"
                                    step="0.01"
                                    {...register("payable_amount", { required: true, min: 0.1 })}
                                    className="w-full pl-12 pr-5 py-4 bg-[#f9f9f9] dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#2bb673] font-black text-gray-800 dark:text-white transition-all shadow-sm"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Task Image</label>
                            <div className="relative group cursor-pointer">
                                <input
                                    type="file"
                                    {...register("task_image_url", { required: true })}
                                    className="opacity-0 absolute inset-0 w-full h-full z-10 cursor-pointer"
                                />
                                <div className="w-full h-[58px] bg-[#f9f9f9] dark:bg-gray-700 border border-dashed border-gray-200 dark:border-gray-600 group-hover:border-[#2bb673] group-hover:bg-green-50 dark:group-hover:bg-green-900/30 rounded-lg flex items-center justify-center gap-2 transition-all">
                                    <FaCloudUploadAlt className="text-[#2bb673] text-xl" />
                                    <span className="text-xs font-bold text-gray-400 group-hover:text-[#2bb673]">Upload Image</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6">
                        <button type="submit" className="w-full btn-primary h-16 rounded-xl text-lg font-bold shadow-lg shadow-green-200/50">
                            Create Task & Deduct Coins
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTask;
