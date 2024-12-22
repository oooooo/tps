import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // 启用静态导出
  basePath: "/tps",
  reactStrictMode: true, // 可选：启用严格模式
  // images: {
  //   unoptimized: true, // 可选：如果你不使用 Next.js 的图片优化功能，设置此项为 true
  // },
};

export default nextConfig;
