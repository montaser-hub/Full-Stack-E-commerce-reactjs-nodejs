
/**
 * Input Component
 * -----------------------------
 * A reusable input field with optional label, supporting text, email, password, and select types.
 *
 * Props:
 * - label:       Label text displayed above the input (optional).
 * - type:        Input type (e.g., "text", "email", "password", "select", etc.).
 * - myClass:     Extra CSS/Tailwind classes for styling (optional).
 * - placeholder: Placeholder text inside the input (optional).
 * - value:       Controlled value for the input field.
 * - name:        The input's name attribute (used for forms).
 * - onChange:    Function handler for change events (required for controlled inputs).
 * - onKeyDown:   Optional handler for keydown events (e.g., handling "Enter").
 * - showToggle:  Boolean to show/hide password toggle for password inputs (default: false).
 * - children:    Options for select type (required if type is "select").
 *
 * Example Usage:
 * <Input
 *   label="Email"
 *   type="email"
 *   name="email"
 *   placeholder="Enter your email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 * />
 * <Input
 *   label="Role"
 *   type="select"
 *   name="role"
 *   value={role}
 *   onChange={(e) => setRole(e.target.value)}
 * >
 *   <option value="user">user</option>
 *   <option value="admin">admin</option>
 * </Input>
 */


import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { useState } from "react";


export function Input({
  label,
  type = "text",
  myClass = "",
  placeholder,
  value,
  name,
  onChange,
  showToggle = false,
  children,
}) {
  const [showPassword, setShowPassword] = useState(false);

  if (type === "select") {
    return (
      <div className="relative w-full">
        {label && (
          <label
            htmlFor={name}
            className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        <select
          id={name}
          name={name}
          value={value ?? ""}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${myClass}`}
        >
          {children}
        </select>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={name}
          type={type === "password" && showPassword ? "text" : type}
          name={name}
          placeholder={placeholder}
          value={value ?? ""}
          onChange={onChange}
          className={`w-full pr-10 ${myClass}`}
        />

        {type === "password" && showToggle && (
          <span
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer select-none z-10"
            onClick={() => setShowPassword(!showPassword)}
          >
           
            {showPassword ? (
              < BiSolidShow className ="text-gray-500" />
            ) : (
              < BiSolidHide className="text-gray-500" />
            ) }
          </span>
        )}

      </div>

    </div>
  );
}
