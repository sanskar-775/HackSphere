/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["react-hotjar"],
  
  // Add image configuration here
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

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
        source: "/api/hackathons/MLH",
        destination: "https://hackathons.hackclub.com/api/events/upcoming",
      },
      {
        source: "/api/hackathons/unstop",
        destination: "https://unstop.com/api/public/opportunity/search-result?opportunity=hackathons&page=1&oppstatus=open&quickApply=true",
      },
    ];
  },
};

module.exports = nextConfig;