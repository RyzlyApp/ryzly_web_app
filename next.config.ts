import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'capital-city-dev.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'pagis-bucket.s3.amazonaws.com',
      },
    ],
  }
};

export default nextConfig;
