import { Routes, Route } from "react-router-dom";
import SelectionPage from "./pages/SelectionPage";
import LoadingPage from "./pages/LoadingPage";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SelectionPage />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
}

export default App;
