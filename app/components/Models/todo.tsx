export type ToDo = {
  _id: string;
  userId: string;
  text: string;
  completed: boolean;
  locked: boolean;
  createdAt: Date;
  updatedAt: Date;
};
