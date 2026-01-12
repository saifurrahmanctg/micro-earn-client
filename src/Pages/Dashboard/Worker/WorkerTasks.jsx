import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaClock, FaCalendarAlt, FaDollarSign, FaBolt } from "react-icons/fa";
import { Link } from "react-router-dom";

const WorkerTasks = () => {
    const axiosSecure = useAxiosSecure();

    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ['worker-tasks'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tasks');
            return res.data;
        }
    });

    if (isLoading) return <div className="p-10 text-center font-bold">Browsing Marketplace...</div>

    return (
        <div className="fade-in">
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-[#333333] mb-2">Available <span className="text-[#2bb673]">Micro-Tasks</span></h2>
                <p className="text-gray-500 font-medium">Browse and complete tasks to grow your digital wallet</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tasks.map((task) => (
                    <div key={task._id} className="bg-white group rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#2bb673] transition-all duration-300 flex flex-col overflow-hidden">
                        {/* Task Image */}
                        <div className="relative h-48 overflow-hidden">
                            <img src={task.task_image_url} alt={task.task_title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute top-4 right-4 bg-[#2bb673] text-white px-3 py-1 rounded-full text-xs font-black shadow-lg flex items-center gap-1">
                                <FaBolt /> INSTANT
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-grow flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-[#333333] group-hover:text-[#2bb673] transition-colors leading-tight">
                                    {task.task_title}
                                </h3>
                            </div>
                            
                            <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                                {task.task_detail}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-[#f9f9f9] p-3 rounded-lg flex flex-col">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Worker Pay</span>
                                    <div className="flex items-center gap-1 text-[#2bb673] font-black">
                                        <FaDollarSign className="text-xs" />
                                        <span>{task.payable_amount}</span>
                                    </div>
                                </div>
                                <div className="bg-[#f9f9f9] p-3 rounded-lg flex flex-col">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Slots Left</span>
                                    <span className="text-[#333333] font-black">{task.required_workers}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-[#2bb673]" />
                                    <span>Due: {new Date(task.completion_date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaClock className="text-[#2bb673]" />
                                    <span>{task.buyer_name}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-[#f9f9f9] group-hover:bg-[#2bb673] transition-colors">
                            <Link 
                                to={`/dashboard/task-details/${task._id}`} 
                                className="w-full block text-center font-bold text-gray-500 group-hover:text-white transition-colors"
                            >
                                View Details & Work
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {tasks.length === 0 && (
                <div className="py-20 text-center bg-white rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-400 font-bold text-xl">No tasks available in the marketplace right now.</p>
                    <p className="text-gray-400">Check back soon for new opportunities!</p>
                </div>
            )}
        </div>
    );
};

export default WorkerTasks;
