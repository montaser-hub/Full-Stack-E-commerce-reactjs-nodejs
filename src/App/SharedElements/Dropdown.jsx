import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

/**
 * Unified Dropdown Component
 * ---------------------------
 * A reusable dropdown that supports:
 * - Single selection (like <select>)
 * - Checkbox or radio button selection (multi or single)
 *
 * Props:
 * - label: (string) Optional label
 * - name: (string) Input name (for radio groups)
 * - type: (string) "select" | "checkbox" | "radio" (default: "select") // [NEW]
 * - options: (array) [{ value, label/text }]
 * - selected: (string | array) selected value(s) for checkbox/radio // [NEW]
 * - value: (string | number) selected value for "select" mode // [NEW]
 * - onChange: (function) Callback when selection changes
 * - myClass: (string) Optional custom wrapper class
 */
export default function Dropdown({
  label,
  name,
  type = "select",
  options = [],
  selected,
  value,
  onChange,
  myClass = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isCheckbox = type === "checkbox";
  const isRadio = type === "radio";
  const isSelect = type === "select";

  const selectedValues = Array.isArray(selected) ? selected : [selected];

  const getDisplayValue = () => {
    if (isSelect) {
      return (
        options.find((opt) => opt.value === value)?.label || "Select an option"
      );
    } else if (isRadio) {
      return (
        options.find((opt) => opt.value === selected)?.text || "Select option"
      );
    } else if (isCheckbox) {
      const selectedLabels = options
        .filter((opt) => selectedValues.includes(opt.value))
        .map((opt) => opt.text);
      return selectedLabels.length > 0
        ? selectedLabels.join(", ")
        : "Select option(s)";
    }
  };

  return (
    <div className={`relative text-left ${myClass}`}>
      {/* Optional Label */}
      {label && (
        <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-white">
          {label}
        </label>
      )}

      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full min-h-[40px] flex justify-between items-center  px-3 pr-9
+            text-sm font-normal text-[#242524] bg-white border border-[#EBEBEA] dark:text-white
+            rounded-md shadow-sm focus:outline-none dark:bg-neutral-800 dark:border-neutral-600"
      >
        <span className="text-[#242524] dark:text-gray-200 flex flex-wrap gap-1 whitespace-normal break-words">
          {getDisplayValue()}
        </span>
        <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#242524] dark:text-white" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute mt-1 w-[200px] bg-white border border-[#EBEBEA]
                     rounded-md shadow-lg z-10 p-2 space-y-1 max-h-[250px] overflow-auto dark:bg-neutral-800 dark:border-neutral-600  dark:text-white"
        >
          {isSelect ? (
            // Simple Select Mode
            <ul>
              {options.map((opt) => (
                <li
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 rounded  dark:hover:bg-gray-700 ${
                    opt.value === value
                      ? "font-medium text-[#242524] dark:text-white"
                      : "text-gray-600 dark:text-white"
                  }`}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          ) : (
            // Checkbox/Radio Mode
            <div className="space-y-2">
              {options.map((opt, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    id={`${name}-${opt.value}`}
                    type={type}
                    name={name}
                    value={opt.value}
                    checked={
                      isCheckbox
                        ? selectedValues.includes(opt.value)
                        : selected === opt.value
                    }
                    onChange={(e) => {
                      if (isCheckbox) {
                        const newSelected = e.target.checked
                          ? [...selectedValues, opt.value]
                          : selectedValues.filter((v) => v !== opt.value);
                        onChange(newSelected);
                      } else {
                        onChange(opt.value);
                        setIsOpen(false); // auto-close on radio selection
                      }
                    }}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`${name}-${opt.value}`}
                    className="text-sm text-gray-700 cursor-pointer dark:text-white"
                  >
                    {opt.text}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
