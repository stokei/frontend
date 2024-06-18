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
    "@stokei/builder",
    "@stokei/graphql",
    "@stokei/plugins",
    "@stokei/routes",
    "@stokei/translations",
    "@stokei/ui",
    "@stokei/utils",
  ],
  experimental: {},
};

module.exports = nextConfig;
