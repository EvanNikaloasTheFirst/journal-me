import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { getCollection } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user }) {
      try {
        const users = await getCollection("users");

        await users.updateOne(
          { email: user.email },
          {
            $setOnInsert: {
              email: user.email,
              name: user.name,
              image: user.image,
              provider: "google",
              createdAt: new Date(),
            },
            $set: {
              lastLoginAt: new Date(),
            },
          },
          { upsert: true }
        );

        return true;
      } catch (error) {
        console.error("❌ Failed to save user:", error);
        return false;
      }
    },
  },
};
