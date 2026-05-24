<script lang="ts">
  import { SegmentedControl } from '@skeletonlabs/skeleton-svelte';
  import LightboxDialog from './LightboxDialog.svelte';

  let { data }: { data: Array<Array<{ fullSrc: string; alt: string; thumb: { src: string } }>> } = $props();

  let page = $state<string | null>('1');
  let lightboxSrc = $state('');
  let lightboxAlt = $state('');
  let lightboxOpen = $state(false);

  function openLightbox(fullSrc: string, alt: string) {
    lightboxSrc = fullSrc;
    lightboxAlt = alt + ' - Full Size';
    lightboxOpen = true;
  }
</script>

<section class="py-16 border-t border-surface-200-800" id="portfolio">
  <div class="max-w-6xl mx-auto px-4">
    <h2 class="h1 text-center mb-6">Art Portfolio</h2>

    <div class="card p-4 preset-filled-surface-100-900 border border-surface-200-800">
      <div class="grid grid-rows-[1fr] *:[grid-area:1/1]">
        {#each data as pageItems, i (i)}
          {@const p = String(i + 1)}
          <div
            class="grid grid-cols-2 md:grid-cols-3 gap-4 transition-opacity {page === p
              ? 'opacity-100'
              : 'opacity-0 pointer-events-none'}"
          >
            {#each pageItems as item (item.fullSrc)}
              <button
                type="button"
                onclick={() => openLightbox(item.fullSrc, item.alt)}
                class="btn p-0 border-0 w-full"
              >
                <img
                  src={item.thumb.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  class="w-full rounded-container portfolio-img"
                />
              </button>
            {/each}
          </div>
        {/each}
      </div>
    </div>

    <div class="flex justify-center mt-4">
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
