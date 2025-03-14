import { NextConfig } from "next";

const generateConfig = async () => {
  const IS_UNDER_CONSTRUCTION = process.env.IS_UNDER_CONSTRUCTION === "true";
  const IS_PROD = process.env.NODE_ENV === "production"

  const REDIRECTS = [
    {
      source: "/admin/tags",
      destination: "/admin/tags/0",
      permanent: true,
    },
  ]

  const PROD_REDIRECTS = IS_PROD ? [
    {
      source: '/:path*',
      has: [
        {
          type: 'host',
          // key: "",
          value: '.*\\.vercel\\.app$',
        },
      ],
      destination: `${process.env.NEXT_PUBLIC_URL}/:path*`, 
      permanent: true,
    },
  ] : []

  const nextConfig: NextConfig = {
    transpilePackages: ["@mdxeditor/editor", "geist"],
    reactStrictMode: true,
    experimental: {
      optimizePackageImports: ["shiki", "@icons-pack/react-simple-icons"],
    },
    poweredByHeader: false,
    redirects: async () => {
      return IS_UNDER_CONSTRUCTION
        ? [
          ...REDIRECTS,
          ...PROD_REDIRECTS,
            {
              source: "/((?!construction).)*",
              destination: "/construction",
              permanent: false,
            },
          ]
        : [...REDIRECTS, ...PROD_REDIRECTS];
    },
    async rewrites() {
      return [
        {
          source: "/digestion/static/:path*",
          destination: "https://eu.i.posthog.com/static/:path*",
        },
        {
          source: "/digestion/:path*",
          destination: "https://eu.i.posthog.com/:path*",
        },
        {
          source: "/digestion/decide",
          destination: "https://eu.i.posthog.com/decide",
        },
      ];
    },
  };
  return nextConfig;
};

export default generateConfig;
