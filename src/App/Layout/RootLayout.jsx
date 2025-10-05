import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

// This function is responsible for integrating static components across all pages.
const RouteLayout = () => {
  return (
    <>
      <Header />
       <main className="mt-20 ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RouteLayout;
