import { FiShoppingCart } from "react-icons/fi";
import Button from "../SharedElements/Button";
import Text from "../SharedElements/Text";
import ForwardTo from "../SharedElements/ForwardTo";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Alert from "../SharedElements/Alert";
import { addToCart } from "../../ReduxToolkit/Store";
import { axiosInstance } from "../AxiosInstance/AxiosInstance";

function WishlistCard(props) {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const productId = props.id;

  const title = props.title || "No Title";
  const description = props.description || "No Description";
  const image = props.image || "https://via.placeholder.com/300x300";
  const category = props.category || "Uncategorized";
  const price = props.price ?? "N/A";

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await axiosInstance.post(
        "/carts",
        { items: [{ productId, quantity: 1 }] },
        { withCredentials: true }
      );
      dispatch(addToCart(productId));
      setShowToast(true);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-72 h-[460px] bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col dark:bg-neutral-800 dark:border-neutral-800">
      {/* Image */}
      <div className="relative w-full h-64 rounded-t-lg overflow-hidden flex items-center justify-center bg-gray-50 dark:bg-neutral-800">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 max-h-full max-w-full mx-auto"
        />
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <Text
            as="h3"
            MyClass="text-neutral-900 text-lg font-semibold"
            content={
              <ForwardTo
                to={`/products/${productId}`}
                myClass="block truncate hover:text-blue-600 transition-colors duration-200 dark:hover:text-blue-400 dark:text-white"
                title={title}
                content={
                  <div>
                    <Text
                      as="span"
                      content={`Name: ${
                        title?.length > 15 ? `${title.slice(0, 15)}...` : title
                      }`}
                      MyClass="font-bold"
                    />
                    <Text
                      as="p"
                      content={`Description: ${
                        description?.length > 20
                          ? `${description.slice(0, 20)}...`
                          : description
                      }`}
                      MyClass="text-sm"
                    />
                  </div>
                }
              />
            }
          />

          <div className="flex items-center justify-between mt-2">
            <Text
              as="span"
              content={`Category: ${category}`}
              MyClass="text-sm font-semibold"
            />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <Text
              as="span"
              content={price}
              MyClass="text-blue-600 text-xl font-bold dark:text-blue-400"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-3">
          {/* Add to Cart */}
          <Button
            myClass={`w-auto px-6 h-12 flex items-center justify-center gap-2 font-medium 
                       bg-gradient-to-r from-[rgb(67,94,72)] to-[rgb(87,114,92)]
                       rounded-xl shadow-md 
                       hover:from-[rgb(57,84,62)] hover:to-[rgb(77,104,82)] 
                       active:scale-95 transition-all duration-200`}
            onClick={handleAddToCart}
            content={
              <Text
                as="span"
                MyClass="flex items-center justify-center gap-2 w-full text-white"
                content={
                  loading ? (
                    "Adding..."
                  ) : (
                    <>
                      <FiShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )
                }
              />
            }
          />

          {/* Remove */}
          <Button
            myClass="flex-1 h-12 flex items-center justify-center gap-2 font-medium 
                    text-gray-700 bg-gray-100 
                    border border-gray-300 
                    rounded-xl 
                    hover:bg-gray-200 hover:text-gray-900 
                    active:scale-95 transition-all duration-200"
            onClick={() => props.onRemove(productId)}
            status={false}
            content="Remove"
          />
        </div>
      </div>
      {showToast && (
        <Alert
          type="success"
          message={`${props.title} added to cart!`}
          duration={2000}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

export default WishlistCard;
