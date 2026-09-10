import { defineConfig } from "oxfmt";

import { oxfmtIgnorePatterns } from "./tools/lint/ignore-patterns.mjs";

export default defineConfig({
  printWidth: 120,
  trailingComma: "none",
  svelte: true,
  sortImports: true,
  sortTailwindcss: {
    stylesheet: "./src/styles/global.css"
  },
  ignorePatterns: oxfmtIgnorePatterns
});
