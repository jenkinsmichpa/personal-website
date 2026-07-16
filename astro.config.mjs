import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import favicons from "astro-favicons";
import Icons from "unplugin-icons/vite";

export default defineConfig({
  site: "https://jenkinsmichpa.com",
  output: "static",
  // Cloudflare CSP is a clusterfuck
  // security: {
  //   csp: {
  //     directives: [
  //       "default-src 'self'",
  //       "img-src 'self' data: blob:",
  //       "form-action 'self'",
  //       "base-uri 'self'",
  //       "connect-src 'self' cloudflareinsights.com"
  //     ],
  //     scriptDirective: {
  //       resources: ["'self'", "https://static.cloudflareinsights.com"]
  //     },
  //     styleDirective: {
  //       resources: ["'self'", { resource: "'unsafe-inline'", kind: "attribute" }]
  //     }
  //   }
  // },
  integrations: [
    svelte({
      compilerOptions: {
        discloseVersion: false
      }
    }),
    favicons({
      name: "Michael Jenkins",
      short_name: "MJ",
      themes: ["#fafafa", "#111111"],
      background: "#fafafa",
      icons: {
        favicons: true,
        appleIcon: true,
        android: true,
        appleStartup: false,
        windows: false,
        yandex: true
      },
      manifest: {
        display: "browser",
        start_url: "/"
      }
    }),
    sitemap()
  ],
  vite: {
    plugins: [
      tailwindcss(),
      Icons({
        compiler: "svelte"
      })
    ],
    build: {
      // Use esbuild instead of Lightning CSS. Lightning CSS is optimizing idiotically and creating broken Chrome CSS for parallax: https://caniuse.com/mdn-css_properties_animation_animation-timeline_included
      cssMinify: "esbuild"
    },
    ssr: {
      noExternal: ["@skeletonlabs/skeleton-svelte", "@lucide/svelte"]
    }
  }
});
