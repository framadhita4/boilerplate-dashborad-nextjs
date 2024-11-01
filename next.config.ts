import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    const newConfig = { ...config };
    newConfig.resolve = {
      ...newConfig.resolve,
      alias: {
        ...newConfig.resolve?.alias,
        canvas: false,
      },
    };
    return newConfig;
  },
};

export default nextConfig;
