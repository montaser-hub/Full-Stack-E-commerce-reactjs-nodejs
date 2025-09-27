import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

// This function is responsible for integrating static components across all pages.
const RouteLayout = () => {
  return (
    <>
      {/* <Navbar></Navbar> */}
      <Header />
      <Outlet />
      {/* <Footer></Footer> */}
    </>
  );
};

export default RouteLayout;
