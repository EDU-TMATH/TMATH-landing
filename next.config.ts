import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oj.tmathcoding.vn",
      },
    ],
  },
};

export default nextConfig;
