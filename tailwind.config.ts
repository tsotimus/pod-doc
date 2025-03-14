/* eslint-disable @typescript-eslint/unbound-method */
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

import plugin from "tailwindcss/plugin";

export const ui = plugin(({ addBase }) => {
  addBase({
    ":root": {
      "--background": "0 0% 100%",
      "--foreground": "0 0% 3.9%",

      "--card": "0 0% 99.7%",
      "--card-foreground": "0 0% 3.9%",

      "--popover": "0 0% 100%",
      "--popover-foreground": "0 0% 15.1%",

      "--primary": "0 0% 9%",
      "--primary-foreground": "0 0% 98%",

      "--secondary": "0 0% 96.1%",
      "--secondary-foreground": "0 0% 9%",

      "--muted": "0 0% 96.1%",
      "--muted-foreground": "0 0% 45.1%",

      "--accent": "0 0% 94.1%",
      "--accent-foreground": "0 0% 9%",

      "--destructive": "0 84.2% 60.2%",
      "--destructive-foreground": "0 0% 98%",

      "--border": "0 0% 89.8%",
      "--input": "0 0% 89.8%",
      "--ring": "0 0% 63.9%",

      "--radius": "0.5rem",
    },
    ".dark": {
      "--background": "0 0% 2%",
      "--foreground": "0 0% 100%",

      "--card": "0 0% 4%",
      "--card-foreground": "0 0% 98%",

      "--popover": "0 0% 4%",
      "--popover-foreground": "0 0% 88%",

      "--primary": "0 0% 98%",
      "--primary-foreground": "0 0% 9%",

      "--secondary": "0 0% 12.9%",
      "--secondary-foreground": "0 0% 98%",

      "--muted": "0 0% 12%",
      "--muted-foreground": "0 0% 60%",

      "--accent": "0 0% 15%",
      "--accent-foreground": "0 0% 100%",

      "--destructive": "6 84% 48%",
      "--destructive-foreground": "0 0% 98%",

      "--border": "0 0% 14%",
      "--input": "0 0% 14%",
      "--ring": "0 0% 14.9%",
    },
    "*": {
      "border-color": "theme('colors.border')",
    },
    body: {
      "background-color": "theme('colors.background')",
      color: "theme('colors.foreground')",
      "-webkit-font-smoothing": "antialiased",
      "-moz-osx-font-smoothing": "grayscale",
    },
  });
});

const config: Partial<Config> = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,md,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        pinned:
          "linear-gradient(119deg, rgb(143 152 242) 0%, rgb(95 167 225) 30%, rgb(206 133 247) 47%, rgb(235 147 186) 69%, rgb(190 188 251) 80%)",
        "pinned-dark":
          "linear-gradient(119deg, rgb(75 87 196) 0%, rgb(31 133 206) 30%, rgb(125 20 166) 42%, rgb(134 15 60) 63%, rgb(18 8 45) 73%)",
        "nav-link-indicator":
          "radial-gradient(44.6% 825% at 50% 50%, rgb(122 151 255) 0%, rgb(72 109 255 / 0) 100%)",
        "nav-link-indicator-dark":
          "radial-gradient(44.6% 825% at 50% 50%, rgb(29 72 223) 0%, rgb(72 109 255 / 0) 100%)",
        "email-button":
          "linear-gradient(180deg, rgb(210 10 30) 5%, rgb(239 90 90) 100%)",
        "custom-gradient-1":
          "linear-gradient(119deg, #3782D1 0%, #8248C9 100%)",
        "custom-gradient-2":
          "linear-gradient(119deg, #151F7A 0%, #2440C7 100%)",
        "custom-gradient-3":
          "linear-gradient(119deg, #DB4D65 0%, #8248C9 100%)",
        "custom-gradient-4":
          "linear-gradient(119deg, #3782D1 0%, #DB4D65 100%)",
        "custom-gradient-all":
          "linear-gradient(119deg, #3782D1 11%, #8248C9 33%, #151F7A 54%, #2440C7 74%, #DB4D65 90%)",
      },
      boxShadow: {
        "feature-card": "0 -1px 3px 0 rgb(0 0 0 / 0.05)",
        "feature-card-dark":
          "0 0 0 1px rgb(255 255 255 / 0.06), 0 -1px rgb(255 255 255 / 0.1)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        night: {
          DEFAULT: "#1A202C",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
        title: ["var(--font-title)"],
      },
      keyframes: {
        "marquee-left": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-up": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
      animation: {
        "marquee-left": "marquee-left var(--duration, 30s) linear infinite",
        "marquee-up": "marquee-up var(--duration, 30s) linear infinite",
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "theme('colors.foreground / 90%')",
            "--tw-prose-headings": "theme('colors.foreground')",
            "--tw-prose-lead": "theme('colors.foreground')",
            "--tw-prose-links": "theme('colors.foreground')",
            "--tw-prose-bold": "theme('colors.foreground')",
            "--tw-prose-counters": "theme('colors.muted.foreground')",
            "--tw-prose-bullets": "theme('colors.muted.foreground')",
            "--tw-prose-hr": "theme('colors.border')",
            "--tw-prose-quotes": "theme('colors.foreground')",
            "--tw-prose-quote-borders": "theme('colors.border')",
            "--tw-prose-captions": "theme('colors.foreground')",
            "--tw-prose-th-borders": "theme('colors.border')",
            "--tw-prose-td-borders": "theme('colors.border')",
            "--tw-prose-code": "theme('colors.foreground')",
            "--tw-prose-kbd": "theme('colors.foreground')",
            "--tw-prose-kbd-shadows": "theme('colors.primary.DEFAULT / 50%')",
            "--tw-prose-pre-bg": false,
            "--tw-prose-pre-code": false,

            maxWidth: "none",

            img: {
              margin: "0 auto",
            },

            kbd: {
              boxShadow:
                "0 0 0 1px var(--tw-prose-kbd-shadows),0 3px 0 var(--tw-prose-kbd-shadows)",
            },

            code: {
              padding: "2px 4px",
              fontSize: "13px",
              borderRadius: "6px",
              background: "theme('colors.secondary.DEFAULT / 50%')",
              border: "1px solid hsl(var(--border))",
            },

            "pre code": false,
            "pre code::after": false,
            "pre code::before": false,
            "code::after": false,
            "code::before": false,

            "blockquote p:first-of-type::before": {
              content: "none",
            },
            "blockquote p:first-of-type::after": {
              content: "none",
            },
            blockquote: {
              fontStyle: "normal",
            },
          },
        },
      },
      minHeight: {
        0: "0",
        "1/4": "25vh",
        "1/2": "50vh",
        "3/4": "75vh",
        full: "100vh",
      },
      inset: {
        "4/5": "80%",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography, animate, ui],
};

export default config;
