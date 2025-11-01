import type { CuisineId, SituationId } from "../data/categories";
import { menuList, type MenuItem } from "../data/menu";

const pickOne = <T>(arr: T[]): T | null => {
  if (arr.length === 0) return null;
  return arr[Math.floor(Math.random() * arr.length)];
};

export function getRandomMenu(
  type: "cuisines",
  keyword: CuisineId
): MenuItem | null;
export function getRandomMenu(
  type: "situations",
  keyword: SituationId
): MenuItem | null;

export function getRandomMenu(
  type: "cuisines" | "situations",
  keyword: CuisineId | SituationId
): MenuItem | null {
  if (type === "cuisines") {
    const k = keyword as CuisineId;
    if (k === "all" || k === "random") {
      return pickOne(menuList);
    }
    const filtered = menuList.filter((m) => m.cuisines.includes(k));
    return pickOne(filtered);
  }

  const k = keyword as SituationId;
  const filtered = menuList.filter((m) => m.situations.includes(k));
  return pickOne(filtered);
}
