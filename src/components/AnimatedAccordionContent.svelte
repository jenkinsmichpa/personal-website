<script lang="ts">
  import { Accordion } from "@skeletonlabs/skeleton-svelte";
  import type { Snippet } from "svelte";
  import { slide } from "svelte/transition";

  let { children, contentClass = "space-y-1 pt-2 text-sm" }: { children: Snippet; contentClass?: string } = $props();

  const reduceMotion = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
</script>

<Accordion.ItemContent>
  {#snippet element({ hidden, ...rest })}
    {#if !hidden}
      <div {...rest} transition:slide={{ duration: reduceMotion ? 0 : 150 }} class={contentClass}>
        {@render children()}
      </div>
    {/if}
  {/snippet}
</Accordion.ItemContent>
