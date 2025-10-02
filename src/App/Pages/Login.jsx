import { useState } from "react";
import Text from "../SharedElements/Text";
import { Input } from "../SharedElements/Input";
import Button from "../SharedElements/Button";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosInstance } from "../AxiosInstance/AxiosInstance";
import Alert from "../SharedElements/Alert";

function Login() {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const myTheme = useSelector((state) => state.theme);
  const { content } = useSelector((state) => state.myLang);

  const navigate = useNavigate();

  function validateField(name, value) {
    let error = "";

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

    const emailError = validateField("email", info.email);
    const passwordError = validateField("password", info.password);

    if (!emailError && !passwordError) {
      try {
        const response = await axiosInstance.post("/users/signin", {
          email: info.email,
          password: info.password,
        });

        localStorage.setItem("token", response.data.token);
        console.log("Response from server:", response.data);

        setToast({ show: true, message: content.loginSuccess || "Logged in successfully!", type: "success" });

        setTimeout(() => {
          navigate("/home");
        }, 2000);

      } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        console.error(errorMessage);

        setToast({ show: true, message: errorMessage, type: "error" });
      }
    }
  }

  const isFormInvalid = errors.email || errors.password || !info.email || !info.password;

  return (
    <div className={`min-h-screen flex items-center justify-center ${myTheme === "dark" ? "bg-neutral-900" : "bg-gray-100"}`}>
      <div className={"bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-md w-full max-w-md"}>
        <img
          src={myTheme === "dark" ? "/logo-white.png" : "/logo-balck.png"}
          alt="Logo"
          className="h-12 w-12 rounded-full mx-auto"
          loading="lazy"
        />

        <Text
          as="h2"
          content={content.title}
          MyClass="text-2xl font-bold text-center mb-2 text-gray-800 dark:text-gray-200"
        />
        <Text
          as="p"
          content={content.subTitle}
          MyClass="text-center text-sm text-gray-500 dark:text-gray-400 mb-6"
        />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              label={content.Input1}
              type="email"
              name="email"
              value={info.email}
              onChange={handleChange}
              myClass={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : info.email ? "border-green-500" : "border-gray-300"
              } dark:bg-neutral-700 dark:text-white`}
              placeholder={content.emailPlaceHolder}
            />
            {errors.email && <Text as="p" content={errors.email} MyClass="text-red-500 text-sm mt-1" />}
          </div>

          <div>
            <Input
              label={content.Input2}
              type="password"
              name="password"
              value={info.password}
              onChange={handleChange}
              myClass={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : info.password ? "border-green-500" : "border-gray-300"
              } dark:bg-neutral-700 dark:text-white`}
              placeholder={content.passwordPlaceHolder}
              showToggle={true}
            />
            {errors.password && <Text as="p" content={errors.password} MyClass="text-red-500 text-sm mt-1" />}
          </div>

          <div className="text-right">
            <Link to="/forgetPassword" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
              {content.passwordForgot}
            </Link>
          </div>

          <Button
            color="bg-blue-600 hover:bg-blue-700 text-white"
            myClass={`w-full h-12 flex items-center justify-center gap-2 font-medium 
                      bg-gradient-to-r from-[rgb(67,94,72)] to-[rgb(87,114,92)]
                      rounded-xl shadow-md 
                      hover:from-[rgb(57,84,62)] hover:to-[rgb(77,104,82)] 
                      active:scale-95 transition-all duration-200`}
            onClick={handleSubmit}
            status={isFormInvalid}
            content={content.SignIn}
          />
        </form>

        <div className="text-center mt-4">
          <Text
            as="p"
            MyClass="text-sm text-gray-600 dark:text-gray-300"
            content={
              <>
                {content.DontHaveAccount}
                <Link to="/register" className="text-blue-600 hover:underline dark:text-blue-400">
                  {content.Register}
                </Link>.
              </>
            }
          />
        </div>
      </div>

      {toast.show && (
        <Alert
          type={toast.type}
          message={toast.message}
          duration={2000}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
}

export default Login;