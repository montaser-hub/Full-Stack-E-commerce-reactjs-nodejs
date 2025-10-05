import { useState } from "react";
import { axiosInstance } from "../AxiosInstance/AxiosInstance";
import Button from "../SharedElements/Button";
import Text from "../SharedElements/Text";
import Alert from "../SharedElements/Alert";
import { useSelector } from "react-redux";

export default function CategoryForm({ onSuccess }) {
  const [form, setForm] = useState({ name: "", description: "" });
  const myTheme = useSelector((state) => state.theme);

  const [showToast, setShowToast] = useState({
    show: false,
    type: "info",
    message: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axiosInstance
      .post("/categories", form)
      .then(() => {
        setShowToast({
          show: true,
          type: "success",
          message: "✅ Category added successfully!",
        });
        setForm({ name: "", description: "" });
        onSuccess(); // refresh list
      })
      .catch((err) => {
        console.error("Error adding category:", err.response?.data || err);
        setShowToast({
          show: true,
          type: "error",
          message: "❌ Failed to add category!",
        });
      });
  }

  return (
    <div className="relative flex justify-center items-center py-10 px-4">
      {/* ✅ Toast Alert (Fixed globally) */}
       {showToast.show && (

        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[90%] sm:w-[60%] z-50">

          <Alert

            type={showToast.type}

            message={showToast.message}

            onClose={() => setShowToast({ ...showToast, show: false })}

          />

        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={`w-full sm:w-[500px] md:w-[600px] 
          rounded-2xl shadow-xl border transition-all duration-300
          ${
            myTheme === "dark"
              ? "bg-neutral-900 border-neutral-700 text-gray-100"
              : "bg-white border-gray-200 text-gray-800"
          }
        `}
      >
        {/* Header */}
        <div
          className={`rounded-t-2xl px-6 py-4 border-b text-center font-semibold text-lg
            ${
              myTheme === "dark"
                ? "bg-neutral-800 border-neutral-700 text-green-300"
                : "bg-gray-50 border-gray-200 text-green-700"
            }`}
        >
          ➕ Add New Category
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-5">
          {/* Name Field */}
          <div className="flex flex-col gap-2">
            <Text
              as="label"
              content="Category Name"
              className="font-medium text-sm tracking-wide"
            />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter category name"
              required
              className={`p-3 rounded-xl border focus:ring-2 outline-none transition-all
                ${
                  myTheme === "dark"
                    ? "bg-neutral-800 border-neutral-600 text-gray-100 focus:ring-green-500"
                    : "bg-white border-gray-300 text-black focus:ring-green-600"
                }`}
            />
          </div>

          {/* Description Field */}
          <div className="flex flex-col gap-2">
            <Text
              as="label"
              content="Description"
              className="font-medium text-sm tracking-wide"
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Write a short description..."
              rows="3"
              className={`p-3 rounded-xl border resize-none focus:ring-2 outline-none transition-all
                ${
                  myTheme === "dark"
                    ? "bg-neutral-800 border-neutral-600 text-gray-100 focus:ring-green-500"
                    : "bg-white border-gray-300 text-black focus:ring-green-600"
                }`}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end">
          <Button
            type="submit"
    myClass={`w-40 h-12 flex items-center justify-center gap-2 font-medium 
                    bg-gradient-to-r from-[rgb(67,94,72)] to-[rgb(87,114,92)]
                    rounded-xl shadow-md 
                    hover:from-[rgb(57,84,62)] hover:to-[rgb(77,104,82)] 
                    active:scale-95 transition-all duration-200`}            content="Add Category"
          />
        </div>
      </form>
    </div>
  );
}
