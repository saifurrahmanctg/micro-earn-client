import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow pt-20">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
