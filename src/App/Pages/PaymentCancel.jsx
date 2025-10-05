import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Text from "../SharedElements/Text";
import Button from "../SharedElements/Button";
import Alert from "../SharedElements/Alert";
import { axiosInstance } from "../AxiosInstance/AxiosInstance";

const PaymentCancel = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [alert, setAlert] = useState({
    type: "error",
    message: "Payment was cancelled.",
  });

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      axiosInstance.post(`/payments/paypal/cancel`, { token }).catch((err) => {
        console.error("Error notifying cancellation:", err);
      });
    }
  }, [searchParams]);

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
          content="Payment Cancelled"
          MyClass="text-2xl sm:text-3xl font-bold font-['Archivo'] mb-6 text-center text-red-600"
        />
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
          <Text
            as="p"
            content="Your payment was cancelled. You can try again or return to the checkout page."
            MyClass="text-center mb-4"
          />
          <Button
            content="Back to Checkout"
            onClick={() => navigate("/checkout")}
            myClass="w-full bg-[rgb(67,94,72)] hover:bg-[rgb(57,84,62)] text-white py-2 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
