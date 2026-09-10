import js from "@eslint/js";
import { configs as astroConfigs } from "eslint-plugin-astro";
import sveltePlugin from "eslint-plugin-svelte";
import globals from "globals";
import svelteParser from "svelte-eslint-parser";
import ts from "typescript-eslint";

import { eslintIgnores } from "./tools/lint/ignore-patterns.mjs";

export default [
  {
    ignores: eslintIgnores
  },
  {
    files: ["**/*.ts", "**/*.mts", "**/*.cts", "**/*.js", "**/*.mjs", "**/*.cjs", "**/*.svelte"],
    languageOptions: {
      parserOptions: {
        projectService: true
      }
    }
  },
  js.configs.recommended,
  ...ts.configs.strictTypeChecked,
  ...ts.configs.stylisticTypeChecked,
  ...sveltePlugin.configs.recommended,
  ...sveltePlugin.configs.prettier,
  ...astroConfigs.recommended,
  {
    files: ["**/*.astro"],
    ...ts.configs.disableTypeChecked
  },
  {
    files: ["**/*.svelte"],
    rules: {
      "@typescript-eslint/no-confusing-void-expression": "off"
    }
  },
  {
    files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        projectService: true,
        extraFileExtensions: [".svelte"],
        parser: ts.parser
      },
      globals: { ...globals.browser }
    }
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/consistent-type-definitions": "off", // Owned by oxlint
      "no-console": ["error", { allow: ["warn", "error"] }], // oxlint covers .ts, ESLint covers <script> blocks in .svelte
      "svelte/no-at-html-tags": "error",
      "svelte/require-each-key": "error",
      "svelte/no-unused-svelte-ignore": "error",
      "no-restricted-syntax": [
        "error",
        {
          selector: "TSUnionType:has(> TSNullKeyword):has(> TSUndefinedKeyword)",
          message: "Do not mix null and undefined in one union. Pick a single absence value (prefer null)."
        }
      ]
    }
  }
];
