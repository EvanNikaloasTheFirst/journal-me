export type YearlyGoal = {
  _id?: string;
  goal: string;
  year: number; // yyyy
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
};