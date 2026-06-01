import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import astroPlugin from "eslint-plugin-astro";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import sveltePlugin from "eslint-plugin-svelte";
import globals from "globals";
import svelteParser from "svelte-eslint-parser";
import ts from "typescript-eslint";

export default [
  js.configs.recommended,
  ...ts.configs.strict,
  ...ts.configs.stylistic,
  ...sveltePlugin.configs.recommended,
  ...sveltePlugin.configs.prettier,
  ...astroPlugin.configs.recommended,
  {
    ignores: ["dist/", ".astro/"]
  },
  {
    files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: ts.parser,
        extraFileExtensions: [".svelte"]
      }
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
    plugins: {
      "simple-import-sort": simpleImportSort
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "svelte/no-at-html-tags": "off"
    }
  },
  prettier
];
