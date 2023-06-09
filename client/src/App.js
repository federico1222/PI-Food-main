import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import FormPage from "./components/FormPage/FormPage";
import HomePage from "./components/HomePage/HomePage";
import DetailPage from "./components/DetailPage/DetailPage";
import FavoritePage from "./components/FavoritePage/FavoritePage";
import Diets from "./components/Diets/Diets";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/HomePage" element={<HomePage />}></Route>
        <Route path="/FormPage" element={<FormPage />}></Route>
        <Route path="/DetailPage/:id" element={<DetailPage />} />
        <Route path="/Diets" element={<Diets />} />
        <Route path="/FavoritePage" element={<FavoritePage />} />
      </Routes>
    </div>
  );
}

export default App;
