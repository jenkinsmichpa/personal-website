<script lang="ts">
  import { Mail } from "@lucide/svelte";

  import IconBluesky from "~icons/fa6-brands/bluesky";
  import IconGithub from "~icons/fa6-brands/github";
  import IconInstagram from "~icons/fa6-brands/instagram";
  import IconLinkedin from "~icons/fa6-brands/linkedin";
  import IconMastodon from "~icons/fa6-brands/mastodon";
  import IconTwitter from "~icons/fa6-brands/twitter";

  const ROT13_RE = /[a-zA-Z]/g;

  function rot13(s: string) {
    return s.replace(ROT13_RE, (c) =>
      String.fromCharCode((c <= "Z" ? 65 : 97) + ((c.charCodeAt(0) - (c <= "Z" ? 65 : 97) + 13) % 26))
    );
  }

  function decodeEntities(s: string) {
    const el = document.createElement("div");
    el.innerHTML = s;
    return el.textContent || "";
  }

  $effect(() => {
    const obfuscated =
      "WvA4AzD7WvA4AzL7WvA4AwZ7WvA4ZzH7WvA4AwR7WvA4AmN7WvA4Awt7WvA4AwZ7WvA4Awx7WvA4AzD7CUAjLJ4+oJIfo2E5CP9mpTShCvLwrQpmBlLwrQMyBlLwrQL5BlLwrQMvBlLwrQMyBmkmpTShCaOiozD8Y3AjLJ4+WvA4AwH7WvA4AzR7WvA4AQN7WvA4AwH7WvA4AzD7";
    const raw = atob(rot13(obfuscated));
    const el = document.getElementById("email-target");
    if (el) {
      el.innerHTML = raw;
      const clean = raw.replace(/<span[^>]*>.*?<\/span>/g, "");
      const correct = decodeEntities(clean).trim().split("").reverse().join("");
      el.setAttribute("href", `mailto:${correct}`);
    }
  });
</script>

<section class="border-t border-b border-surface-200-800 py-16" id="contact">
  <div class="mx-auto max-w-6xl px-4">
    <h2 class="mb-6 text-center h1">Contact</h2>
    <div class="flex justify-center">
      <div class="w-full max-w-lg card border border-surface-200-800 preset-filled-surface-100-900 p-4">
        <ul class="space-y-4">
          <li class="flex items-center gap-3">
            <Mail class="size-5 shrink-0 text-primary-500" />
            <!-- svelte-ignore a11y_invalid_attribute -->
            <a id="email-target" class="email-link cursor-pointer text-sm text-inherit no-underline" href="">
              sserdda on = tpircSavaJ on
            </a>
          </li>
          <li class="flex items-center gap-3">
            <IconLinkedin class="size-5 shrink-0 text-primary-500" />
            <a
              href="https://www.linkedin.com/in/jenkinsmichpa"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm no-underline">linkedin.com/in/jenkinsmichpa</a
            >
          </li>
          <li class="flex items-center gap-3">
            <IconGithub class="size-5 shrink-0 text-primary-500" />
            <a
              href="https://github.com/jenkinsmichpa"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm no-underline">github.com/jenkinsmichpa</a
            >
          </li>
          <li class="flex items-center gap-3">
            <IconMastodon class="size-5 shrink-0 text-primary-500" />
            <a
              rel="me noopener noreferrer"
              href="https://infosec.exchange/@jenkinsmichpa"
              target="_blank"
              class="text-sm no-underline">infosec.exchange/@jenkinsmichpa</a
            >
          </li>
          <li class="flex items-center gap-3">
            <IconBluesky class="size-5 shrink-0 text-primary-500" />
            <a
              href="https://bsky.app/profile/jenkinsmichpa.bsky.social"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm no-underline">bsky.app/profile/jenkinsmichpa</a
            >
          </li>
          <li class="flex items-center gap-3">
            <IconTwitter class="size-5 shrink-0 text-primary-500" />
            <a href="https://x.com/jenkinsmichpa" target="_blank" rel="noopener noreferrer" class="text-sm no-underline"
              >x.com/jenkinsmichpa</a
            >
          </li>
          <li class="flex items-center gap-3">
            <IconInstagram class="size-5 shrink-0 text-primary-500" />
            <a
              href="https://www.instagram.com/jenkinsmichpa/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm no-underline">instagram.com/jenkinsmichpa</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>
