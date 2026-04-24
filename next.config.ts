import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "c.tmathcoding.vn",
      },
    ],
  },
};

export default nextConfig;
