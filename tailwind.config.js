const plugin = require("tailwindcss/plugin")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', "Arial", "sans-serif"],
        sans: ['"Dosis"', "Arial", "sans-serif"]
      },
      textShadow: {
        sm: "1px 1px 1px var(--tw-shadow-color)"
      },
      letterSpacing: {
        "custom-1px": "1px"
      },
      margin: {
        0.125: "2px"
      },
      width: {
        2.125: "34px"
      },
      height: {
        0.1875: "3px"
      },
      minHeight: {
        22.75: "364px"
      },
      colors: {
        twitter: "#4099ff",
        pinterest: "#c92228",
        linkedin: "#3b5998",
        dribbble: "#ea4c89"
      },
      gap: {
        1.875: "30px"
      }
    }
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value
          })
        },
        { values: theme("textShadow") }
      )
    })
  ]
}
