<script lang="ts">
  import type { AboutPortrait } from "@lib/about";
  import { activities, awardGroups, experienceItems, knowledgeGroups } from "@lib/about";
  import { ChevronDown, ChevronRight, FileUser, Hammer, MapPin, Shield } from "@lucide/svelte";
  import { Accordion } from "@skeletonlabs/skeleton-svelte";

  import IconLinkedin from "~icons/fa6-brands/linkedin";

  import AnimatedAccordionContent from "./AnimatedAccordionContent.svelte";

  let { portrait }: { portrait: AboutPortrait } = $props();

  const cardClass = "break-inside-avoid card border border-surface-200-800 preset-filled-surface-100-900 p-4";
</script>

{#snippet bullet()}<ChevronRight class="inline size-3 text-primary-500" aria-hidden="true" />{/snippet}

<section class="border-t border-b border-surface-200-800 py-16" id="about">
  <div class="mx-auto max-w-6xl px-4">
    <div class="columns-1 gap-4 space-y-4 md:columns-2">
      <div class={cardClass}>
        <img
          src={portrait.src}
          width={portrait.width}
          height={portrait.height}
          alt="Michael Jenkins Portrait"
          class="w-full rounded-container border border-surface-200-800"
          loading="lazy"
          decoding="async"
        />
        <div class="mt-4 space-y-3">
          <h2 class="h3">Michael Jenkins</h2>
          <div class="space-y-3 text-sm">
            <p>
              Michael Jenkins is a graduate student at Purdue University, pursuing a Masters degree in Computer and
              Information Technology with a focus on Cybersecurity. He previously earned his Bachelors degree in
              Cybersecurity and Network Engineering Technology from Purdue, graduating with highest distinction.
            </p>
            <p>
              Michael worked as a senior consultant in the Cyber Security unit of Crowe LLP's Consulting practice, where
              he delivered a range of information security services including security assessments, penetration testing,
              and virtual security officer support to clients across multiple industries.
            </p>
            <p>
              Passionate about lifelong learning, Michael spends his free time expanding his HomeLab and smart home
              setups as well as painting.
            </p>
          </div>
          <div class="mt-4 grid grid-cols-2 gap-3">
            <a
              href="/documents/michaelJenkinsResume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              class="btn preset-filled-primary-500 btn-base"
            >
              <FileUser />
              <span>Resume</span>
            </a>
            <a
              href="https://www.linkedin.com/in/jenkinsmichpa"
              target="_blank"
              rel="noopener noreferrer"
              class="btn preset-filled-primary-500 btn-base"
            >
              <IconLinkedin />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      <div class={cardClass}>
        <h2 class="mb-3 h3">Education</h2>
        <ul class="space-y-1">
          <li>
            <div class="flex flex-col sm:flex-row sm:justify-between">
              <span class="purdue-gold flex items-center gap-1"
                ><Hammer class="size-4" aria-hidden="true" /> Purdue University</span
              >
              <em class="text-sm opacity-60">GPA 4.0/4.0</em>
            </div>
          </li>
          <li>
            <div class="flex flex-col text-sm">
              <span>Master of Science: Computer and Information Technology</span>
              <em class="opacity-60">2025 - 2027</em>
            </div>
          </li>
          <li>
            <div class="flex flex-col text-sm">
              <span>Bachelor of Science: Cybersecurity and Network Engineering Technology</span>
              <em class="opacity-60">2018 - 2022</em>
            </div>
          </li>
          <li>
            <span class="text-sm">Additional Studies: Art and Design Studio</span>
          </li>
          <li>
            <div class="flex flex-col sm:flex-row sm:justify-between">
              <span class="flex items-center gap-1 font-bold"
                ><MapPin class="size-4 text-primary-500" aria-hidden="true" /> Czech Technical University</span
              >
              <em class="text-sm opacity-60">Study Abroad Spring 2020</em>
            </div>
          </li>
        </ul>
      </div>

      <div class={cardClass}>
        <h2 class="mb-3 h3">Activities</h2>
        {#each activities as activity (activity.org)}
          <div>
            <h3 class="mb-1 flex items-center gap-1 font-bold">
              <Shield class="size-4 text-primary-500" aria-hidden="true" />
              {activity.org}
            </h3>
            {#each activity.roles as role (role.title)}
              <div class="flex flex-col text-sm sm:flex-row sm:justify-between">
                <span>{role.title}</span>
                <em class="opacity-60">{role.period}</em>
              </div>
            {/each}
            <ul class="mt-2 space-y-1">
              {#each activity.details as detail (detail)}
                <li class="text-sm">{@render bullet()} {detail}</li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>

      <div class={cardClass}>
        <h2 class="mb-3 h3">Work Experience</h2>
        <Accordion
          defaultValue={experienceItems[0]?.id ? [experienceItems[0].id] : []}
          class="divide-y divide-surface-200-800"
        >
          {#each experienceItems as item (item.id)}
            <Accordion.Item value={item.id}>
              <h3>
                <Accordion.ItemTrigger class="flex w-full items-center justify-between gap-2 font-bold">
                  <span>{item.company}</span>
                  <Accordion.ItemIndicator class="group">
                    <ChevronDown class="size-4 transition group-data-[state=open]:rotate-180" />
                  </Accordion.ItemIndicator>
                </Accordion.ItemTrigger>
              </h3>
              <AnimatedAccordionContent>
                {#each item.roles as role (role.title)}
                  <div class="flex flex-col sm:flex-row sm:justify-between">
                    <span>{role.title}</span>
                    <em class="opacity-60">{role.period}</em>
                  </div>
                {/each}
                <hr class="hr" />
                <ul class="space-y-1">
                  {#each item.details as detail (detail)}
                    <li>{@render bullet()} {detail}</li>
                  {/each}
                </ul>
              </AnimatedAccordionContent>
            </Accordion.Item>
          {/each}
        </Accordion>
      </div>

      <div class={cardClass}>
        <h2 class="mb-3 h3">Awards</h2>
        <div class="space-y-3">
          {#each awardGroups as group (group.id)}
            {@const Icon = group.icon}
            <div>
              <h3 class="mb-1 flex items-center gap-1 font-bold">
                <Icon class="size-4 text-primary-500" aria-hidden="true" />
                {group.title}
              </h3>
              <ul class="space-y-1">
                {#each group.items as item (item)}
                  <li class="text-sm">{@render bullet()} {item}</li>
                {/each}
              </ul>
            </div>
          {/each}
        </div>
      </div>

      <div class={cardClass}>
        <h2 class="mb-3 h3">Knowledge</h2>
        <Accordion
          defaultValue={knowledgeGroups[0]?.id ? [knowledgeGroups[0].id] : []}
          class="divide-y divide-surface-200-800"
        >
          {#each knowledgeGroups as group (group.id)}
            <Accordion.Item value={group.id}>
              <h3>
                <Accordion.ItemTrigger class="flex w-full items-center justify-between gap-2 font-bold">
                  {@const Icon = group.icon}
                  <Icon class="mr-1 size-4 text-primary-500" aria-hidden="true" />
                  <span class="flex-1 text-left">{group.title}</span>
                  <Accordion.ItemIndicator class="group">
                    <ChevronDown class="size-4 transition group-data-[state=open]:rotate-180" />
                  </Accordion.ItemIndicator>
                </Accordion.ItemTrigger>
              </h3>
              <AnimatedAccordionContent>
                <ul class="space-y-1">
                  {#each group.items as item (item)}
                    <li>{@render bullet()} {item}</li>
                  {/each}
                </ul>
              </AnimatedAccordionContent>
            </Accordion.Item>
          {/each}
        </Accordion>
      </div>
    </div>
  </div>
</section>
