import axios from "@/app/lib/axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        console.log("AUTHORIZE START");
        console.log("CREDENTIALS:", credentials);

        if (!credentials?.phone || !credentials?.password) {
          console.log("MISSING CREDENTIALS");
          return null;
        }

        try {
          console.log("CALLING API");

          const res = await axios.post("/auth/signin", {
            phone: credentials.phone,
            password: credentials.password,
          });

          console.log("API STATUS:", res.status);
          console.log("API DATA:", res.data);

          if (![200, 201, 202].includes(res.status)) {
            console.log("INVALID STATUS");
            return null;
          }

          console.log("RETURNING USER");

          return res.data;
        } catch (error: any) {
          console.log("AUTHORIZE ERROR");
          console.log(error);
          console.log(error?.response?.data);

          throw new Error(error?.response?.data?.statusCode || "Login failed");
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT CALLBACK");
      console.log("TOKEN:", token);
      console.log("USER:", user);

      if (user) {
        const merged = { ...token, ...user };

        console.log("MERGED TOKEN:", merged);

        return merged;
      }

      return token;
    },

    async session({ token, session }) {
      console.log("SESSION CALLBACK");
      console.log("TOKEN:", token);

      session.data = token.data;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      console.log("FINAL SESSION:", session);

      return session;
    },
  },

  debug: true,
};
