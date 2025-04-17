import axios from "@/app/lib/axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        phone: {
          label: "Phone",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials, req) {
        if (!credentials?.phone || !credentials?.password) return null;

        const res = await axios.post("/auth/signin", {
          phone: credentials.phone,
          password: credentials.password,
        });

        if (res.status !== 201 && res.status !== 200 && res.status !== 202) {
          return null;
        }

        return res.data;
      },
    }),
  ],
  pages : {
    signIn : "/auth/signin"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      return token;
    },
    async session({ token, session }) {
      session.data = token.data;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
