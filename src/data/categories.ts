export const CUISINE_IDS = [
  "korean",
  "chinese",
  "japanese",
  "western",
  "snack",
  "fastfood",
  "asian",
  "random",
] as const;

export const SITUATION_IDS = [
  "quick",
  "solo",
  "full",
  "light",
  "gentle",
  "new",
] as const;

export type CuisineId = (typeof CUISINE_IDS)[number];
export type SituationId = (typeof SITUATION_IDS)[number];

export interface Category {
  id: string;
  label: string;
}

export const CUISINE_LABELS: Record<CuisineId, string> = {
  random: "랜덤",
  korean: "한식",
  chinese: "중식",
  japanese: "일식",
  western: "양식",
  snack: "분식",
  fastfood: "패스트푸드",
  asian: "아시안",
};

export const SITUATION_LABELS: Record<SituationId, string> = {
  quick: "빨리 먹고 나가야 할 때",
  solo: "혼자 조용히 먹고 싶을 때",
  full: "든든하게 배 채우고 싶을 때",
  light: "간단하게 요기만 하고 싶을 때",
  gentle: "속이 편한 걸로 먹고 싶을 때",
  new: "평소에 잘 안 먹던 걸 먹고 싶을 때",
};

export const cuisines: Category[] = CUISINE_IDS.map((id) => ({
  id,
  label: CUISINE_LABELS[id],
})).sort((a, b) => (a.id === "random" ? -1 : b.id === "random" ? 1 : 0));

export const situations: Category[] = SITUATION_IDS.map((id) => ({
  id,
  label: SITUATION_LABELS[id],
}));
