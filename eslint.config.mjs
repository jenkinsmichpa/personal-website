import { configs as astroConfigs } from "eslint-plugin-astro";
import sveltePlugin from "eslint-plugin-svelte";
import globals from "globals";
import svelteParser from "svelte-eslint-parser";
import ts from "typescript-eslint";

const noMixedAbsence = [
  "error",
  {
    selector: "TSUnionType:has(> TSNullKeyword):has(> TSUndefinedKeyword)",
    message:
      "Do not mix null and undefined in one union. Pick a single absence value (prefer undefined; null is the storage/wire boundary value)."
  }
];

// eslint is only for Svelte and Astro template rules
// oxlint will fully replace it once it supports them (oxc-project/oxc#15761)
export default [
  {
    ignores: [".astro", ".wrangler", "dist", "dev", "**/.vite/"]
  },
  ...sveltePlugin.configs.recommended,
  ...astroConfigs.recommended,
  {
    files: ["**/*.ts", "**/*.svelte"],
    languageOptions: {
      parser: ts.parser
    },
    rules: {
      "no-restricted-syntax": noMixedAbsence
    }
  },
  {
    files: ["**/*.astro"],
    rules: {
      "no-restricted-syntax": noMixedAbsence
    }
  },
  {
    files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: ts.parser
      },
      globals: { ...globals.browser }
    }
  },
  {
    files: ["**/*.svelte"],
    rules: {
      "svelte/block-lang": ["error", { script: "ts" }],
      "svelte/button-has-type": "error",
      "svelte/derived-has-same-inputs-outputs": "error",
      "svelte/no-add-event-listener": "error",
      "svelte/no-at-const-tags": "error",
      "svelte/no-bind-value-on-checkable-inputs": "error",
      "svelte/no-extra-reactive-curlies": "error",
      "svelte/no-inline-styles": "error",
      "svelte/no-target-blank": "error",
      "svelte/prefer-class-directive": "error",
      "svelte/prefer-style-directive": "error"
    }
  }
];
