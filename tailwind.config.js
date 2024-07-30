const plugin = require("tailwindcss/plugin")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        "open-sans": ['"Open Sans"', "Arial", "sans-serif"],
        sans: ['"Dosis"', "Arial", "sans-serif"],
        custom: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"'
        ]
      },
      textShadow: {
        sm: "1px 1px 1px var(--tw-shadow-color)"
      },
      colors: {
        twitter: "#4099ff",
        pinterest: "#c92228",
        linkedin: "#3b5998",
        dribbble: "#ea4c89"
      },
      boxShadow: {
        custom: "0 3px 10px -5px #000000"
      },
      fontSize: {
        tiny: "10px"
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
