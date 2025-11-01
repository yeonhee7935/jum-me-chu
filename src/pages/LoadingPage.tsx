import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getRandomMenu } from "../utils/random";
import {
  CUISINE_IDS,
  SITUATION_IDS,
  type CuisineId,
  type SituationId,
} from "../data/categories";
import type { MenuItem } from "../data/menu";
import { Asset, Top } from "@toss/tds-mobile";
import { adaptive } from "@toss/tds-colors";

const isCuisineId = (v: string): v is CuisineId =>
  (CUISINE_IDS as readonly string[]).includes(v);

const isSituationId = (v: string): v is SituationId =>
  (SITUATION_IDS as readonly string[]).includes(v);

const LoadingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const typeParam = searchParams.get("type");
    const keywordParam = searchParams.get("keyword");

    let picked: MenuItem | null = null;
    if (typeParam === "cuisines" && keywordParam && isCuisineId(keywordParam)) {
      picked = getRandomMenu("cuisines", keywordParam);
    } else if (
      typeParam === "situations" &&
      keywordParam &&
      isSituationId(keywordParam)
    ) {
      picked = getRandomMenu("situations", keywordParam);
    }

    if (picked) {
      const timer = setTimeout(() => {
        navigate("/result", { state: { menu: picked } });
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      navigate("/error");
    }
  }, [searchParams, navigate]);

  return (
    <div className="h-screen w-screen">
      <Top
        title={
          <Top.TitleParagraph size={28} color={adaptive.grey900}>
            메뉴를 고르고있어요
          </Top.TitleParagraph>
        }
        subtitleBottom={
          <Top.SubtitleParagraph color={adaptive.grey500}>
            잠시만 기다려주세요.
          </Top.SubtitleParagraph>
        }
      />
      <div className="relative flex-1 flex items-center justify-center ">
        <Asset.Lottie
          className="bg-white"
          frameShape={{ width: 375 }}
          src="https://static.toss.im/lotties/loading/load-ripple.json"
          loop={true}
          speed={1}
          aria-hidden={true}
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Asset.Image
            frameShape={{ width: 160 }}
            src="/pig-transparent.png"
            aria-hidden={true}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
