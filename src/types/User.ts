export interface User {
  id: string;
  name: string;
  avatar?: {
    url: string;
    public_id: string;
  };
  email: string;
  globalStreak: number;
  lastActiveDate: string | Date;
  globalXP: number;
  globalLevel: number;
  requiredXPForNextLevel: number;
  xpToNextLevel: number;
  xpProgressPercent: number;
  hasCreatedFirstTask: boolean;
}
