import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { IoCubeOutline } from "react-icons/io5";
import { GrCubes } from "react-icons/gr";
import { LuShoppingCart } from "react-icons/lu";
import { FaChartLine } from "react-icons/fa6";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import Text from "../SharedElements/Text.jsx";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const myDashContent = useSelector((state)=> state.myLang.content)

  return (
    <div className="min-h-screen flex flex-col md:grid md:grid-cols-12">
  {/* Sidebar */}
  <aside className="bg-gray-100 dark:bg-neutral-800 md:col-span-2 border-r border-gray-300 p-4 md:min-h-screen flex-shrink-0">
    <nav>
      <ul className="space-y-2">
        {[
          { to: "/dashboard", icon: MdOutlineDashboard, label: myDashContent.dashboardhome, end: true },
          { to: "/dashboard/products", icon: IoCubeOutline, label: myDashContent.manageproducts },
          { to: "/dashboard/categories", icon: GrCubes, label: myDashContent.managecategories },
          { to: "/dashboard/orders", icon: LuShoppingCart, label: myDashContent.manageorders },
          { to: "/dashboard/analytics", icon: FaChartLine, label: myDashContent.analytics },
          { to: "/dashboard/settings", icon: HiOutlineCog6Tooth, label: myDashContent.settings },
        ].map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive
                ? `flex items-center gap-2 px-3 py-2 font-bold text-[#c9c357] dark:text-[#c9c357] relative transition-all 
                  duration-300 before:absolute before:left-[10%] before:bottom-0 before:w-[80%] before:h-[2px] before:bg-[#c9c357] 
                  before:opacity-100 before:transition-all before:duration-500 before:ease-in-out hover:before:opacity-0`
                : `flex items-center gap-2 px-3 py-2 font-bold text-black/60 hover:text-[#c9c357] dark:text-white 
                  dark:hover:text-[#c9c357'] relative`
                }
            >
              <item.icon className="text-xl" />
              <Text as="p" content={item.label} />
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  </aside>

  {/* Content */}
  <main className="flex-1 p-4 md:col-span-10 overflow-auto">
    <Outlet />
  </main>
</div>

  );
};

export default DashboardLayout;
