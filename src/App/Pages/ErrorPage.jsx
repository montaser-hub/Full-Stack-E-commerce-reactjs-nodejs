import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      {/* <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-[3rem] text-indigo-600">
            OOPs
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-green-500 to-green-700 text-white 
              shadow-lg transition-transform duration-300 hover:scale-105 hover:from-green-600 hover:to-green-800"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main> */}
      <main className="min-h-screen flex flex-col items-center justify-center px-6 py-24 
                      sm:py-32 lg:px-8 dark:bg-neutral-900">
  <div className="text-center space-y-6 max-w-2xl">
    {/* رمز الخطأ */}
    <p className="text-[4rem] sm:text-[5rem] font-extrabold text-green-600 drop-shadow-md">
      Oops!
    </p>

    {/* العنوان */}
    <h1 className="text-4xl sm:text-6xl font-bold dark:text-white tracking-tight">
      Page Not Found
    </h1>

    {/* الوصف */}
    <p className="dark:text-white text-lg sm:text-xl leading-relaxed">
      Sorry, we couldn’t find the page you’re looking for.<br />
      It might have been moved or deleted.
    </p>

    {/* الزر */}
    <div className="pt-4">
      <Link
        to="/"
        className="inline-block px-8 py-3 rounded-full font-semibold 
        bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg 
        transition-all duration-300 hover:scale-105 hover:shadow-xl 
        hover:from-green-600 hover:to-green-800 focus:ring-4 focus:ring-green-300"
      >
        Go Back Home
      </Link>
    </div>
  </div>

  {/* زخرفة خفيفة بالخلفية */}
  <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,128,0,0.05)_0%,transparent_70%)]"></div>
</main>

    </>
  );
};

export default ErrorPage;
