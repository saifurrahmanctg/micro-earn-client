import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaHome, FaTasks, FaList, FaUserEdit, FaPlusCircle, FaHistory, FaCheckCircle, FaUsers, FaCoins, FaSignOutAlt, FaBell, FaBars, FaTimes, FaCog, FaUser } from "react-icons/fa";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useState, useRef, useEffect } from "react";
import ScrollToTop from "../components/Shared/ScrollToTop";
import ThemeToggle from "../components/Shared/ThemeToggle";

const DashboardLayout = () => {
    const [role, isRoleLoading] = useRole();
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [showNotifications, setShowNotifications] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const notificationRef = useRef(null);
    const mainContentRef = useRef(null);

    const { data: userData } = useQuery({
        queryKey: [user?.email, 'coins'],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    const { data: notifications = [] } = useQuery({
        queryKey: [user?.email, 'notifications'],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/notifications/${user.email}`);
            return res.data;
        },
        refetchInterval: 30000 // Refetch every 30 seconds
    });

    // Close notification popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };

        if (showNotifications) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showNotifications]);

    const handleLogOut = () => {
        logOut().then(() => navigate('/'));
    }

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    if (isRoleLoading) return <div className="h-screen flex items-center justify-center font-bold text-2xl">Loading...</div>

    return (
        <div className="flex h-screen bg-[#f9f9f9] dark:bg-gray-900 relative">
            {/* Sidebar Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={closeSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#333333] text-white flex flex-col transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                    <NavLink to="/" className="text-2xl font-bold tracking-tight">Micro<span className="text-[#2bb673]">Earn</span></NavLink>
                    <button onClick={closeSidebar} className="lg:hidden text-white/50 hover:text-white transition-colors">
                        <FaTimes className="text-xl" />
                    </button>
                </div>

                <div className="flex-grow p-4 mt-6 overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                        {/* Common Home */}
                        <li>
                            <NavLink
                                to="/dashboard"
                                end
                                onClick={closeSidebar}
                                className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? 'bg-[#2bb673] text-white shadow-lg' : 'hover:bg-white/5 text-gray-400'}`}
                            >
                                <FaHome /> Dashboard Home
                            </NavLink>
                        </li>
                        {/* Worker Routes */}
                        {role === 'worker' && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/worker-tasks" onClick={closeSidebar} className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? 'bg-[#2bb673] text-white shadow-lg' : 'hover:bg-white/5 text-gray-400'}`}>
                                        <FaTasks /> Task List
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/my-submissions" onClick={closeSidebar} className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? 'bg-[#2bb673] text-white shadow-lg' : 'hover:bg-white/5 text-gray-400'}`}>
                                        <FaList /> My Submissions
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/withdraw" onClick={closeSidebar} className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? 'bg-[#2bb673] text-white shadow-lg' : 'hover:bg-white/5 text-gray-400'}`}>
                                        <FaCoins /> Withdraw
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* Buyer Routes */}
                        {role === 'buyer' && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/add-task" onClick={closeSidebar} className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? 'bg-[#2bb673] text-white shadow-lg' : 'hover:bg-white/5 text-gray-400'}`}>
                                        <FaPlusCircle /> Add New Task
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/my-tasks" onClick={closeSidebar} className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? 'bg-[#2bb673] text-white shadow-lg' : 'hover:bg-white/5 text-gray-400'}`}>
                                        <FaList /> My Tasks
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/purchase-coins" onClick={closeSidebar} className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? 'bg-[#2bb673] text-white shadow-lg' : 'hover:bg-white/5 text-gray-400'}`}>
                                        <FaCoins /> Purchase Coins
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/payment-history" onClick={closeSidebar} className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? 'bg-[#2bb673] text-white shadow-lg' : 'hover:bg-white/5 text-gray-400'}`}>
                                        <FaHistory /> Payment History
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* Admin Routes */}
                        {role === 'admin' && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/manage-users" onClick={closeSidebar} className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? 'bg-[#2bb673] text-white shadow-lg' : 'hover:bg-white/5 text-gray-400'}`}>
                                        <FaUsers /> Manage Users
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manage-tasks" onClick={closeSidebar} className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? 'bg-[#2bb673] text-white shadow-lg' : 'hover:bg-white/5 text-gray-400'}`}>
                                        <FaTasks /> Manage Tasks
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                <div className="p-4 border-t border-gray-700 space-y-2">
                    <NavLink
                        to="/dashboard/profile"
                        onClick={closeSidebar}
                        className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? 'bg-[#2bb673] text-white shadow-lg' : 'hover:bg-white/5 text-gray-400'}`}
                    >
                        <FaUser /> My Profile
                    </NavLink>
                    <NavLink
                        to="/dashboard/settings"
                        onClick={closeSidebar}
                        className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? 'bg-[#2bb673] text-white shadow-lg' : 'hover:bg-white/5 text-gray-400'}`}
                    >
                        <FaCog /> Settings
                    </NavLink>
                    <button onClick={handleLogOut} className="flex items-center gap-3 p-3 w-full text-left text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
                        <FaSignOutAlt /> Sign Out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden w-full">
                {/* Dashboard Header */}
                {/* Dashboard Header */}
                <header className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 h-20 flex items-center justify-between px-4 md:px-8 shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden w-10 h-10 flex items-center justify-center bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all border border-gray-100 dark:border-gray-600"
                        >
                            <FaBars />
                        </button>
                        <h2 className="text-lg md:text-xl font-bold text-[#333333] dark:text-white capitalize truncate">{role} Panel</h2>
                    </div>

                    <div className="flex items-center gap-3 md:gap-6">
                        <ThemeToggle />
                        <div className="flex items-center gap-2 md:gap-3 bg-[#f9f9f9] dark:bg-gray-700 px-3 md:px-4 py-2 rounded-full border border-gray-100 dark:border-gray-600 shadow-sm shrink-0">
                            <FaCoins className="text-yellow-500 text-sm md:text-base" />
                            <span className="font-black text-[#333333] dark:text-white text-sm md:text-base">{userData?.coins || 0}</span>
                            <span className="hidden sm:inline text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Coins</span>
                        </div>


                        <div className="relative" ref={notificationRef}>
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="relative group cursor-pointer"
                            >
                                <FaBell className="text-gray-400 group-hover:text-[#2bb673] transition-colors text-xl" />
                                {notifications.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                                        {notifications.length > 9 ? '9+' : notifications.length}
                                    </span>
                                )}
                            </button>

                            {/* Notification Popup */}
                            {showNotifications && (
                                <div className="absolute right-0 mt-4 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
                                    <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                                        <h3 className="font-bold text-[#333333] dark:text-gray-100">Notifications</h3>
                                    </div>
                                    {notifications.length === 0 ? (
                                        <div className="p-8 text-center text-gray-400">
                                            <FaBell className="mx-auto text-4xl mb-2 opacity-20" />
                                            <p>No notifications yet</p>
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-gray-50">
                                            {notifications.map((notification, index) => (
                                                <div key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                                                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">{notification.message}</p>
                                                    <p className="text-xs text-gray-400">
                                                        {new Date(notification.time).toLocaleDateString()} at {new Date(notification.time).toLocaleTimeString()}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>



                        <div className="flex items-center gap-3 pl-6 border-l border-gray-100 dark:border-gray-700">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-[#333333] dark:text-gray-100">{user?.displayName}</p>
                                <p className="text-[10px] text-[#2bb673] uppercase font-bold">{role}</p>
                            </div>
                            <div className="w-10 h-10 rounded-lg border-2 border-[#2bb673] p-0.5 overflow-hidden">
                                <img src={user?.photoURL} alt="p" className="w-full h-full object-cover rounded-[4px]" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 overflow-y-auto p-8" ref={mainContentRef}>
                    <Outlet />
                    <ScrollToTop containerRef={mainContentRef} />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
