import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'png.pngtree.com',
      },
      {
        protocol: 'https',
        hostname: 'hanoipetadoption.com',
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://backend-production-e2b4.up.railway.app/api/:path*' 
      },
      {
        source: '/sanctum/csrf-cookie',
        destination: 'https://backend-production-e2b4.up.railway.app/sanctum/csrf-cookie'
      }
    ]
  },
};

export default nextConfig;
