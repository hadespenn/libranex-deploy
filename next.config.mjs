import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: 'export', // 已删除，因为 Cloudflare 部署需要服务器构建
  images: { unoptimized: true },
  trailingSlash: true,
};

export default withNextIntl(nextConfig);