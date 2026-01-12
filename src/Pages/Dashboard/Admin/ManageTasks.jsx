import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrash, FaEye, FaTasks, FaUserClock } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageTasks = () => {
    const axiosSecure = useAxiosSecure();

    const { data: tasks = [], refetch, isLoading } = useQuery({
        queryKey: ['manage-tasks'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tasks/admin');
            return res.data;
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Delete this task?',
            text: "This will permanently remove the task platform-wide.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff7070',
            cancelButtonColor: '#333333',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/tasks/${id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire('Deleted!', 'Task has been removed successfully.', 'success');
                }
            }
        });
    };

    if (isLoading) return <div className="p-10 text-center font-bold">Scanning Global Tasks...</div>

    return (
        <div className="fade-in">
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-[#333333]">Manage <span className="text-[#2bb673]">Tasks</span></h2>
                <p className="text-gray-500 font-medium">Monitor and regulate all job postings across the MicroEarn marketplace</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-premium overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full border-collapse">
                        <thead>
                            <tr className="bg-[#f9f9f9] text-gray-400 uppercase text-[10px] tracking-widest font-black border-b border-gray-100">
                                <th className="py-6 px-8 text-left">Task Identification</th>
                                <th>Buyer Info</th>
                                <th>Needs</th>
                                <th>Pay per Task</th>
                                <th className="text-center px-8">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {tasks.map((task) => (
                                <tr key={task._id} className="hover:bg-green-50/20 transition-colors group">
                                    <td className="py-6 px-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                                                <img src={task.task_image_url} alt="t" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[#333333] group-hover:text-[#2bb673] transition-colors leading-tight">{task.task_title}</span>
                                                <span className="text-[10px] font-black text-gray-400 uppercase mt-1">ID: {task._id.slice(-8)}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-gray-600">{task.buyer_name}</span>
                                            <span className="text-[10px] font-medium text-gray-400">{task.buyer_email}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2 text-sm font-bold text-[#333333]">
                                            <FaUserClock className="text-[#2bb673]" />
                                            <span>{task.required_workers}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-lg font-black text-[#2bb673] flex items-baseline gap-1">
                                            {task.payable_amount}
                                            <span className="text-[10px] text-gray-400 uppercase font-black">Coins</span>
                                        </div>
                                    </td>
                                    <td className="text-center px-8">
                                        <div className="flex items-center justify-center gap-3">
                                            <button 
                                                onClick={() => handleDelete(task._id)}
                                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {tasks.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center">
                                        <p className="text-gray-400 italic">No tasks found in the database.</p>
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

export default ManageTasks;
