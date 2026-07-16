<script lang="ts">
  import { SegmentedControl } from "@skeletonlabs/skeleton-svelte";

  import LightboxDialog from "./LightboxDialog.svelte";

  let { data }: { data: { fullSrc: string; alt: string; thumb: { src: string } }[][] } = $props();

  let page = $state<string | null>("1");
  let lightboxSrc = $state("");
  let lightboxAlt = $state("");
  let lightboxOpen = $state(false);

  function openLightbox(fullSrc: string, alt: string) {
    lightboxSrc = fullSrc;
    lightboxAlt = alt + " - Full Size";
    lightboxOpen = true;
  }
</script>

<section class="border-t border-b border-surface-200-800 py-16" id="portfolio">
  <div class="mx-auto max-w-6xl px-4">
    <h2 class="mb-6 text-center h1">Art Portfolio</h2>

    <div class="card border border-surface-200-800 preset-filled-surface-100-900 p-4">
      <div class="grid grid-rows-[1fr] *:[grid-area:1/1]">
        {#each data as pageItems, i (i)}
          {@const p = String(i + 1)}
          <div
            class="grid grid-cols-2 gap-4 transition-opacity md:grid-cols-3 {page === p
              ? 'opacity-100'
              : 'pointer-events-none opacity-0'}"
          >
            {#each pageItems as item (item.fullSrc)}
              <button
                type="button"
                onclick={() => openLightbox(item.fullSrc, item.alt)}
                class="btn w-full border-0 p-0"
              >
                <img
                  src={item.thumb.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  class="portfolio-img w-full rounded-container"
                />
              </button>
            {/each}
          </div>
        {/each}
      </div>
    </div>

    <div class="mt-4 flex justify-center">
      <SegmentedControl value={page} onValueChange={(d) => (page = d.value)}>
        <SegmentedControl.Label class="sr-only">Page</SegmentedControl.Label>
        <SegmentedControl.Control>
          <SegmentedControl.Indicator />
          {#each data as _, i (i)}
            {@const v = String(i + 1)}
            <SegmentedControl.Item value={v}>
              <SegmentedControl.ItemText>{v}</SegmentedControl.ItemText>
              <SegmentedControl.ItemHiddenInput />
            </SegmentedControl.Item>
          {/each}
        </SegmentedControl.Control>
      </SegmentedControl>
    </div>
  </div>
</section>

<LightboxDialog src={lightboxSrc} alt={lightboxAlt} open={lightboxOpen} onClose={() => (lightboxOpen = false)} />
