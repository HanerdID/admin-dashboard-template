// src/types/next-auth.d.ts
import { DefaultUser, DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string;
  }

  interface Session extends DefaultSession {
    user: {
      id?: string;
      role?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
