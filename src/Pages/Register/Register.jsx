import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaEnvelope, FaLock, FaUser, FaCamera } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const onSubmit = async (data) => {
        try {
            // Upload image to imgbb
            const imageFile = { image: data.image[0] };
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: { 'content-type': 'multipart/form-data' }
            });

            if (res.data.success) {
                const photoURL = res.data.data.display_url;

                // Create user with firebase
                createUser(data.email, data.password)
                    .then(result => {
                        updateUserProfile(data.name, photoURL)
                            .then(() => {
                                const userInfo = {
                                    name: data.name,
                                    email: data.email,
                                    photo_url: photoURL,
                                    role: data.role,
                                    coins: data.role === 'worker' ? 10 : 50
                                }
                                axiosPublic.post('/users', userInfo)
                                    .then(res => {
                                        if (res.data.insertedId) {
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Registration Successful',
                                                showConfirmButton: false,
                                                timer: 1500
                                            });
                                            navigate('/dashboard');
                                        }
                                    })
                            })
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: error.message
                        });
                    });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Image Upload Failed',
                text: 'Could not upload profile picture. Please try again.'
            });
        }
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(res => {
                const userInfo = {
                    email: res.user?.email,
                    name: res.user?.displayName,
                    photo_url: res.user?.photoURL,
                    role: 'worker',
                    coins: 10
                }
                axiosPublic.post('/users', userInfo)
                    .then(() => {
                        navigate('/dashboard');
                    })
            })
    }

    return (
        <div className="min-h-[90vh] flex items-center justify-center bg-[#f9f9f9] px-4 py-20">
            <div className="max-w-xl w-full bg-white p-10 rounded-[12px] shadow-premium border border-gray-100">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-[#333333] mb-3 leading-tight">Create Account</h2>
                    <p className="text-gray-500 font-medium tracking-tight">Join the MicroEarn community today</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2 uppercase tracking-tight">Full Name</label>
                        <div className="relative group">
                            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2bb673] transition-colors" />
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                className="w-full pl-12 pr-4 py-4 bg-[#f9f9f9] border border-gray-100 rounded-[8px] focus:outline-none focus:border-[#2bb673] font-medium text-gray-800"
                                placeholder="Saifur Rahman"
                            />
                        </div>
                        {errors.name && <span className="text-red-500 text-xs">Name is required</span>}
                    </div>

                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2 uppercase tracking-tight">Email Address</label>
                        <div className="relative group">
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2bb673] transition-colors" />
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                className="w-full pl-12 pr-4 py-4 bg-[#f9f9f9] border border-gray-100 rounded-[8px] focus:outline-none focus:border-[#2bb673] font-medium text-gray-800"
                                placeholder="name@example.com"
                            />
                        </div>
                        {errors.email && <span className="text-red-500 text-xs">Email is required</span>}
                    </div>

                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2 uppercase tracking-tight">Profile Picture</label>
                        <div className="relative group">
                            <input
                                type="file"
                                {...register("image", { required: true })}
                                className="w-full pl-4 pr-4 py-3 bg-[#f9f9f9] border border-gray-100 rounded-[8px] focus:outline-none focus:border-[#2bb673] font-medium text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-bold file:bg-[#2bb673] file:text-white hover:file:bg-[#249a61] cursor-pointer"
                                accept="image/*"
                            />
                        </div>
                        {errors.image && <span className="text-red-500 text-xs">Profile Picture is required</span>}
                    </div>

                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2 uppercase tracking-tight">Account Role</label>
                        <div className="relative group">
                            <select
                                {...register("role", { required: true })}
                                className="w-full pl-4 pr-10 py-4 bg-[#f9f9f9] border border-gray-100 rounded-[8px] focus:outline-none focus:border-[#2bb673] font-bold text-[#333333] appearance-none cursor-pointer"
                            >
                                <option value="worker">Worker (Earning coins)</option>
                                <option value="buyer">Buyer (Posting tasks)</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label className="text-sm font-bold text-gray-700 block mb-2 uppercase tracking-tight">Password</label>
                        <div className="relative group">
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2bb673] transition-colors" />
                            <input
                                type="password"
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })}
                                className="w-full pl-12 pr-4 py-4 bg-[#f9f9f9] border border-gray-100 rounded-[8px] focus:outline-none focus:border-[#2bb673] font-medium text-gray-800"
                                placeholder="••••••••"
                            />
                        </div>
                        {errors.password?.type === 'required' && <p className="text-red-600 text-xs">Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-600 text-xs">Password must be 6 characters</p>}
                        {errors.password?.type === 'pattern' && <p className="text-red-600 text-xs">Password must have one uppercase, one lowercase, one number and one special character.</p>}
                    </div>

                    <div className="md:col-span-2">
                        <button type="submit" className="w-full btn-primary h-14 rounded-[8px] text-lg font-bold">
                            Create Account
                        </button>
                    </div>
                </form>

                <div className="divider text-gray-400 text-xs font-bold uppercase tracking-widest my-8">Or Join With</div>

                <div className="grid grid-cols-1 gap-4">
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full h-14 bg-white border border-gray-100 rounded-[8px] flex items-center justify-center gap-3 hover:bg-gray-50 transition-all font-bold text-[#333333]"
                    >
                        <FaGoogle className="text-red-500" /> Sign Up with Google
                    </button>
                </div>

                <p className="text-center mt-10 text-gray-500 font-medium">
                    Already have an account? <Link to="/login" className="text-[#2bb673] font-bold hover:underline transition-all">Sign in here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
