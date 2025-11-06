import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "medias.finna-entreprise.com",
      },
    ],
  },
};

export default nextConfig;
