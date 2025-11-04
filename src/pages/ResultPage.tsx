import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { MenuItem } from "../data/menu";
import { Asset, FixedBottomCTA, Text } from "@toss/tds-mobile";
import { Spacing } from "../components/Spacing";
import { adaptive } from "@toss/tds-colors";

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuResult = (location.state as { menu: MenuItem | undefined })?.menu;

  const menuName = menuResult?.name;
  const comment = menuResult?.comment;

  if (!menuResult) {
    setTimeout(() => {
      navigate("/");
    }, 3000);

    return (
      <div className="px-4 pt-4 flex flex-col items-center justify-center min-h-[80vh]">
        <p className="text-2xl font-bold text-red-500 mb-4">
          ⚠️ 오류: 잘못된 접근입니다.
        </p>
        <p className="text-gray-600">3초 후 메뉴 선택 화면으로 돌아갑니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center  w-screen">
      <>
        <Asset.Image
          frameShape={{ width: 100 }}
          src="https://static.toss.im/3d-emojis/u1F645-blue.png"
          aria-hidden={true}
        />
      </>
      <Spacing size={20} />
      <Text
        color={adaptive.grey800}
        typography="t1"
        fontWeight="bold"
        textAlign="center"
      >
        {menuName}
      </Text>
      <Spacing size={20} />
      <Text
        color={adaptive.grey600}
        typography="t5"
        fontWeight="medium"
        textAlign="center"
      >
        {comment}
      </Text>
      <FixedBottomCTA loading={false} onClick={() => navigate("/")}>
        메뉴 다시 고르기
      </FixedBottomCTA>
    </div>
  );
};

export default ResultPage;
