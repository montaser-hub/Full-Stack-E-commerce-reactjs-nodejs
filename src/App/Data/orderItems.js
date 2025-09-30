export const orders = [
  {
    id: "ORD001",
    date: "2024-07-20",
    items: [
      {
        src: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png",
        alt: "Noise-Cancelling Headphones",
        productName: "Noise-Cancelling Headphones",
        quantity: 1,
        price: 199.5,
      },
      {
        src: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png",
        alt: "Wireless Ergonomic Keyboard",
        productName: "Wireless Ergonomic Keyboard",
        quantity: 2,
        price: 75.0,
      },
    ],
    subtotal: 349.5,
    shipping: 20,
    tax: 28,
    discount: 10,
    total: 387.5,
    status: "pending", // بدل Confirmed بخيارات backend
    paymentMethodType: "card",
    isPaid: false,
    isDelivered: false,
    shippingAddress: {
      city: "Cairo",
      street: "El-Tahrir Street",
      details: "Apartment 12, Building 5",
    },
    createdAt: "2024-07-20T10:00:00.000Z",
    updatedAt: "2024-07-20T12:00:00.000Z",
  },
  {
    id: "ORD002",
    date: "2024-07-21",
    items: [
      {
        src: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png",
        alt: "Wireless Ergonomic Keyboard",
        productName: "Wireless Ergonomic Keyboard",
        quantity: 2,
        price: 75.0,
      },
      {
        src: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png",
        alt: "Noise-Cancelling Headphones",
        productName: "Noise-Cancelling Headphones",
        quantity: 1,
        price: 199.5,
      },
    ],
    subtotal: 349.5,
    shipping: 20,
    tax: 28,
    discount: 10,
    total: 387.5,
    status: "completed",
    paymentMethodType: "cash",
    isPaid: true,
    isDelivered: true,
    shippingAddress: {
      city: "Giza",
      street: "Mountain Street",
      details: "Villa 20",
    },
    createdAt: "2024-07-21T09:00:00.000Z",
    updatedAt: "2024-07-21T18:00:00.000Z",
    deliveredAt: "2024-07-21T18:00:00.000Z",
  },
];

export const stats = [
  {
    title: "Total Orders",
    value: 120,
    subtitle: "All orders placed",
    type: "total",
  },
  {
    title: "Completed Orders",
    value: 5,
    subtitle: "Successfully delivered",
    type: "completed",
  },
  {
    title: "Pending Orders",
    value: 5,
    subtitle: "Awaiting confirmation",
    type: "pending",
  },
];
