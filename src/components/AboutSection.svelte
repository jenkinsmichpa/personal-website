<script lang="ts">
  import { Accordion } from '@skeletonlabs/skeleton-svelte';
  import { slide } from 'svelte/transition';
  import { linkedinPath } from '@lib/linkedin';
  let { portraitSrc }: { portraitSrc: string } = $props();
  import {
    ChevronDown,
    ChevronRight,
    Award,
    GraduationCap,
    BadgeCheck,
    Crosshair,
    ShieldCheck,
    Network,
    FileCode,
    Server,
    ChartBarBig,
    Palette,
    FileUser,
    Hammer,
    Map,
    Shield
  } from '@lucide/svelte';

  let experienceValue = $state(['1']);
  let knowledgeValue = $state(['1']);

  const experienceItems = [
    {
      id: '1',
      company: 'Crowe LLP',
      roles: [
        { title: 'Cyber Security Consulting Staff', period: 'January 2023 - August 2025' },
        { title: 'Cyber Security Consulting Senior Staff', period: 'August 2025' },
        { title: 'Cyber Security Consulting Intern', period: 'Summer 2021, 2022' }
      ],
      details: [
        'Led and performed Internal, External, and Web Application Penetration Testing for clients in the Public Sector, Financial Services, Healthcare, Manufacturing, and Life Sciences industries.',
        'Conducted cybersecurity gap and maturity assessments against industry frameworks and regulations including NIST CSF, NIST SP 800-53, ISO 27000, NYCRR, CUI, and HIPAA.',
        'Performed technical audits against hardened baselines of diverse systems, services, and network configurations, including Linux, Windows, Entra ID, and Active Directory.',
        'Developed methodology, scripts, and integrated control frameworks to support new forms of assessment.',
        'Provided virtual security officer services to a manufacturing organization including policy drafting, risk management activities, and acquisition transition.',
        'Spearheaded IaC project to modernize and automate Azure and vSphere engagement resource management using Terraform, Ansible, Packer, and GitLab CI/CD pipelines.'
      ]
    },
    {
      id: '2',
      company: 'Raytheon Technologies',
      roles: [{ title: 'Student Tech Intern', period: 'Summer 2020' }],
      details: [
        'Enforced and audited AWS instance compliance against hardened Windows and Linux baselines on approximately thirty machines, with planned expanded deployment, utilizing Chef and Chef InSpec.',
        'Produced user acceptance tests for a Perl program to streamline Terraform provisioning.',
        'Performed manual and supervised automated patching to ensure rapid vulnerability remediation.',
        'Participated in daily stand-up and weekly planning meetings as part of an Agile workflow.'
      ]
    },
    {
      id: '3',
      company: 'Purdue University',
      roles: [
        { title: 'Undergraduate Teaching Assistant', period: 'January 2021 - December 2022' },
        { title: 'Graduate Teaching Assistant', period: 'January 2025 - Present' }
      ],
      details: [
        'Led one CNIT 470 Incident Response Management, two CNIT 270 Cybersecurity Fundamentals, four CNIT 255 OOP Intro, and one CNIT 176 IT Architectures lab sections.',
        'Provided feedback and guidance to students regarding extended incident response in a simulated environment, core security concepts, OOP best practices, and a semester long Raspberry Pi project.',
        'Wrote ransomware and Active Directory relay attack simulations in Rust to demonstrate malware evasion, cryptographic flaws, and provide realistic incident response artifacts.',
        'Wrote a Gradescope autograder in Rust to enforce code standards and rubrics, standardized Typst lab manuals, and queue system in Typescript to streamline lab checkoff.'
      ]
    },
    {
      id: '4',
      company: 'CircleCityCon',
      roles: [{ title: 'Volunteer Administrative Assistant', period: '2021 - 2023' }],
      details: [
        'Scheduled, documented, and summarized meetings within GSuite.',
        'Organized and tracked leadership tasks day of convention.'
      ]
    },
    {
      id: '5',
      company: 'Morton Community Center',
      roles: [
        { title: 'Summer Camp Counselor', period: 'June 2017, 2018' },
        { title: 'Volunteer Art Teaching Assistant', period: 'May 2017 - August 2018' }
      ],
      details: [
        'Guided groups of 20+ children around center grounds to ensure safety.',
        'Documented behavior and incidents and conducted verbal roll calls.',
        'Encouraged creative expression through positive feedback and guided brainstorming.',
        'Maintained the classroom setup and supplies to facilitate instruction.'
      ]
    }
  ];

  const knowledgeGroups = [
    {
      id: '1',
      title: 'Certifications',
      icon: BadgeCheck,
      iconClass: 'text-primary-500',
      items: ['CompTIA Pentest+', 'CompTIA Security+', 'CompTIA Network+', 'Purdue Entry-Level Programming in Python']
    },
    {
      id: '2',
      title: 'Pentesting',
      icon: Crosshair,
      iconClass: 'text-primary-500',
      items: ['Nmap', 'Nessus', 'OpenVAS', 'Metasploit', 'Burp Suite', 'Invicti']
    },
    {
      id: '3',
      title: 'Security Assessment',
      icon: ShieldCheck,
      iconClass: 'text-primary-500',
      items: ['NIST CSF', 'ISO 27000', 'HIPAA', 'OpenScap']
    },
    {
      id: '4',
      title: 'Networking',
      icon: Network,
      iconClass: 'text-primary-500',
      items: ['Cisco IOS', 'Ubiquiti', 'pfSense', 'VyOS']
    },
    {
      id: '5',
      title: 'Programming',
      icon: FileCode,
      iconClass: 'text-primary-500',
      items: ['Python', 'Bash', 'C', 'Chef', 'Java', 'Rust']
    },
    {
      id: '6',
      title: 'Administration',
      icon: Server,
      iconClass: 'text-primary-500',
      items: ['RHEL', 'Ubuntu', 'Windows Server', 'VMware', 'Proxmox']
    },
    {
      id: '7',
      title: 'Project Management',
      icon: ChartBarBig,
      iconClass: 'text-primary-500',
      items: ['Note Taking', 'Microsoft Project', 'Visual Paradigm', 'Agile']
    },
    {
      id: '8',
      title: 'Art',
      icon: Palette,
      iconClass: 'text-primary-500',
      items: ['Painting', 'Adobe Photoshop', 'Adobe Illustrator']
    }
  ];
