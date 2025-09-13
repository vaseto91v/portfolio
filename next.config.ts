import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  experimental: { typedRoutes: true },


  typescript: {
    ignoreBuildErrors: true,
  },


  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default config;