export type SocialId = "linkedin" | "github" | "mastodon" | "bluesky" | "twitter" | "instagram";

export type SocialLink = {
  id: SocialId;
  href: string;
  label: string;
};

export const socialLinks: SocialLink[] = [
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/jenkinsmichpa",
    label: "linkedin.com/in/jenkinsmichpa"
  },
  {
    id: "github",
    href: "https://github.com/jenkinsmichpa",
    label: "github.com/jenkinsmichpa"
  },
  {
    id: "mastodon",
    href: "https://infosec.exchange/@jenkinsmichpa",
    label: "infosec.exchange/@jenkinsmichpa"
  },
  {
    id: "bluesky",
    href: "https://bsky.app/profile/jenkinsmichpa.bsky.social",
    label: "bsky.app/profile/jenkinsmichpa"
  },
  {
    id: "twitter",
    href: "https://x.com/jenkinsmichpa",
    label: "x.com/jenkinsmichpa"
  },
  {
    id: "instagram",
    href: "https://www.instagram.com/jenkinsmichpa/",
    label: "instagram.com/jenkinsmichpa"
  }
];
