import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaTrash, FaEdit, FaEye, FaSortAmountDown } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyTasks = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: tasks = [], refetch, isLoading } = useQuery({
        queryKey: ['my-tasks', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tasks/buyer/${user.email}`);
            return res.data;
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Coins for remaining workers will be refunded!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2bb673',
            cancelButtonColor: '#ff7070',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/tasks/${id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire('Deleted!', 'Your task has been removed.', 'success');
                }
            }
        });
    };

    if (isLoading) return <div className="p-10 text-center font-bold">Loading Tasks...</div>

    return (
        <div className="fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h2 className="text-3xl font-bold text-[#333333] dark:text-white">My <span className="text-[#2bb673]">Tasks</span></h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Manage and monitor your active job postings</p>
                </div>
                <div className="flex items-center gap-3 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-100 dark:border-gray-700 text-sm font-bold text-gray-500 dark:text-gray-300">
                    <FaSortAmountDown /> Sort by Date
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-premium overflow-hidden transition-colors duration-300">
                <div className="overflow-x-auto">
                    <table className="table w-full border-collapse">
                        <thead>
                            <tr className="bg-[#f9f9f9] dark:bg-gray-700 text-gray-400 uppercase text-[10px] tracking-widest font-black border-b border-gray-100 dark:border-gray-600">
                                <th className="py-6 px-8 text-left">Task Title</th>
                                <th>Needs</th>
                                <th>Payable</th>
                                <th>Created</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                            {tasks.map((task) => (
                                <tr key={task._id} className="hover:bg-green-50/30 dark:hover:bg-green-900/10 transition-colors group">
                                    <td className="py-5 px-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-600">
                                                <img src={task.task_image_url} alt="t" className="w-full h-full object-cover" />
                                            </div>
                                            <span className="font-bold text-[#333333] dark:text-white group-hover:text-[#2bb673] transition-colors">{task.task_title}</span>
                                        </div>
                                    </td>
                                    <td className="font-bold text-gray-600 dark:text-gray-400">
                                        <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-xs">{task.required_workers} workers</span>
                                    </td>
                                    <td className="font-black text-[#333333] dark:text-white">
                                        <div className="flex items-center gap-1">
                                            <span className="text-[#2bb673]">{task.payable_amount}</span>
                                            <span className="text-[10px] text-gray-400 uppercase">Coins</span>
                                        </div>
                                    </td>
                                    <td className="text-gray-400 text-sm font-medium">
                                        {new Date(task.created_at).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center gap-3">
                                            <Link to={`/dashboard/update-task/${task._id}`} className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition-all shadow-sm">
                                                <FaEdit />
                                            </Link>
                                            <button onClick={() => handleDelete(task._id)} className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {tasks.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center">
                                        <p className="text-gray-400 italic mb-6">You haven't posted any tasks yet.</p>
                                        <Link to="/dashboard/add-task" className="btn-primary">Post Your First Task</Link>
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

export default MyTasks;
