import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Text from "../SharedElements/Text";
import { Input } from "../SharedElements/Input";
import Button from "../SharedElements/Button";
import Alert from "../SharedElements/Alert";
import { axiosInstance } from "../AxiosInstance/AxiosInstance";

function Register() {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState({
    show: false,
    type: "info",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const myTheme = useSelector((state) => state.theme);
  const { content } = useSelector((state) => state.myLang);

  function validateField(name, value) {
    let error = "";

    if (name === "name" && !value) error = content.reqname;
    if (name === "email") {
      if (!value) error = content.emailRequired;
      else if (!/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(value))
        error = content.invalidEmail;
    }
   if (name === "password") {
  if (!value) {
    error = content.reqpassword;
  } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(value)) {
    error = content.passErrPattern; 
  }
}

    if (name === "confirmPassword") {
      if (!value) error = content.reqpassword;
      else if (value !== info.password) error = content.unmatch;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Run validation for all fields
    const nameError = validateField("name", info.name);
    const emailError = validateField("email", info.email);
    const passwordError = validateField("password", info.password);
    const confirmPasswordError = validateField(
      "confirmPassword",
      info.confirmPassword
    );

    if (nameError || emailError || passwordError || confirmPasswordError)
      return;

    setLoading(true);
    try {
      const res = await axiosInstance.post("/users/signup", {
        name: info.name,
        email: info.email,
        password: info.password,
        passwordConfirm: info.confirmPassword,
        role: "user",
      });
      const token = res.data.verifyToken;
       await axiosInstance.put(`/users/confirm/${token}`);

      token && localStorage.setItem( "token", token );
      setShowToast({
        type: "success",
        show: true,
        message: "Registration successful!",
      });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Signup error:", err);
      setShowToast({
        type: "error",
        show: true,
        message:
          err.response?.data?.message ||
          "Registration failed. Please try again.",
      });
    } finally {
      setLoading(false);
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
          content={content.regTitle}
          MyClass="text-2xl font-bold text-center mb-2 text-gray-800 dark:text-gray-200"
        />
        <Text
          as="p"
          content={content.regSubTitle}
          MyClass="text-center text-sm text-gray-500 dark:text-gray-400 mb-6"
        />

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <Input
            label={content.nameinput}
            type="text"
            name="name"
            value={info.name}
            onChange={handleChange}
            myClass={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name
                ? "border-red-500"
                : info.name
                ? "border-green-500"
                : "border-gray-300"
            } dark:bg-neutral-700 dark:text-white`}
            placeholder={content.namePlaceholder}
          />
          {errors.name && (
            <Text
              as="p"
              content={errors.name}
              MyClass="text-red-500 text-sm mt-1"
            />
          )}

          {/* Email */}
          <Input
            label={content.inputemail}
            type="email"
            name="email"
            value={info.email}
            onChange={handleChange}
            myClass={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email
                ? "border-red-500"
                : info.email
                ? "border-green-500"
                : "border-gray-300"
            } dark:bg-neutral-700 dark:text-white`}
            placeholder={content.regEmailPlaceholder}
          />
          {errors.email && (
            <Text
              as="p"
              content={errors.email}
              MyClass="text-red-500 text-sm mt-1"
            />
          )}

          {/* Password */}
          <Input
            label={content.regpassword}
            type="password"
            name="password"
            value={info.password}
            onChange={handleChange}
            myClass={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.password
                ? "border-red-500"
                : info.password
                ? "border-green-500"
                : "border-gray-300"
            } dark:bg-neutral-700 dark:text-white`}
            placeholder={content.regpasswordPlaceholder}
            showToggle
          />
          {errors.password && (
            <Text
              as="p"
              content={errors.password}
              MyClass="text-red-500 text-sm mt-1"
            />
          )}

          {/* Confirm Password */}
          <Input
            label={content.confirmPassword}
            type="password"
            name="confirmPassword"
            value={info.confirmPassword}
            onChange={handleChange}
            myClass={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.confirmPassword
                ? "border-red-500"
                : info.confirmPassword
                ? "border-green-500"
                : "border-gray-300"
            } dark:bg-neutral-700 dark:text-white`}
            placeholder={content.confirmPasswordPlaceholder}
            showToggle
          />
          {errors.confirmPassword && (
            <Text
              as="p"
              content={errors.confirmPassword}
              MyClass="text-red-500 text-sm mt-1"
            />
          )}

          {/* Submit */}
          <Button
            type="submit"
            color="bg-blue-600 hover:bg-blue-700 text-white"
            myClass="w-full h-12 flex items-center justify-center gap-2 font-medium 
                     bg-gradient-to-r from-[rgb(67,94,72)] to-[rgb(87,114,92)]
                     rounded-xl shadow-md hover:from-[rgb(57,84,62)] hover:to-[rgb(77,104,82)] 
                     active:scale-95 transition-all duration-200"
            disabled={loading}
            content={loading ? "Registering..." : content.Register}
          />
        </form>

        {/* Login Link */}
        <div className="text-center mt-4">
          <Text
            as="p"
            MyClass="text-sm text-gray-600 dark:text-gray-300"
            content={
              <>
                {content.accExists}
                <Link
                  to="/login"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  {content.Here}
                </Link>
                .
              </>
            }
          />
        </div>
      </div>

      {/* Toast */}
      {showToast.show && (
        <Alert
          type={showToast.type}
          message={showToast.message}
          onClose={() => setShowToast({ ...showToast, show: false })}
        />
      )}
    </div>
  );
}

export default Register;
