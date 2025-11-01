import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { menu, comment } = (location.state as any) ?? {
    menu: "",
    comment: "",
  };

  return (
    <div className="px-4 pt-4 flex flex-col items-center">
      <div className="w-full bg-blue-50 p-8 rounded-3xl shadow-xl border border-blue-200 min-h-[160px] flex flex-col justify-center items-center">
        <p className="text-4xl font-extrabold text-gray-800 mb-3 text-center">
          {menu}
        </p>
        <p className="text-xl text-blue-500 font-semibold text-center">
          {comment}
        </p>
      </div>

      <button
        onClick={() => navigate("/")}
        className="recommend-button mt-8 w-full py-4 bg-blue-600 text-white font-bold text-xl rounded-xl shadow-lg transition duration-150 active:bg-blue-700"
      >
        다시 메뉴 고르기
      </button>
    </div>
  );
};

export default ResultPage;
