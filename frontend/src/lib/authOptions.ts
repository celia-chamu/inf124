import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import api from "@/app/api/api";
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
        if (!profile?.email?.endsWith("@uci.edu")) return false;

        try {
          await api.get("/check-user", { params: { uci_net_id: profile.email } });
        } catch (error: any) {
          if (error.response?.status === 404) {
            try {
              let base64Image = "";
              try {
                base64Image = await getBase64FromUrl(profile.image || "");
              } catch {
                base64Image = "";
              }
              await api.post("/create-user", {
                uci_net_id: profile.email,
                reputation: 0.0,
                join_date: new Date(),
                full_name: profile.name,
                profile_pic: base64Image,
              });
            } catch {
              return false;
            }
          } else {
            return false;
          }
        }

        return true;
      }
      return "/unauthorized";
    },
  },
};
