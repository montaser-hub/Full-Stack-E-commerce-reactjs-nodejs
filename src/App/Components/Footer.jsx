import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter, FaTiktok } from "react-icons/fa";
import { TiSocialGooglePlus } from "react-icons/ti";

function Footer() {
    return (
        <footer className="w-full bg-gradient-to-r from-[#f0f1f3] to-[#e6ebf1] font-sans">
            <section className="px-6 md:px-12 lg:px-24 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-extrabold text-[#3b3b3b]">WOODY</h1>
                    <p className="text-[rgb(108,184,169)] font-medium text-sm md:text-base">
                        For Natural Furniture
                    </p>
                </div>
                </div>
            </section>

            <hr className="border-[#C1C7CD]" />

            <section className="px-6 md:px-12 lg:px-24 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-[#404040] text-center md:text-left">
                <div>
                    <h3 className="font-semibold text-lg mb-3">Description</h3>
                    <p className="text-sm leading-relaxed">
                    A small team built this site for trading modern furniture which is environmentally friendly and sustainable.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold text-lg mb-3">Services</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Buy & Sell</li>
                        <li>Reservation</li>
                        <li>Return Policy</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-lg mb-3">Products</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="#" className="hover:text-[#5757e8]">Chairs</Link></li>
                        <li><Link to="#" className="hover:text-[#5757e8]">Tables</Link></li>
                        <li><Link to="#" className="hover:text-[#5757e8]">Desks</Link></li>
                        <li><Link to="#" className="hover:text-[#5757e8]">Doors</Link></li>
                        <li><Link to="#" className="hover:text-[#5757e8]">Full Rooms</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-lg mb-3">About</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="#" className="hover:text-[#5757e8]">Staff</Link></li>
                        <li><Link to="#" className="hover:text-[#5757e8]">Team</Link></li>
                        <li><Link to="#" className="hover:text-[#5757e8]">Careers</Link></li>
                        <li><Link to="#" className="hover:text-[#5757e8]">Reviews</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-lg mb-3">Customer</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="#" className="hover:text-[#5757e8]">Log in</Link></li>
                        <li><Link to="#" className="hover:text-[#5757e8]">Register</Link></li>
                        <li><Link to="#" className="hover:text-[#5757e8]">Contact Us</Link></li>
                        <li><Link to="#" className="hover:text-[#5757e8]">Help & Support</Link></li>
                    </ul>
                </div>
                </div>
            </section>


            <section className="bg-[#a7c7e5] text-[#404040] py-4 px-6 md:px-12 lg:px-24">
                <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
                    <p className="text-sm text-center md:text-left">
                        © 2025 WOODY. All rights reserved.
                    </p>
                    <div className="flex gap-5 text-2xl">
                        <Link to="#" className="hover:text-[#5757e8]"><TiSocialGooglePlus /></Link>
                        <Link to="#" className="hover:text-[#5757e8]"><FaFacebook /></Link>
                        <Link to="#" className="hover:text-[#5757e8]"><FaTwitter /></Link>
                        <Link to="#" className="hover:text-[#5757e8]"><FaInstagram /></Link>
                        <Link to="#" className="hover:text-[#5757e8]"><FaLinkedinIn /></Link>
                        <Link to="#" className="hover:text-[#5757e8]"><FaTiktok /></Link>
                    </div>
                </div>
            </section>
        </footer>
    );
}
export default Footer;