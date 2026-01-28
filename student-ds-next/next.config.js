/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 타입스크립트 에러가 있어도 빌드 성공 처리
  typescript: {
    ignoreBuildErrors: true,
  },
  // ESLint 에러가 있어도 빌드 성공 처리
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
