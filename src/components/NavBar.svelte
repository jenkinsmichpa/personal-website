<script lang="ts">
  import HouseIcon from "@lucide/svelte/icons/house";
  import LayoutGridIcon from "@lucide/svelte/icons/layout-grid";
  import MailIcon from "@lucide/svelte/icons/mail";
  import MoonIcon from "@lucide/svelte/icons/moon";
  import SunIcon from "@lucide/svelte/icons/sun";
  import UserIcon from "@lucide/svelte/icons/user";
  import { AppBar } from "@skeletonlabs/skeleton-svelte";

  import { initTheme, theme, themeAttachment, toggleTheme } from "#lib/darkmode.svelte.ts";

  import Logo from "./Logo.svelte";

  const navItems = [
    { id: "home", label: "Home", icon: HouseIcon },
    { id: "about", label: "About", icon: UserIcon },
    { id: "portfolio", label: "Portfolio", icon: LayoutGridIcon },
    { id: "contact", label: "Contact", icon: MailIcon }
  ];

  let scrolled = $state(false);
  let currentId = $state("home");
  let navTextClass = $derived(scrolled ? "text-surface-950-50" : "text-white");

  const SCROLLED_THRESHOLD_PX = 80;
  let ticking = false;
  function handleScroll() {
    if (ticking) {
      return;
    }
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
      const el = document.querySelector(`#${item.id}`);
      if (!el) {
        continue;
      }
      if (el.getBoundingClientRect().top <= offset) {
        next = item.id;
      }
    }
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - BOTTOM_TOLERANCE_PX) {
      next = navItems.at(-1)?.id ?? next;
    }
    currentId = next;
  }

  initTheme();

  $effect(() => {
    scrolled = window.scrollY > SCROLLED_THRESHOLD_PX;

    const navbarRoot = document.querySelector<HTMLElement>("#navbar");
    let resizeObserver: ResizeObserver | undefined;
    if (navbarRoot) {
      const updateNavbarHeight = () => {
        const height = navbarRoot.offsetHeight;
        navHeight = height;
        document.documentElement.style.setProperty("--navbar-height", `${String(height)}px`);
      };
      updateNavbarHeight();
      resizeObserver = new ResizeObserver(updateNavbarHeight);
      resizeObserver.observe(navbarRoot);
    }

    updateActive();
    return () => {
      resizeObserver?.disconnect();
      document.documentElement.style.removeProperty("--navbar-height");
    };
  });
</script>

<svelte:window onscroll={handleScroll} />

<div class="hidden" {@attach themeAttachment(theme.isDark)}></div>

<AppBar
  class={[
    "navbar-shell fixed top-0 right-0 left-0 z-50 w-full border-b transition-all duration-500 motion-reduce:transition-none",
    navTextClass,
    scrolled ? "navbar-glass border-surface-200-800" : "border-transparent bg-transparent"
  ]}
  id="navbar"
>
  <AppBar.Toolbar class="flex w-full items-center justify-between px-4 md:grid md:grid-cols-[auto_1fr_auto]">
    <AppBar.Lead aria-label="Home">
      <a href="#home" aria-label="Home">
        <Logo class={navTextClass} />
      </a>
    </AppBar.Lead>
    <AppBar.Headline class="hidden justify-center md:flex">
      <nav aria-label="Primary" class="flex justify-center gap-6">
        {#each navItems as item (item.id)}
          <a
            href={`#${item.id}`}
            class="nav-link text-sm font-medium"
            aria-current={currentId === item.id ? "location" : undefined}>{item.label}</a
          >
        {/each}
      </nav>
    </AppBar.Headline>
    <AppBar.Trail aria-label="Theme controls">
      <button
        type="button"
        onclick={toggleTheme}
        class={["theme-toggle btn-icon btn-icon-lg", scrolled ? "text-surface-950-50" : "text-white"]}
        aria-label={theme.isDark ? "Switch to light mode" : "Switch to dark mode"}
        aria-pressed={theme.isDark}
      >
        <MoonIcon class="dark:hidden" />
        <SunIcon class="hidden dark:block" />
      </button>
    </AppBar.Trail>
  </AppBar.Toolbar>
</AppBar>

<nav
  aria-label="Sections"
  class={[
    "fixed right-0 bottom-0 left-0 z-50 pb-[env(safe-area-inset-bottom,0px)] transition-all duration-500 motion-reduce:transition-none md:hidden",
    navTextClass,
    scrolled ? "navbar-glass border-t border-surface-200-800" : "border-t border-transparent bg-transparent"
  ]}
>
  <div class="flex justify-around py-2">
    {#each navItems as item (item.id)}
      {const Icon = $derived(item.icon)}
      <a
        href={`#${item.id}`}
        class="nav-link relative flex flex-col items-center text-xs after:absolute after:-top-2 after:left-1/2 after:h-0.5 after:w-6 after:-translate-x-1/2 after:scale-x-0 after:rounded-full after:bg-current after:transition-transform after:duration-300 after:content-[''] aria-[current=location]:font-semibold aria-[current=location]:after:scale-x-100 motion-reduce:after:transition-none"
        aria-current={currentId === item.id ? "location" : undefined}><Icon class="size-elem-xl" />{item.label}</a
      >
    {/each}
  </div>
</nav>
