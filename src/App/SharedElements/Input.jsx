/**
 * Input Component
 * -----------------------------
 * A reusable input field with optional label.
 *
 * Props:
 * - label:       Label text displayed above the input (optional).
 * - type:        Input type (e.g., "text", "email", "password", etc.).
 * - myClass:     Extra CSS/Tailwind classes for styling (optional).
 * - placeholder: Placeholder text inside the input (optional).
 * - value:       Controlled value for the input field.
 * - name:        The input's name attribute (used for forms).
 * - onChange:    Function handler for change events (required for controlled inputs).
 * - onKeyDown:   Optional handler for keydown events (e.g., handling "Enter").
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
 */
export function Input( { label, type = "text", myClass = "", placeholder, value, name, onChange, onKeyDown } ) {
  return (
     <div className="flex flex-col w-full">
      {/* Label (optional) */}
      {label && (
        <label
          htmlFor={name}
          className="mb-1 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      {/* Input field */}
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={`${myClass}`}
      />
    </div>
  );
}