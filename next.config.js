/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sower-bucket.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
    // loader: "custom",
    // loaderFile: "./imageLoader.ts",
  },
  swcMinify: false,
};

module.exports = nextConfig;
