export interface User {
  id: string;
  name: string;
  avatar?: {
    url: string;
    public_id: string;
  };
  email: string;
  globalStreak: number;
  lastActiveDate: Date;
  globalXP: number;
  globalLevel: number;
  hasCreatedFirstTask: boolean;
}
