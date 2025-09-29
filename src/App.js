import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useSelector } from "react-redux";

// Layouts & Pages
import ErrorPage from "./App/Pages/ErrorPage";
// import Home from "./App/Pages/Home";
import DashboardHome from "./App/Pages/Admin/DashboardHome";
import ManageProducts from "./App/Pages/Admin/ManageProducts";
import ManageOrders from "./App/Pages/Admin/ManageOrders";
import ManageCategories from "./App/Pages/Admin/ManageCategories";
import Settings from "./App/Pages/Admin/Settings";
import Analytics from "./App/Pages/Admin/Analytics";

import RouteLayout from "./App/Layout/RootLayout";
import DashboardLayout from "./App/Layout/DashboardLayout";
import Cart from "./App/Pages/Cart";
import Login from "./App/Pages/Login";
import Register from "./App/Pages/Register";

// Define router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RouteLayout />}>
      <Route index element={<h1>Home</h1>} />
      <Route path="cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />



      <Route path="dashboard" element={<DashboardLayout />}>
        {/* Dashboard Pages */}
        <Route index element={<DashboardHome />} />
        <Route path="products" element={<ManageProducts />} />
        <Route path="orders" element={<ManageOrders />} />
        <Route path="categories" element={<ManageCategories />} />
        <Route path="settings" element={<Settings />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
      {/* Error page */}
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

const App = () => {
  const myTheme = useSelector((state) => state.theme); // "light" or "dark"
  const { lang } = useSelector((state) => state.myLang); // "en" or "ar"

  return (
    <div
      className={
        myTheme === "dark"
          ? "dark bg-neutral-900 text-white"
          : "bg-white text-black"
      }
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
