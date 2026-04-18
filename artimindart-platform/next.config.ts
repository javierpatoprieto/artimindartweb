import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Disable static generation for dynamic pages */
  experimental: {
    dynamicIO: true,
  },
};

export default nextConfig;
