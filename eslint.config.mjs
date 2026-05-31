import js from "@eslint/js";
import tseslint from "typescript-eslint";
import sveltePlugin from "eslint-plugin-svelte";
import svelteParser from "svelte-eslint-parser";
import astroPlugin from "eslint-plugin-astro";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default [
  js.configs.recommended,
  ...tseslint.configs.strict,
  ...sveltePlugin.configs.recommended,
  ...astroPlugin.configs.recommended,
  {
    ignores: ["dist/", ".astro/"]
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tseslint.parser,
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
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "svelte/no-at-html-tags": "off",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"]
    }
  },
  prettier
];
