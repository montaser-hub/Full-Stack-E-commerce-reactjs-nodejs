import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { toggleLang, toggleTheme } from "../../ReduxToolkit/Store";
import { useSelector, useDispatch } from "react-redux";
import Search from "../SharedElements/search.jsx";
import Text from "../SharedElements/Text.jsx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const myTheme = useSelector((state) => state.theme);
  const { lang, content } = useSelector((state) => state.myLang);
  const dispatch = useDispatch();

  const changeTheme = () => dispatch(toggleTheme());
  const changeLang = () => dispatch(toggleLang());
  const favoriteProductsCount = useSelector(
    (state) => state.myFavorites.favoriteProducts.length
  );

  return (
    <nav className="relative z-50 w-full bg-white dark:bg-neutral-900 shadow">
      {/* Grid wrapper */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center px-4 py-3 lg:px-8">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-4">
          {/* Hamburger (only mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden border-0 bg-transparent text-black/60 dark:text-neutral-200 focus:outline-none"
            aria-label="Toggle navigation"
          >
            <svg
              className="w-7 stroke-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Logo */}
          <Link to="/Home" className="flex items-center">
            <img
              src={myTheme === "dark" ? "/logo-white.png" : "/logo-balck.png"}
              alt="Logo"
              className="h-12 w-12 rounded-full"
              loading="lazy"
            />
          </Link>
        </div>
        {/* Middle: Nav Links */}
        <div
          className={`${
            isOpen ? "grid" : "hidden"
          } absolute top-full left-0 w-full bg-white dark:bg-neutral-900 lg:static lg:w-auto lg:grid lg:grid-cols-1`}
        >
          <ul className="grid gap-3 px-4 py-4 lg:flex lg:gap-6 lg:p-0">
            {["Home", "Wishlist", "Cart", "Orders", "Login", "Register"].map(
              (key) => (
                <li key={key} className="relative">
                  <NavLink
                    to={`/${key}`}
                    className={({ isActive }) =>
                      isActive
                        ? `relative inline-block px-2 py-1 font-bold text-[#c9c357] dark:text-[#c9c357] transition-all duration-300 
                          before:absolute before:left-[10%] before:bottom-0 before:w-[80%] before:h-[2px] before:bg-[#c9c357] 
                          before:opacity-100 before:transition-all before:duration-500 before:ease-in-out hover:before:opacity-0`
                        :`block px-2 py-1 font-bold  text-black/60 transition  hover:text-[#c9c357] dark:text-white 
                        dark:hover:text-[#c9c357] duration-300`
                    }
                  >
                    {content[key]}
                  </NavLink>
                  {/* Counter */}
                  {key === "Wishlist" && favoriteProductsCount > 0 && (
                    <Text
                      as="span"
                      content={favoriteProductsCount}
                      MyClass={`absolute top-2 ${
                        lang === "ar" ? "right-0" : "-left-3"
                      } -translate-y-1/2 translate-x-1/2 rounded-full bg-red-600 px-1.5 py-0.5 text-[0.6rem] font-bold text-white`}
                    />
                  )}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 justify-self-end">
          {/*Search*/}
          <Search
            context="search"
            divClass="rounded-full border border-gray-200 hover:border-gray-400 w-full sm:w-64 md:w-80 lg:w-96 overflow-hidden"
            inputClass="border-none focus:outline-none focus:ring-0 px-4 py-2 text-black placeholder-gray-400  w-full sm:w-64 md:w-80 lg:w-96"
            placeholder={content.Search + "..."}
            onSearch={(value) => {
              console.log("Searching from Navbar:", value);
            }}
          />
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative text-neutral-600 dark:text-white"
            >
              <svg
                className="w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.6 24.6 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.2 8.2 0 005.25 9.75V9zm4.5 8.9a2.25 2.25 0 104.5 0 25.06 25.06 0 01-4.5 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="absolute -top-1 left-3 rounded-full bg-red-600 px-1.5 py-0.5 text-[0.6rem] font-bold text-white">
                1
              </span>
            </button>
            {notifOpen && (
              <ul className="absolute right-0 z-50 mt-2 min-w-max rounded-lg bg-white text-sm shadow-lg dark:bg-neutral-800">
                {["Action", "Another action", "Something else here"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        to="#"
                        className="block px-4 py-2 text-neutral-700 hover:bg-zinc-200/60 dark:text-white dark:hover:bg-neutral-700"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>

          {/* Lang + Theme */}
          <button
            onClick={changeLang}
            className="rounded-md border px-2 py-1 text-sm font-medium text-neutral-700 hover:bg-zinc-200/60 dark:text-white dark:hover:bg-neutral-700"
          >
            {lang}
          </button>
          <button
            onClick={changeTheme}
            className="rounded-md border px-2 py-1 text-sm font-medium text-neutral-700 hover:bg-zinc-200/60 dark:text-white dark:hover:bg-neutral-700"
          >
            {myTheme === "light" ? "🌞" : "🌙"}
          </button>

          {/* User */}
          <div className="relative">
            <button onClick={() => setUserOpen(!userOpen)}>
              <img
                src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
                className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 rounded-full object-cover"
                alt="User avatar"
              />
            </button>
            {userOpen && (
              <ul className="absolute right-0 z-50 mt-2 min-w-max rounded-lg bg-white text-sm shadow-lg dark:bg-neutral-800">
                {["Action", "Another action", "Something else here"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        to="#"
                        className="block px-4 py-2 text-neutral-700 hover:bg-zinc-200/60 dark:text-white dark:hover:bg-neutral-700"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
