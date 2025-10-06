
function SocialLinks({ links }) {
return (
  <div className="flex gap-5 text-2xl">
    {links.map((link, idx) => (
      <a
        key={idx}
        href={link.href}
        target={link.target}
        className="hover:text-[rgb(74,97,78)] transition-colors duration-300 ease-in-out"
      >
        {link.icon}
      </a>
    ))}
  </div>
);
}

export default SocialLinks;
