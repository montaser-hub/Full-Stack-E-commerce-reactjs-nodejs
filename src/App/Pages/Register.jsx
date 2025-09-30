import { useState } from "react";
import Text from "../SharedElements/Text";
import { Input } from "../SharedElements/Input";
import Button from "../SharedElements/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleLang } from "../../ReduxToolkit/Store";
import { toggleTheme } from "../../ReduxToolkit/Store";

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
  const { lang, content } = useSelector((state) => state.myLang);
  const dispatch = useDispatch();

  const changeTheme = () => dispatch(toggleTheme());
  const changeLang = () => dispatch(toggleLang());

  const handleForm = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setInfo({ ...info, name: value });
      setErrors({
        ...errors,
        name: value.length === 0 ? content["Name is required"] : "",
      });
    } else if (name === "email") {
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
            ? content["Create a password"]
            : value.length < 6
            ? content["Password must be at least 6 characters."]
            : "",
      });
    } else if (name === "confirmPassword") {
      setInfo({ ...info, confirmPassword: value });
      setErrors({
        ...errors,
        confirmPassword:
          value.length === 0
            ? content["Re-enter your password"]
            : value !== info.password
            ? content["Passwords do not match"]
            : "",
      });
    } else if (name === "role") {
      setInfo({ ...info, role: value });
      setErrors({
        ...errors,
        role: value.length === 0 ? content["Select your role"] : "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !errors.name &&
      !errors.email &&
      !errors.password &&
      !errors.confirmPassword &&
      !errors.role &&
      info.name &&
      info.email &&
      info.password &&
      info.confirmPassword &&
      info.role
    ) {
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
          content={content["Create Account"]}
          MyClass="text-2xl font-bold text-center mb-2 text-gray-800 dark:text-gray-200"
        />
        <Text
          as="p"
          content={content["Enter your details below to create your ShopSmart account."]}
          MyClass="text-center text-sm text-gray-500 dark:text-gray-400 mb-6"
        />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <Input
              label={content["Name"]}
              type="text"
              name="name"
              value={info.name}
              onChange={handleForm}
              myClass={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name
                  ? "border-red-500"
                  : info.name
                  ? "border-green-500"
                  : "border-gray-300"
              } dark:bg-neutral-700 dark:text-white`}
              placeholder={content["Enter your full name"]}
            />
            {errors.name && (
              <Text
                as="p"
                content={errors.name}
                MyClass="text-red-500 text-sm mt-1"
              />
            )}
          </div>

          {/* Email */}
          <div>
            <Input
              label={content["Email"]}
              type="email"
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
              placeholder={content["Enter your email address"]}
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
              placeholder={content["Create a password"]}
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

          {/* Confirm Password */}
          <div>
            <Input
              label={content["Confirm Password"]}
              type="password"
              name="confirmPassword"
              value={info.confirmPassword}
              onChange={handleForm}
              myClass={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.confirmPassword
                  ? "border-red-500"
                  : info.confirmPassword
                  ? "border-green-500"
                  : "border-gray-300"
              } dark:bg-neutral-700 dark:text-white`}
              placeholder={content["Re-enter your password"]}
              showToggle={true}
            />
            {errors.confirmPassword && (
              <Text
                as="p"
                content={errors.confirmPassword}
                MyClass="text-red-500 text-sm mt-1"
              />
            )}
          </div>

          {/* Role */}
          <div>
            <Input
              label={content["Role"]}
              type="select"
              name="role"
              value={info.role}
              onChange={handleForm}
              myClass={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.role
                  ? "border-red-500"
                  : info.role
                  ? "border-green-500"
                  : "border-gray-300"
              } dark:bg-neutral-700 dark:text-white`}
            >
              <option value="">{content["Select your role"]}</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </Input>
            {errors.role && (
              <Text
                as="p"
                content={errors.role}
                MyClass="text-red-500 text-sm mt-1"
              />
            )}
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
                {content["Already have an account? "]}
                <Link
                  to="/login"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  {content["Login here"]}
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

export default Register;