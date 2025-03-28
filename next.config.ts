import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  env: {
    SOL_RPC: 'https://api.devnet.solana.com',
  }
};

export default nextConfig;
