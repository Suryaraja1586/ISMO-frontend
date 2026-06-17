import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produces a self-contained build for Docker (copies only what's needed to run)
  output: "standalone",
};

export default nextConfig;

