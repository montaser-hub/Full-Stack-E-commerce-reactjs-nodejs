import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../SharedElements/spinner";
import Text from "../SharedElements/Text";
import Button from "../SharedElements/Button";
import Alert from "../SharedElements/Alert";
import OrderSummary from "../Components/OrderSummary";
import { axiosInstance } from "../AxiosInstance/TestAxiosInstance";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosInstance.get(`/orders/${orderId}`);
        setOrder(res.data);
      } catch (err) {
        console.error("Error fetching order:", err);
        setAlert({ type: "error", message: "Failed to load order details." });
      }
    };
    fetchOrder();
  }, [orderId]);

  if (!order) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <Spinner />
      </div>
    );
  }

  const items = order.cartItems.map((item) => ({
    id: item.product._id.toString(),
    src: item.product.images?.[0] || "",
    alt: item.product.name,
    productName: item.product.name,
    price: item.price,
    quantity: item.quantity,
  }));

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-3xl">
        {/* Alert */}
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* Page Title */}
        <Text
          as="h1"
          content="Order Placed Successfully!"
          MyClass="text-2xl sm:text-3xl font-bold font-['Archivo'] mb-6 text-center text-green-600"
        />

        <div className="bg-white dark:bg-neutral-800 dark:border-neutral-700 rounded-lg shadow-md p-6">
          <Text
            as="h2"
            content={`Order ID: ${order._id}`}
            MyClass="text-xl font-semibold mb-4 text-center"
          />

          <div className="flex flex-col items-center justify-center">
            <OrderSummary
              items={items}
              subtotal={`$${order.totalOrderPrice - order.shippingPrice}`}
              shipping={`$${order.shippingPrice}`}
              discount={`-$${10}`} // Fixed as per Cart.jsx
              total={`$${order.totalOrderPrice}`}
              paymentMethod={order.paymentMethodType}
              isPaid={order.isPaid}
              isDelivered={order.isDelivered}
              shippingAddress={`${order.shippingAddress.details}, ${order.shippingAddress.street}, ${order.shippingAddress.city}`}
              showDescription={false}
              showButton={false}
            />
          </div>

          <Button
            content="Back to Home"
            onClick={() => navigate("/")}
            myClass="w-full bg-[rgb(67,94,72)] hover:bg-[rgb(57,84,62)] text-white py-2 rounded-lg mt-6"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
