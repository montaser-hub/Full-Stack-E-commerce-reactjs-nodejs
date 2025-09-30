/**
 * ConfirmDelete Component
 * ------------------------
 * This is a reusable confirmation dialog content component that is typically
 * used inside a Modal. It is designed to ask the user for confirmation before
 * performing a destructive action (like deleting an item).
 *
 * Props:
 * - onConfirm (function): Callback function executed when the user clicks
 *   the "Delete" button to confirm the action.
 *
 * - onCancel (function): Callback function executed when the user clicks
 *   the "Cancel" button to close the confirmation without performing any action.
 *
 * Features:
 * - Displays a clear warning message.
 * - Two buttons: "Cancel" and "Delete" for user decision.
 * - Centered layout with proper spacing and typography.
 *
 * Example Usage (inside a Modal):
 * -------------------------------
 * <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
 *   <ConfirmDelete
 *     onCancel={() => setIsModalOpen(false)}
 *     onConfirm={() => handleDeleteItem(itemId)}
 *   />
 * </Modal>
 */

import Text from "../SharedElements/Text";

export default function ConfirmDelete({ onConfirm, onCancel }) {
  return (
    <div className="flex flex-col items-center text-center space-y-6">
      <Text
        as="h2"
        content="Are you sure?"
        MyClass="text-xl font-bold text-gray-800"
      />
      <Text
        as="p"
        content="This action cannot be undone."
        MyClass="text-sm text-gray-600"
      />
      <div className="flex gap-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
