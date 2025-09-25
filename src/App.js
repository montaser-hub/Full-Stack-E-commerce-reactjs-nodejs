import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
      </BrowserRouter>
    </>
  );
}

export default App;
