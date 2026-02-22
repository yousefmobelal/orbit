export const TASK_DIFFICULTIES = ["easy", "medium", "hard"] as const;
export type TaskDifficulty = (typeof TASK_DIFFICULTIES)[number];
