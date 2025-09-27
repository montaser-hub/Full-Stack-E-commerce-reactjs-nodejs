import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-12">
      {/* Sidebar */}
      <aside className="col-span-2 border-r border-gray-300  p-4">
        <nav>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/dashboard/products"
                className={({ isActive }) =>
                  isActive
                    ? "block rounded px-3 py-2 font-bold bg-[#4148c5] text-white"
                    : "block rounded px-3 py-2 font-bold text-[#848484] hover:bg-[#bababa] hover:text-white"
                }
              >
                Manage Products
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
                Manage Orders
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
                Manage Categories
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
                Analytics
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
                Settings
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
