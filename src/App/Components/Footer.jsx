// import { Link } from "react-router-dom";
// import { CgMail } from "react-icons/cg";
// import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";


// function Footer () {
//     return (

//         <div className="fixed bottom-0 left-0 w-full px-[5rem] bg-[#516273] font-sans">
//             <section className="py-2">
//                 <div className="container mx-auto px-4">
//                 <div className="flex flex-col md:flex-row justify-between items-center">
//                 <div className="mb-2 md:mb-0">
//                     <h1 className="text-2xl font-bold text-gray-800 inline">4F</h1>
//                     <p className="font-semibold text-[rgb(140,205,192)] inline">For furniture</p>
//                 </div>
            
//                 <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
//                 <div className="flex  rounded overflow-hidden gap-x-8">
//                 <div className="flex border border-gray-300 rounded overflow-hidden ">
//                     <span className="flex items-center justify-center px-3 bg-gray-100 text-gray-500">
//                         <CgMail className="w-5 h-5" />
//                     </span>
//                     <input
//                         type="email"
//                         placeholder="Enter your email to get the latest news..."
//                         className="w-80 px-2 py-2 outline-none flex-grow"
//                     />
//                 </div>
//                 <button className="bg-[#8C8C8C] text-white px-4 py-2 hover:bg-[#6f6f6f] transition-colors">
//                     Subscribe
//                 </button>
//                 </div>
//                 </div>
//                 </div>
//                 </div>
//             </section> 

//             <hr className="border-[#C1C7CD]"/>

//             <section className="container mx-auto px-4 py-2">
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-2 text-white">
//                     <div>
//                         {/* <h3 className="font-semibold text-lg mb-2">Column One</h3> */}
//                         <ul className="space-y-2">
//                             <li>Home</li>
//                             <li>WishList</li>
//                             <li>Cart</li>
//                             <li>Your Order</li>
//                         </ul>
//                     </div>
//                     <div>
//                         {/* <h3 className="font-semibold text-lg mb-2">Column Two</h3> */}
//                         <ul className="space-y-2">
//                             <li>Living Room</li>
//                             <li>Kitchen</li>
//                             <li>furniture</li>
//                             <li>Bed Room</li>
//                         </ul>
//                     </div>
//                     <div>
//                         {/* <h3 className="font-semibold text-lg mb-2">Column Three</h3> */}
//                         <ul className="space-y-2">
//                             <li>Sign Up</li>
//                             <li>Sign In</li>
//                         </ul>
//                     </div>
//                     <div>
//                         <h3 className="font-semibold text-lg mb-2">Our Community</h3>
//                         <div className="flex gap-4">
//                             <Link to="#" className="flex items-center bg-black text-white p-2 rounded-lg">
//                                 <img src="/AppStore.png" alt="Download on the App Store" className="h-10 mr-2" />
//                             </Link>
//                             <Link to="#" className="flex items-center bg-black text-white p-2 rounded-lg">
//                                 <img src="./GooglePlay.png" alt="GET IT ON Google Play" className="h-10 mr-2" />
//                             </Link>
//                         </div>
//                         <h4 className="font-semibold text-lg mt-2 mb-2">Join Us</h4>
//                         <div className="flex gap-4 text-white text-2xl ">
//                             <Link className="hover:text-yellow-300" to="#"><FaYoutube /></Link>
//                             <Link className="hover:text-yellow-300" to="#"><FaFacebook /></Link>
//                             <Link className="hover:text-yellow-300" to="#"><FaTwitter /></Link>
//                             <Link className="hover:text-yellow-300" to="#"><FaInstagram /></Link>
//                             <Link className="hover:text-yellow-300" to="#"><FaLinkedinIn /></Link>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <hr className="border-[#C1C7CD]"/>

