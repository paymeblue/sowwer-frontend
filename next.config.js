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
