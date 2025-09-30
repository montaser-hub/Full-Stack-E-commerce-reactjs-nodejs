/**
 * Button Component
 * ----------------------------
 * A reusable button wrapper.
 *
 * Props:
 * - type:    Button type (button | submit | reset).
 * - color:   Tailwind color variant.
 * - myClass: Additional custom classes for styling (string).
 * - onClick: Function to execute when the button is clicked.
 * - status:  Boolean to disable the button (true = disabled).
 * - content: The text or JSX to render inside the button.
 */
export default function Button({ 
  type = "button", 
  color, 
  myClass, 
  onClick, 
  status, 
  content 
}) {
  return (
    <button
      type={type}   // ✅ مهم علشان الفورم يشتغل
      className={`${myClass} ${color}`}
      onClick={onClick}
      disabled={status}
    >
      {content}
    </button>
  );
}
