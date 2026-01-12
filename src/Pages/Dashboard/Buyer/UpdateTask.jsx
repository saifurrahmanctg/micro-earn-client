import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";

const UpdateTask = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();

    const { data: task = {}, isLoading } = useQuery({
        queryKey: ['task-update', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tasks/${id}`);
            reset(res.data);
            return res.data;
        }
    });

    const onSubmit = async (data) => {
        const updatedTask = {
            task_title: data.task_title,
            task_detail: data.task_detail,
            submission_info: data.submission_info
        };

        const res = await axiosSecure.patch(`/tasks/${id}`, updatedTask);
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                icon: 'success',
                title: 'Task Updated!',
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/dashboard/my-tasks');
        }
    };

    if (isLoading) return <div className="p-20 text-center font-bold">Loading Task...</div>

    return (
        <div className="max-w-2xl mx-auto fade-in">
            <div className="bg-white p-10 rounded-2xl shadow-premium border border-gray-100">
                <div className="mb-10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-[#2bb673] text-xl">
                        <FaEdit />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-[#333333]">Update <span className="text-[#2bb673]">Task</span></h2>
                        <p className="text-gray-400 font-medium">Modify your job details and instructions</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Task Title</label>
                        <input 
                            {...register("task_title", { required: true })}
                            className="w-full px-5 py-4 bg-[#f9f9f9] border border-gray-100 rounded-xl focus:outline-none focus:border-[#2bb673] font-bold text-gray-800 transition-all shadow-sm"
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Task Details</label>
                        <textarea 
                            {...register("task_detail", { required: true })}
                            rows="4"
                            className="w-full px-5 py-4 bg-[#f9f9f9] border border-gray-100 rounded-xl focus:outline-none focus:border-[#2bb673] font-medium text-gray-800 transition-all shadow-sm resize-none"
                        ></textarea>
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Submission Requirements</label>
                        <input 
                            {...register("submission_info", { required: true })}
                            className="w-full px-5 py-4 bg-[#f9f9f9] border border-gray-100 rounded-xl focus:outline-none focus:border-[#2bb673] font-bold text-gray-800 transition-all shadow-sm"
                        />
                    </div>

                    <div className="pt-4 flex gap-4">
                        <button type="button" onClick={() => navigate(-1)} className="flex-1 h-14 rounded-xl font-bold bg-gray-50 text-gray-400 hover:bg-gray-100 transition-all">
                            Cancel
                        </button>
                        <button type="submit" className="flex-[2] h-14 rounded-xl font-black uppercase tracking-widest bg-[#2bb673] text-white shadow-lg shadow-green-200/50 hover:bg-[#249a61] transition-all">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateTask;
