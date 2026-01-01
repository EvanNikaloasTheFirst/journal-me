import { ObjectId } from "mongodb";

export type User = {
  _id: ObjectId;
  email: string;
  name: string;
  image?: string;
  provider: "google" | "github";
  createdAt: Date;
  lastLoginAt: Date;
};
