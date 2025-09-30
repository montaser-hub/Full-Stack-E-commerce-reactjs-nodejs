import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter, FaTiktok } from "react-icons/fa";
import { TiSocialGooglePlus } from "react-icons/ti";
import FooterLinks from "./FooterLinks";
import SocialLinks from "./FooterIcons";
import Text from "../SharedElements/Text";

function Footer() {
const productsLinks = [
    { label: "Chairs" }, 
    { label: "Tables" }, 
    { label: "Desks" }, 
    { label: "Doors" }, 
    { label: "Full Rooms" },
];
const aboutLinks = [
    { label: "Staff", href: "#" }, 
    { label: "Team", href: "#" },
    { label: "Careers", href: "#" }, 
    { label: "Reviews", href: "#" },
];
const customerLinks = [
    { label: "Log in", href: "#" }, 
    { label: "Register", href: "#" },
    { label: "Contact Us", href: "#" }, 
    { label: "Help & Support", href: "#" },
];
const socialLinks = [
    { icon: <TiSocialGooglePlus />, href: "#" },
    { icon: <FaFacebook />, href: "#" },
    { icon: <FaTwitter />, href: "#" },
    { icon: <FaInstagram />, href: "#" },
    { icon: <FaLinkedinIn />, href: "#" },
    { icon: <FaTiktok />, href: "#" },
];

return (
    <footer className="w-full bg-gradient-to-r from-[#f0f1f3] to-[#e6ebf1] font-sans mt-auto">
    {/* Mark*/}
    <section className="px-6 md:px-12 lg:px-24 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <div className="text-center md:text-left">
            <Text as="h1" content="WOODY" MyClass="text-3xl font-extrabold text-[#3b3b3b]" />
            <Text as="p" content="For Natural Furniture" MyClass="text-[rgb(108,184,169)] font-medium text-sm md:text-base" />
        </div>
        </div>
    </section>

    <hr className="border-[#C1C7CD]" />

    {/* Links*/}
    <section className="px-6 md:px-12 lg:px-24 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-[#404040] text-center md:text-left">
        <div>
            <Text as="h3" content="Description" MyClass="font-semibold text-lg mb-3" />
            <Text as="p" content="A small team built this site for trading modern furniture which is 
            environmentally friendly and sustainable." MyClass="text-sm leading-relaxed" />
        </div>
        <div>
            <Text as="h3" content="Services" MyClass="font-semibold text-lg mb-3" />
            <ul className="space-y-2 text-sm">
            <li><Text as="span" content="Buy & Sell" /></li>
            <li><Text as="span" content="Reservation" /></li>
            <li><Text as="span" content="Return Policy" /></li>
            </ul>
        </div>
        <FooterLinks title="Products" links={productsLinks} />
        <FooterLinks title="About" links={aboutLinks} />
        <FooterLinks title="Customer" links={customerLinks} />
        </div>
    </section>

    {/*Social Icons*/}
    <section className="bg-[#a7c7e5] text-[#404040] py-4 px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
        <Text as="p" content="© 2025 WOODY. All rights reserved." MyClass="text-sm text-center md:text-left" />
        <div className="flex gap-5 text-2xl justify-center md:justify-end">
            <SocialLinks links={socialLinks} />
        </div>
        </div>
    </section>
    </footer>
);
}

export default Footer;
