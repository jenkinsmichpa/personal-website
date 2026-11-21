<script lang="ts">
  import { SegmentedControl } from "@skeletonlabs/skeleton-svelte";

  import type { PortfolioItem } from "#lib/portfolio.ts";

  import LightboxDialog from "./LightboxDialog.svelte";

  type Props = { data: Array<Array<PortfolioItem>> };

  let { data }: Props = $props();

  let page = $state("1");
  let selected = $state<PortfolioItem | null>(null);

  const pages = $derived(data.map((items, index) => ({ value: String(index + 1), items })));
  const activeIndex = $derived(Math.min(Math.max(Math.trunc(Number(page)) - 1, 0), pages.length - 1));
  const activeItems = $derived(pages[activeIndex]?.items ?? []);
</script>

<section class="border-t border-b border-surface-200-800 py-16" id="portfolio">
  <div class="mx-auto max-w-6xl px-4">
    <h2 class="mb-6 text-center h1">Art Portfolio</h2>

    <div class="card border border-surface-200-800 preset-filled-surface-100-900 p-4">
      <p class="sr-only" aria-live="polite">Page {activeIndex + 1} of {data.length}</p>
      <div class="grid grid-cols-2 gap-4 md:grid-cols-3">
        {#each activeItems as item (item.fullSrc)}
          <button
            type="button"
            onclick={() => {
              selected = item;
            }}
            class="w-full cursor-pointer"
            aria-haspopup="dialog"
            aria-label={`View ${item.alt}`}
          >
            <img
              src={item.thumbSrc}
              width={item.thumbWidth}
              height={item.thumbHeight}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              class="portfolio-img w-full rounded-base corner-shape-base"
            />
          </button>
        {/each}
      </div>
    </div>

    <div class="mt-4 flex justify-center">
      <SegmentedControl
        value={page}
        onValueChange={(d) => {
          page = d.value ?? page;
        }}
      >
        <SegmentedControl.Label class="sr-only">Page</SegmentedControl.Label>
        <SegmentedControl.Control>
          <SegmentedControl.Indicator />
          {#each pages as p (p.value)}
            <SegmentedControl.Item value={p.value}>
              <SegmentedControl.ItemText>{p.value}</SegmentedControl.ItemText>
              <SegmentedControl.ItemHiddenInput />
            </SegmentedControl.Item>
          {/each}
        </SegmentedControl.Control>
      </SegmentedControl>
    </div>
  </div>
</section>

<LightboxDialog
  src={selected?.fullSrc}
  alt={selected?.alt}
  width={selected?.fullWidth}
  height={selected?.fullHeight}
  open={selected !== null}
  onClose={() => {
    selected = null;
  }}
/>
