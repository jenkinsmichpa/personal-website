<script lang="ts">
  import { House, LayoutGrid, Mail, Moon, Sun, User } from "@lucide/svelte";
  import { AppBar } from "@skeletonlabs/skeleton-svelte";

  import Logo from "./Logo.svelte";

  const navItems = [
    { id: "home", label: "Home", icon: House },
    { id: "about", label: "About", icon: User },
    { id: "portfolio", label: "Portfolio", icon: LayoutGrid },
    { id: "contact", label: "Contact", icon: Mail }
  ];

  let scrolled = $state(false);
  // theme.js sets dataset.mode before hydration, so read it synchronously to avoid a flash.
  let dark = $state(typeof document !== "undefined" && document.documentElement.dataset.mode === "dark");
  let currentId = $state("home");
  let navTextClass = $derived(scrolled && !dark ? "text-surface-900" : "text-white");

  const SCROLLED_THRESHOLD_PX = 80;
  let ticking = false;
  function handleScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      scrolled = window.scrollY > SCROLLED_THRESHOLD_PX;
      updateActive();
    });
  }

  // Keep in sync with --navbar-height (see scroll-padding-top in global.css).
  // Measured at runtime. 57px matches the CSS fallback until then.
  let navHeight = 57;
  const SCROLLSPY_MARGIN_PX = 53;
  // 2px tolerance so rounding can't prevent the last section from activating.
  const BOTTOM_TOLERANCE_PX = 2;
  function updateActive() {
    const offset = navHeight + SCROLLSPY_MARGIN_PX;
    let next = navItems[0]?.id ?? "home";
    for (const item of navItems) {
      const el = document.getElementById(item.id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= offset) next = item.id;
    }
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - BOTTOM_TOLERANCE_PX) {
      next = navItems[navItems.length - 1]?.id ?? next;
    }
    currentId = next;
  }

  function applyTheme(mode: "dark" | "light", persist = true) {
    document.documentElement.dataset.mode = mode;
    document.documentElement.style.colorScheme = mode;
    if (!persist) return;
    try {
      localStorage.setItem("theme", mode);
    } catch {
      /* storage unavailable */
    }
  }

  function toggleTheme() {
    dark = !dark;
    applyTheme(dark ? "dark" : "light");
  }

  $effect(() => {
    dark = document.documentElement.dataset.mode === "dark";
    applyTheme(dark ? "dark" : "light", false);
    scrolled = window.scrollY > SCROLLED_THRESHOLD_PX;

    const navbarRoot = document.getElementById("navbar");
    let resizeObserver: ResizeObserver | undefined;
    if (navbarRoot) {
      const updateNavbarHeight = () => {
        const height = navbarRoot.offsetHeight;
        navHeight = height;
        document.documentElement.style.setProperty("--navbar-height", `${height}px`);
      };
      updateNavbarHeight();
      resizeObserver = new ResizeObserver(updateNavbarHeight);
      resizeObserver.observe(navbarRoot);
    }

    updateActive();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      resizeObserver?.disconnect();
      document.documentElement.style.removeProperty("--navbar-height");
    };
  });
</script>

<AppBar
  class="fixed top-0 right-0 left-0 z-50 w-full border-b transition-all duration-500 motion-reduce:transition-none {navTextClass} {scrolled
    ? 'navbar-glass border-surface-200-800'
    : 'border-transparent bg-transparent'}"
  id="navbar"
>
  <AppBar.Toolbar class="flex w-full items-center justify-between px-4 md:grid md:grid-cols-[auto_1fr_auto]">
    <AppBar.Lead>
      <a href="#home" aria-label="Home">
        <Logo class={navTextClass} />
      </a>
    </AppBar.Lead>
    <AppBar.Headline class="hidden justify-center gap-6 md:flex">
      {#each navItems as item (item.id)}
        <a
          href={`#${item.id}`}
          class="nav-link text-sm font-medium"
          aria-current={currentId === item.id ? "page" : undefined}>{item.label}</a
        >
      {/each}
    </AppBar.Headline>
    <AppBar.Trail>
      <button
        type="button"
        onclick={toggleTheme}
        class="btn-icon btn-icon-lg {scrolled ? 'hover:preset-tonal' : 'hover:bg-white/10'}"
        aria-label="Toggle theme"
        aria-pressed={dark}
      >
        {#if dark}
          <Sun />
        {:else}
          <Moon />
        {/if}
      </button>
    </AppBar.Trail>
  </AppBar.Toolbar>
</AppBar>

<nav
  class="fixed right-0 bottom-0 left-0 z-50 pb-[env(safe-area-inset-bottom,0px)] transition-all duration-500 motion-reduce:transition-none md:hidden {navTextClass} {scrolled
    ? 'navbar-glass border-t border-surface-200-800'
    : 'border-t border-transparent bg-transparent'}"
>
  <div class="flex justify-around py-2">
    {#each navItems as item (item.id)}
      {@const Icon = item.icon}
      <a
        href={`#${item.id}`}
        class="nav-link flex flex-col items-center text-xs aria-[current=page]:text-primary-500"
        aria-current={currentId === item.id ? "page" : undefined}><Icon class="size-5" />{item.label}</a
      >
    {/each}
  </div>
</nav>
