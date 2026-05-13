import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Parent folder has its own package-lock.json; pin workspace root to this app.
    root: path.join(__dirname),
  },
  serverExternalPackages: ["pdf-parse"],
};

export default nextConfig;
