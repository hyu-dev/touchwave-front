/** @type {import('tailwindcss').Config} */

module.exports = {
  enabled: process.env.NODE_ENV === "production",
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./dist/*.{html,js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      cs: {
        title: "#AEC3AE",
        text: "#4C4B16",
        admin: "#94A684",
        user: "#E4E4D0",
        label: "#FFEEF4",
        primary: "#898121",
        "bg-primary": "#F7F1E5",
        disabled: "#9e9d9d",
        "bg-disabled": "#e0e0e0",
        warning: "#e34040",
        "bg-confirm": "#3498db",
        "bg-cancel": "#bebebe",
      },
    },
    fontFamily: {
      point: ["KCC-Ganpan", "fantasy"],
    },
    fontSize: {
      title: "40px",
      "sub-title": "25px",
      sm: "11px",
      md: "13px",
      base: "15px",
      lg: "16px",
      xl: "20px",
    },
    screens: {
      sm: "360px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      animation: {
        "fade-in": "fade-in 150ms linear",
      },
      keyframes: {
        "fade-in": {
          "0%": {
            transform: "translateY(-30px)",
          },
          "100%": {
            transform: "translateY(0px)",
          },
        },
      },
    },
  },
  plugins: [],
};
