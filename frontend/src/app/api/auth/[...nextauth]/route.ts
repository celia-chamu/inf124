import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ profile, account }) {
      if (account?.provider === "google") {
        if (!profile?.email?.endsWith("@uci.edu")) {
          return false;
        }
        return true;
      }
      return "/unauthorized";
    },
  },
};

export async function GET(request: Request) {
  return NextAuth({
    request,
    response: new Response(),
    ...authOptions,
  });
}

export async function POST(request: Request) {
  return NextAuth({
    request,
    response: new Response(),
    ...authOptions,
  });
}
