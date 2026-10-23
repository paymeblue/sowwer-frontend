/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sower-bucket.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "soower-landing-media.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
    // AVIF first (roughly half the bytes of JPEG for these photos), WebP as
    // the fallback. S3 originals never change in place — a new frame gets a
    // new key — so optimised variants can be cached for a year.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [480, 640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [64, 128, 256, 384],
    // loader: "custom",
    // loaderFile: "./imageLoader.ts",
  },
  swcMinify: false,
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "redux/auth/reducer": path.resolve(__dirname, "redux/auth/reducer"),
      "redux/auth/selectors": path.resolve(__dirname, "redux/auth/selectors"),
      "redux/store": path.resolve(__dirname, "redux/store"),
      "redux/ReduxProvider": path.resolve(__dirname, "redux/ReduxProvider"),
      "redux/sync_storage": path.resolve(__dirname, "redux/sync_storage"),
    };
    return config;
  },
};

module.exports = nextConfig;
