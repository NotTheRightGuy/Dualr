import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { User } from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {},
      async authorize(credentials): Promise<User | null> {
        return { ...credentials };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
});

export const BASE_PATH = "http://localhost:3000";
