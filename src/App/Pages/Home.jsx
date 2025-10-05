import Text from "../SharedElements/Text";
import ForwardTo from "../SharedElements/ForwardTo";
import Dropdown from "../SharedElements/Dropdown";
import ProductCard from "../Components/ProductCard";
import { useState, useEffect, useRef } from "react";
import Pagination from "../Components/Pagination";
import { axiosInstance } from "../AxiosInstance/AxiosInstance";
import HeroSlider from "../Components/HeroSlider.jsx";

export default function Home() {
  const topRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 8 });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const sliderImages = [
    "/1.JPG",
    "/2.JPG",
    "/3.JPG",
    "/4.JPG",
    "/5.JPG",
    "/6.JPG",
    "/7.JPG",
    "/8.JPG",
  ];
  // 1 Fetch categories once on mount
  useEffect(() => {
    axiosInstance
      .get("/categories")
      .then((res) => {
        const categories = res.data.data.map((category) => ({
          id: category._id,
          name: category.name,
        }));
        setCategories(categories);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // 2 Fetch products whenever page, limit, or filters change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let query = `/products?page=${meta.page}&limit=${meta.limit}`;

        if (selectedCategories.length > 0) {
          query += selectedCategories.map((id) => `&categoryId=${id}`).join("");
        }
        const res = await axiosInstance.get(query);
        setProducts(res.data.data);
        setMeta((prev) => ({
          ...prev,
          total: res.data.totalProducts,
        } ) );
        console.log("Products fetched:", res.data.data);
      } catch(err){
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [meta.page, meta.limit, selectedCategories]);

  const totalPages = Math.ceil(meta.total / meta.limit);
  return (
    <main
      ref={topRef}
      className="bg-gray-50 dark:bg-neutral-900 min-h-screen py-8 px-4 md:px-8"
    >
      {/* Hero / Slider Placeholder */}
      <HeroSlider images={sliderImages} />

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar (Desktop) */}
        <aside className="hidden md:block w-64 shrink-0 bg-white dark:bg-neutral-800 rounded-2xl shadow-md p-6 space-y-6">
          <div className="flex items-center justify-between">
            <Text as="h1" content="Filters" MyClass="text-xl font-semibold" />
            <ForwardTo
              content="Clear All"
              myClass="text-sm text-blue-600 hover:underline dark:text-gray-200"
              to="#"
              onClick={() => setSelectedCategories([])}
            />
          </div>

          <div>
            <Dropdown
              name="category"
              type="checkbox"
              options={categories.map((c) => ({ value: c.id, text: c.name }))}
              selected={selectedCategories}
              onChange={setSelectedCategories}
            />
          </div>
        </aside>

        {/* Mobile Filters Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-neutral-800 rounded-lg shadow-md text-gray-700 dark:text-gray-200 font-medium"
          >
            Filters
            <span>{showFilters ? "▲" : "▼"}</span>
          </button>
          {showFilters && (
            <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-6">
              <div className="flex items-center justify-between">
                <Text
                  as="h1"
                  content="Filters"
                  MyClass="text-lg font-semibold"
                />
                <ForwardTo
                  content="Clear All"
                  myClass="text-sm text-blue-600 hover:underline"
                  to="#"
                  onClick={() => {}}
                />
              </div>

              <div>
                <Text
                  as="h1"
                  content="Category"
                  MyClass="text-md font-medium mb-3"
                />
                <Dropdown
                  name="category"
                  type="checkbox"
                  options={categories.map((c) => ({ value: c.id, text: c.name }))}
                  selected={selectedCategories}
                  onChange={setSelectedCategories}
                />
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <section className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                id={product?._id}
                image={product?.images[0]}
                title={product?.name}
                description={product?.description}
                categoryId={product?.categoryId}
                Price={`$${product?.price}`}
                stock={product?.quantity}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <Pagination
              totalPages={totalPages}
              currentPage={meta.page}
              setCurrentPage={(page) => {
                setMeta((prev) => ({ ...prev, page }));
                if (page > 1) {
                  topRef.current?.scrollIntoView({ behavior: "smooth" });
                }
              } }
            />
          </div>
        </section>
      </div>
    </main>
  );
}