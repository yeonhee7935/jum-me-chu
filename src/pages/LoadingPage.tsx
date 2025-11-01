import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface LoadingPageProps {
  onDone: (fromAd: boolean) => void;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ onDone }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const fromAd = (location.state as any)?.fromAd ?? false;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (fromAd) {
        // 광고 시청 완료 처리 가능
        // 이후 메뉴 추천 진행
      }
      onDone(fromAd);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onDone, fromAd]);

  return (
    <div className="flex-grow flex items-center justify-center">
      <p className="text-xl font-semibold text-gray-700">
        추천 메뉴를 골라오는 중이에요…
      </p>
    </div>
  );
};

export default LoadingPage;
