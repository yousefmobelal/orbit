import type { Theme } from "./Theme";

export interface Planet {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  theme: Theme;
  level: number;
  xp: number;
  requiredXPForNextLevel: number;
  xpToNextLevel: number;
  xpProgressPercent: number; // 0–1
  streakCount: number;
  lastCompletedDate?: string | Date;
  order: number;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}
