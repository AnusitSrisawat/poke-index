import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ['raw.githubusercontent.com'],
  },
};

export default nextConfig;
