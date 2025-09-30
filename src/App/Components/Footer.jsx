import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaTiktok,
} from "react-icons/fa";
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
    { label: "Staff" },
    { label: "Team" },
    { label: "Careers" },
    { label: "Reviews" },
  ];
  const customerLinks = [
    { label: "Log in" },
    { label: "Register" },
    { label: "Contact Us" },
    { label: "Help & Support" },
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
    <footer className="w-full bg-gradient-to-r from-[#f0f1f3] to-[#e6ebf1] dark:text-white dark:bg-neutral-800 dark:border-neutral-700 font-sans ">
      <section className="px-6 md:px-12 lg:px-24 py-8 dark:text-white dark:bg-neutral-800 dark:border-neutral-700">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 ">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-[#3b3b3b] dark:text-white">
              WOODY
            </h1>
            <p className="text-[rgb(108,184,169)] dark:[#3b3b3b] font-medium text-sm md:text-base">
              For Natural Furniture
            </p>
          </div>
        </div>
      </section>
      <hr className="border-[#C1C7CD] dark:border-neutral-700" />
      <section className="px-6 md:px-12 lg:px-24 py-10 dark:text-white dark:bg-neutral-800 dark:border-neutral-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-[#404040] text-center md:text-left dark:text-white dark:bg-neutral-800 dark:border-neutral-700">
          <div>
            <h3 className="font-semibold text-lg mb-3">Description</h3>
            <p className="text-sm leading-relaxed">
              A small team built this site for trading modern furniture which is
              environmentally friendly and sustainable.
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
          <FooterLinks title="Products" links={productsLinks} />
          <FooterLinks title="About" links={aboutLinks} />
          <FooterLinks title="Customer" links={customerLinks} />
        </div>
      </section>
      <hr className="border-[#C1C7CD] dark:border-neutral-700" />
      <section className="bg-[#6a7e91] dark:text-white dark:bg-neutral-800 dark:border-neutral-700 py-4 px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
          <p className="text-sm text-center md:text-left">
            © 2025 WOODY. All rights reserved.
          </p>
          <div className="flex gap-5 text-2xl">
            <SocialLinks links={socialLinks} />
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;

