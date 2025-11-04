import React, { useState } from "react";
import { cuisines, situations } from "../data/categories";
import { SegmentedControl, Top } from "@toss/tds-mobile";
import { Spacing } from "../components/Spacing";
import { useNavigate } from "react-router-dom";

type Type = "cuisines" | "situations";

const SelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentType, setCurrentType] = useState<Type>("cuisines");

  const onSelect = (type: Type, keyword: string) => {
    navigate(`/loading?type=${type}&keyword=${keyword}`);
  };

  return (
    // 화면 상단부터 쌓이도록: 세로 플렉스 + 최소 뷰포트 높이
    <div className="flex h-screen flex-col w-screen">
      {/* 상단 고정 영역 */}
      <Top
        title={
          <Top.TitleParagraph size={28}>
            {currentType === "cuisines"
              ? "어떤 메뉴가 끌리세요?"
              : "지금 어떤 상황이에요?"}
          </Top.TitleParagraph>
        }
      />
      <Spacing size={24} />

      {/* SegmentedControl 값/옵션을 타입과 일치시킴 */}
      <div className="px-4">
        <SegmentedControl
          alignment="fixed"
          value={currentType} // 현재 선택값을 그대로 바인딩
          disabled={false}
          size="large"
          name="SegmentedControl"
          onChange={(value) => setCurrentType(value as Type)}
        >
          <SegmentedControl.Item value="cuisines">메뉴별</SegmentedControl.Item>
          <SegmentedControl.Item value="situations">
            상황별
          </SegmentedControl.Item>
        </SegmentedControl>
      </div>

      <Spacing size={20} />

      {/* 리스트 영역만 스크롤: 남은 공간 차지 + overflow-y-auto */}
      <div className="flex-1 overflow-y-auto">
        <div
          className={`grid ${
            currentType === "cuisines" ? "grid-cols-2" : "grid-cols-1"
          } gap-2 px-4 pb-28 w-full`} // pb로 하단 여백 확보(고정 CTA와 겹침 방지)
        >
          {currentType === "cuisines"
            ? cuisines.map((cat, index) => (
                <div
                  key={cat.id}
                  className={`text-center py-8 px-2 rounded-lg ${
                    index === 0 ? "bg-[#3182f6]" : "bg-gray-100"
                  }`}
                  onClick={() => onSelect("cuisines", cat.id)}
                >
                  <span
                    className={`text-xl font-semibold  ${
                      index === 0 ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {cat.label}
                  </span>
                </div>
              ))
            : situations.map((cat) => (
                <div
                  key={cat.id}
                  className="text-left bg-gray-100 py-8 px-3 rounded-lg" // 1열은 좌측 정렬이 자연스러우면 text-left, 중앙 유지하려면 text-center
                  onClick={() => onSelect("situations", cat.id)}
                >
                  <span className="text-xl font-semibold text-gray-800">
                    {cat.label}
                  </span>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default SelectionPage;
