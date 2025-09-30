/**
 * Dropdown Component
 * -------------------
 * A reusable custom dropdown/select component for selecting a value from
 * a list of options. Designed for simple single-selection use cases.
 *
 * Props:
 * - options (array) [default: []]: Array of objects representing the dropdown options.
 *   Each object should have the shape: { value: string | number, label: string }
 *
 * - value (string | number): The currently selected value. The dropdown displays
 *   the corresponding label for this value.
 *
 * - onChange (function): Callback function executed when the user selects an option.
 *   Receives the selected value as the argument.
 *
 * Features:
 * - Click to open/close the dropdown.
 * - Highlights the selected option.
 * - Closes automatically after selecting an option.
 * - Custom styling and fixed width by default.
 *
 * Example Usage:
 * -------------------
 * const [status, setStatus] = useState("all");
 * const options = [
 *   { value: "all", label: "All Orders" },
 *   { value: "pending", label: "Pending" },
 *   { value: "completed", label: "Completed" },
 *   { value: "canceled", label: "Canceled" },
 * ];
 *
 * <Dropdown
 *   options={options}
 *   value={status}
 *   onChange={(val) => setStatus(val)}
 * />
 */

import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

export default function Dropdown({ options = [], value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Button */}
      <button
        type="button"
        className="w-[180px] h-[40px] flex justify-between items-center px-3 pr-9
                   text-sm font-normal text-[#242524] bg-white border border-[#EBEBEA]
                   rounded-md shadow-sm focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {options.find((opt) => opt.value === value)?.label || "Select status"}
        </span>
        <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#242524]" />
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <ul
          className="absolute mt-1 w-[180px] bg-white border border-[#EBEBEA] rounded-md 
                     shadow-lg z-10"
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                opt.value === value
                  ? "font-medium text-[#242524]"
                  : "text-gray-600"
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
