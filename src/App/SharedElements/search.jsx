import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./Input";
import { FaSearch } from "react-icons/fa";

/**
 * Search Component
 * -----------------------------
 * A reusable search bar with an input field and search icon.
 * Automatically navigates to the `/search` page with a query parameter
 * as the user types.
 *
 * Props:
 * - myClass:    Additional CSS/Tailwind classes for styling (optional).
 * - style:      Inline style object for container (optional).
 * - placeholder: Placeholder text for the search input (default: "Search...").
 *
 * Behavior:
 * - Updates local state `keyword` as user types.
 * - Uses React Router's `useNavigate` hook to redirect
 *   to `/search?query=<keyword>` dynamically.
 *
 * Example Usage:
 * <Search myClass="border rounded-md" placeholder="Search products..." />
 */
export function Search({ myClass, style, placeholder }) {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [keyword, setKeyword] = useState(""); // Local input state

  /**
   * Redirect user to search results page with encoded query string
   * @param {string} value - The search term entered by the user
   */
  const handleSearch = (value) => {
    navigate(`/search?query=${encodeURIComponent(value)}`);
  };

  /**
   * Handle input changes:
   * - Update state
   * - Trigger navigation instantly on typing
   */
  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    handleSearch(value);
  };

  return (
    <div
      className={`relative flex items-center gap-2 w-full max-w-md ${
        myClass || ""
      }`}
      style={style}
    >
      {/* Search icon (positioned absolutely inside input) */}
      <FaSearch className="absolute left-3 h-4 w-4 text-gray-400 pointer-events-none" />

      {/* Search input field */}
      <Input
        type="text"
        myClass={`pl-10 ${myClass || ""}`} // Padding to prevent overlap with icon
        placeholder={placeholder || "Search..."}
        name="Search"
        value={keyword}
        onChange={handleChange}
      />
    </div>
  );
}
