import Text from "../SharedElements/Text";
import ForwardTo from "../SharedElements/ForwardTo";
import Dropdown from "../SharedElements/Dropdown";
import ProductCard from "../Components/ProductCard";
import { useState, useEffect, useRef } from "react";
import Pagination from "../Components/Pagination";
import { axiosInstance } from "../AxiosInstance/AxiosInstance";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit:8 });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect( () => {
    axiosInstance.get( "/categories" ).then( ( res ) => {
      const categoriesNames = res.data.data.map( ( category ) => category.name );
      setCategories(categoriesNames);
    } );
    
    axiosInstance
      .get(`/products?page=${meta.page}&limit=${meta.limit}`)
      .then((res) => {
        setProducts(res.data.data);
        setMeta((prev) => ({
          ...prev,
          total: res.data.totalProducts,
        }));
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
    
    if (meta.page) {
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [meta.page, meta.limit]);
          useEffect(() => {
      
  const totalPages = Math.ceil(meta.total / meta.limit);
  return (
    <main ref={topRef} className="bg-gray-50 dark:bg-neutral-900 min-h-screen py-8 px-4 md:px-8">
      {/* Hero / Slider Placeholder */}
      <section className="w-full h-40 md:h-56 bg-gradient-to-r from-rose-500 to-blue-500 rounded-2xl shadow-md mb-8 flex items-center justify-center">
        <h1 className="text-2xl md:text-4xl font-bold text-white">
          Welcome to Our Store
        </h1>
      </section>

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
              options={categories.map((c) => ({ value: c, text: c }))}
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
                  options={categories.map((c) => ({ value: c, text: c }))}
                  selected={[]}
                  onChange={() => {}}
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
              setCurrentPage={(page) => setMeta((prev) => ({ ...prev, page }))}
            />
          </div>
        </section>
      </div>
    </main>
  );
}