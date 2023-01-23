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
  experimental: {
    transpilePackages: [
      "@stokei/ui",
      "@stokei/utils",
      "@stokei/graphql",
      "@stokei/translations",
    ],
  },
};

module.exports = nextConfig;
