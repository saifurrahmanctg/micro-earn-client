import { useNavigate } from "react-router-dom";
import { FaGem, FaCheck, FaCrown } from "react-icons/fa";

const PurchaseCoins = () => {
    const navigate = useNavigate();

    const coinPackages = [
        { coins: 10, price: 1, label: "Starter" },
        { coins: 150, price: 10, label: "Growth", popular: true },
        { coins: 500, price: 20, label: "Professional" },
        { coins: 1000, price: 35, label: "Business" },
    ];

    return (
        <div className="fade-in">
            <div className="mb-12 text-center">
                <h2 className="text-4xl font-black text-[#333333] dark:text-white mb-3">Refill Your <span className="text-[#2bb673]">Dashboard</span></h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">Choose a package to post more tasks and grow your community</p>
                <div className="w-24 h-1.5 bg-[#2bb673] mx-auto rounded-full mt-6 opacity-30"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {coinPackages.map((pkg, index) => (
                    <div
                        key={index}
                        className={`bg-white dark:bg-gray-800 rounded-2xl border ${pkg.popular ? 'border-[#2bb673] ring-4 ring-green-50 dark:ring-green-900/40 scale-105' : 'border-gray-100 dark:border-gray-700'} p-8 shadow-premium relative flex flex-col items-center text-center transition-all hover:-translate-y-2`}
                    >
                        {pkg.popular && (
                            <div className="absolute -top-4 bg-[#2bb673] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2">
                                <FaCrown /> Most Popular
                            </div>
                        )}

                        <div className={`w-16 h-16 rounded-2xl ${pkg.popular ? 'bg-[#2bb673] text-white shadow-lg shadow-green-200 dark:shadow-none' : 'bg-gray-50 dark:bg-gray-700 text-[#2bb673]'} flex items-center justify-center text-2xl mb-6`}>
                            <FaGem />
                        </div>

                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">{pkg.label}</h3>
                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-4xl font-black text-[#333333] dark:text-white">{pkg.coins}</span>
                            <span className="text-xs font-bold text-gray-400 uppercase">Coins</span>
                        </div>

                        <div className="w-full space-y-4 mb-8">
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 font-medium">
                                <FaCheck className="text-[#2bb673]" /> Post Premium Tasks
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 font-medium">
                                <FaCheck className="text-[#2bb673]" /> Verified Workers only
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 font-medium">
                                <FaCheck className="text-[#2bb673]" /> Priority Support
                            </div>
                        </div>

                        <div className="mt-auto w-full">
                            <button
                                onClick={() => navigate(`/dashboard/payment?coins=${pkg.coins}&price=${pkg.price}`)}
                                className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${pkg.popular ? 'bg-[#2bb673] text-white shadow-xl hover:shadow-green-200' : 'bg-[#333333] text-white hover:bg-black'}`}
                            >
                                Buy for ${pkg.price}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 bg-white dark:bg-gray-800 p-10 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-premium flex flex-col md:flex-row items-center justify-between gap-8 transition-colors duration-300">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-[#2bb673] text-2xl">
                        <FaGem />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-[#333333] dark:text-white">Need a Custom Package?</h4>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Contact our enterprise sales for bulk coin purchases and API access.</p>
                    </div>
                </div>
                <button className="px-8 py-4 border-2 border-[#2bb673] text-[#2bb673] font-black uppercase tracking-widest rounded-xl hover:bg-[#2bb673] hover:text-white transition-all">
                    Contact Sales
                </button>
            </div>
        </div>
    );
};

export default PurchaseCoins;
