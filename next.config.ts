import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "s3dev.pjc.mt.gov.br",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
