<script lang="ts">
  import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';

  let { src, alt, open, onClose }: { src: string; alt: string; open: boolean; onClose: () => void } = $props();
</script>

<Dialog
  {open}
  onOpenChange={(e) => {
    if (!e.open) onClose();
  }}
>
  <Portal>
    <Dialog.Backdrop class="fixed inset-0 z-50 bg-surface-50-950/50" />
    <Dialog.Positioner class="fixed inset-0 z-50 flex justify-center items-center p-4">
      <Dialog.Content class="card bg-surface-100-900 p-3 shadow-xl max-w-4xl max-h-[90dvh]">
        <Dialog.Title class="sr-only">{alt}</Dialog.Title>
        <img {src} {alt} class="max-w-full max-h-[calc(90dvh-1.5rem)] w-auto h-auto mx-auto rounded-container" />
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog>
