<script lang="ts">
  import { AppBar } from '@skeletonlabs/skeleton-svelte';
  import { Sun, Moon, House, User, LayoutGrid, Mail } from '@lucide/svelte';

  let scrolled = $state(false);
  let dark = $state(false);
  let navTextClass = $derived(scrolled && !dark ? 'text-surface-900' : 'text-white');

  function onScroll() {
    scrolled = window.scrollY > 80;
  }

  function toggleTheme() {
    dark = !dark;
    if (dark) {
      document.documentElement.dataset.colorScheme = 'dark';
      document.documentElement.style.colorScheme = 'dark';
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.dataset.colorScheme = 'light';
      document.documentElement.style.colorScheme = 'light';
      localStorage.setItem('theme', 'light');
    }
  }

  $effect(() => {
    const scheme = document.documentElement.dataset.colorScheme;
    dark = scheme === 'dark';
    scrolled = window.scrollY > 80;

    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('#navbar .nav-link');
    let cleanupScrollspy = () => {};
    if (sections.length && links.length) {
      const OFFSET = 110;
      function updateActive() {
        let current = links[0];
        for (const a of links) {
          const id = a.getAttribute('href')?.slice(1);
          if (!id) continue;
          const el = document.getElementById(id);
          if (!el) continue;
          if (el.getBoundingClientRect().top <= OFFSET) current = a;
        }
        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
          current = links[links.length - 1];
        }
        links.forEach((a) => a.classList.remove('active'));
        current.classList.add('active');
      }
      updateActive();
      window.addEventListener('scroll', updateActive, { passive: true });
      cleanupScrollspy = () => window.removeEventListener('scroll', updateActive);
    }
    return () => {
      cleanupScrollspy();
    };
  });
</script>

<AppBar
  class="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 border-b {navTextClass} {scrolled
    ? 'navbar-glass border-surface-200-800'
    : 'bg-transparent border-transparent'}"
  id="navbar"
>
  <AppBar.Toolbar class="flex items-center justify-between w-full md:grid md:grid-cols-[auto_1fr_auto] px-4">
    <AppBar.Lead>
      <a href="#home" aria-label="Home">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="-10 -10 80 80"
          role="img"
          aria-label="Personal logo initials MJ combined"
          class={navTextClass}
        >
          <title>Personal logo</title>
          <desc>Initials MJ combined</desc>
          <path
            class="logo-stroke"
            d="M53.333 40 L0 40 L0 0 L30 40 L60 0 L60 40 A15 20 0 0 1 30 40 L36.666 40 A8.333 13.333 0 1 0 53.333 40 L53.333 8.888"
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
      </a>
    </AppBar.Lead>
    <AppBar.Headline class="hidden md:flex justify-center gap-6">
      <a href="#home" class="nav-link text-sm font-medium">Home</a>
      <a href="#about" class="nav-link text-sm font-medium">About</a>
      <a href="#portfolio" class="nav-link text-sm font-medium">Portfolio</a>
      <a href="#contact" class="nav-link text-sm font-medium">Contact</a>
    </AppBar.Headline>
    <AppBar.Trail>
      <button
        type="button"
        onclick={toggleTheme}
        class="btn-icon btn-icon-lg hover:preset-tonal"
        aria-label="Toggle theme"
      >
        {#if dark}
          <Sun class="size-5" />
        {:else}
          <Moon class="size-5" />
        {/if}
      </button>
    </AppBar.Trail>
  </AppBar.Toolbar>
</AppBar>

<svelte:window onscroll={onScroll} />

<nav
  class="fixed bottom-0 left-0 right-0 z-50 md:hidden navbar-glass border-t border-surface-200-800 {dark
    ? 'text-white/70'
    : 'text-surface-800'}"
>
  <div class="flex justify-around py-2">
    <a href="#home" class="flex flex-col items-center text-xs"><House class="size-5" />Home</a>
    <a href="#about" class="flex flex-col items-center text-xs"><User class="size-5" />About</a>
    <a href="#portfolio" class="flex flex-col items-center text-xs"><LayoutGrid class="size-5" />Portfolio</a>
    <a href="#contact" class="flex flex-col items-center text-xs"><Mail class="size-5" />Contact</a>
  </div>
</nav>
