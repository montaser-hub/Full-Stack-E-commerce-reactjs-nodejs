import { useState, useEffect } from "react";
import { axiosInstance } from "../AxiosInstance/AxiosInstance";
import Button from "../SharedElements/Button";
import Text from "../SharedElements/Text";
import Alert from "../SharedElements/Alert";
import { useSelector } from "react-redux";

export default function ProductForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
    images: [""], // array of URLs
  });

  const [categories, setCategories] = useState([]);
  const myTheme = useSelector((state) => state.theme);

  const [showToast, setShowToast] = useState({
    show: false,
    type: "info",
    message: "",
  });

  useEffect(() => {
    axiosInstance
      .get("/categories")
      .then((res) => setCategories(res.data.data || []))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  function handleChange(e, index = null) {
    const { name, value } = e.target;
    if (name === "images" && index !== null) {
      const newImages = [...form.images];
      newImages[index] = value;
      setForm({ ...form, images: newImages });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  function addImageField() {
    setForm({ ...form, images: [...form.images, ""] });
  }

  function removeImageField(index) {
    const newImages = form.images.filter((_, i) => i !== index);
    setForm({ ...form, images: newImages });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axiosInstance
      .post("/products", form)
      .then((res) => {
        setShowToast({
          show: true,
          type: "success",
          message: "✅ Product added successfully!",
        });
        setForm({
          name: "",
          description: "",
          price: "",
          quantity: "",
          categoryId: "",
          images: [""],
        });
        onSuccess(res.data.data); // product object
      })
      .catch((err) => {
        console.error("Error adding product:", err.response?.data || err);
        setShowToast({
          show: true,
          type: "error",
          message: "❌ Failed to add product!",
        });
      });
  }

  return (
    <div className="relative flex justify-center items-center py-10 px-4">
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
        className={`w-full sm:w-[500px] md:w-[600px] rounded-2xl shadow-xl border transition-all duration-300 ${
          myTheme === "dark"
            ? "bg-neutral-900 border-neutral-700 text-gray-100"
            : "bg-white border-gray-200 text-gray-800"
        }`}
      >
        <div className={`rounded-t-2xl px-6 py-4 border-b text-center font-semibold text-lg ${
          myTheme === "dark"
            ? "bg-neutral-800 border-neutral-700 text-green-300"
            : "bg-gray-50 border-gray-200 text-green-700"
        }`}>
          ➕ Add New Product
        </div>

        <div className="p-6 flex flex-col gap-5">
          {/* Name */}
          <Text as="label" content="Product Name" className="font-medium text-sm" />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="p-3 rounded-xl border focus:ring-2 outline-none"
          />

          {/* Description */}
          <Text as="label" content="Description" className="font-medium text-sm" />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="p-3 rounded-xl border resize-none focus:ring-2 outline-none"
          />

          {/* Price & Quantity */}
          <Text as="label" content="Price" className="font-medium text-sm" />
          <input type="number" name="price" value={form.price} onChange={handleChange} required className="p-3 rounded-xl border focus:ring-2 outline-none" />

          <Text as="label" content="Quantity" className="font-medium text-sm" />
          <input type="number" name="quantity" value={form.quantity} onChange={handleChange} required className="p-3 rounded-xl border focus:ring-2 outline-none" />

          {/* Category */}
          <Text as="label" content="Category" className="font-medium text-sm" />
          <select name="categoryId" value={form.categoryId} onChange={handleChange} required className="p-3 rounded-xl border focus:ring-2 outline-none">
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>

          {/* Images URLs */}
          <Text as="label" content="Image URLs" className="font-medium text-sm" />
          {form.images.map((img, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <input
                type="text"
                name="images"
                value={img}
                onChange={(e) => handleChange(e, idx)}
                placeholder="Enter image URL"
                className="p-2 rounded-xl border flex-1"
              />
              {idx > 0 && (
                <Button content="Remove" myClass={`w-40 h-12 flex items-center justify-center gap-2 font-medium 
                    bg-gradient-to-r from-[rgb(200,20,20)] to-[rgb(200,20,20)]
                    rounded-xl shadow-md 
                    hover:from-[rgb(57,84,62)] hover:to-[rgb(77,104,82)] 
                    active:scale-95 transition-all duration-200`} onClick={() => removeImageField(idx)} />
              )}
            </div>
          ))}
          <Button content="Add Image" myClass={`w-40 h-12 flex items-center justify-center gap-2 font-medium 
                    bg-gradient-to-r from-[rgb(67,94,72)] to-[rgb(87,114,92)]
                    rounded-xl shadow-md 
                    hover:from-[rgb(57,84,62)] hover:to-[rgb(77,104,82)] 
                    active:scale-95 transition-all duration-200`} onClick={addImageField} />
        </div>

        <div className="px-6 py-4 border-t flex justify-end">
          <Button type="submit" color="bg-green-600" myClass="text-white px-6 py-3 rounded-xl" content="Add Product" />
        </div>
      </form>
    </div>
  );
}
