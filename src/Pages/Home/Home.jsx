import Hero from "./Hero";
import BestWorkers from "./BestWorkers";
import Testimonials from "./Testimonials";
import Features from "./Features";
import Counter from "./Counter";
import Stats from "./Stats";

const Home = () => {
    return (
        <div className="bg-white dark:bg-gray-900 overflow-hidden">
            <Hero />
            <Features />
            <BestWorkers />
            <Stats />
            <Testimonials />
            <Counter />
        </div>
    );
};

export default Home;
