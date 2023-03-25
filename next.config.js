/** @type {import('next').NextConfig} */
// next.config.js
const removeImports = require('next-remove-imports')();

const nextConfig = {
  reactStrictMode: true,
}

module.exports = removeImports(nextConfig)
