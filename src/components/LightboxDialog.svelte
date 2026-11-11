<script lang="ts">
  import { Dialog, Portal } from "@skeletonlabs/skeleton-svelte";

  let {
    src,
    alt,
    width,
    height,
    open,
    onClose
  }: {
    src?: string | undefined;
    alt?: string | undefined;
    width?: number | undefined;
    height?: number | undefined;
    open: boolean;
    onClose: () => void;
  } = $props();
</script>

<!-- No ugly close button by design. -->
<Dialog
  {open}
  onOpenChange={(e) => {
    if (!e.open) onClose();
  }}
>
  <Portal>
    <Dialog.Backdrop class="fixed inset-0 z-60 bg-surface-50-950/50" />
    <Dialog.Positioner class="fixed inset-0 z-60 flex items-center justify-center p-4">
      <Dialog.Content class="max-h-[90dvh] max-w-4xl card bg-surface-100-900 p-3 shadow-xl">
        <Dialog.Title class="sr-only">{alt ?? "Artwork preview"}</Dialog.Title>
        <Dialog.Description class="sr-only">
          {alt ? `Enlarged view of ${alt}` : "Enlarged artwork view"}
        </Dialog.Description>
        {#if open && src}
          <img
            {src}
            alt={alt ?? ""}
            {width}
            {height}
            class="mx-auto h-auto max-h-[calc(90dvh-1.5rem)] w-auto max-w-full rounded-container"
          />
        {/if}
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog>
