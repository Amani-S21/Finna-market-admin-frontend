import { withAuth } from "next-auth/middleware";

export default withAuth({
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/api/auth/signin",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",   // protect API routes too
  ],
};
