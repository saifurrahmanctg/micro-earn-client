import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
    const { signIn, googleSignIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/dashboard";

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: error.message
                });
            });
    };

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(res => {
                // Post user to DB if new
                const userInfo = {
                    email: res.user?.email,
                    name: res.user?.displayName,
                    photo_url: res.user?.photoURL,
                    role: 'worker' // Default role for social login if not exists
                }
                // (Server handles existing user check)
                navigate(from, { replace: true });
            })
    }

    return (
        <div className="min-h-[90vh] flex items-center justify-center bg-[#f9f9f9] px-4 py-20">
            <div className="max-w-md w-full bg-white p-10 rounded-[12px] shadow-premium border border-gray-100">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-[#333333] mb-3 leading-tight">Welcome Back</h2>
                    <p className="text-gray-500 font-medium">Log in to your MicroEarn account</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2 uppercase tracking-tight">Email Address</label>
                        <div className="relative group">
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2bb673] transition-colors" />
                            <input 
                                type="email" 
                                name="email"
                                required
                                className="w-full pl-12 pr-4 py-4 bg-[#f9f9f9] border border-gray-100 rounded-[8px] focus:outline-none focus:border-[#2bb673] transition-all font-medium text-gray-800"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-bold text-gray-700 block uppercase tracking-tight">Password</label>
                            <a href="#" className="text-xs font-bold text-[#2bb673] hover:underline">Forgot?</a>
                        </div>
                        <div className="relative group">
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2bb673] transition-colors" />
                            <input 
                                type="password" 
                                name="password"
                                required
                                className="w-full pl-12 pr-4 py-4 bg-[#f9f9f9] border border-gray-100 rounded-[8px] focus:outline-none focus:border-[#2bb673] transition-all font-medium text-gray-800"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full btn-primary h-14 rounded-[8px] text-lg mt-4">
                        Sign In
                    </button>
                    
                    <div className="divider text-gray-400 text-xs font-bold uppercase tracking-widest my-8">Or Continue With</div>

                    <button 
                        type="button" 
                        onClick={handleGoogleLogin}
                        className="w-full h-14 bg-white border border-gray-100 rounded-[8px] flex items-center justify-center gap-3 hover:bg-gray-50 transition-all font-bold text-[#333333]"
                    >
                        <FaGoogle className="text-red-500" /> Google
                    </button>

                    <p className="text-center mt-10 text-gray-500 font-medium">
                        Don't have an account? <Link to="/register" className="text-[#2bb673] font-bold hover:underline">Register now</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
