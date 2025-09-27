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
import Home from "./App/Pages/Home";
import RouteLayout from "./App/Layout/RootLayout";

// Define router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RouteLayout />}>
      <Route index element={<Home />} />
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
