import { NextConfig } from "next";

const generateConfig = async () => {

  const REDIRECTS = [
    {
      source: "/",
      destination: "/pods",
      permanent: true,
    },
  ]


  const nextConfig: NextConfig = {
    transpilePackages: ["geist"],
    reactStrictMode: true,
    experimental: {
      optimizePackageImports: ["@icons-pack/react-simple-icons"],
    },
    poweredByHeader: false,
    redirects: async () => {
      return [...REDIRECTS];
    },
  };
  return nextConfig;
};

export default generateConfig;
