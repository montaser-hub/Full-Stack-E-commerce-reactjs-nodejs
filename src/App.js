import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./App/Components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<p className="text-3xl text-red-500">Home</p>}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
