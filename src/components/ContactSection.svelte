<script lang="ts">
  import { rot13, socials } from "@lib/contact";
  import { Mail } from "@lucide/svelte";
  import { onMount } from "svelte";

  let { obfuscated }: { obfuscated: string } = $props();

  let displayHtml = $state("");
  let emailHref = $state<string>();

  onMount(() => {
    const raw = atob(rot13(obfuscated));
    displayHtml = raw;

    const doc = new DOMParser().parseFromString(raw, "text/html");
    doc.querySelectorAll("span").forEach((el) => el.remove());
    const address = [...(doc.body.textContent ?? "").trim()].reverse().join("");
    emailHref = `mailto:${address}`;
  });
</script>

<section class="border-t border-b border-surface-200-800 py-16" id="contact">
  <div class="mx-auto max-w-6xl px-4">
    <h2 class="mb-6 text-center h1">Contact</h2>
    <div class="flex justify-center">
      <div class="w-full max-w-lg card border border-surface-200-800 preset-filled-surface-100-900 p-4">
        <ul class="space-y-4">
          <li class="flex items-center gap-3">
            <Mail class="size-5 shrink-0 text-primary-500" aria-hidden="true" />
            <a
              id="email-target"
              class="email-link cursor-pointer text-sm text-inherit no-underline"
              href={emailHref}
              aria-live="polite"
            >
              {#if displayHtml}
                <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                {@html displayHtml}
              {:else}
                Enable JavaScript to view email
              {/if}
            </a>
          </li>
          {#each socials as social (social.href)}
            {@const Icon = social.icon}
            <li class="flex items-center gap-3">
              <Icon class="size-5 shrink-0 text-primary-500" aria-hidden="true" />
              <a href={social.href} target="_blank" rel={social.rel} class="text-sm no-underline">{social.label}</a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</section>
