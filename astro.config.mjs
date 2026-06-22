import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import favicons from "astro-favicons";

export default defineConfig({
  site: "https://jenkinsmichpa.com",
  output: "static",
  // Cloudflare is a CSP nightmare
  // markdown: {
  //   syntaxHighlight: false
  // },
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
  //       resources: ["'self'", "static.cloudflareinsights.com"]
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
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["@skeletonlabs/skeleton-svelte", "@iconify/svelte", "@lucide/svelte"]
    }
  }
});
