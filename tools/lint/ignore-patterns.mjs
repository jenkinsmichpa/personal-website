const sharedIgnores = ["dist", ".astro", ".wrangler", "tools/oxlint/anti-slop/**"];

export const eslintIgnores = [...sharedIgnores];

export const oxlintIgnorePatterns = [...sharedIgnores];

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
  "*.astro", // oxfmt has no Astro support yet
  "**/target/"
];
