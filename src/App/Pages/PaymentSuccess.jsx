import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "../SharedElements/spinner";
import Text from "../SharedElements/Text";
import Button from "../SharedElements/Button";
import Alert from "../SharedElements/Alert";
import { axiosInstance } from "../AxiosInstance/TestAxiosInstance";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  const handlePayment = useCallback(async () => {
    const token = searchParams.get("token");
    const payerId = searchParams.get("PayerID");

    if (!token || !payerId) {
      setAlert({ type: "error", message: "Invalid payment details." });
      setLoading(false);
      return;
    }

    try {
      const orderResponse = await axiosInstance.get(`/orders/paypal/${token}`);
      const order = orderResponse.data;
      if (order.isPaid) {
        setAlert({ type: "success", message: "Payment already completed!" });
        setTimeout(() => navigate(`/order-confirmation/${order._id}`), 2000);
      } else {
        const captureResponse = await axiosInstance.post(
          `/payments/paypal/capture`,
          { token, payerId }
        );
        setAlert({
          type: "success",
          message: "Payment completed successfully!",
        });
        setTimeout(
          () => navigate(`/order-confirmation/${captureResponse.data.orderId}`),
          2000
        );
      }
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Failed to complete payment.",
      });
      setLoading(false);
    }
  }, [navigate, searchParams]);

  useEffect(() => {
    handlePayment();
  }, [handlePayment]);

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-3xl">
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}
        <Text
          as="h1"
          content="Processing Payment..."
          MyClass="text-2xl sm:text-3xl font-bold font-['Archivo'] mb-6 text-center"
        />
        {alert?.type === "error" && (
          <Button
            content="Back to Checkout"
            onClick={() => navigate("/checkout")}
            myClass="w-full bg-[rgb(67,94,72)] hover:bg-[rgb(57,84,62)] text-white py-2 rounded-lg mt-6"
          />
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
