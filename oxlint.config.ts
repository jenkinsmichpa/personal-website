import nkzw from "@nkzw/oxlint-config";
import { defineConfig } from "oxlint";
import type { DummyRuleMap, OxlintOverride } from "oxlint";

const isDeadRule = (id: string) =>
  id.startsWith("react/") ||
  id.startsWith("jsx-a11y/") ||
  id === "@nkzw/ensure-relay-types" ||
  id === "@nkzw/require-use-effect-arguments";

const filterRules = (source: DummyRuleMap | undefined): DummyRuleMap => {
  const filtered: DummyRuleMap = {};
  for (const [id, rule] of Object.entries(source ?? {})) {
    if (!isDeadRule(id)) {
      filtered[id] = rule;
    }
  }
  return filtered;
};

const overrides: Array<OxlintOverride> = [];
for (const source of nkzw.overrides ?? []) {
  overrides.push({ ...source, rules: filterRules(source.rules) });
}

const rules = filterRules(nkzw.rules);

export default defineConfig({
  ...nkzw,
  plugins: (nkzw.plugins ?? []).filter((plugin) => plugin !== "react" && plugin !== "jsx-a11y"),
  ignorePatterns: ["/.astro/", "/dist/", "/.wrangler/"],
  options: { ...nkzw.options, typeAware: true },

  categories: { correctness: "error", suspicious: "error", perf: "error", style: "error", pedantic: "error" },

  overrides: [...overrides, { files: ["**/*.astro", "**/*.svelte"], rules: { "no-undef": "off" } }],

  rules: {
    ...rules,

    "import/no-cycle": "error",
    "import/no-duplicates": "error",
    "import/first": "error",
    "import/no-named-default": "error",
    "import/no-unassigned-import": ["error", { allow: ["**/*.css", "unplugin-icons/types/*"] }],
    "typescript/consistent-type-definitions": ["error", "type"],
    "typescript/consistent-type-imports": "error",
    "typescript/prefer-optional-chain": "error",
    "promise/no-return-wrap": "error",
    "unicorn/prefer-ternary": "error",
    "unicorn/no-array-callback-reference": "error",
    "unicorn/no-useless-undefined": "error",
    "promise/prefer-await-to-then": "error",
    "promise/no-nesting": "error",
    "promise/param-names": "error",
    "promise/prefer-catch": "error",
    "no-nested-ternary": "error",
    "no-else-return": "error",
    "no-lonely-if": "error",
    "oxc/branches-sharing-code": "error",
    "unicorn/prefer-type-error": "error",
    "unicorn/throw-new-error": "error",
    "unicorn/error-message": "error",
    "unicorn/custom-error-definition": "error",
    "unicorn/prefer-logical-operator-over-ternary": "error",
    "unicorn/no-immediate-mutation": "error",
    "unicorn/no-object-as-default-parameter": "error",
    "unicorn/no-negation-in-equality-check": "error",
    "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
    "unicorn/consistent-assert": "error",
    "unicorn/explicit-length-check": "error",
    "unicorn/no-array-for-each": "error",
    "typescript/ban-tslint-comment": "error",
    "typescript/class-literal-property-style": "error",
    "typescript/consistent-generic-constructors": "error",
    "typescript/consistent-indexed-object-style": "error",
    "typescript/dot-notation": "error",
    "typescript/no-confusing-non-null-assertion": "error",
    "typescript/no-inferrable-types": "error",
    "typescript/non-nullable-type-assertion-style": "error",
    "typescript/prefer-for-of": "error",
    "typescript/prefer-function-type": "error",
    "typescript/prefer-includes": "error",
    "typescript/prefer-nullish-coalescing": "error",
    "typescript/prefer-regexp-exec": "error",
    "typescript/prefer-string-starts-ends-with": "error",
    "no-empty-function": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "strict-boolean-expressions": "error",

    "sort-imports": "off",
    "sort-keys": "off",
    "import/no-named-export": "off",
    "import/group-exports": "off",
    "import/exports-last": "off",
    "import/prefer-default-export": "off",
    "unicorn/prefer-export-from": "off",
    "import/no-anonymous-default-export": "off",
    "unicorn/no-null": "off",
    "no-ternary": "off",
    "import/no-nodejs-modules": "off",
    "new-cap": "off",
    "vitest/require-hook": "off",
    "one-var": "off",
    "func-style": "off",
    "no-magic-numbers": "off",
    "init-declarations": "off",
    "id-length": "off",
    "capitalized-comments": "off",
    "unicorn/filename-case": "off",
    "typescript/parameter-properties": "off",
    "no-continue": "off",
    "unicorn/prefer-global-this": "off",
    "unicorn/prefer-spread": "off",
    "no-negated-condition": "off",
    "unicorn/no-negated-condition": "off",
    "max-statements": "off",
    "max-params": "off",
    "max-lines-per-function": "off",
    "max-lines": "off",
    "max-classes-per-file": "off",
    "unicorn/max-nested-calls": "off",
    "import/max-dependencies": "off",
    "no-duplicate-imports": "off",
    "no-useless-return": "off",
    "typescript/prefer-readonly-parameter-types": "off",
    "typescript/consistent-return": "off"
  }
});
