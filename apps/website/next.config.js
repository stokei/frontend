// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    transpilePackages: ["@stokei/ui", "@stokei/utils", "@stokei/graphql"],
  },
};

module.exports = nextConfig;
