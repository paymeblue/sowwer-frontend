/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./screens/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        grad: "linear-gradient(to right, #FDFBF2 -2.86%, #EAF4FF 36.28%, #F4F7F6 59.68%, #FFF9FE 80.52%)",
        "soft-gradient":
          "linear-gradient(to right, #B854FF25 40%, #34E1FF25 60%)",
      },
      fontFamily: {
        title: ["var(--font-baskerville)"],
        "sub-title": ["var(--font-libre-baskerville)"],
        body: ["var(--font-plus-jakarta)"],
        aeonik: ["var(--font-aeonik)"],
        baskerville: ["var(--font-baskerville)"],
        baskervville: ["var(--font-baskervville)"],
        "libre-baskerville": ["var(--font-libre-baskerville)"],
        montreal: ["var(--font-montreal)"],
        "plus-jakarta": ["var(--font-plus-jakarta)"],
        script: ["var(--font-script)", "cursive"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        error: "#D11E1E",
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
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "light-yellow": "#FFF8D9",
        "light-blue": "#EBEFFF",
        "light-grey": "#E8E9ED",
        "dark-grey": "#273444",
        "bluish-grey": "#7D8FA5",
        grey: "#F7F8FA",
        "secondary-black": "#030621",
        "body-1": "#333333",
        "body-2": "#555555",
        accent: "#3466FF",
        primary: "#FFC629",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "count-badge": "0px 0px 6px 2px rgba(219, 188, 159, 0.30)",
        "groups-sidebar": "-30px 0px 60px 0px rgba(28, 28, 31, 0.50)",
        "featured-project-card": "0px 1px 10px 0px #00000012",
        navbar: "0px 1px 10px 0px #00000012",
        double: "0px 0px 0px 2.76px #FFFFFF, 0px 0px 0px 6.44px #FFFFFF38",
        navbar: "0px 1px 20px 1px #0000001A",
        widow_care: "0px 0px 0px 2px #781A9E, 0px 0px 0px 6px #A41FD938",
        dad_project: "0px 0px 0px 2px #FAB80F, 0px 0px 0px 6px #FAB80F38",
        mission_care: "0px 0px 0px 2px #3466FF, 0px 0px 0px 6px #3466FF38",
        partnerships: "0px 0px 0px 2px #1AA551, 0px 0px 0px 6px #1AA55138",
        "tab-layout": "0px 4px 20px 0px #0000000F",
        "tab-layout-content": "-3px 0px 45px 0px #898A8F40",
        input: "0px 2px 7px 0px #FAB80F36",
        "input-error": "0px 2px 7px 0px #B0262636",
      },
      screens: {
        xs: "400px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        scroll: {
          to: { transform: "translate(calc(-50% - 0.5rem))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
