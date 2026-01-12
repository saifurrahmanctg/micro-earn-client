import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Counter = () => {
    return (
        <section className="py-24 px-4 md:px-12 bg-white flex flex-col items-center">
            <div className="max-w-5xl mx-auto bg-[#333333] rounded-[24px] overflow-hidden shadow-2xl relative w-full">
                {/* Decorative circle */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#2bb673] opacity-20 rounded-full blur-3xl"></div>
                
                <div className="px-8 md:px-20 py-16 flex flex-col items-center text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                        Ready to Start Your Journey <br/> with <span className="text-[#2bb673]">MicroEarn?</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-12 max-w-2xl">
                        Join thousands of users who are already earning and getting things done. Sign up today and get your starting coins!
                    </p>
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <Link to="/register" className="btn-primary flex items-center gap-3 px-10 h-16 rounded-[8px] text-lg">
                            Get Rewards Now <FaArrowRight />
                        </Link>
                        <span className="text-gray-500 font-bold uppercase tracking-widest text-sm">Or</span>
                        <Link to="/login" className="text-white hover:text-[#2bb673] font-bold text-lg underline underline-offset-8 decoration-[#2bb673] decoration-2">
                            Explore Marketplace
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Counter;
