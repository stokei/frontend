// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["pt-BR"],
    defaultLocale: "pt-BR",
  },
  transpilePackages: [
    "@stokei/transactional",
    "@stokei/routes",
    "@stokei/translations",
    "@stokei/utils",
  ],
  experimental: {},
};

module.exports = nextConfig;
