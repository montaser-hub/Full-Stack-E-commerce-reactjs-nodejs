import { Link } from "react-router-dom";

function SocialLinks({ links }) {
return (
  <div className="flex gap-5 text-2xl">
    {links.map((link, idx) => (
      <Link
        key={idx}
        to={link.href}
        className="hover:text-[rgb(74,97,78)] transition-colors duration-300 ease-in-out"
      >
        {link.icon}
      </Link>
    ))}
  </div>
);
}

export default SocialLinks;
