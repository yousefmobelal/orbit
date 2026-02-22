export interface PlanetResponse {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  theme: string;
  level: number;
  xp: number;
  streakCount: number;
  lastCompletedDate?: Date;
  order: number;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}
