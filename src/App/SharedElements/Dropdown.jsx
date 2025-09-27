/**
 * Reusable Dropdown component that can render either
 * checkbox or radio button inputs dynamically.
 *
 * Props:
 * - label: (string) Label for the dropdown
 * - name: (string) Input group name (important for radio buttons)
 * - type: (string) "checkbox" | "radio" (default: "checkbox")
 * - options: (array) List of { value, text } items
 * - selected: (array|string) Currently selected value(s)
 * - onChange: (function) Callback when selection changes
 * - myClass: (string) Custom classes for dropdown wrapper
 */
export default function Dropdown({ label, name, type = "checkbox", options = [], selected, onChange, myClass = ""}) {
  const isCheckbox = type === "checkbox";
  const selectedValues = Array.isArray(selected) ? selected : [selected];

  return (
    <div className={`w-full ${myClass}`}>
      {label && (
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          {label}
        </label>
      )}

      <div className="bg-white border rounded-lg shadow-md p-3 space-y-2">
        {options.map((opt, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              id={`${name}-${opt.value}`}
              type={type}
              name={name}
              value={opt.value}
              checked={selectedValues.includes(opt.value)}
              onChange={(e) => {
                if (isCheckbox) {
                  const newSelected = e.target.checked
                    ? [...selectedValues, opt.value]
                    : selectedValues.filter((v) => v !== opt.value);
                  onChange(newSelected);
                } else {
                  onChange(opt.value);
                }
              }}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor={`${name}-${opt.value}`}
              className="text-sm text-gray-700 cursor-pointer"
            >
              {opt.text}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}