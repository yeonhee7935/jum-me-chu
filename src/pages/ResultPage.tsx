import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { MenuItem } from "../data/menu";
import { Asset, Button, Text } from "@toss/tds-mobile";
import { Spacing } from "../components/Spacing";
import { adaptive } from "@toss/tds-colors";
import { AdRewardButton } from "../components/AdRewardButton";

// 애니메이션에 필요한 모든 속성을 포함하는 인터페이스 정의
interface AnimatedEmoji {
  id: number;
  src: string;
  style: React.CSSProperties;
  endX: number;
  endY: number;
  endSize: number;
  rotation: number;
}

// 반복되는 Asset.Image 아이콘 URL들을 배열로 분리합니다.
const EMOJI_IMAGE_SRCS = [
  "https://static.toss.im/2d-emojis/png/4x/uE103.png",
  "https://static.toss.im/2d-emojis/png/4x/u1F357.png",
  "https://static.toss.im/2d-emojis/png/4x/u1F957.png",
  "https://static.toss.im/2d-emojis/png/4x/u1F969.png",
  "https://static.toss.im/2d-emojis/png/4x/u1F366.png",
  "https://static.toss.im/2d-emojis/png/4x/u1F955.png",
  "https://static.toss.im/2d-emojis/png/4x/u1F35C.png",
  "https://static.toss.im/2d-emojis/png/4x/u1F362.png",
  "https://static.toss.im/2d-emojis/png/4x/u1F355.png",
  "https://static.toss.im/2d-emojis/png/4x/uE102.png",
  "https://static.toss.im/2d-emojis/png/4x/u1F32E.png",
  "https://static.toss.im/2d-emojis/png/4x/u1F354.png",
  "https://static.toss.im/2d-emojis/png/4x/u1F364.png",
  "https://static.toss.im/2d-emojis/png/4x/u1F371.png",
  "https://static.toss.im/2d-emojis/png/4x/u1F961.png",
  "https://static.toss.im/2d-emojis/png/4x/u1F368.png",
  "https://static.toss.im/2d-emojis/png/4x/u1F35C.png",
  "https://static.toss.im/2d-emojis/png/4x/u1F35B.png",
];

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuResult = (location.state as { menu: MenuItem | undefined })?.menu;
  const menuName = menuResult?.name;
  const comment = menuResult?.comment;

  // 상태 타입 수정: AnimatedEmoji 인터페이스 사용
  const [animatedEmojis, setAnimatedEmojis] = useState<AnimatedEmoji[]>([]);
  const emojiIdCounter = useRef(0);
  const menuNameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuResult || !menuNameRef.current) return;

    const rect = menuNameRef.current.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    const spawnEmojis = () => {
      const newEmojis: AnimatedEmoji[] = [];
      const numberOfEmojis = 20;

      for (let i = 0; i < numberOfEmojis; i++) {
        emojiIdCounter.current++;
        const id = emojiIdCounter.current;
        const randomSrc =
          EMOJI_IMAGE_SRCS[Math.floor(Math.random() * EMOJI_IMAGE_SRCS.length)];

        // 이모지 크기 대폭 증가 (60px ~ 120px)
        const startSize = Math.random() * 30 + 30;
        const endSize = startSize * (Math.random() * 0.5 + 1.2);

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 150 + 80;
        const endX = startX + distance * Math.cos(angle);
        const endY = startY + distance * Math.sin(angle);

        const rotation = Math.random() * 720 - 360;

        newEmojis.push({
          id,
          src: randomSrc,
          // 필수 속성 추가
          endX,
          endY,
          endSize,
          rotation,
          style: {
            position: "fixed",
            left: startX,
            top: startY,
            width: `${startSize}px`,
            height: `${startSize}px`,
            opacity: 1,
            transform: `translate(-50%, -50%) scale(1) rotate(0deg)`,
            // 애니메이션 지속 시간 (1.5s)
            transition: "all 1s ease-out",
            zIndex: 9999,
            pointerEvents: "none",
            userSelect: "none",
            aspectRatio: "1/1",
            backgroundColor: "transparent",
          },
        });
      }
      setAnimatedEmojis(newEmojis);

      // 튀어나가는 애니메이션 적용
      setTimeout(() => {
        setAnimatedEmojis((prev) =>
          prev.map((e) => ({
            ...e,
            style: {
              ...e.style,
              // 이제 e 객체에서 endX, endY 등의 속성에 접근 가능
              left: e.endX,
              top: e.endY,
              width: `${e.endSize}px`,
              height: `${e.endSize}px`,
              opacity: 0,
              transform: `translate(-50%, -50%) scale(0.5) rotate(${e.rotation}deg)`,
            },
          }))
        );
      }, 50);

      // 이모지 DOM에서 제거 시간 (1.6s)
      setTimeout(() => {
        setAnimatedEmojis([]);
      }, 1600);
    };

    spawnEmojis();
  }, [menuResult]);

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
    <div className="flex flex-col items-center justify-center text-center w-screen relative min-h-screen pb-20">
      <Spacing size={20} />
      <div ref={menuNameRef}>
        <Text
          color={adaptive.grey800}
          typography="t1"
          fontWeight="bold"
          textAlign="center"
        >
          {menuName}
        </Text>
      </div>
      <Spacing size={20} />
      <Text
        color={adaptive.grey600}
        typography="t5"
        fontWeight="medium"
        textAlign="center"
      >
        {comment}
      </Text>
      <div className="fixed bottom-10 left-0 right-0 p-8 ">
        <AdRewardButton onRewarded={() => navigate("/")} />
      </div>

      {/* 애니메이션으로 튀어 나가는 이모지들 */}
      {animatedEmojis.map((emoji) => (
        <Asset.Image
          key={emoji.id}
          // frameShape 속성 제거 또는 빈 객체 전달.
          // CleanW24가 동적 크기 조정을 방해하므로, style 속성을 따르도록 수정.
          frameShape={{}}
          backgroundColor="transparent"
          src={emoji.src}
          aria-hidden={true}
          style={emoji.style}
        />
      ))}
    </div>
  );
};

export default ResultPage;
