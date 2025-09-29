/**
 * Button Component
 * ----------------------------
 * A reusable button wrapper with.
 *
 * Props:
 * - color:   tailwind color variant.
 * - myClass: Additional custom classes for styling (string).
 * - onClick: Function to execute when the button is clicked.
 * - status:  Boolean to disable the button (true = disabled).
 * - content: The text or JSX to render inside the button.
 *
 * Example:
 * <Button
 *   color="primary"
 *   myClass="px-4 py-2"
 *   onClick={() => alert("Clicked!")}
 *   status={false}
 *   content="Submit"
 * />
 */
export default function Button({ color, myClass, onClick, status, content }) {
  return (
    <button
      className={`${myClass} ${color}`}
      onClick={onClick}
      disabled={status}
    >
      {content}
    </button>
  );
}
