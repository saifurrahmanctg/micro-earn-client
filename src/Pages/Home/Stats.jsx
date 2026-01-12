const Stats = () => {
    return (
        <section className="py-24 px-4 md:px-12 bg-[#2bb673] relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-white relative z-10">
                <div className="text-center md:text-left flex-1">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Empowering Millions of <br className="hidden md:block"/> Workers Globally</h2>
                    <p className="text-white/80 text-lg md:text-xl max-w-xl">
                        We provide the most robust infrastructure for micro-payments and task verification in the industry.
                    </p>
                </div>
                
                <div className="grid grid-cols-2 gap-8 md:gap-16">
                    <div className="text-center">
                        <span className="text-4xl md:text-6xl font-black block mb-2">50K+</span>
                        <span className="text-white/70 uppercase tracking-widest text-xs font-bold">Active Tasks</span>
                    </div>
                    <div className="text-center">
                        <span className="text-4xl md:text-6xl font-black block mb-2">$2M+</span>
                        <span className="text-white/70 uppercase tracking-widest text-xs font-bold">Paid Out</span>
                    </div>
                    <div className="text-center">
                        <span className="text-4xl md:text-6xl font-black block mb-2">100K+</span>
                        <span className="text-white/70 uppercase tracking-widest text-xs font-bold">Workers</span>
                    </div>
                    <div className="text-center">
                        <span className="text-4xl md:text-6xl font-black block mb-2">99%</span>
                        <span className="text-white/70 uppercase tracking-widest text-xs font-bold">Satisfaction</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;
