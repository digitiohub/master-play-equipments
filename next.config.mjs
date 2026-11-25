import path from "node:path";
/** @type {import('next').NextConfig} */
export default {
  output: "standalone",
  outputFileTracingRoot: path.resolve("."),
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"], localPatterns: [{ pathname: "/images/**" }, { pathname: "/uploads/**" }] },
};
