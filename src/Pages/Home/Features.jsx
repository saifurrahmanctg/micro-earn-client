import { FaRegUser, FaTasks, FaRegCreditCard } from "react-icons/fa";

const Features = () => {
    const steps = [
        {
            icon: <FaRegUser />,
            title: "Create Account",
            desc: "Register as a Worker to earn or as a Buyer to post tasks. Get free coins on sign up!"
        },
        {
            icon: <FaTasks />,
            title: "Manage Tasks",
            desc: "Workers pick tasks from the marketplace. Buyers create tasks with specific proofs required."
        },
        {
            icon: <FaRegCreditCard />,
            title: "Get Paid",
            desc: "Earnings are secured. Withdraw your coins as real dollars or purchase more to post more tasks."
        }
    ];

    return (
        <section className="py-24 px-4 md:px-12 bg-white dark:bg-gray-900 flex flex-col items-center">
            <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                            <div className="w-20 h-20 bg-[#f9f9f9] dark:bg-gray-800 group-hover:bg-[#2bb673] group-hover:text-white transition-all duration-300 rounded-full flex items-center justify-center text-3xl text-[#2bb673] mb-8 shadow-sm">
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-[#333333] dark:text-white mb-4">{step.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">{step.desc}</p>
                            {index !== steps.length - 1 && (
                                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 transform translate-x-12">
                                    {/* Arrow could go here */}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
