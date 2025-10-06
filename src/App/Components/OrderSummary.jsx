import { useSelector } from "react-redux";
import ItemsOrder from "../SharedElements/ItemsOrder";
import Text from "../SharedElements/Text";

const OrderSummary = ({
  items,
  subtotal,
  shipping,
  discount,
  total,
  showDescription = true,
  showButton = true,
  onPlaceOrder = () =>{},
}) => {
      const mycartContent = useSelector((state)=> state.myLang.content)
  const summaryRows = [
    {
      label: mycartContent.summarySubtotal,
      value: subtotal,
      className: "text-blue-600 dark:text-blue-400",
      labelClass: "text-lg dark:text-white",
    },
    {
      label: mycartContent.summaryShipping,
      value: shipping,
      className: "text-blue-600 dark:text-blue-400",
      labelClass: "text-lg dark:text-white",
    },
    { label: mycartContent.summaryDiscount, value: discount, className: "text-red-600 dark:text-red-400" },
    {
      label: mycartContent.summaryTotal,
      value: total,
      className: "text-lg font-bold text-blue-600 dark:text-blue-400",
      labelClass: "text-lg font-bold",
    },
  ];

  return (
    <div className="bg-white  text-gray-600  dark:text-white dark:bg-neutral-800 dark:border-neutral-700 shadow-md rounded-lg p-6 w-full max-w-md flex flex-col">
      <Text 
      as="h2" 
      content= {mycartContent.orderSummaryTitle} 
      MyClass="text-xl font-bold mb-4" 
      />
      {showDescription && (
        <Text
          as="p"
          content={mycartContent.orderSummaryDescription}
          MyClass="text-gray-500 dark:text-white text-sm mb-4"
        />
      )}

      <div className="flex-1 max-h-64 overflow-y-auto pr-2 space-y-2">
        {(items || []).map((item, index) => (
          <ItemsOrder
            key={index}
            src={item.src}
            alt={item.alt || "image"}
            productName={item.productName}
            productQuantity={item.quantity}
            productPrice={`$${item.price}`}
          />
        ))}
      </div>

      {/* Summary Section */}
      <div className="mt-4 space-y-2">
        {summaryRows.map((row, index) => (
          <div key={index} className="flex justify-between">
            <Text
              as="p"
              content={row.label}
              MyClass={row.labelClass || row.className}
            />
            <Text as="p" content={row.value} MyClass={row.className} />
          </div>
        ))}
      </div>

      {showButton && (
        <button
          className="mt-6 w-full bg-[rgb(67,94,72)] hover:bg-[rgb(57,84,62)]  py-2 rounded-lg text-white"
          onClick={onPlaceOrder}
        >
          {mycartContent.placeOrder}
        </button>
      )}
    </div>
  );
};

export default OrderSummary;
