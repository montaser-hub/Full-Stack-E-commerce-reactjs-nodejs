import { useState } from "react";
import Text from "../SharedElements/Text";
import { Input } from "../SharedElements/Input";
import Button from "../SharedElements/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

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
  const { content } = useSelector((state) => state.myLang);

   function validateField(name, value) {
    let error = "";

    if (name === "email") {
      if (!value) error = "Email is required";
      else if (!/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(value))
        error = "Invalid email format";
    }

    if (name === "password") {
      if (!value) error = "Password is required";
      else if (value.length < 6)
        error = "Password must be at least 6 characters";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const emailError = validateField("email", info.email);
    const passwordError = validateField("password", info.password);

    if (!emailError && !passwordError) {
      alert("Login Successful ✅");
      console.log("Form submitted:", info);
    }
  }


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
          {/* Email */}
<div>
  <Input
    label={content["Email / Username"]}
    type="text"
    name="email"
    value={info.email}
    onChange={handleChange}  // <-- updated
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
    onChange={handleChange}  // <-- updated
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
               Don't have an account? {" "}
                <Link to="/register" className="text-blue-600 hover:underline dark:text-blue-400">
                  Register here
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