</script>

<section class="container-fluid py-16 border-t border-surface-200-800" id="about">
  <div class="max-w-6xl mx-auto px-4">
    <div class="columns-1 md:columns-2 gap-4 space-y-4">
      <div class="card p-4 preset-filled-surface-100-900 border border-surface-200-800 break-inside-avoid">
        <img
          src={portraitSrc}
          alt="Michael Jenkins Portrait"
          class="w-full rounded-container border border-surface-200-800"
          loading="lazy"
          decoding="async"
        />
        <div class="mt-4 space-y-3">
          <h2>Michael Jenkins</h2>
          <div class="space-y-3 text-sm">
            <p>
              Michael Jenkins is a graduate student at Purdue University, pursuing a Masters degree in Computer and
              Information Technology with a focus on Cybersecurity. He previously earned his bachelor's degree in
              Cybersecurity and Network Engineering Technology from Purdue, graduating with highest distinction.
            </p>
            <p>
              Michael formerly worked as a senior consultant in the Cyber Security unit of Crowe LLP's Consulting
              practice, where he delivered a range of information security services including security assessments,
              penetration testing, and virtual security officer support to clients across multiple industries.
            </p>
            <p>
              Passionate about lifelong learning, Michael spends his free time expanding his HomeLab and smart home
              setups as well as painting.
            </p>
          </div>
          <div class="grid grid-cols-2 gap-3 mt-4">
            <a
              href="/Documents/michaelJenkinsResume.pdf"
              target="_blank"
              class="btn btn-base preset-filled-primary-500"
            >
              <FileUser class="size-4" />
              <span>Resume</span>
            </a>
            <a
              href="https://www.linkedin.com/in/jenkinsmichpa/"
              target="_blank"
              class="btn btn-base preset-filled-primary-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"
                ><path d={linkedinPath} /></svg
              >
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      <div class="card p-4 preset-filled-surface-100-900 border border-surface-200-800 break-inside-avoid">
        <h2 class="h3 mb-3">Education</h2>
        <ul class="space-y-1">
          <li>
            <div class="flex flex-col sm:flex-row sm:justify-between">
              <span class="purdue-gold flex items-center gap-1"><Hammer class="size-4" /> Purdue University</span>
              <em class="opacity-60 text-sm">GPA 4.0/4.0</em>
            </div>
          </li>
          <li>
            <div class="flex flex-col text-sm">
              <span>Bachelor of Science: Cybersecurity and Network Engineering Technology</span>
              <em class="opacity-60">2018 - 2022</em>
            </div>
          </li>
          <li>
            <div class="flex flex-col text-sm">
              <span>Master of Science: Computer and Information Technology</span>
              <em class="opacity-60">2025 - 2027</em>
            </div>
          </li>
          <li>
            <span class="text-sm">Additional Studies: Art and Design Studio</span>
          </li>
          <li>
            <div class="flex flex-col sm:flex-row sm:justify-between text-sm">
              <strong class="flex items-center gap-1"
                ><Map class="size-4 text-primary-500" /> Czech Technical University</strong
              >
              <em class="opacity-60">Study Abroad Spring 2020</em>
            </div>
          </li>
        </ul>
      </div>

      <div class="card p-4 preset-filled-surface-100-900 border border-surface-200-800 break-inside-avoid">
        <h2 class="h3 mb-3">Activities</h2>
        <div>
          <h3 class="font-bold flex items-center gap-1">
            <Shield class="size-4 text-primary-500" /> Purdue Cyber Forensics
          </h3>
          <div class="flex flex-col sm:flex-row sm:justify-between text-sm">
            <span>Member</span>
            <em class="opacity-60">August 2018 - December 2022</em>
          </div>
          <div class="flex flex-col sm:flex-row sm:justify-between text-sm">
            <span>Vice-President/Treasurer</span>
            <em class="opacity-60">August 2021 - May 2022</em>
          </div>
          <ul class="mt-2 space-y-1">
            <li class="text-sm">
              <ChevronRight class="size-3 inline text-primary-500" /> Presented and demonstrated offensive security tools
              and practices to complement course material.
            </li>
            <li class="text-sm">
              <ChevronRight class="size-3 inline text-primary-500" /> Collaborated with other board members to design and
              administer Capture the Flag competitions.
            </li>
          </ul>
        </div>
      </div>

      <div class="card p-4 preset-filled-surface-100-900 border border-surface-200-800 break-inside-avoid">
        <h2 class="h3 mb-3">Work Experience</h2>
        <Accordion value={experienceValue} onValueChange={(e) => (experienceValue = e.value)}>
          {#each experienceItems as item, i (item.id)}
            {#if i !== 0}<hr class="hr" />{/if}
            <Accordion.Item value={item.id}>
              <h3>
                <Accordion.ItemTrigger class="font-bold flex items-center justify-between gap-2 w-full">
                  <span>{item.company}</span>
                  <Accordion.ItemIndicator class="group">
                    <ChevronDown class="size-4 transition group-data-[state=open]:rotate-180" />
                  </Accordion.ItemIndicator>
                </Accordion.ItemTrigger>
              </h3>
              <Accordion.ItemContent>
                {#snippet element(attributes)}
                  {#if !attributes.hidden}
                    <div {...attributes} transition:slide={{ duration: 150 }} class="text-sm space-y-1 pt-2">
                      {#each item.roles as role (role.title)}
                        <div class="flex flex-col sm:flex-row sm:justify-between">
                          <span>{role.title}</span>
                          <em class="opacity-60">{role.period}</em>
                        </div>
                      {/each}
                      <hr class="hr" />
                      <ul class="space-y-1">
                        {#each item.details as detail (detail)}
                          <li><ChevronRight class="size-3 inline text-primary-500" /> {detail}</li>
                        {/each}
                      </ul>
                    </div>
                  {/if}
                {/snippet}
              </Accordion.ItemContent>
            </Accordion.Item>
          {/each}
        </Accordion>
      </div>

      <div class="card p-4 preset-filled-surface-100-900 border border-surface-200-800 break-inside-avoid">
        <h2 class="h3 mb-3">Awards</h2>
        <h3 class="font-bold text-sm mb-1 flex items-center gap-1">
          <Award class="size-4 text-primary-500" /> Competitions
        </h3>
        <ul class="space-y-1 mb-3">
          <li class="text-sm">
            <ChevronRight class="size-3 inline mr-1 text-primary-500" /> Ranked 1st in BSides Fort Wayne CTF 2025
          </li>
          <li class="text-sm">
            <ChevronRight class="size-3 inline mr-1 text-primary-500" /> Ranked 1st in BSides Chicago CTF 2025
          </li>
          <li class="text-sm">
            <ChevronRight class="size-3 inline mr-1 text-primary-500" /> Ranked 1st in Hack The Box Blue Team CTF 2025
          </li>
          <li class="text-sm">
            <ChevronRight class="size-3 inline mr-1 text-primary-500" /> Ranked 4th in Last Minute Blue Team CTF 2025
          </li>
          <li class="text-sm">
            <ChevronRight class="size-3 inline mr-1 text-primary-500" /> Ranked 18th of 3658 Teams NCL 2022
          </li>
          <li class="text-sm">
            <ChevronRight class="size-3 inline mr-1 text-primary-500" /> Purdue AITP Computing Challenge Day Systems Analysis
            and Design 3rd Place
          </li>
        </ul>
        <h3 class="font-bold text-sm mb-1 flex items-center gap-1">
          <GraduationCap class="size-4 text-primary-500" /> Academics
        </h3>
        <ul class="space-y-1">
          <li class="text-sm">
            <ChevronRight class="size-3 inline mr-1 text-primary-500" /> Purdue Marquis Scholarship
          </li>
          <li class="text-sm"><ChevronRight class="size-3 inline mr-1 text-primary-500" /> Purdue AITP Scholarship</li>
          <li class="text-sm">
            <ChevronRight class="size-3 inline mr-1 text-primary-500" /> Purdue Polytechnic Dean's List
          </li>
        </ul>
      </div>

      <div class="card p-4 preset-filled-surface-100-900 border border-surface-200-800 break-inside-avoid">
        <h2 class="h3 mb-3">Knowledge</h2>
        <Accordion value={knowledgeValue} onValueChange={(e) => (knowledgeValue = e.value)}>
          {#each knowledgeGroups as group, i (group.id)}
            {#if i !== 0}<hr class="hr" />{/if}
            <Accordion.Item value={group.id}>
              <h3>
                <Accordion.ItemTrigger class="font-bold flex items-center justify-between gap-2 w-full">
                  <group.icon class="size-4 mr-1 {group.iconClass}" />
                  <span class="flex-1 text-left">{group.title}</span>
                  <Accordion.ItemIndicator class="group">
                    <ChevronDown class="size-4 transition group-data-[state=open]:rotate-180" />
                  </Accordion.ItemIndicator>
                </Accordion.ItemTrigger>
              </h3>
              <Accordion.ItemContent>
                {#snippet element(attributes)}
                  {#if !attributes.hidden}
                    <div {...attributes} transition:slide={{ duration: 150 }} class="pt-2">
                      <ul class="space-y-1">
                        {#each group.items as item (item)}
                          <li class="text-sm"><ChevronRight class="size-3 inline mr-1 text-primary-500" /> {item}</li>
                        {/each}
                      </ul>
                    </div>
                  {/if}
                {/snippet}
              </Accordion.ItemContent>
            </Accordion.Item>
          {/each}
        </Accordion>
      </div>
    </div>
  </div>
</section>
