/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["react-hotjar"],

  webpack: (config) => {
    config.module.rules.push({
      test: /\.glsl$/,
      type: "asset/source",
    });
    return config;
  },

  async rewrites() {
    return [
      {
        source: "/api/hackathons",
        destination: "https://hackathons.hackclub.com/api/events/upcoming",
      },
    ];
  },
};

module.exports = nextConfig;
