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
    number: "1",
    name: "Brief",
    bg: "bg-[#542B1E]",
    textColor: "text-white",
    badgeBg: "bg-white/20 text-white",
    description: "Understand the core business problem, user profile, and goals.",
  },
  {
    number: "2",
    name: "Plan",
    bg: "bg-[#FDE7C9]",
    textColor: "text-[#2B1B15]",
    badgeBg: "bg-[#2B1B15]/10 text-[#6D543B]",
    description: "Decide your approach, outline milestones, and allocate sprint time.",
  },
  {
    number: "3",
    name: "Build",
    bg: "bg-[#181D2A]",
    textColor: "text-white",
    badgeBg: "bg-white/15 text-white",
    description: "Create your solution using industry-standard tools and workflows.",
  },
  {
    number: "4",
    name: "Feedback",
    bg: "bg-[#FDE7C9]",
    textColor: "text-[#2B1B15]",
    badgeBg: "bg-[#2B1B15]/10 text-[#6D543B]",
    description: "Handle feedback, changing stakeholder scope, and constraints.",
  },
  {
    number: "5",
    name: "Deliver",
    bg: "bg-[#181D2A]",
    textColor: "text-white",
    badgeBg: "bg-white/15 text-white",
    description: "Present and submit your final work with documented rationale and logs.",
  },
  {
    number: "6",
    name: "Reflect",
    bg: "bg-[#542B1E]",
    textColor: "text-white",
    badgeBg: "bg-white/20 text-white",
    description: "Receive evaluation on how you worked, decided, and communicated.",
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
