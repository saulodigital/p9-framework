// auth.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const auth = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...other providers...
  ],
  callbacks: {
    async session({ session, user }) {
      // session.user may be undefined in some contexts, so guard first
      if (session.user) {
        session.user.role = user.role;
      }
      return session;
    },
  },
});
