import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { toggleLang, toggleTheme } from "../../ReduxToolkit/Store";
import { useSelector, useDispatch } from "react-redux";
import Search from "../SharedElements/search.jsx";
import Text from "../SharedElements/Text.jsx";
import { axiosInstance } from "../AxiosInstance/AxiosInstance";
import { setCart } from "../../ReduxToolkit/Store.jsx";
import { useSearchParams } from "react-router-dom";
import { setSearch } from "../../ReduxToolkit/Store";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const myTheme = useSelector((state) => state.theme);
  const { lang, content } = useSelector((state) => state.myLang);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeTheme = () => dispatch(toggleTheme());
  const changeLang = () => dispatch(toggleLang());
  const favoriteProductsCount = useSelector(
    (state) => state.myFavorites.favoriteProducts.length
  );

  const location = useLocation();
  const authPages = ["/", "/login", "/register"];
  const isAuthPage = authPages.includes(location.pathname.toLowerCase());
  const hamburgerRef = useRef(null);
  const userRef = useRef(null);
  const [setLastClickedLink] = useState(null);
  const notifRef = useRef( null );
  const cartItems = useSelector( ( state ) => state.cart.cartItems );
  const searchKeyword = useSelector( ( state ) => state.search.keyword );
  
  
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (keyword) => {
    dispatch(setSearch(keyword));
    setSearchParams({ query: keyword });
  };


  const handleLinkClick = (key) => {
    setLastClickedLink(key);
    setIsOpen(false);
    setUserOpen(false);
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/users/logout");
      setIsOpen(false);
      setUserOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setUserOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [] );

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const query = searchParams.get("query");
        if (query && query !== searchKeyword) {
          dispatch(setSearch(query));
        }

        const res = await axiosInstance.get(`/carts?query=${searchKeyword}`);
        const data = res.data.data;
        console.log("Cart fetched:", data);
        dispatch(
          setCart({
            items: data.items.map((i) => ({
              id: i._id,
              productId: i.productId._id,
              name: i.productId.name,
              price: i.productId.price,
              src: i.productId.images[0],
              quantity: i.quantity,
            })),
            totalPrice: data.subTotal,
          })
        );
      } catch (err) {
        console.error("Failed to load cart:", err);
      }
    };

    fetchCart();
  }, [dispatch, searchParams, searchKeyword]);

  const navLinks = ["Home", "Wishlist", "Cart", "Orders"];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white dark:bg-neutral-900 shadow">
      {/* Grid wrapper */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center px-4 py-3 lg:px-8">
        <div className="flex items-center gap-4">
          {!isAuthPage && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden border-0 bg-transparent text-black/60 dark:text-neutral-200 focus:outline-none"
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
          )}

          <Link to="/" className="flex items-center">
            <img
              src={myTheme === "dark" ? "/logo-white.png" : "/logo-balck.png"}
              alt="Logo"
              className="h-12 w-12 rounded-full"
              loading="lazy"
            />
          </Link>
        </div>

        <div className="flex-1 flex justify-start items-center">
          {isAuthPage ? (
            <ul className="hidden lg:flex gap-6">
              {["Login", "Register"].map((key) => (
                <li key={key}>
                  <NavLink
                    to={`/${key}`}
                    className={({ isActive }) =>
                        isActive
                          ? "block px-2 py-1 font-bold underline text-[#c9c357] dark:text-white rounded-md"
                          : "block px-2 py-1 font-bold text-black/60 hover:text-[#c9c357] dark:text-white dark:hover:text-white"
                      }
                  >
                    {content[key]}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="hidden lg:flex gap-6">
              {navLinks.map((key) => (
                <li key={key} className="relative">
                  <NavLink
                    to={`/${key}`}
                    className={({ isActive }) =>
                      isActive
                        ? "font-bold underline text-[#c9c357] dark:text-[#c9c357]"
                        : "font-bold text-black/60 hover:text-[#c9c357] dark:text-white dark:hover:text-[#c9c357] transition-colors duration-300"
                    }
                  >
                    {content[key]}
                  </NavLink>
                  {/* Wishlist count */}
                  {key === "Wishlist" && favoriteProductsCount > 0 && (
                    <Text
                      as="span"
                      content={favoriteProductsCount}
                      MyClass={`absolute top-0 ${
                        lang === "ar" ? "right-0" : "-left-5"
                      } -translate-y-1/2 translate-x-1/2 rounded-full bg-red-600 px-1.5 py-0.5 text-[0.6rem] font-bold text-white`}
                    />
                  )}
                  {/* Cart count */}
                  {key === "Cart" && cartItems.length > 0 && (
                    <Text
                      as="span"
                      content={cartItems.length}
                      MyClass={`absolute top-0 ${
                        lang === "ar" ? "right-0" : "-left-5"
                      } -translate-y-1/2 translate-x-1/2 rounded-full bg-red-600 px-1.5 py-0.5 text-[0.6rem] font-bold text-white`}
                    />
                  )}
                </li>
              ))}
            </ul>
          )}

          {!isAuthPage && (
            <div
              ref={hamburgerRef}
              className={`${
                isOpen ? "grid" : "hidden"
              } absolute top-full left-0 z-50 w-40 rounded-lg bg-white shadow-lg dark:bg-neutral-800 lg:hidden`}
            >
              <ul className="flex flex-col gap-1 p-2 text-sm">
                {navLinks.map((key) => (
                  <li key={key} className="relative">
                    <NavLink
                      to={`/${key}`}
                      onClick={() => handleLinkClick(key)}
                      className={({ isActive }) =>
                        isActive
                          ? "block px-2 py-1 font-bold underline text-[#c9c357] dark:text-white rounded-md"
                          : "block px-2 py-1 font-bold text-black/60 hover:text-[#c9c357] dark:text-white dark:hover:text-white"
                      }
                    >
                      {content[key]}
                    </NavLink>
                    {key === "Wishlist" && favoriteProductsCount > 0 && (
                      <Text
                        as="span"
                        content={favoriteProductsCount}
                        MyClass="absolute top-5 -left-4 rounded-full bg-red-600 px-1.5 py-0.5 text-[0.6rem] font-bold text-white"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 justify-self-end">
          {!isAuthPage && (
            <>
              <Search
                context="search"
                divClass="hidden sm:flex rounded-full border border-gray-200 hover:border-gray-400 w-full sm:w-64 md:w-80 lg:w-96 overflow-hidden"
                inputClass="border-none focus:outline-none focus:ring-0 px-4 py-2 text-black placeholder-gray-400 w-full sm:w-64 md:w-80 lg:w-96"
                placeholder={content.Search + "..."}
                onSearch={handleSearch}                
              />

              <div className="relative" ref={notifRef}>
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
                            onClick={() => setNotifOpen(false)}
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
            </>
          )}

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

          {!isAuthPage && (
            <>
              <div className="relative" ref={userRef}>
                <button onClick={() => setUserOpen(!userOpen)}>
                  <img
                    src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
                    className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-10 lg:w-10 rounded-full object-cover"
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
                            onClick={() => handleLinkClick(item)}
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

              <button
                onClick={handleLogout}
                className="ml-2 text-red-600 hover:text-red-800"
                title="Logout"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
