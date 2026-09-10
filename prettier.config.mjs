/** @type {import("prettier").Config} */
export default {
  printWidth: 120,
  trailingComma: "none",
  tailwindStylesheet: "./src/styles/global.css",
  plugins: ["prettier-plugin-astro", "prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.svelte",
      options: {
        parser: "svelte"
      }
    },
    {
      files: "*.astro",
      options: {
        parser: "astro"
      }
    }
  ]
};
