import { rot13 } from "./contact.ts";

const honeypots = ["melody", "pond"];

export function buildObfuscatedEmail(email: string) {
  const entities = Array.from(email)
    .toReversed()
    .map((c) => `&#x${c.charCodeAt(0).toString(16)};`);
  const chunkCount = honeypots.length + 1;
  const parts = Array.from({ length: chunkCount }, (): string[] => []);
  entities.forEach((entity, i) => {
    parts[Math.floor((i * chunkCount) / entities.length)]?.push(entity);
  });
  const raw = parts
    .map((chunk) => chunk.join(""))
    .map((chunk, i) => (i === 0 ? chunk : `<span>${honeypots[i - 1] ?? ""}</span>${chunk}`))
    .join("");
  return rot13(btoa(raw));
}
