import drinkingTiger from "@assets/images/drinkingTiger.jpg";
import elderlyCouple from "@assets/images/elderlyCouple.jpg";
import hibiscus from "@assets/images/hibiscus.jpg";
import impressionistLake from "@assets/images/impressionistLake.jpg";
import lighthouse from "@assets/images/lighthouse.jpg";
import mountainRange from "@assets/images/mountainRange.jpg";
import rainbowTanager from "@assets/images/rainbowTanager.jpg";
import river from "@assets/images/river.jpg";
import scarletTanager from "@assets/images/scarletTanager.jpg";
import seaCliffs from "@assets/images/seaCliffs.jpg";
import stinkingBenjamin from "@assets/images/stinkingBenjamin.jpg";
import turtleBearSkull from "@assets/images/turtleBearSkull.jpg";
import type { ImageMetadata } from "astro";

export type PortfolioImageInput = {
  alt: string;
  img: ImageMetadata;
};

export type PortfolioItem = {
  fullSrc: string;
  fullWidth: number;
  fullHeight: number;
  alt: string;
  thumbSrc: string;
  thumbWidth: number;
  thumbHeight: number;
};

export const portfolioImages: PortfolioImageInput[] = [
  { alt: "Drinking Tiger Painting", img: drinkingTiger },
  { alt: "Hibiscus Painting", img: hibiscus },
  { alt: "Sea Cliffs Painting", img: seaCliffs },
  { alt: "Lighthouse Painting", img: lighthouse },
  { alt: "Mountain Range Painting", img: mountainRange },
  { alt: "Impressionist Lake Painting", img: impressionistLake },
  { alt: "Scarlet Tanager Painting", img: scarletTanager },
  { alt: "Rainbow Tanager Painting", img: rainbowTanager },
  { alt: "River Painting", img: river },
  { alt: "Turtle Bear Skull Painting", img: turtleBearSkull },
  { alt: "Elderly Couple Pastel Painting", img: elderlyCouple },
  { alt: "Stinking Benjamin Painting", img: stinkingBenjamin }
];

export const PORTFOLIO_PAGE_SIZE = 6;

export const portfolioPages: PortfolioImageInput[][] = Array.from(
  { length: Math.ceil(portfolioImages.length / PORTFOLIO_PAGE_SIZE) },
  (_, i) => portfolioImages.slice(i * PORTFOLIO_PAGE_SIZE, (i + 1) * PORTFOLIO_PAGE_SIZE)
);
