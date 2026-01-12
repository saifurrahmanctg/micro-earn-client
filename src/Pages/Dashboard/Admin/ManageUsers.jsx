import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrash, FaUserShield, FaCoins, FaUserTie, FaHardHat } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Delete User?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff7070',
            cancelButtonColor: '#333333',
            confirmButtonText: 'Yes, delete!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/users/${id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire('Deleted!', 'User has been removed.', 'success');
                }
            }
        });
    };

    const handleRoleUpdate = async (id, newRole) => {
        const res = await axiosSecure.patch(`/users/role/${id}`, { role: newRole });
        if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
                icon: 'success',
                title: 'Role Updated!',
                text: `User is now a ${newRole}.`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    if (isLoading) return <div className="p-10 text-center font-bold">Accessing User Directory...</div>

    return (
        <div className="fade-in">
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-[#333333]">Manage <span className="text-[#2bb673]">Users</span></h2>
                <p className="text-gray-500 font-medium">Platform-wide user administration and role management</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-premium overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full border-collapse">
                        <thead>
                            <tr className="bg-[#f9f9f9] text-gray-400 uppercase text-[10px] tracking-widest font-black border-b border-gray-100">
                                <th className="py-6 px-8 text-left">User Profile</th>
                                <th>Role</th>
                                <th>Coins</th>
                                <th>Update Role</th>
                                <th className="text-center px-8">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-green-50/20 transition-colors group">
                                    <td className="py-5 px-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-gray-100 p-0.5">
                                                <img src={user.photo_url} alt="u" className="w-full h-full object-cover rounded-lg" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[#333333] group-hover:text-[#2bb673] transition-colors">{user.name}</span>
                                                <span className="text-xs text-gray-400 font-medium">{user.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit flex items-center gap-2 border ${
                                            user.role === 'admin' ? 'bg-purple-100 text-purple-600 border-purple-200' :
                                            user.role === 'buyer' ? 'bg-blue-100 text-blue-600 border-blue-200' :
                                            'bg-green-100 text-green-600 border-green-200'
                                        }`}>
                                            {user.role === 'admin' ? <FaUserShield /> : user.role === 'buyer' ? <FaUserTie /> : <FaHardHat />}
                                            {user.role}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <FaCoins className="text-yellow-500 text-sm" />
                                            <span className="font-black text-[#333333]">{user.coins || 0}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <select 
                                            value={user.role}
                                            onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                                            className="px-4 py-2 bg-[#f9f9f9] border border-gray-100 rounded-lg text-xs font-bold text-[#333333] focus:outline-none focus:border-[#2bb673] shadow-sm appearance-none cursor-pointer"
                                        >
                                            <option value="worker">Worker</option>
                                            <option value="buyer">Buyer</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                    <td className="text-center px-8">
                                        <button 
                                            onClick={() => handleDelete(user._id)}
                                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
