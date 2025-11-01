import { useState, useEffect } from "react";

import { getRandomFromArray } from "../utils/random";
import { saveTodayMenu, loadTodayMenu } from "../utils/storage";
import { menuList, type MenuItem } from "../data/menu";
import type { CuisineId, SituationId } from "../data/categories";

const PHRASES = [
  "이건 못 참죠",
  "한 그릇 뚝딱이에요",
  "입맛 없을 땐 이거죠",
  "든든하게 먹어봐요",
  "오늘은 이걸로 가볼까요",
  "고민은 여기까지",
  "점심시간이 기다려질 거예요",
  "새로운 메뉴에 도전해보세요",
  "좋은 하루가 될 거예요",
];

type ListType = "cuisine" | "situation";

interface UseRecommendationResult {
  currentListType: ListType;
  currentCategoryId: string;
  recommendCount: number;
  setListType: (type: ListType) => void;
  setCategoryId: (id: string) => void;
  startRecommendation: () => { menu: string; comment: string };
  loadExisting: () => { menu: string; comment: string } | null;
}

export function useRecommendation(): UseRecommendationResult {
  const [currentListType, setCurrentListType] = useState<ListType>("cuisine");
  const [currentCategoryId, setCurrentCategoryId] = useState<string>("all");
  const [recommendCount, setRecommendCount] = useState<number>(() => {
    const saved = sessionStorage.getItem("recommendationCount");
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    sessionStorage.setItem("recommendationCount", `${recommendCount}`);
  }, [recommendCount]);

  function loadExisting() {
    const today = loadTodayMenu();
    if (today) {
      return { menu: today.menu, comment: today.comment };
    }
    return null;
  }

  function startRecommendation(): { menu: string; comment: string } {
    const newCount = recommendCount + 1;
    setRecommendCount(newCount);

    let available: string[] = [];

    if (currentListType === "cuisine") {
      if (currentCategoryId === "all" || currentCategoryId === "random") {
        available = menuList.map((m) => m.name);
      } else {
        available = menuList
          .filter((m: MenuItem) =>
            (m.cuisines as CuisineId[]).includes(currentCategoryId as CuisineId)
          )
          .map((m) => m.name);
      }
    } else {
      if (currentCategoryId === "new") {
        available = menuList.map((m) => m.name);
      } else {
        available = menuList
          .filter((m: MenuItem) =>
            (m.situations as SituationId[]).includes(
              currentCategoryId as SituationId
            )
          )
          .map((m) => m.name);
      }
    }

    let menu: string;
    let comment: string;

    if (available.length === 0) {
      menu = "추천 메뉴 없음";
      comment = "선택된 카테고리에서 찾을 수 없어요";
    } else {
      menu = getRandomFromArray(available);
      comment = getRandomFromArray(PHRASES);
    }

    saveTodayMenu(menu, comment);
    return { menu, comment };
  }

  return {
    currentListType,
    currentCategoryId,
    recommendCount,
    setListType: setCurrentListType,
    setCategoryId: setCurrentCategoryId,
    startRecommendation,
    loadExisting,
  };
}
