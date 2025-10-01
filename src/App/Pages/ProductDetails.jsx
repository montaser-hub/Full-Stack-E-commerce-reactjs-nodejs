import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../AxiosInstance/AxiosInstance";
import ProductDetailsCard from "../Components/ProductDetailsCard";
import Text from "../SharedElements/Text";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    setProduct(null);
    axiosInstance.get(`/products/${id}`)
      .then(res => setProduct(res.data.data || res.data))
      .catch(err => console.error("Error fetching product details:", err));
  }, [id]);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900">
      <Text as="p" content="Loading..." MyClass="text-lg font-semibold" />
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-8 px-4 md:px-8 flex justify-center">
      <div className="max-w-4xl w-full">
        <ProductDetailsCard
          id={product._id}
          image={product.images[0]}
          title={product.name}
          description={product.description}
          price={`$${product.price}`}
          category={product.categoryId?.name}
          stock={product.quantity}   
          fullWidth={true}               
        />
      </div>
    </main>
  );
}
