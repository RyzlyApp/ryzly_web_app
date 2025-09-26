import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "capital-city-dev.s3.eu-north-1.amazonaws.com",
        pathname: "/**", // allow all paths
      },
    ],
  }
};

export default nextConfig;
