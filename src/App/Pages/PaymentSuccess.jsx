import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "../SharedElements/spinner";
import Text from "../SharedElements/Text";
import Button from "../SharedElements/Button";
import Alert from "../SharedElements/Alert";
import { axiosInstance } from "../AxiosInstance/AxiosInstance";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  const handlePayment = useCallback(async () => {
    const token = searchParams.get("token");
    const payerId = searchParams.get("PayerID");
    console.log(`Token: ${token}, PayerID: ${payerId}`);

    if (!token || !payerId) {
      setAlert({ type: "error", message: "Invalid payment details." });
      setLoading(false);
      return;
    }

    try {
      // البحث عن الطلب باستخدام paypalOrderId
      const orderResponse = await axiosInstance.get(`/orders/paypal/${token}`);
      const order = orderResponse.data;

      if (!order || !order._id) {
        throw new Error("Order not found.");
      }

      // إذا كان الطلب مدفوعًا بالفعل، انتقل إلى صفحة تأكيد الطلب
      if (order.isPaid) {
        setAlert({ type: "success", message: "Payment already completed!" });
        
          const cleanUrl = window.location.origin + window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl);

        setTimeout(() => navigate(`/order-confirmation/${order._id}`), 2000);
        setLoading(false);
        return;
      }

      // محاولة التقاط الدفع
      const captureResponse = await axiosInstance.post(
        `/payments/paypal/capture`,
        { token, payerId }
      );

      if (captureResponse.data.status === "success") {
        setAlert({ type: "success", message: "Payment completed successfully!" });

          const cleanUrl = window.location.origin + window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl);

        setTimeout(
          () => navigate(`/order-confirmation/${captureResponse.data.orderId}`),
          2000
        );
      } else {
        throw new Error("Payment capture failed.");
      }
    } catch (err) {
      console.error("Payment Error:", err);
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

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-3xl">
        {loading && <Spinner />}
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}
        <Text
          as="h1"
          content={loading ? "Processing Payment..." : "Payment Status"}
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