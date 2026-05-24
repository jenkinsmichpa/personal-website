<script lang="ts">
  import { Mail } from '@lucide/svelte';
  import {
    faGithub,
    faInstagram,
    faTwitter,
    faMastodon,
    faBluesky,
    faSquareLinkedin
  } from '@fortawesome/free-brands-svg-icons';

  function rot13(s: string) {
    return s.replace(/[a-zA-Z]/g, (c) =>
      String.fromCharCode((c <= 'Z' ? 65 : 97) + ((c.charCodeAt(0) - (c <= 'Z' ? 65 : 97) + 13) % 26))
    );
  }

  function decodeEntities(s: string) {
    const el = document.createElement('div');
    el.innerHTML = s;
    return el.textContent || '';
  }

  $effect(() => {
    const obfuscated =
      'WvA4AzD7WvA4AzL7WvA4AwZ7WaOypzyiMQfzV3t2LmfzV3t2BGfzV3t2ZGfzV3t2MQf8p3Ouow5gMJkiMUx8Y3AjLJ4+WvA4Awp7WzAioJ1uqQfzV3t2ZGfzV3t3ZQfzV3t2BQfzV3t2ZmfzV3t2BGfzV3t2MQf8p3Ouow5jo25xCP9mpTShCvLwrQpmBlLwrQMyBlLwrQL5BlLwrQMvBlLwrQMyBlLwrQL1BlLwrQMuBjb';
    const raw = atob(rot13(obfuscated));
    const el = document.getElementById('email-target');
    if (el) {
      el.innerHTML = raw;
      const clean = raw.replace(/<span[^>]*>.*?<\/span>/g, '');
      const correct = decodeEntities(clean).trim().split('').reverse().join('');
      el.setAttribute('href', `mailto:${correct}`);
    }
  });
</script>

<section class="py-16 border-t border-b border-surface-200-800" id="contact">
  <div class="max-w-6xl mx-auto px-4">
    <h2 class="h1 text-center mb-6">Contact</h2>
    <div class="flex justify-center">
      <div class="card p-4 preset-filled-surface-100-900 border border-surface-200-800 w-full max-w-lg">
        <ul class="space-y-4">
          <li class="flex items-center gap-3">
            <Mail class="size-5 shrink-0 text-primary-500" />
            <!-- svelte-ignore a11y_invalid_attribute -->
            <a
              id="email-target"
              style="unicode-bidi: bidi-override; direction: rtl !important;"
              class="cursor-pointer text-sm text-inherit no-underline"
              href=""
            >
              sserdda on = tpircSavaJ on
            </a>
          </li>
          <li class="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 {faSquareLinkedin.icon[0]} {faSquareLinkedin.icon[1]}"
              fill="currentColor"
              class="shrink-0 text-primary-500"><path d={String(faSquareLinkedin.icon[4])} /></svg
            >
            <a
              href="https://www.linkedin.com/in/jenkinsmichpa"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm no-underline">linkedin.com/in/jenkinsmichpa</a
            >
          </li>
          <li class="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 {faGithub.icon[0]} {faGithub.icon[1]}"
              fill="currentColor"
              class="shrink-0 text-primary-500"><path d={String(faGithub.icon[4])} /></svg
            >
            <a
              href="https://github.com/jenkinsmichpa"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm no-underline">github.com/jenkinsmichpa</a
            >
          </li>
          <li class="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 {faMastodon.icon[0]} {faMastodon.icon[1]}"
              fill="currentColor"
              class="shrink-0 text-primary-500"><path d={String(faMastodon.icon[4])} /></svg
            >
            <a
              rel="me noopener noreferrer"
              href="https://infosec.exchange/@jenkinsmichpa"
              target="_blank"
              class="text-sm no-underline">infosec.exchange/@jenkinsmichpa</a
            >
          </li>
          <li class="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 {faBluesky.icon[0]} {faBluesky.icon[1]}"
              fill="currentColor"
              class="shrink-0 text-primary-500"><path d={String(faBluesky.icon[4])} /></svg
            >
            <a
              href="https://bsky.app/profile/jenkinsmichpa.bsky.social"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm no-underline">bsky.app/profile/jenkinsmichpa</a
            >
          </li>
          <li class="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 {faTwitter.icon[0]} {faTwitter.icon[1]}"
              fill="currentColor"
              class="shrink-0 text-primary-500"><path d={String(faTwitter.icon[4])} /></svg
            >
            <a href="https://x.com/jenkinsmichpa" target="_blank" rel="noopener noreferrer" class="text-sm no-underline"
              >x.com/jenkinsmichpa</a
            >
          </li>
          <li class="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 {faInstagram.icon[0]} {faInstagram.icon[1]}"
              fill="currentColor"
              class="shrink-0 text-primary-500"><path d={String(faInstagram.icon[4])} /></svg
            >
            <a
              href="https://www.instagram.com/jenkinsmichpa/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm no-underline">instagram.com/jenkinsmichpa</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>
