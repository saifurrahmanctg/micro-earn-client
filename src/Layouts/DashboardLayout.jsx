import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaHome, FaTasks, FaList, FaUserEdit, FaPlusCircle, FaHistory, FaCheckCircle, FaUsers, FaCoins, FaSignOutAlt, FaBell } from "react-icons/fa";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useState, useRef, useEffect } from "react";

const DashboardLayout = () => {
    const [role, isRoleLoading] = useRole();
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef(null);

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

    if (isRoleLoading) return <div className="h-screen flex items-center justify-center font-bold text-2xl">Loading...</div>

    return (
        <div className="flex h-screen bg-[#f9f9f9]">
            {/* Sidebar */}
            <div className="w-64 bg-[#333333] text-white flex flex-col">
                <div className="p-6 border-b border-gray-700">
                    <NavLink to="/" className="text-2xl font-bold tracking-tight">Micro<span className="text-[#2bb673]">Earn</span></NavLink>
                </div>

                <div className="flex-grow p-4 mt-6">
                    <ul className="space-y-2 font-medium">
                        {/* Common Home */}
                        <li>
                            <NavLink to="/dashboard" end className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? 'bg-[#2bb673] text-white' : 'hover:bg-white/5 text-gray-400'}`}>
                                <FaHome /> Dashboard Home
                            </NavLink>
                        </li>

                        {/* Worker Routes */}
                        {role === 'worker' && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/worker-tasks" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? 'bg-[#2bb673] text-white' : 'hover:bg-white/5 text-gray-400'}`}>
                                        <FaTasks /> Task List
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/my-submissions" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? 'bg-[#2bb673] text-white' : 'hover:bg-white/5 text-gray-400'}`}>
                                        <FaList /> My Submissions
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/withdraw" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? 'bg-[#2bb673] text-white' : 'hover:bg-white/5 text-gray-400'}`}>
                                        <FaCoins /> Withdraw
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* Buyer Routes */}
                        {role === 'buyer' && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/add-task" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? 'bg-[#2bb673] text-white' : 'hover:bg-white/5 text-gray-400'}`}>
                                        <FaPlusCircle /> Add New Task
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/my-tasks" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? 'bg-[#2bb673] text-white' : 'hover:bg-white/5 text-gray-400'}`}>
                                        <FaList /> My Tasks
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/purchase-coins" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? 'bg-[#2bb673] text-white' : 'hover:bg-white/5 text-gray-400'}`}>
                                        <FaCoins /> Purchase Coins
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/payment-history" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? 'bg-[#2bb673] text-white' : 'hover:bg-white/5 text-gray-400'}`}>
                                        <FaHistory /> Payment History
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* Admin Routes */}
                        {role === 'admin' && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/manage-users" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? 'bg-[#2bb673] text-white' : 'hover:bg-white/5 text-gray-400'}`}>
                                        <FaUsers /> Manage Users
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manage-tasks" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? 'bg-[#2bb673] text-white' : 'hover:bg-white/5 text-gray-400'}`}>
                                        <FaTasks /> Manage Tasks
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                <div className="p-4 border-t border-gray-700 space-y-2">
                    <button onClick={handleLogOut} className="flex items-center gap-3 p-3 w-full text-left text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
                        <FaSignOutAlt /> Sign Out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Dashboard Header */}
                <header className="bg-white border-b border-gray-100 h-20 flex items-center justify-between px-8">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-[#333333] capitalize">{role} Panel</h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 bg-[#f9f9f9] px-4 py-2 rounded-full border border-gray-100">
                            <FaCoins className="text-yellow-500" />
                            <span className="font-bold text-[#333333]">{userData?.coins || 0}</span>
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Coins</span>
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
                                <div className="absolute right-0 mt-4 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 max-h-96 overflow-y-auto">
                                    <div className="p-4 border-b border-gray-100">
                                        <h3 className="font-bold text-[#333333]">Notifications</h3>
                                    </div>
                                    {notifications.length === 0 ? (
                                        <div className="p-8 text-center text-gray-400">
                                            <FaBell className="mx-auto text-4xl mb-2 opacity-20" />
                                            <p>No notifications yet</p>
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-gray-50">
                                            {notifications.map((notification, index) => (
                                                <div key={index} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                                                    <p className="text-sm text-gray-700 mb-1">{notification.message}</p>
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


                        <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-[#333333]">{user?.displayName}</p>
                                <p className="text-[10px] text-[#2bb673] uppercase font-bold">{role}</p>
                            </div>
                            <div className="w-10 h-10 rounded-lg border-2 border-[#2bb673] p-0.5 overflow-hidden">
                                <img src={user?.photoURL} alt="p" className="w-full h-full object-cover rounded-[4px]" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
