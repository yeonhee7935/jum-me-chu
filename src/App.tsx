import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SelectionPage from "./pages/SelectionPage";
import LoadingPage from "./pages/LoadingPage";
import ResultPage from "./pages/ResultPage";
import { useRecommendation } from "./hooks/useRecommendation";

function App() {
  const navigate = useNavigate();
  const {
    currentListType,
    setListType,
    setCategoryId,
    startRecommendation,
    loadExisting,
  } = useRecommendation();

  useEffect(() => {
    const existing = loadExisting();
    if (existing) {
      navigate("/result", { state: existing });
    }
  }, [loadExisting, navigate]);

  const handleSelect = (type: "cuisine" | "situation", id: string) => {
    setListType(type);
    setCategoryId(id);

    const result = startRecommendation();
    navigate("/loading", { state: { result, fromAd: true } });
  };

  const handleLoadingDone = (fromAd: boolean) => {
    navigate("/result");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <SelectionPage
            currentListType={currentListType}
            setListType={setListType}
            onSelect={handleSelect}
          />
        }
      />
      <Route
        path="/loading"
        element={<LoadingPage onDone={handleLoadingDone} />}
      />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
}

export default App;
