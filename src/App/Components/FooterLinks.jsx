import { Link } from "react-router-dom";
import Text from "../SharedElements/Text"; 

function FooterLinks({ title, links }) {
return (
  <div>
    <Text as="h3" content={title} MyClass="font-semibold text-lg mb-3" />
    <ul className="space-y-2 text-sm">
      {links.map((link, idx) => (
        <li key={idx}>
          <Link
            to={link.href}
            className="hover:text-[rgb(82,104,86)] transition-colors duration-300 ease-in-out"
          >
            <Text as="span" content={link.label} />
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
}

export default FooterLinks;

