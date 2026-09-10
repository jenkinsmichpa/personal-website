import { defineConfig } from "oxlint";

import { oxlintIgnorePatterns } from "./tools/lint/ignore-patterns.mjs";

export default defineConfig({
  plugins: ["import", "typescript", "unicorn", "oxc", "promise"],
  categories: {
    correctness: "error",
    suspicious: "error",
    perf: "error"
  },
  ignorePatterns: oxlintIgnorePatterns,
  jsPlugins: [{ name: "anti-slop", specifier: "./tools/oxlint/anti-slop/index.ts" }],
  rules: {
    "anti-slop/no-array-filter-map": "error",
    "anti-slop/no-chained-type-assertions": "error",
    "anti-slop/no-conditional-empty-object-spread": "error",
    "anti-slop/no-known-value-widening": "error",
    "anti-slop/no-module-mocking": "error",
    "anti-slop/no-object-parameters": "error",
    "anti-slop/no-reduce-accumulator-copy": "error",
    "anti-slop/no-reflect-apply": "error",
    "anti-slop/no-reflect-get": "error",
    "anti-slop/no-runtime-typeof": [
      "error",
      {
        allowInTypeGuards: true
      }
    ],
    "anti-slop/no-shape-in-symbol-names": "error",
    "anti-slop/no-unknown-parameters": "error",
    "anti-slop/no-unknown-returns": "error",
    "anti-slop/no-unknown-type-aliases": "error",
    "anti-slop/no-unsafe-dictionary-type": "error",
    "anti-slop/no-widen-then-assert": "error",
    "anti-slop/require-safety-comment-for-type-assertion": "error",
    "import/no-cycle": "error",
    "import/no-unassigned-import": [
      "error",
      {
        allow: ["**/*.css", "unplugin-icons/types/*"]
      }
    ],
    "import/first": "error",
    "import/no-duplicates": "error",
    "import/no-named-default": "error",
    "import/no-self-import": "error",
    "typescript/consistent-type-imports": "error",
    "typescript/consistent-type-definitions": ["error", "type"],
    "typescript/prefer-optional-chain": "error",
    "typescript/no-confusing-non-null-assertion": "error",
    "promise/no-return-wrap": "error",
    "promise/no-new-statics": "error",
    "promise/always-return": "error",
    "unicorn/prefer-number-properties": "error",
    "unicorn/prefer-string-replace-all": "error",
    "unicorn/prefer-ternary": "error",
    "unicorn/no-useless-undefined": "error",
    "unicorn/no-array-callback-reference": "error",
    "eslint/no-await-in-loop": "error",
    "eslint/no-console": [
      "error",
      {
        allow: ["warn", "error"]
      }
    ], // oxlint covers .ts, ESLint covers <script> blocks in .svelte
    "oxc/no-accumulating-spread": "error"
  }
});
