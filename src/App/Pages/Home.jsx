import Text from "../SharedElements/Text";
import ForwardTo from "../SharedElements/ForwardTo";
import Dropdown from "../SharedElements/Dropdown";
import ProductCard from "../Components/ProductCard";
import { useState, useEffect, useRef, useMemo } from "react";
import Pagination from "../Components/Pagination";
import { axiosInstance } from "../AxiosInstance/AxiosInstance";
import HeroSlider from "../Components/HeroSlider.jsx";
import { useSelector } from "react-redux";

export default function Home() {
  const topRef = useRef(null);
  const [allProducts, setAllProducts] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 8 });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const searchKeyword = useSelector((state) => state.search.keyword);
    const sliderImages = [
      "./Images/Home/1.jpg",
      "./Images/Home/2.jpg",
      "./Images/Home/3.jpg",
      "./Images/Home/4.jpg",
      "./Images/Home/5.jpg",
      "./Images/Home/6.jpg",
      "./Images/Home/7.jpg",
      "./Images/Home/8.jpg",
      "./Images/Home/9.jpg",
      "./Images/Home/10.jpg"
    ]
  // 1 Fetch categories once on mount
  useEffect(() => {
    axiosInstance
      .get("/categories")
      .then((res) => {
        const mapped = res.data.data.map((category) => ({
          id: category._id,
          name: category.name,
        }));
        setCategories(mapped);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Fetch products whenever filters or pagination change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let query = `/products?page=${meta.page}&limit=${meta.limit}`;
        if (selectedCategories.length > 0) {
          query += selectedCategories.map((id) => `&categoryId=${id}`).join("");
        }

        const res = await axiosInstance.get(query);
        setAllProducts(res.data.data);
        setMeta((prev) => ({
          ...prev,
          total: res.data.totalProducts,
        }));
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, [meta.page, meta.limit, selectedCategories]);

  // Filter products (by search or category)
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(keyword) ||
          p.description?.toLowerCase().includes(keyword) ||
          p.categoryName?.toLowerCase().includes(keyword)
      );
    }

    return filtered;
  }, [allProducts, searchKeyword]);

  // Reset to first page when filters/search change
  useEffect(() => {
    setMeta((prev) => ({ ...prev, page: 1 }));
  }, [searchKeyword, selectedCategories]);

  const paginatedProducts = filteredProducts; // backend already paginated
  const totalPages = Math.ceil(meta.total / meta.limit) || 1;
  return (
    <main
      ref={topRef}
      className="bg-gray-50 dark:bg-neutral-900 min-h-screen py-8 px-4 md:px-8"
    >
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

        {/* Mobile Filters */}
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
                  onClick={() => setSelectedCategories([])}
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
                  options={categories.map((c) => ({
                    value: c.id,
                    text: c.name,
                  }))}
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
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  id={product?._id}
                  image={product?.images[0]}
                  title={product?.name}
                  description={product?.description}
                  categoryId={product?.categoryId}
                  price={`$${product?.price}`}
                  stock={product?.quantity}
                />
              ))
            ) : (
              <p className="text-center m-60 text-gray-500 col-span-full">
                No products found.
              </p>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <Pagination
              totalPages={totalPages}
              currentPage={meta.page}
              setCurrentPage={(page) => {
                setMeta((prev) => ({ ...prev, page }));
                topRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
