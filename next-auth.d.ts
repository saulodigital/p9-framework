// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession`, etc.
   */
  interface Session extends DefaultSession {
    user: {
      /** The user's role, e.g. 'user' or 'admin' */
      role?: string;
    } & DefaultSession["user"];
  }

  /**
   * Returned by `callbacks.jwt` and `getToken`
   */
  interface User extends DefaultUser {
    /** Persisted in your Prisma schema */
    role?: string;
  }
}
