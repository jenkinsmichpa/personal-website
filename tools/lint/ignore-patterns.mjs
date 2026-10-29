// ESLint does not honor .gitignore, so this list includes items that .gitignore already covers.
const sharedIgnores = ["dist", ".astro", ".wrangler", "tools/oxlint/anti-slop/**", "dev", "**/.vite/"];

export const eslintIgnores = [...sharedIgnores];

// Oxlint matches bare names at any depth, so anchor root-only entries.
export const oxlintIgnorePatterns = sharedIgnores.map((pattern) => (pattern.includes("/") ? pattern : `/${pattern}`));

/**
 * @param {string} pattern
 * @returns {string}
 */
const toOxfmtPattern = (pattern) => {
  if (pattern.includes("*")) return pattern;
  const lastSegment = pattern.slice(pattern.lastIndexOf("/") + 1);
  return lastSegment.includes(".") ? `/${pattern}` : `/${pattern}/`;
};

export const oxfmtIgnorePatterns = [
  ...sharedIgnores.map((entry) => toOxfmtPattern(entry)),
  "node_modules",
  "*.lock",
  "**/target/"
];
