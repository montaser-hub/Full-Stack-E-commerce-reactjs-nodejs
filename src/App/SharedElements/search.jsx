import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "./Input";
import { FaSearch } from "react-icons/fa";

export default function Search({
  context = "search",
  divClass,
  inputClass,
  style,
  placeholder,
  onSearch,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.has("query")) {
      const route = context === "orders" ? "/orders" : "/home";
      navigate(route, { replace: true }); 
    }
  }, [context, location.search, navigate]);

  const handleSearch = (value) => {
    const route = context === "orders" ? "/orders" : "/home";
    if (value && value.trim() !== "") {
      navigate(`${route}?query=${encodeURIComponent(value)}`);
    } else {
      navigate(route);
    }
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    handleSearch(value);
  };

  const handleBlur = () => {
    if (!keyword.trim()) {
      const route = context === "orders" ? "/orders" : "/home";
      navigate(route);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(keyword);
  };

  return (
    <div
      className={`relative flex items-center gap-2 w-full max-w-md ${divClass || ""}`}
      style={style}
    >
      <FaSearch className="absolute z-50 left-3 h-4 w-4 text-gray-400 pointer-events-none" />
      <form onSubmit={handleSubmit} className="w-full">
        <Input
          type="text"
          myClass={`pl-10 ${inputClass || ""}`}
          placeholder={placeholder || "Search..."}
          name="Search"
          value={keyword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </form>
    </div>
  );
}