import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { FaSearch, FaBriefcase, FaUsers, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Hero = () => {
    const slides = [
        {
            title: "Unlock Your Earning Potential",
            subtitle: "Complete micro-tasks and get paid instantly in your wallet.",
            image: "/hero_workspace_tech_1767692889831.png"
        },
        {
            title: "The Best Place to Find Reliable Workers",
            subtitle: "Post your tasks and reach thousands of skilled workers globally.",
            image: "/hero_team_collaboration_1767692916939.png"
        },
        {
            title: "Join the Future of Micro-Jobbing",
            subtitle: "Secure payments, verified workers, and seamless task management.",
            image: "/hero_digital_payment_secure_1767692942585.png"
        },
        {
            title: "Empowering Freelancers Worldwide",
            subtitle: "Work from anywhere, anytime. Your skills, your schedule.",
            image: "/hero_workspace_tech_1767692889831.png"
        },
        {
            title: "Scalable Workforce for Your Projects",
            subtitle: "Get high-quality results at a fraction of the cost.",
            image: "/hero_team_collaboration_1767692916939.png"
        },
        {
            title: "Trust and Security at Every Step",
            subtitle: "State-of-the-art fraud prevention and secure escrow payments.",
            image: "/hero_digital_payment_secure_1767692942585.png"
        }
    ];

    return (
        <section className="relative h-[85vh] md:h-[90vh]">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect="fade"
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                loop={true}
                className="h-full w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="h-full w-full flex items-center justify-center relative px-4"
                            style={{
                                background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${slide.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <div className="max-w-4xl text-center text-white fade-in">
                                <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
                                    {slide.title}
                                </h1>
                                <p className="text-lg md:text-2xl mb-10 text-gray-200 font-light max-w-2xl mx-auto">
                                    {slide.subtitle}
                                </p>

                                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                                    <Link to="/register" className="btn-primary flex items-center gap-2 group">
                                        Get Started Now <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link to="/login" className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 rounded-[4px] font-semibold transition-all">
                                        Post a Task
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Search Overlay inspired by WorkScout */}
            <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-10 px-4 hidden md:block">
                <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-2 rounded-[8px] shadow-2xl flex items-center gap-4">
                    <div className="flex-1 flex items-center gap-3 px-4 py-3 border-r border-gray-100 dark:border-gray-700">
                        <FaSearch className="text-[#2bb673]" />
                        <input type="text" placeholder="Task keywords..." className="w-full focus:outline-none text-gray-700 dark:text-gray-200 bg-transparent font-medium placeholder-gray-400" />
                    </div>
                    <div className="flex-1 flex items-center gap-3 px-4 py-3 border-r border-gray-100 dark:border-gray-700">
                        <FaBriefcase className="text-[#2bb673]" />
                        <select className="w-full focus:outline-none text-gray-700 dark:text-gray-200 bg-transparent font-medium">
                            <option className="text-gray-800">All Categories</option>
                            <option className="text-gray-800">YouTube</option>
                            <option className="text-gray-800">Social Media</option>
                            <option className="text-gray-800">App Review</option>
                        </select>
                    </div>
                    <button className="btn-primary min-h-0 h-[56px] px-10">Search</button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
