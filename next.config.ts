import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "finna-media.buy-one-store.com",
      },
    ],
  },
};

export default nextConfig;
