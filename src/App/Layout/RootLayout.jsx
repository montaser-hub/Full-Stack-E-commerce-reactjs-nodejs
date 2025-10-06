import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

// This function is responsible for integrating static components across all pages.
const RouteLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-20">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default RouteLayout;
