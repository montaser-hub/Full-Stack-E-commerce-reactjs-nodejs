import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { IoCubeOutline } from "react-icons/io5";
import { GrCubes } from "react-icons/gr";
import { LuShoppingCart } from "react-icons/lu";
import { FaChartLine } from "react-icons/fa6";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import Text from "../SharedElements/Text.jsx";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-12">
      {/* Sidebar */}
      <aside className="col-span-2 border-r border-gray-300  p-4">
        <nav>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "block rounded px-3 py-2 font-bold bg-[#4148c5] dark:bg-[#43434c] text-white "
                    : "block rounded px-3 py-2 font-bold text-[#848484] hover:bg-[#bababa] hover:text-white"
                }
              > 
                <div className="flex items-center gap-2">
                  <MdOutlineDashboard className="text-xl" /> 
                  <Text as="p" content="Dashboard" />
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/products"
                className={({ isActive }) =>
                  isActive
                    ? "block rounded px-3 py-2 font-bold bg-[#4148c5] text-white"
                    : "block rounded px-3 py-2 font-bold text-[#848484] hover:bg-[#bababa] hover:text-white"
                }
              >
                <div className="flex items-center gap-2">
                <IoCubeOutline className="text-xl" />
                <Text as="p" content="Manage Products" />
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/orders"
                className={({ isActive }) =>
                  isActive
                    ? "block rounded px-3 py-2 font-bold bg-[#4148c5] text-white"
                    : "block rounded px-3 py-2 font-bold text-[#848484] hover:bg-[#bababa] hover:text-white"
                }
              >
                <div className="flex items-center gap-2">
                <GrCubes className="text-xl" />
                <Text as="p" content="Manage Categories" />
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/categories"
                className={({ isActive }) =>
                  isActive
                    ? "block rounded px-3 py-2 font-bold bg-[#4148c5] text-white"
                    : "block rounded px-3 py-2 font-bold text-[#848484] hover:bg-[#bababa] hover:text-white"
                }
              >
                <div className="flex items-center gap-2">
                <LuShoppingCart className="text-xl" />
                <Text as="p" content="Manage Orders" />
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/analytics"
                className={({ isActive }) =>
                  isActive
                    ? "block rounded px-3 py-2 font-bold bg-[#4148c5] text-white"
                    : "block rounded px-3 py-2 font-bold text-[#848484] hover:bg-[#bababa] hover:text-white"
                }
              >
                <div className="flex items-center gap-2">
                <FaChartLine className="text-xl" />
                <Text as="p" content="Analytics" />
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/settings"
                className={({ isActive }) =>
                  isActive
                    ? "block rounded px-3 py-2 font-bold bg-[#4148c5] text-white"
                    : "block rounded px-3 py-2 font-bold text-[#848484] hover:bg-[#bababa] hover:text-white"
                }
              >
                <div className="flex items-center gap-2">
                <HiOutlineCog6Tooth className="text-xl" />
                <Text as="p" content="Settings" />
                </div>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Content */}
      <main className="col-span-9 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
