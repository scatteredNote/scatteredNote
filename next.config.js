/** @type {import('next').NextConfig} */
// next.config.js
const removeImports = require('next-remove-imports')();

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com', "lh3.googleusercontent.com"]
  }
};

module.exports = removeImports(nextConfig);
