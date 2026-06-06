import { relative, resolve } from "node:path";

const distDir = resolve(import.meta.dir, "..", "dist");

const CSP_META_RE = /<meta\s+http-equiv\s*=\s*"content-security-policy"\s+content\s*=\s*"([^"]+)"\s*\/?>/i;

const STYLE_ATTR_RE = /\bstyle\s*=\s*(?:"([^"]*)"|'([^']*)')/gi;

function findDirectiveIndex(directives, name) {
  return directives.findIndex((d) => d === name || d.startsWith(name + " "));
}

function parseDirectiveTokens(directive) {
  const spaceIndex = directive.indexOf(" ");
  const value = spaceIndex === -1 ? "" : directive.slice(spaceIndex + 1);
  return new Set(value.split(/\s+/).filter(Boolean));
}

function computeStyleAttrHashes(html) {
  const hashes = new Set();
  for (const match of html.matchAll(STYLE_ATTR_RE)) {
    const value = match[1] ?? match[2];
    if (value.trim().length === 0) continue;
    const hash = Bun.CryptoHasher.hash("sha256", value, "base64");
    hashes.add(`'sha256-${hash}'`);
  }
  return hashes;
}

function injectStyleHashes(directives, attrHashes) {
  let styleIndex = findDirectiveIndex(directives, "style-src-attr");
  if (styleIndex === -1) {
    styleIndex = findDirectiveIndex(directives, "style-src");
  }
  if (styleIndex === -1) return false;

  const existingTokens = parseDirectiveTokens(directives[styleIndex]);
  existingTokens.add("'unsafe-hashes'");
  for (const hash of attrHashes) existingTokens.add(hash);

  const directiveName = directives[styleIndex].startsWith("style-src-attr") ? "style-src-attr" : "style-src";
  directives[styleIndex] = `${directiveName} ${[...existingTokens].join(" ")}`;
  return true;
}

async function main() {
  console.log("Injecting style attribute hashes into CSP directives...");
  const htmlFiles = [...new Bun.Glob("**/*.html").scanSync({ cwd: distDir, absolute: true })];

  if (htmlFiles.length === 0) {
    throw new Error("No HTML files found in dist/");
  }

  const results = await Promise.all(
    htmlFiles.map(async (file) => {
      const original = await Bun.file(file).text();
      const cspMatch = original.match(CSP_META_RE);
      if (!cspMatch) return 0;

      const [, oldCsp] = cspMatch;
      const attrHashes = computeStyleAttrHashes(original);
      if (attrHashes.size === 0) return 0;

      const directives = oldCsp
        .split(";")
        .map((d) => d.trim())
        .filter(Boolean);

      if (!injectStyleHashes(directives, attrHashes)) return 0;

      const newCsp = directives.join("; ");
      if (newCsp === oldCsp) return 0;

      const newTag = cspMatch[0].replace(oldCsp, newCsp);
      const newHtml = original.replace(cspMatch[0], newTag);
      await Bun.write(file, newHtml);
      console.log(`Updated HTML file: ${relative(distDir, file)}`);
      return 1;
    })
  );

  const modified = results.reduce((sum, count) => sum + count, 0);
  if (modified === 0) {
    console.log("No inline style attributes or CSP meta tags found");
  } else {
    console.log(`Updated CSP style-src in ${modified} HTML file(s)`);
  }
}

main().catch((err) => {
  console.error(`${import.meta.path}:`, err.message);
  process.exitCode = 1;
});
