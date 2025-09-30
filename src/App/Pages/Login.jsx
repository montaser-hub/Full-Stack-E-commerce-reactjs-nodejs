import { useState } from "react";
import Text from "../SharedElements/Text";
import { Input } from "../SharedElements/Input";
import Button from "../SharedElements/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleLang } from "../../ReduxToolkit/Store";
import { toggleTheme } from "../../ReduxToolkit/Store";

function Login() {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const myTheme = useSelector((state) => state.theme);
  const { lang, content } = useSelector((state) => state.myLang);
  const dispatch = useDispatch();

  const changeTheme = () => dispatch(toggleTheme());
  const changeLang = () => dispatch(toggleLang());

  const handleForm = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setInfo({ ...info, email: value });
      setErrors({
        ...errors,
        email:
          value.length === 0
            ? content["Email is required."]
            : !/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(value)
            ? content["Email is not valid."]
            : "",
      });
    } else if (name === "password") {
      setInfo({ ...info, password: value });
      setErrors({
        ...errors,
        password:
          value.length === 0
            ? content["Password must be at least 6 characters."]
            : value.length < 6
            ? content["Password must be at least 6 characters."]
            : "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.email && !errors.password && info.email && info.password) {
      console.log("Form submitted:", info);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${myTheme === "dark" ? "bg-neutral-900" : "bg-gray-100"}`}>
      <div className={`bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-md w-full max-w-md`}>
        {/* Logo */}
        <img
              src={myTheme === "dark" ? "/logo-white.png" : "/logo-balck.png"}
          alt="Logo"
          className="h-12 w-12 rounded-full mx-auto"
          loading="lazy"
        />

        {/* Title */}
        <Text
          as="h2"
          content={content["Login to ShopSmart"]}
          MyClass="text-2xl font-bold text-center mb-2 text-gray-800 dark:text-gray-200"
        />
        <Text
          as="p"
          content={content["Please enter your details back!"]}
          MyClass="text-center text-sm text-gray-500 dark:text-gray-400 mb-6"
        />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <Input
              label={content["Email / Username"]}
              type="text"
              name="email"
              value={info.email}
              onChange={handleForm}
              myClass={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email
                  ? "border-red-500"
                  : info.email
                  ? "border-green-500"
                  : "border-gray-300"
              } dark:bg-neutral-700 dark:text-white`}
              placeholder={content["Enter your email"]}
            />
            {errors.email && (
              <Text
                as="p"
                content={errors.email}
                MyClass="text-red-500 text-sm mt-1"
              />
            )}
          </div>

          {/* Password */}
          <div>
            <Input
              label={content["Password"]}
              type="password"
              name="password"
              value={info.password}
              onChange={handleForm}
              myClass={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password
                  ? "border-red-500"
                  : info.password
                  ? "border-green-500"
                  : "border-gray-300"
              } dark:bg-neutral-700 dark:text-white`}
              placeholder={content["Enter your password"]}
              showToggle={true}
            />
            {errors.password && (
              <Text
                as="p"
                content={errors.password}
                MyClass="text-red-500 text-sm mt-1"
              />
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="#"
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              {content["Forgot Password?"]}
            </Link>
          </div>

          {/* Submit */}
          <Button
            color="bg-blue-600 hover:bg-blue-700 text-white"
            myClass="w-full font-medium py-2 px-4 rounded-md transition"
            onClick={handleSubmit}
            status={
              errors.email || errors.password || !info.email || !info.password
            }
            content={content["Sign In"]}
          />
        </form>

        {/* Register Link */}
        <div className="text-center mt-4">
          <Text
            as="p"
            MyClass="text-sm text-gray-600 dark:text-gray-300"
            content={
              <>
                {content["Don't have an account? "]}{" "}
                <Link to="/register" className="text-blue-600 hover:underline dark:text-blue-400">
                  {content["Register here"]}
                </Link>
                .
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Login;