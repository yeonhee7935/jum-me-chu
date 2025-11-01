const STORAGE_KEY_PREFIX = "점메추_";

export function getTodayKey(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${STORAGE_KEY_PREFIX}${year}-${month}-${day}`;
}

export interface SavedMenu {
  menu: string;
  comment: string;
  timestamp: number;
}

export function saveTodayMenu(menu: string, comment: string): void {
  const key = getTodayKey();
  const data: SavedMenu = { menu, comment, timestamp: Date.now() };
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadTodayMenu(): SavedMenu | null {
  const key = getTodayKey();
  const raw = localStorage.getItem(key);
  if (raw) {
    try {
      return JSON.parse(raw) as SavedMenu;
    } catch {
      localStorage.removeItem(key);
    }
  }
  return null;
}
