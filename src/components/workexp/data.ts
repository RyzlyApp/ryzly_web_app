import { Track, Pillar, FAQItem } from "./types";

export const tracks: Track[] = [
  {
    id: "product-design",
    title: "Product Design",
    description:
      "Work on real product problems. From research and user flows to design decisions and delivery.",
    image: "/workexp/track_design.png",
    skills: ["Figma", "Design Systems", "User Research", "Wireframing"],
    duration: "6 Weeks",
    badgeColor: "bg-blue-600",
  },
  {
    id: "product-management",
    title: "Product Management",
    description:
      "Practice product strategy, prioritization, communication, and shipping under real-world constraints.",
    image: "/workexp/track_pm.png",
    skills: ["PRD Writing", "Agile Sprints", "Backlog Grooming", "KPIs"],
    duration: "6 Weeks",
    badgeColor: "bg-purple-600",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Plan and execute campaigns, work with audiences, analyze performance, and make data-informed decisions.",
    image: "/workexp/track_marketing.jpg",
    skills: ["Funnels", "Campaigns", "Audiences", "Analytics"],
    duration: "6 Weeks",
    badgeColor: "bg-amber-600",
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    description:
      "Work with real-world datasets, uncover insights, communicate findings, and make recommendations.",
    image: "/workexp/track_analytics.png",
    skills: ["SQL", "Python", "PowerBI", "Data Cleaning"],
    duration: "6 Weeks",
    badgeColor: "bg-emerald-600",
  },
];

export const pillars: Pillar[] = [
  {
    number: "01",
    name: "Brief",
    bg: "bg-[#3D2520] text-white",
    description:
      "Receive ambiguous, real-world client briefs and requirements that need deciphering.",
    detail: "Learn how to ask the right clarifying questions instead of guessing.",
  },
  {
    number: "02",
    name: "Plan",
    bg: "bg-[#FDE7C9] text-[#2A1E17]",
    description:
      "Break down epics into user stories, sprint backlogs, and milestone estimates.",
    detail: "Scope sprint deliverables like experienced engineering and product teams.",
  },
  {
    number: "03",
    name: "Build",
    bg: "bg-[#1E2638] text-white",
    description:
      "Execute high-quality solutions using industry-standard tools, git workflows, and Figma.",
    detail: "Work inside simulated repositories, staging links, and component libraries.",
  },
  {
    number: "04",
    name: "Teamwork",
    bg: "bg-[#FCE3D6] text-[#2B1B15]",
    description:
      "Collaborate with peers, participate in standups, and resolve blockers.",
    detail: "Experience the rhythm of modern agile tech organizations firsthand.",
  },
  {
    number: "05",
    name: "Review",
    bg: "bg-[#1C2230] text-white",
    description:
      "Subject your work to strict senior reviews, design audits, and security checks.",
    detail: "Turn constructive feedback into polished, production-ready iterations.",
  },
  {
    number: "06",
    name: "Deliver",
    bg: "bg-[#4A241E] text-white",
    description:
      "Ship polished deliverables directly to your verifiable Ryzly portfolio.",
    detail: "Showcase genuine proof of work that hiring managers can audit.",
  },
];

export const faqs: FAQItem[] = [
  {
    q: "Who is this program for?",
    a: "This program is designed for aspiring tech professionals, career switchers, and recent bootcamp or university graduates who know the foundational theory or tools (Figma, React, SQL, etc.) but lack real-world, on-the-job work experience to convince hiring managers.",
  },
  {
    q: "How much time commitment is required per week?",
    a: "You should plan for 8 to 12 hours per week. Sprints are structured to accommodate working professionals and students, featuring flexible asynchronous deliverables alongside weekly live senior mentor office hours.",
  },
  {
    q: "Do I get a verified certificate and portfolio at the end?",
    a: "Yes! You graduate with an ATS-proof portfolio containing actual sprint deliverables, PRs, and verifiable credential links that employers can inspect on-demand with permanent proof of competence.",
  },
  {
    q: "What happens if I get stuck on a sprint task?",
    a: "You will have access to dedicated cohort channels, async daily standups, peer support, and weekly 1-on-1 office hours with senior mentors who work at top technology companies.",
  },
  {
    q: "How does the simulated workplace actually work?",
    a: "You join a simulated workspace complete with channels (#sprints, #daily-standup, #code-reviews), real client briefs, sprint deadlines, and unexpected stakeholder curveballs that teach you how real tech teams operate.",
  },
];

