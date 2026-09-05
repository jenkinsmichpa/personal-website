<script lang="ts">
  let { class: className = "" }: { class?: string } = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="40"
  height="40"
  viewBox="-10 -10 80 80"
  role="img"
  aria-labelledby="logo-title logo-desc"
  class={className}
>
  <title id="logo-title">Personal logo</title>
  <desc id="logo-desc">Initials MJ combined</desc>
  <path
    class="logo-stroke"
    d="M53.333 40 L0 40 L0 0 L30 40 L60 0 L60 40 A15 20 0 0 1 30 40 L36.666 40 A8.333 13.333 0 1 0 53.333 40 L53.333 8.888"
    pathLength="1"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke="currentColor"
    fill="none"
  />
  <path
    class="logo-fill"
    d="M0 0 L0 40 L30 40 Z M60 0 L60 40 A15 20 0 0 1 30 40 L36.666 40 A8.333 13.333 0 1 0 53.333 40 L53.333 8.888 Z"
    stroke="none"
    fill="currentColor"
  />
</svg>
