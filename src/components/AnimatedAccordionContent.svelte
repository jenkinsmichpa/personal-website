<script lang="ts">
  import { Accordion } from "@skeletonlabs/skeleton-svelte";
  import type { Snippet } from "svelte";
  import { slide } from "svelte/transition";

  let { children, contentClass = "space-y-1 pt-2 text-sm" }: { children: Snippet; contentClass?: string } = $props();

  let reduceMotion = $state(false);

  $effect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => (reduceMotion = query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  });
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
