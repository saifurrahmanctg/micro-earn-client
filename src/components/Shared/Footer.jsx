import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-[#333333] text-white pt-16 pb-8 px-4 md:px-12 border-t border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-1">
                    <Link to="/" className="text-3xl font-bold tracking-tight mb-6 block">Micro<span className="text-[#2bb673]">Earn</span></Link>
                    <p className="text-gray-400 leading-relaxed mb-6">
                        The ultimate destination for micro-tasking. Post tasks to get things done or earn money by completing them.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-[#2bb673] transition-colors bg-white/5 p-3 rounded-full"><FaFacebook /></a>
                        <a href="#" className="hover:text-[#2bb673] transition-colors bg-white/5 p-3 rounded-full"><FaTwitter /></a>
                        <a href="#" className="hover:text-[#2bb673] transition-colors bg-white/5 p-3 rounded-full"><FaLinkedin /></a>
                        <a href="#" className="hover:text-[#2bb673] transition-colors bg-white/5 p-3 rounded-full"><FaGithub /></a>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-6 text-[#2bb673]">Quick Links</h3>
                    <ul className="space-y-3 text-gray-400">
                        <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                        <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
                        <li><Link to="/register" className="hover:text-white transition-colors">Register</Link></li>
                        <li><a href="https://github.com/saifurrahmanctg/micro-earn-client.git" className="hover:text-white transition-colors">Join as Developer</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-6 text-[#2bb673]">For Users</h3>
                    <ul className="space-y-3 text-gray-400">
                        <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                        <li><Link to="/register" className="hover:text-white transition-colors">Start Earning</Link></li>
                        <li><Link to="/register" className="hover:text-white transition-colors">Post a Task</Link></li>
                        <li><Link to="/" className="hover:text-white transition-colors">Security</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-6 text-[#2bb673]">Newsletter</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">Subscribe to get the latest tasks and updates in your inbox.</p>
                    <div className="join w-full">
                        <input className="input input-bordered join-item bg-white/5 border-gray-600 focus:border-[#2bb673] w-full" placeholder="Email Address"/>
                        <button className="btn btn-primary join-item">Join</button>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 pt-8 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} MicroEarn. All rights reserved by Saifur Rahman.</p>
            </div>
        </footer>
    );
};

export default Footer;
