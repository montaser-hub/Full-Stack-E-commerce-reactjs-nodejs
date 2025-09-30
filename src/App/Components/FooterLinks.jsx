import { Link } from "react-router-dom";

function FooterLinks({ title, links }) {
return (
    <div>
    <h3 className="font-semibold text-lg mb-3">{title}</h3>
    <ul className="space-y-2 text-sm">
        {links.map((link, idx) => (
        <li key={idx}>
            <Link to={link.href } className="hover:text-[#5757e8]">
            {link.label}
            </Link>
        </li>
        ))}
    </ul>
    </div>
);
}

export default FooterLinks;
