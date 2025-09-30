/**
 * Modal Component
 * -------------------
 * A reusable modal/dialog component to display content on top of the main page.
 * Typically used to show forms, confirmations, or any interactive content.
 *
 * Props:
 * - isOpen (boolean): Determines whether the modal is visible or hidden.
 *
 * - onClose (function): Callback function executed when the user clicks the
 *   close button (X) or when you want to programmatically close the modal.
 *
 * - children (ReactNode): The content to be rendered inside the modal.
 *   Can be any JSX or other components (e.g., forms, confirmation dialogs).
 *
 * Features:
 * - Centers content both vertically and horizontally.
 * - Semi-transparent overlay to dim the background.
 * - Close button at the top-right corner.
 * - Responsive width with max-width and full width on smaller screens.
 *
 * Example Usage:
 * -------------------
 * const [isModalOpen, setIsModalOpen] = useState(false);
 *
 * <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
 *   <ConfirmDelete
 *     onCancel={() => setIsModalOpen(false)}
 *     onConfirm={() => handleDeleteItem(itemId)}
 *   />
 * </Modal>
 */

import { FaTimes } from "react-icons/fa";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        {children}
      </div>
    </div>
  );
}
