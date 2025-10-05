import {FaFacebook,FaInstagram,FaLinkedinIn,FaTwitter,FaTiktok,} from "react-icons/fa";
import { TiSocialGooglePlus } from "react-icons/ti";
import FooterLinks from "./FooterLinks";
import SocialLinks from "./FooterIcons";
import { useSelector } from "react-redux";
import Text from "../SharedElements/Text";

function Footer() {
  const myFooterContent = useSelector((state) => state.myLang.content);
  const productsLinks = [
    { label: myFooterContent.living },
    { label: myFooterContent.office },
    { label: myFooterContent.dinning },
    { label: myFooterContent.Bedroom },
    { label: myFooterContent.kitchen },
  ];
  const aboutLinks = [
    { label: myFooterContent.staff },
    { label: myFooterContent.ourWorks, href: "/" },
    { label: myFooterContent.careers },
    { label: myFooterContent.reviews },
  ];
  const customerLinks = [
    { label: myFooterContent.log, href: "/Login" },
    { label: myFooterContent.reg, href: "/Register" },
    { label: myFooterContent.contactUs },
    { label: myFooterContent.help },
  ];
  const socialLinks = [
    { icon: <TiSocialGooglePlus />, href: "https://www.google.com/", target: "_blank" },
    { icon: <FaFacebook />, href: "https://www.facebook.com/", target: "_blank" },
    { icon: <FaTwitter />, href: "https://www.twitter.com/", target: "_blank" },
    { icon: <FaInstagram />, href: "https://www.instagram.com/", target: "_blank" },
    { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/", target: "_blank" },
    { icon: <FaTiktok />, href: "https://www.tiktok.com/", target: "_blank" },
  ];


  return (
    <footer className="w-full bg-gradient-to-r from-[#f0f1f3] to-[#e6ebf1] dark:text-white dark:bg-neutral-800 dark:border-neutral-700 font-sans ">
      <section className="px-6 md:px-12 lg:px-24 py-8 dark:text-white dark:bg-neutral-800 dark:border-neutral-700">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 ">
          <div className="text-center md:text-left">
            <Text as="h1" content={myFooterContent.siteName} MyClass="text-3xl font-extrabold text-[#3b3b3b] dark:text-white" />
            <Text as="p" content={myFooterContent.siteTagline} MyClass="text-[rgb(108,184,169)] dark:[#3b3b3b] font-medium text-sm md:text-base" />
          </div>
        </div>
      </section>
      <hr className="border-[#C1C7CD] dark:border-neutral-700" />
      <section className="px-6 md:px-12 lg:px-24 py-10 dark:text-white dark:bg-neutral-800 dark:border-neutral-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-[#404040] text-center md:text-left dark:text-white dark:bg-neutral-800 dark:border-neutral-700">
          <div>
            <Text as="h3" content={myFooterContent.footerDescription} MyClass="font-semibold text-lg mb-3" />
            <Text as="p" content={myFooterContent.footerDescriptionText} MyClass="text-sm leading-relaxed" />
          </div>
          <div>
            <Text as="h3" content={myFooterContent.footerServices} MyClass="font-semibold text-lg mb-3" />
            <ul className="space-y-2 text-sm">
                {myFooterContent.footerServicesItems.map((item, index) => (
                  <Text as="li" key={index} content={item} />
                ))}
            </ul>
          </div>
            <FooterLinks title={myFooterContent.footerProducts} links={productsLinks} />
            <FooterLinks title={myFooterContent.footerAbout} links={aboutLinks} />
            <FooterLinks title={myFooterContent.footerCustomer} links={customerLinks} />
        </div>
      </section>
      <hr className="border-[#C1C7CD] dark:border-neutral-700" />
      <section className="bg-[rgb(157,179,161)] dark:text-white dark:bg-neutral-800 dark:border-neutral-700 py-4 px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
              <Text
              as="p"
              content={myFooterContent.copyrightText}
              MyClass="text-sm text-center md:text-left"
            />
            <div className="flex gap-5 text-2xl">
              <SocialLinks links={socialLinks} />
            </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;

