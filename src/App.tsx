import { Routes, Route } from "react-router-dom";
import SelectionPage from "./pages/SelectionPage";
import LoadingPage from "./pages/LoadingPage";
import ResultPage from "./pages/ResultPage";
import { useEffect } from "react";

function App() {
  useEffect(()=>{
    const preventZoom = (e: TouchEvent)=>{
      if(e.touches.length > 1) e.preventDefault()
    }

    document.addEventListener("touchmove", preventZoom, {passive: false})
    return ()=>{
      document.removeEventListener("touchmove", preventZoom)
    }
  },[])
  return (
    <Routes>
      <Route path="/" element={<SelectionPage />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
}

export default App;
