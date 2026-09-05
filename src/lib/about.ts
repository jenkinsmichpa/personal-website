import type { LucideIcon } from "@lucide/svelte";
import {
  Award,
  BadgeCheck,
  ChartBarBig,
  Crosshair,
  FileCode,
  GraduationCap,
  Network,
  Palette,
  Server,
  ShieldCheck
} from "@lucide/svelte";

export type ExperienceRole = {
  title: string;
  period: string;
};

export type ExperienceItem = {
  id: string;
  company: string;
  roles: ExperienceRole[];
  details: string[];
};

export type IconGroup = {
  id: string;
  title: string;
  icon: LucideIcon;
  items: string[];
};

export type Activity = {
  org: string;
  roles: ExperienceRole[];
  details: string[];
};

export type AboutPortrait = {
  src: string;
  width: number;
  height: number;
};

export type AwardGroup = IconGroup;

export type KnowledgeGroup = IconGroup;

export const experienceItems: ExperienceItem[] = [
  {
    id: "crowe",
    company: "Crowe LLP",
    roles: [
      { title: "Cyber Security Consulting Senior Staff", period: "August 2025" },
      { title: "Cyber Security Consulting Staff", period: "January 2023 - August 2025" },
      { title: "Cyber Security Consulting Intern", period: "Summer 2021, 2022" }
    ],
    details: [
      "Led and performed Internal, External, and Web Application Penetration Testing for clients in the Public Sector, Financial Services, Healthcare, Manufacturing, and Life Sciences industries.",
      "Conducted cybersecurity gap and maturity assessments against industry frameworks and regulations including NIST CSF, NIST SP 800-53, ISO 27000, NYCRR, CUI, and HIPAA.",
      "Performed technical audits against hardened baselines of diverse systems, services, and network configurations, including Linux, Windows, Entra ID, and Active Directory.",
      "Developed methodology, scripts, and integrated control frameworks to support new forms of assessment.",
      "Provided virtual security officer services to a manufacturing organization including policy drafting, risk management activities, and acquisition transition.",
      "Spearheaded IaC project to modernize and automate Azure and vSphere engagement resource management using Terraform, Ansible, Packer, and GitLab CI/CD pipelines."
    ]
  },
  {
    id: "raytheon",
    company: "Raytheon Technologies",
    roles: [{ title: "Student Tech Intern", period: "Summer 2020" }],
    details: [
      "Enforced and audited AWS instance compliance against hardened Windows and Linux baselines on approximately thirty machines, with planned expanded deployment, utilizing Chef and Chef InSpec.",
      "Produced user acceptance tests for a Perl program to streamline Terraform provisioning.",
      "Performed manual and supervised automated patching to ensure rapid vulnerability remediation.",
      "Participated in daily stand-up and weekly planning meetings as part of an Agile workflow."
    ]
  },
  {
    id: "purdue",
    company: "Purdue University",
    roles: [
      { title: "Graduate Teaching Assistant", period: "January 2025 - Present" },
      { title: "Undergraduate Teaching Assistant", period: "January 2021 - December 2022" }
    ],
    details: [
      "Led one CNIT 470 Incident Response Management, two CNIT 270 Cybersecurity Fundamentals, four CNIT 255 OOP Intro, and one CNIT 176 IT Architectures lab sections.",
      "Provided feedback and guidance to students regarding extended incident response in a simulated environment, core security concepts, OOP best practices, and a semester long Raspberry Pi project.",
      "Wrote ransomware and Active Directory relay attack simulations in Rust to demonstrate malware evasion, cryptographic flaws, and provide realistic incident response artifacts.",
      "Wrote a Gradescope autograder in Rust to enforce code standards and rubrics, standardized Typst lab manuals, and queue system in Typescript to streamline lab checkoff."
    ]
  },
  {
    id: "circle-city-con",
    company: "CircleCityCon",
    roles: [{ title: "Volunteer Administrative Assistant", period: "2021 - 2023" }],
    details: [
      "Scheduled, documented, and summarized meetings within GSuite.",
      "Organized and tracked leadership tasks day of convention."
    ]
  },
  {
    id: "morton",
    company: "Morton Community Center",
    roles: [
      { title: "Summer Camp Counselor", period: "June 2017, 2018" },
      { title: "Volunteer Art Teaching Assistant", period: "May 2017 - August 2018" }
    ],
    details: [
      "Guided groups of 20+ children around center grounds to ensure safety.",
      "Documented behavior and incidents and conducted verbal roll calls.",
      "Encouraged creative expression through positive feedback and guided brainstorming.",
      "Maintained the classroom setup and supplies to facilitate instruction."
    ]
  }
];

export const knowledgeGroups: KnowledgeGroup[] = [
  {
    id: "certifications",
    title: "Certifications",
    icon: BadgeCheck,
    items: ["CompTIA Pentest+", "CompTIA Security+", "CompTIA Network+", "Purdue Entry-Level Programming in Python"]
  },
  {
    id: "pentesting",
    title: "Pentesting",
    icon: Crosshair,
    items: ["Nmap", "Nessus", "OpenVAS", "Metasploit", "Burp Suite", "Invicti"]
  },
  {
    id: "security-assessment",
    title: "Security Assessment",
    icon: ShieldCheck,
    items: ["NIST CSF", "NIST SP 800-53", "ISO 27000", "HIPAA", "OpenScap"]
  },
  {
    id: "networking",
    title: "Networking",
    icon: Network,
    items: ["Cisco IOS", "Ubiquiti", "pfSense", "VyOS"]
  },
  {
    id: "programming",
    title: "Programming",
    icon: FileCode,
    items: ["Python", "Bash", "C", "Chef", "Java", "Rust"]
  },
  {
    id: "administration",
    title: "Administration",
    icon: Server,
    items: ["RHEL", "Ubuntu", "Windows Server", "VMware", "Proxmox"]
  },
  {
    id: "project-management",
    title: "Project Management",
    icon: ChartBarBig,
    items: ["Note Taking", "Microsoft Project", "Visual Paradigm", "Agile"]
  },
  {
    id: "art",
    title: "Art",
    icon: Palette,
    items: ["Painting", "Adobe Photoshop", "Adobe Illustrator"]
  }
];

export const activities: Activity[] = [
  {
    org: "Purdue Cyber Forensics",
    roles: [
      { title: "Vice-President/Treasurer", period: "August 2021 - May 2022" },
      { title: "Member", period: "August 2018 - Present" }
    ],
    details: [
      "Presented and demonstrated offensive security tools and practices to complement course material.",
      "Collaborated with other board members to design and administer Capture the Flag competitions."
    ]
  }
];

export const awardGroups: AwardGroup[] = [
  {
    id: "competitions",
    title: "Competitions",
    icon: Award,
    items: [
      "Ranked 1st in BSides Fort Wayne CTF 2025",
      "Ranked 1st in BSides Chicago CTF 2025",
      "Ranked 1st in Hack The Box Blue Team CTF 2025",
      "Ranked 4th in Last Minute Blue Team CTF 2025",
      "Ranked 18th of 3658 Teams NCL 2022",
      "Purdue AITP Computing Challenge Day Systems Analysis and Design 3rd Place"
    ]
  },
  {
    id: "academics",
    title: "Academics",
    icon: GraduationCap,
    items: ["Purdue Marquis Scholarship", "Purdue AITP Scholarship", "Purdue Polytechnic Dean's List"]
  }
];
