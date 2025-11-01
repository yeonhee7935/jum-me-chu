import type { CuisineId, SituationId } from "./categories";

export interface MenuItem {
  name: string;
  cuisines: CuisineId[];
  situations: SituationId[];
}

export const menuList: MenuItem[] = [
  {
    name: "김밥",
    cuisines: ["snack", "korean"],
    situations: ["quick", "light"],
  },
  {
    name: "햄버거",
    cuisines: ["fastfood", "western"],
    situations: ["quick", "full"],
  },
  { name: "초밥", cuisines: ["japanese"], situations: ["solo", "new"] },
  { name: "비빔밥", cuisines: ["korean"], situations: ["full", "gentle"] },
];
