import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static HTML export output (for `next export` compatibility)
  // Note: ensure your app is compatible with static export (no server-only features).
  output: 'export',
  // Disable Next.js Image Optimization when exporting static HTML
  // See: https://nextjs.org/docs/messages/export-image-api
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
