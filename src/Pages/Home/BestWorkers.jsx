import { FaCoins, FaMedal } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const BestWorkers = () => {
    const axiosPublic = useAxiosPublic();

    const { data: workers = [], isLoading } = useQuery({
        queryKey: ['best-workers'],
        queryFn: async () => {
            const res = await axiosPublic.get('/best-workers');
            return res.data;
        }
    });

    if (isLoading) return null;

    return (
        <section className="py-24 px-4 md:px-12 bg-[#f9f9f9] dark:bg-gray-800">
            <div className="max-w-7xl mx-auto text-center mb-16 px-4">
                <span className="text-[#2bb673] font-bold uppercase tracking-widest text-sm mb-4 block">Our Champions</span>
                <h2 className="text-4xl md:text-5xl font-bold text-[#333333] dark:text-white mb-6">Top Performing <span className="text-[#2bb673]">Workers</span></h2>
                <div className="w-24 h-1 bg-[#2bb673] mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {workers.map((worker, index) => (
                    <div
                        key={worker._id}
                        className="bg-white dark:bg-gray-700 group p-8 rounded-[12px] border border-gray-100 dark:border-gray-600 hover:border-[#2bb673] transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center shadow-sm relative overflow-hidden"
                    >
                        {/* Medal for top 3 */}
                        {index < 3 && (
                            <div className="absolute top-4 right-4 text-3xl">
                                <FaMedal className={
                                    index === 0 ? "text-yellow-400" :
                                        index === 1 ? "text-slate-400" :
                                            "text-orange-400"
                                } />
                            </div>
                        )}

                        <div className="w-24 h-24 rounded-full border-4 border-[#f9f9f9] dark:border-gray-600 group-hover:border-[#2bb673] overflow-hidden mb-6 transition-colors duration-500">
                            <img src={worker.photo_url} alt={worker.name} className="w-full h-full object-cover" />
                        </div>

                        <h3 className="text-2xl font-bold text-[#333333] dark:text-white mb-2">{worker.name}</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 font-medium uppercase tracking-tighter text-xs">Certified Pro Worker</p>

                        <div className="flex items-center gap-6">
                            <div className="flex flex-col items-center">
                                <span className="text-[#2bb673] text-2xl font-black">Pro</span>
                                <span className="text-gray-400 dark:text-gray-500 text-[10px] uppercase font-bold">Level</span>
                            </div>
                            <div className="h-10 w-px bg-gray-100 dark:bg-gray-600"></div>
                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-2 text-yellow-500">
                                    <FaCoins className="text-xl" />
                                    <span className="text-2xl font-black text-[#333333] dark:text-white">{worker.coins}</span>
                                </div>
                                <span className="text-gray-400 dark:text-gray-500 text-[10px] uppercase font-bold">Coins</span>
                            </div>
                        </div>

                        <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button className="text-[#2bb673] font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                                Top Worker <span className="text-lg">★</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BestWorkers;

