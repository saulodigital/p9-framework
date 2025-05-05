import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // Assuming you extended the SessionUser type to include `role`
      if (session.user) {
        session.user.role = user.role;
      }
      return session;
    },
  },
  // Optional: add pages, debug, etc.
  // pages: { signIn: "/auth/signin" },
  // debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
