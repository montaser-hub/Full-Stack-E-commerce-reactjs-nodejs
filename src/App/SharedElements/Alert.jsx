/**
 * Alert Component
 * -------------------
 * This is a reusable notification/toast component to display brief messages
 * to the user. It supports four types: "success", "error", "warning", and "info".
 *
 * Props:
 * - type (string) [default: "info"]: Determines the style and icon of the alert.
 *   Available options:
 *     - "success" → green background with check icon
 *     - "error" → red background with cross icon
 *     - "warning" → yellow background with warning icon
 *     - "info" → blue background with info icon
 *
 * - message (string): The text message displayed inside the alert.
 *
 * - onClose (function): Callback function executed when the alert is closed,
 *   either by clicking the "X" button or automatically after the duration.
 *
 * - duration (number) [default: 3000]: Time in milliseconds before the alert
 *   automatically closes itself.
 *
 * Features:
 * - Auto-dismiss after a set duration.
 * - Manual close by clicking the "X" button.
 * - Fixed position at the top-right corner of the screen.
 * - Slide-in animation for smooth appearance.
 *
 * Example Usage:
 * -------------------
 * <Alert
 *   type="success"
 *   message="Your order has been placed successfully!"
 *   duration={5000}
 *   onClose={() => setShowAlert(false)}
 * />
 *
 */

import { useEffect } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

const typeStyles = {
  success: {
    bg: "bg-green-100",
    text: "text-green-700",
    icon: <FaCheckCircle className="text-green-600 w-5 h-5" />,
  },
  error: {
    bg: "bg-red-100",
    text: "text-red-700",
    icon: <FaTimesCircle className="text-red-600 w-5 h-5" />,
  },
  warning: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    icon: <FaExclamationTriangle className="text-yellow-600 w-5 h-5" />,
  },
  info: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    icon: <FaInfoCircle className="text-blue-600 w-5 h-5" />,
  },
};

export default function Alert({
  type = "info",
  message,
  onClose,
  duration = 3000,
}) {
  const style = typeStyles[type];

  // Auto close after duration
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-16 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-md animate-slide-in ${style.bg} ${style.text}`}
    >
      {style.icon}
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-gray-500 hover:text-gray-700"
      >
        <FaTimes />
      </button>
    </div>
  );
}
