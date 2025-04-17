"use client";

import { useSession } from "next-auth/react";
import axios from "../axios";
import { useRouter } from "next/navigation";

export const useRefreshToken = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const refreshToken = async () => {
    try {
      const res = await axios.post("/auth/refresh-token", {
        refreshToken: session?.refreshToken,
      });

      if (session) session.accessToken = res.data.accessToken;
    } catch (error: any) {
      if (error["status"] === 403) {
        router.push("/");
      }
    }
  };
  return refreshToken;
};
