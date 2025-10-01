import { useState } from "react";
import Text from "../SharedElements/Text";
import { Input } from "../SharedElements/Input";
import Button from "../SharedElements/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Register() {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const myTheme = useSelector((state) => state.theme);
  const { content } = useSelector((state) => state.myLang);

  function validateField(name, value) {
    let error = "";

    if (name === "name") {
      if (!value) error = "Name is required";
    }
    if (name === "email") {
      if (!value) error = "Email is required.";
      else if (!/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(value))
        error = "Email is not valid.";
    }
    if (name === "password") {
      if (!value) error = "Create a password";
      else if (value.length < 6)
        error = "Password must be at least 6 characters.";
    }
    if (name === "confirmPassword") {
      if (!value) error = "Re-enter your password";
      else if (value !== info.password) error = "Passwords do not match";
    }
    if (name === "role") {
      if (!value) error = "Select your role";
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

    const nameError = validateField("name", info.name);
    const emailError = validateField("email", info.email);
    const passwordError = validateField("password", info.password);
    const confirmPasswordError = validateField("confirmPassword", info.confirmPassword);
    const roleError = validateField("role", info.role);

    if (!nameError && !emailError && !passwordError && !confirmPasswordError && !roleError) {
      alert("Registration Successful ✅");
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
          content={content["Create Account"]}
          MyClass="text-2xl font-bold text-center mb-2 text-gray-800 dark:text-gray-200"
        />
        <Text
          as="p"
          content={content["Enter your details below to create your ShopSmart account."]}
          MyClass="text-center text-sm text-gray-500 dark:text-gray-400 mb-6"
        />

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <Input
              label={content["Name"]}
              type="text"
              name="name"
              value={info.name}
              onChange={handleChange}
              myClass={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : info.name ? "border-green-500" : "border-gray-300"
              } dark:bg-neutral-700 dark:text-white`}
              placeholder={content["Enter your full name"]}
            />
            {errors.name && <Text as="p" content={errors.name} MyClass="text-red-500 text-sm mt-1" />}
          </div>

          {/* Email */}
          <div>
            <Input
              label={content["Email"]}
              type="email"
              name="email"
              value={info.email}
              onChange={handleChange}
              myClass={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : info.email ? "border-green-500" : "border-gray-300"
              } dark:bg-neutral-700 dark:text-white`}
              placeholder={content["Enter your email address"]}
            />
            {errors.email && <Text as="p" content={errors.email} MyClass="text-red-500 text-sm mt-1" />}
          </div>

          {/* Password */}
          <div>
            <Input
              label={content["Password"]}
              type="password"
              name="password"
              value={info.password}
              onChange={handleChange}
              myClass={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : info.password ? "border-green-500" : "border-gray-300"
              } dark:bg-neutral-700 dark:text-white`}
              placeholder={content["Create a password"]}
              showToggle={true}
            />
            {errors.password && <Text as="p" content={errors.password} MyClass="text-red-500 text-sm mt-1" />}
          </div>

          {/* Confirm Password */}
          <div>
            <Input
              label={content["Confirm Password"]}
              type="password"
              name="confirmPassword"
              value={info.confirmPassword}
              onChange={handleChange}
              myClass={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.confirmPassword ? "border-red-500" : info.confirmPassword ? "border-green-500" : "border-gray-300"
              } dark:bg-neutral-700 dark:text-white`}
              placeholder={content["Re-enter your password"]}
              showToggle={true}
            />
            {errors.confirmPassword && <Text as="p" content={errors.confirmPassword} MyClass="text-red-500 text-sm mt-1" />}
          </div>

          {/* Role */}
          <div>
            <Input
              label={content["Role"]}
              type="select"
              name="role"
              value={info.role}
              onChange={handleChange}
              myClass={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.role ? "border-red-500" : info.role ? "border-green-500" : "border-gray-300"
              } dark:bg-neutral-700 dark:text-white`}
            >
              <option value="">{content["Select your role"]}</option>
              <option value="User">{content["user"]}</option>
              <option value="Admin">{content["admin"]}</option>
            </Input>
            {errors.role && <Text as="p" content={errors.role} MyClass="text-red-500 text-sm mt-1" />}
          </div>

          {/* Submit */}
          <Button
            color="bg-blue-600 hover:bg-blue-700 text-white"
            myClass="w-full font-medium py-2 px-4 rounded-md transition"
            onClick={handleSubmit}
            status={
              errors.name ||
              errors.email ||
              errors.password ||
              errors.confirmPassword ||
              errors.role ||
              !info.name ||
              !info.email ||
              !info.password ||
              !info.confirmPassword ||
              !info.role
            }
            content={content["Register"]}
          />
        </form>

        {/* Login Link */}
        <div className="text-center mt-4">
          <Text
            as="p"
            MyClass="text-sm text-gray-600 dark:text-gray-300"
            content={
              <>
                {content["AccountExists"]}
                <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-400">
                {content["Here"]}
                </Link>.
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
