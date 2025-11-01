import React from "react";
import { cuisines, situations } from "../data/categories";

interface SelectionPageProps {
  currentListType: "cuisine" | "situation";
  setListType: (type: "cuisine" | "situation") => void;
  onSelect: (type: "cuisine" | "situation", categoryId: string) => void;
}

const SelectionPage: React.FC<SelectionPageProps> = ({
  currentListType,
  setListType,
  onSelect,
}) => {
  return (
    <div className="px-4 pt-2">
      <div className="flex bg-gray-100 p-1 rounded-xl mb-6 shadow-inner">
        <button
          className={`tab-button flex-1 py-3 text-lg rounded-lg transition-all duration-200 ${
            currentListType === "cuisine" ? "active" : ""
          }`}
          onClick={() => setListType("cuisine")}
        >
          국적별 추천 🍱
        </button>
        <button
          className={`tab-button flex-1 py-3 text-lg rounded-lg transition-all duration-200 ${
            currentListType === "situation" ? "active" : ""
          }`}
          onClick={() => setListType("situation")}
        >
          상황별 추천 🧠
        </button>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {currentListType === "cuisine"
          ? "어떤 종류의 메뉴를 찾으시나요?"
          : "오늘은 어떤 상황/기분으로 드시나요?"}
      </h2>

      <div className="grid grid-cols-2 gap-4 w-full">
        {currentListType === "cuisine"
          ? cuisines.map((cat) => (
              <div
                key={cat.id}
                className="category-card"
                onClick={() => onSelect("cuisine", cat.id)}
              >
                <span className="text-4xl mb-2">🍽️</span>
                <span className="text-lg font-semibold text-gray-800">
                  {cat.label}
                </span>
              </div>
            ))
          : situations.map((cat) => (
              <div
                key={cat.id}
                className="category-card"
                onClick={() => onSelect("situation", cat.id)}
              >
                <span className="text-4xl mb-2">🍏</span>
                <span className="text-lg font-semibold text-gray-800">
                  {cat.label}
                </span>
              </div>
            ))}
      </div>
    </div>
  );
};

export default SelectionPage;
