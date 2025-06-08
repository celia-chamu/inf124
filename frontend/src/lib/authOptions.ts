// src/lib/authOptions.ts
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import api from "@/app/api/api"; // Adjust import path if needed
import axios from "axios";

async function getBase64FromUrl(imageUrl: string): Promise<string> {
  const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
  const base64 = Buffer.from(response.data, "binary").toString("base64");
  const contentType = response.headers["content-type"];
  return `data:${contentType};base64,${base64}`;
}

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
        try {
          await api.get("/check-user", {
            params: { uci_net_id: profile.email },
          });
        } catch (error: any) {
          if (error.response?.status === 404) {
            try {
              let base64Image = "";
              try {
                base64Image = await getBase64FromUrl(profile.image || "");
              } catch (err) {
                console.warn("Could not fetch base64 image:", err);
              }
              await api.post("/create-user", {
                uci_net_id: profile.email,
                reputation: 0.0,
                join_date: new Date(),
                full_name: profile.name,
                profile_pic: base64Image,
              });
            } catch (creationError) {
              console.error("User creation failed:", creationError);
              return false;
            }
          } else {
            console.error("Unexpected error checking user:", error);
            return false;
          }
        }
        return true;
      }
      return "/unauthorized";
    },
  },
};
