import Text from "../SharedElements/Text";
function ConfirmModel({
  title = "Confirm Action",
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "bg-red-600 hover:bg-red-700",
  children,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96">
        <Text
          as="h3"
          content={title}
          MyClass="text-lg font-bold text-red-600 mb-4"
        />
        {message && (
          <Text
            as="p"
            content={message}
            MyClass="text-gray-700 mb-6"
          />
        )}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-white rounded-md transition ${confirmColor}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
export default ConfirmModel;


