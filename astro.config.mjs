import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import favicons from "astro-favicons";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://jenkinsmichpa.com",
  output: "static",
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
      noExternal: [
        "@skeletonlabs/skeleton-svelte",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-brands-svg-icons",
        "@lucide/svelte"
      ]
    },
    optimizeDeps: {
      include: [
        "@skeletonlabs/skeleton-svelte",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-brands-svg-icons",
        "@lucide/svelte"
      ]
    }
  }
});
