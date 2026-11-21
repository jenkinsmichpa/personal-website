import { defineConfig } from "oxfmt";

export default defineConfig({
  printWidth: 120,
  trailingComma: "none",
  svelte: true,
  astro: true,
  sortImports: true,
  sortTailwindcss: {
    stylesheet: "./src/styles/global.css"
  },
  ignorePatterns: ["/.astro/", "/dist/", "/.wrangler/", "/dev/", "**/.vite/", "node_modules", "*.lock", "**/target/"]
});