//             <section className="text-white py-2">
//                 <div className="container mx-auto px-4">
//                     <div className="flex flex-col md:flex-row justify-between items-center">
//                     <p className="mb-2 md:mb-0">CompanyName @ 202X. All rights reserved.</p>
//                     <div className="flex space-x-4">
//                     <Link to="#" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
//                     <Link to="#" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
//                     <Link to="#" className="hover:text-gray-300 transition-colors">Contact Us</Link>
//                     </div>
//                     </div>
//                 </div>
//             </section>
//         </div>

//     );
// };

// export default Footer;

import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter,FaTiktok } from "react-icons/fa";
import { TiSocialGooglePlus } from "react-icons/ti";



function Footer () {
    return (

        <div className="fixed bottom-0 left-0 w-full px-[5rem] bg-[rgb(240,241,243)] font-sans">
            <section className="py-2">
                <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-2 md:mb-0">
                    <h1 className="text-2xl font-bold text-[#3b3b3b] inline">WOODY</h1>
                    <p className="font-semibold text-[rgb(108,184,169)] inline">   For Natural Furniture</p>
                </div>
            
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">

                </div>
                </div>
                </div>
            </section> 

            <hr className="border-[#C1C7CD]"/>

            <section className="container mx-auto px-4 py-2">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-2 text-[#404040]">
                    <div>
                        <h3 className="font-semibold text-lg mb-2">description</h3>
                        <p>A small team build this site for trading modern furniture which Environmentally Friendly</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Services</h3>
                        <ul className="space-y-2">
                            <li>Buy & Sell</li>
                            <li>reservation</li>
                            <li>Return Policy</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Products</h3>
                        <ul className="space-y-2">
                            <li><Link to="#" className="hover:text-[#5757e8] transition-colors">Chairs</Link></li>
                            <li><Link to="#" className="hover:text-[#5757e8] transition-colors">Tables</Link></li>
                            <li><Link to="#" className="hover:text-[#5757e8] transition-colors">Desks</Link></li>
                            <li><Link to="#" className="hover:text-[#5757e8] transition-colors">Doors</Link></li>
                            <li><Link to="#" className="hover:text-[#5757e8] transition-colors">Full rooms</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2">About</h3>
                        <ul className="space-y-2">
                            <li><Link to="#" className="hover:text-[#5757e8] transition-colors">Staff</Link></li>
                            <li><Link to="#" className="hover:text-[#5757e8] transition-colors">Team</Link></li>
                            <li><Link to="#" className="hover:text-[#5757e8] transition-colors">Careers</Link></li>
                            <li><Link to="#" className="hover:text-[#5757e8] transition-colors">Reviews</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2 ">Customer</h3>
                        <ul className="space-y-2">
                            <li><Link to="#" className="hover:text-[#5757e8] transition-colors">Log in</Link></li>
                            <li><Link to="#" className="hover:text-[#5757e8] transition-colors">Register</Link></li>
                            <li><Link to="#" className="hover:text-[#5757e8] transition-colors">Contact us</Link></li>
                            <li><Link to="#" className="hover:text-[#5757e8] transition-colors">Help & Support</Link></li>
                        </ul>

                    </div>
                </div>
            </section>

            <hr className="border-[#C1C7CD]"/>

            <section className=" text-[#404040] bg-[#a7c7e5] py-2">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="mb-2 md:mb-0">CompanyName @ 202X. All rights reserved.</p>
                        <div className="flex gap-4  text-2xl ">
                            <Link className="hover:text-[#5757e8] transition-colors" to="#"><TiSocialGooglePlus /></Link>
                            <Link className="hover:text-[#5757e8] transition-colors" to="#"><FaFacebook /></Link>
                            <Link className="hover:text-[#5757e8] transition-colors" to="#"><FaTwitter /></Link>
                            <Link className="hover:text-[#5757e8] transition-colors" to="#"><FaInstagram /></Link>
                            <Link className="hover:text-[#5757e8] transition-colors" to="#"><FaLinkedinIn /></Link>
                            <Link className="hover:text-[#5757e8] transition-colors" to="#"><FaTiktok /></Link>
                        </div>

                    </div>
                </div>
            </section>
        </div>

    );
};

export default Footer;