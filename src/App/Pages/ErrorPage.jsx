import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Text from "../SharedElements/Text";

const ErrorPage = () => {
  const myContent = useSelector((state)=> state.myLang.content)
  return (
  <>
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-24 sm:py-32 lg:px-8 dark:bg-neutral-900">
      <div className="text-center space-y-6 max-w-2xl">
        <Text as="p" content={myContent.oops} MyClass="text-[4rem] sm:text-[5rem] font-extrabold text-green-600 drop-shadow-md" />
        <Text as="h1" content={myContent.notfoundtitle} MyClass="text-4xl sm:text-6xl font-bold dark:text-white tracking-tight" />
        <Text as="p" content={myContent.notfoundmessage1} MyClass="dark:text-white text-lg sm:text-xl leading-relaxed" />
        <Text as="p" content={myContent.notfoundmessage2} MyClass="dark:text-white text-lg sm:text-xl leading-relaxed" />
        <div className="pt-4">
          <Text as="p" content={myContent.notfoundmessage3} MyClass="mb-2 dark:text-white text-lg sm:text-xl leading-relaxed" />
          <Link
            to="/"
            className="bg-gradient-to-r from-[rgb(67,94,72)] to-[rgb(87,114,92)] text-white hover:from-[rgb(57,84,62)]
            hover:to-[rgb(77,104,82)] active:scale-95  inline-block px-8 py-3 rounded-full font-semibold shadow-lg transition-all 
            duration-300 hover:scale-105 hover:shadow-xl"
          >
            Go Back Home
          </Link>
        </div>
      </div>
      <div></div>
    </main>
  </>
  );
};

export default ErrorPage;
