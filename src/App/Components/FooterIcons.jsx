import { Link } from "react-router-dom";

function SocialLinks({ links }) {
return (
    <div className="flex gap-5 text-2xl">
    {links.map((link, idx) => (
        <Link
        key={idx}
        to={link.href}
        className="hover:text-[#5757e8] transition-colors duration-300 ease-in-out"
        >
        {link.icon}
        </Link>
    ))}
    </div>
);
}

export default SocialLinks;
