import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaClock, FaCalendarAlt, FaDollarSign, FaBolt } from "react-icons/fa";
import { Link } from "react-router-dom";

const WorkerTasks = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [minReward, setMinReward] = useState('');
    const [maxReward, setMaxReward] = useState('');

    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ['worker-tasks', search, sort, minReward, maxReward],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tasks?search=${search}&sort=${sort}&minReward=${minReward}&maxReward=${maxReward}`);
            return res.data;
        }
    });

    if (isLoading) return <div className="p-10 text-center font-bold text-[#2bb673]">Browsing Marketplace...</div>

    return (
        <div className="fade-in px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h2 className="text-4xl font-black text-[#333333] dark:text-white mb-2 tracking-tight">Task <span className="text-[#2bb673]">Marketplace</span></h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Browse and complete micro-tasks to earn real coins</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Search tasks by title..."
                            className="bg-white dark:bg-gray-800 border-2 border-gray-50 dark:border-gray-700 px-6 py-4 rounded-xl focus:outline-none focus:border-[#2bb673] shadow-sm font-semibold w-full sm:w-72 transition-all dark:text-gray-200"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select
                        className="bg-white dark:bg-gray-800 border-2 border-gray-50 dark:border-gray-700 px-6 py-4 rounded-xl focus:outline-none focus:border-[#2bb673] shadow-sm font-black text-[#333333] dark:text-gray-200 appearance-none cursor-pointer transition-all"
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="">Sort By Payment</option>
                        <option value="asc">Pay: Low to High</option>
                        <option value="desc">Pay: High to Low</option>
                    </select>

                    <input
                        type="number"
                        placeholder="Min Reward"
                        className="bg-white dark:bg-gray-800 border-2 border-gray-50 dark:border-gray-700 px-4 py-4 rounded-xl focus:outline-none focus:border-[#2bb673] shadow-sm font-semibold w-28 transition-all dark:text-gray-200"
                        onChange={(e) => setMinReward(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Max Reward"
                        className="bg-white dark:bg-gray-800 border-2 border-gray-50 dark:border-gray-700 px-4 py-4 rounded-xl focus:outline-none focus:border-[#2bb673] shadow-sm font-semibold w-28 transition-all dark:text-gray-200"
                        onChange={(e) => setMaxReward(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tasks.map((task) => (
                    <div key={task._id} className="bg-white dark:bg-gray-800 group rounded-2xl border border-gray-100 dark:border-gray-700 shadow-premium hover:shadow-2xl hover:border-[#2bb673] transition-all duration-500 flex flex-col overflow-hidden">
                        {/* Task Image */}
                        <div className="relative h-56 overflow-hidden">
                            <img src={task.task_image_url} alt={task.task_title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#2bb673] px-4 py-2 rounded-xl text-[10px] font-black shadow-xl flex items-center gap-2 border border-green-50">
                                <FaBolt className="animate-pulse" /> ACTIVE
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 flex-grow flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-black text-[#333333] dark:text-gray-100 group-hover:text-[#2bb673] transition-colors leading-none tracking-tight">
                                    {task.task_title}
                                </h3>
                            </div>

                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 font-medium line-clamp-2 leading-relaxed">
                                {task.task_detail}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-[#fcfdfc] dark:bg-gray-700 p-4 rounded-2xl border border-green-50/50 dark:border-gray-600 flex flex-col">
                                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Reward</span>
                                    <div className="flex items-center gap-1 text-[#2bb673] font-black text-xl">
                                        <FaDollarSign className="text-sm" />
                                        <span>{task.payable_amount}</span>
                                    </div>
                                </div>
                                <div className="bg-[#fcfdfc] dark:bg-gray-700 p-4 rounded-2xl border border-green-50/50 dark:border-gray-600 flex flex-col">
                                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Slots Left</span>
                                    <span className="text-[#333333] dark:text-white font-black text-xl">{task.required_workers}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50 dark:border-gray-700 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-[#2bb673]" />
                                    <span>{new Date(task.completion_date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaClock className="text-[#2bb673]" />
                                    <span className="truncate max-w-[80px]">{task.buyer_name}</span>
                                </div>
                            </div>
                        </div>

                        <div className="px-8 pb-8">
                            <Link
                                to={`/dashboard/task-details/${task._id}`}
                                className="w-full bg-[#333333] group-hover:bg-[#2bb673] py-4 rounded-xl text-center font-black text-white text-sm uppercase tracking-widest transition-all shadow-lg hover:shadow-green-200"
                            >
                                Start Working
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {tasks.length === 0 && (
                <div className="py-24 text-center bg-white dark:bg-gray-800 rounded-3xl border-2 border-dashed border-gray-100 dark:border-gray-700">
                    <div className="bg-gray-50 dark:bg-gray-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaSearch className="text-gray-300 dark:text-gray-500 text-2xl" />
                    </div>
                    <h3 className="text-2xl font-black text-[#333333] dark:text-white mb-2">No Tasks Found</h3>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Try adjusting your search or filters to find more opportunities.</p>
                </div>
            )}
        </div>
    );
};

export default WorkerTasks;
