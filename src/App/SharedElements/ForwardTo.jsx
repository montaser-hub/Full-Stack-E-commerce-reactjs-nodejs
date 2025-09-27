import { Link } from "react-router-dom";

/**
 * ForwardTo Component
 * -----------------------------
 * A wrapper around react-router-dom's <Link /> that allows
 * passing dynamic props and custom styling.
 *
 * Props:
 * - to:       Destination path (string | object).
 * - myClass:  Extra CSS/Tailwind classes for styling.
 * - content:  The text or JSX to render inside the link.
 * - ...rest:  Any other props supported by <Link />
 *             (e.g., `replace`, `state`, `onClick`, etc.)
 *
 * Example:
 * <ForwardTo
 *   to="/dashboard"
 *   myClass="text-blue-600 hover:underline"
 *   content="Go to Dashboard"
 *   state={{ from: "home" }}
 * />
 */
export default function ForwardTo({ to, myClass, content, ...rest }) {
  return (
    <Link className={myClass} to={to} {...rest}>
      {content}{" "}
    </Link>
  );
}
