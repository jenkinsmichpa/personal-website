<script lang="ts">
  import { Accordion } from "@skeletonlabs/skeleton-svelte";
  import type { Snippet } from "svelte";
  import { prefersReducedMotion } from "svelte/motion";
  import { slide } from "svelte/transition";

  let { children, contentClass = "space-y-1 pt-2 text-sm" }: { children: Snippet; contentClass?: string } = $props();
</script>

<Accordion.ItemContent>
  {#snippet element({ hidden, ...rest })}
    {#if !hidden}
      <div {...rest} transition:slide={{ duration: prefersReducedMotion.current ? 0 : 150 }} class={contentClass}>
        {@render children()}
      </div>
    {/if}
  {/snippet}
</Accordion.ItemContent>
