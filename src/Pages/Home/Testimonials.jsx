import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
    const reviews = [
        {
            name: "Robert Fox",
            role: "Full-stack Developer",
            quote: "This platform changed my life. I started as a worker and now I complete tasks part-time. The payment system is incredibly fast and reliable.",
            image: "/profile_worker_1_1767692964486.png"
        },
        {
            name: "Bessie Cooper",
            role: "Social Media Manager",
            quote: "Finding people to help with my YouTube channel was never easier. MicroEarn provides high-quality workers for every task I post.",
            image: "/profile_worker_2_1767692992814.png"
        },
        {
            name: "Marvin McKinney",
            role: "Content Creator",
            quote: "I love the dashboard interface. It's clean, simple, and the notification system keeps me updated on all my task reviews. Five stars!",
            image: "/profile_worker_3_1767693016861.png"
        },
        {
            name: "Jane Cooper",
            role: "Digital Marketer",
            quote: "The best marketplace for micro-tasks. I've scaled my SEO business significantly by outsourcing small tasks through this platform.",
            image: "/profile_worker_2_1767692992814.png"
        },
        {
            name: "Guy Hawkins",
            role: "Graphic Designer",
            quote: "Easy to use, great support, and most importantly, a steady stream of work for skilled individuals. Highly recommended!",
            image: "/profile_worker_1_1767692964486.png"
        },
        {
            name: "Eleanor Pena",
            role: "Virtual Assistant",
            quote: "I've tried many platforms, but MicroEarn stands out for its transparency and the quality of tasks available. Great for supplemental income.",
            image: "/profile_worker_3_1767693016861.png"
        }
    ];

    return (
        <section className="py-24 px-4 md:px-12 bg-white">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <div className="text-center mb-16">
                    <span className="text-[#2bb673] font-bold uppercase tracking-widest text-sm mb-4 block">Success Stories</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#333333]">What Our <span className="text-[#2bb673]">Users Say</span></h2>
                </div>

                <div className="w-full">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        breakpoints={{
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 }
                        }}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 4000 }}
                        loop={true}
                        className="pb-16"
                    >
                        {reviews.map((review, index) => (
                            <SwiperSlide key={index}>
                                <div className="bg-[#f9f9f9] p-10 rounded-[12px] border border-gray-100 flex flex-col h-full relative group hover:bg-white hover:shadow-xl transition-all duration-300">
                                    <FaQuoteLeft className="text-[#2bb673] text-4xl mb-6 opacity-20" />
                                    <p className="text-gray-600 italic mb-8 leading-relaxed flex-grow">
                                        "{review.quote}"
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#2bb673]">
                                            <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#333333]">{review.name}</h4>
                                            <p className="text-[#2bb673] text-sm">{review.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
