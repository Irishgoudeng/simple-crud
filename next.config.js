/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const nextConfig = {};

const path = require("path");
const sqlitePath = path.resolve(__dirname, "prisma/dev.db");

module.exports = {
  env: {
    DATABASE_URL: sqlitePath,
  },
};

export default nextConfig;
