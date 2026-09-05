import type { Component } from "svelte";
import type { SVGAttributes } from "svelte/elements";

import IconBluesky from "~icons/fa6-brands/bluesky";
import IconGithub from "~icons/fa6-brands/github";
import IconInstagram from "~icons/fa6-brands/instagram";
import IconLinkedin from "~icons/fa6-brands/linkedin";
import IconMastodon from "~icons/fa6-brands/mastodon";
import IconTwitter from "~icons/fa6-brands/twitter";

import type { SocialId } from "./socials";
import { socialLinks } from "./socials";

const socialRel = "me noopener noreferrer";

export function rot13(s: string) {
  return s.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(base + ((c.charCodeAt(0) - base + 13) % 26));
  });
}

export type BrandIcon = Component<SVGAttributes<SVGSVGElement>>;

export type Social = {
  icon: BrandIcon;
  href: string;
  label: string;
  rel: string;
};

const socialIcons: Record<SocialId, BrandIcon> = {
  linkedin: IconLinkedin,
  github: IconGithub,
  mastodon: IconMastodon,
  bluesky: IconBluesky,
  twitter: IconTwitter,
  instagram: IconInstagram
};

export const socials: Social[] = socialLinks.map((link) => ({
  icon: socialIcons[link.id],
  href: link.href,
  label: link.label,
  rel: socialRel
}));
