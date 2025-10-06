import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Layouts & Pages
import ErrorPage from "./App/Pages/ErrorPage";
import Home from "./App/Pages/Home";
import DashboardHome from "./App/Pages/Admin/DashboardHome";
import ManageProducts from "./App/Pages/Admin/ManageProducts";
import ManageOrders from "./App/Pages/Admin/ManageOrders";
import ManageCategories from "./App/Pages/Admin/ManageCategories";
import Settings from "./App/Pages/Admin/Settings";
import Analytics from "./App/Pages/Admin/Analytics";
import ProductDetails from "./App/Pages/ProductDetails";
import RouteLayout from "./App/Layout/RootLayout";
import DashboardLayout from "./App/Layout/DashboardLayout";
import Cart from "./App/Pages/Cart";
import Orders from "./App/Pages/Orders";
import Login from "./App/Pages/Login";
import Register from "./App/Pages/Register";
import Wishlist from "./App/Pages/Wishlist";
import Checkout from "./App/Pages/Checkout";
import OrderConfirmation from "./App/Pages/OrderConfirmation";
import PaymentCancel from "./App/Pages/PaymentCancel";
import Loader from "./App/SharedElements/spinner.jsx";
import LandingPage from "./App/Pages/LandingPage.jsx";
<<<<<<< HEAD
import ProtectRoute from "./App/Auth/ProtectedRoute";
import AdminRoute from "./App/Auth/AdminRoute";
import ScrollToTop from "./App/Components/ScrollToTop"

=======
import { useEffect } from "react";
import { fetchCart } from "./ReduxToolkit/cartSlice.jsx";
>>>>>>> 3870cb47bfdffb74774ac4b86bc2974168330b7b

// Define router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<><ScrollToTop /> <RouteLayout /></>}>
      <Route index element={<LandingPage />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />


      <Route element={<ProtectRoute />}>
        <Route path="home" element={<Home />} />
        <Route path="checkout" element={<Checkout />} />
        <Route
          path="order-confirmation/:orderId"
          element={<OrderConfirmation />}
        />
        <Route path="payments/cancel" element={<PaymentCancel />} />
        <Route path="home" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products/:id" element={<ProductDetails />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="dashboard" element={<DashboardLayout />}>
          {/* Dashboard Pages */}
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="orders" element={<ManageOrders />} />
          <Route path="categories" element={<ManageCategories />} />
          <Route path="settings" element={<Settings />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Route>
      {/* Error page */}
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

const App = () => {
  const myTheme = useSelector((state) => state.theme); // "light" or "dark"
  const { lang } = useSelector((state) => state.myLang); // "en" or "ar"
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [ dispatch ] );
  
  return (
    <div
      className={
        myTheme === "dark"
          ? "dark bg-neutral-900 text-white"
          : "bg-white text-black"
      }
      dir={lang === "ar" ? "rtl" : "ltr"}
    >

      <Loader />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
