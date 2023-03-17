import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import FormPage from "./components/FormPage/FormPage";
import HomePage from "./components/HomePage/HomePage";
import DetailPage from "./components/DetailPage/DetailPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/HomePage" element={<HomePage />}></Route>
        <Route path="/FormPage" element={<FormPage />}></Route>
        <Route path="/DetailPage" element={<DetailPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
