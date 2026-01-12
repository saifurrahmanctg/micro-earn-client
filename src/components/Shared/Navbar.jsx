import { Link, NavLink } from "react-router-dom";
import { FaGithub, FaCoins, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: userData } = useQuery({
        queryKey: [user?.email, 'navbar-coins'],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    const handleLogout = () => {
        logOut();
    };

    const navLinks = (
        <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? "text-[#2bb673] underlinedecoration" : "hover:text-[#2bb673]"}>Home</NavLink></li>
            {user && <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-[#2bb673]" : "hover:text-[#2bb673]"}>Dashboard</NavLink></li>}
            <li><a href="https://github.com/saifurrahmanctg/micro-earn-client.git" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#2bb673]"><FaGithub /> Join as Developer</a></li>
        </>
    );

    return (
        <div className="navbar bg-white/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-gray-100 px-4 md:px-12 transition-all duration-300">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden text-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52 text-gray-800">
                        {navLinks}
                    </ul>
                </div>
                <Link to="/" className="flex items-center gap-0 group">
                    <span className="flex items-center"><img src="/microearn-icon.png" className="w-6" alt="" /></span>
                    <span className="text-2xl font-bold text-[#333333] tracking-tight group-hover:text-[#2bb673] transition-colors">icro<span className="text-[#2bb673]">Earn</span></span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-6 text-gray-700 font-medium">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end gap-4">
                {user ? (
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 bg-[#f9f9f9] px-4 py-2 rounded-full border border-gray-100">
                            <FaCoins className="text-yellow-500" />
                            <span className="font-bold text-[#333333]">{userData?.coins || 0}</span>
                        </div>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-[#2bb673]">
                                <div className="w-10 rounded-full">
                                    <img src={user.photoURL || "https://i.ibb.co/L8090mG/p1.jpg"} alt="profile" />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-xl bg-white border border-gray-100 rounded-xl w-56 text-gray-800">
                                <li className="mb-2 p-2 border-b border-gray-50">
                                    <span className="font-bold block">{user.displayName}</span>
                                    <span className="text-xs text-[#2bb673] uppercase">{userData?.role || 'Worker'}</span>
                                </li>
                                <li><Link to="/dashboard" className="flex items-center gap-2"><FaTachometerAlt /> Dashboard</Link></li>
                                <li><button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:bg-red-50"><FaSignOutAlt /> Logout</button></li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Link to="/login" className="btn btn-ghost text-gray-700 hover:text-[#2bb673]">Login</Link>
                        <Link to="/register" className="btn-primary">Register</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
