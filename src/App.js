import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./App/Components/Header";
import { useSelector } from "react-redux";

function App() {
  const myTheme = useSelector((state) => state.theme); // "light" or "dark"
  const { lang } = useSelector((state) => state.myLang); // "en" or "ar"
  return (
    <>
      <div className={myTheme === "dark" ? "dark bg-neutral-900 text-white" : "bg-white text-black"} dir={lang === "ar" ? "rtl" : "ltr"}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<p className="text-3xl text-red-500">Home</p>}
          />
        </Routes>
      </BrowserRouter>
      </div>
    </>
  );
}

export default App;
