"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheck,
  FiChevronDown,
  FiArrowRight,
  FiAward,
  FiTerminal,
  FiBriefcase,
  FiShield,
  FiX,
  FiMessageSquare,
  FiCheckCircle,
} from "react-icons/fi";
import {
  HiOutlineSparkles,
  HiOutlineRocketLaunch,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import Footer from "@/components/main-landing-page/Footer";
import AOSProvider from "@/components/AOSProvider";
import UnauthorisedLayout from "@/components/shared/unauthorisedLayout";

// Track data
interface Track {
  id: string;
  title: string;
  description: string;
  image: string;
  skills: string[];
  duration: string;
  badgeColor: string;
}

const tracks: Track[] = [
  {
    id: "product-design",
    title: "Product Design",
    description:
      "Design end-to-end features, conduct user research, craft scalable design systems, and deliver developer-ready Figma specs.",
    image: "/workexp/track_design.jpg",
    skills: ["Figma", "Design Systems", "User Research", "Wireframing"],
    duration: "6 Weeks",
    badgeColor: "bg-blue-600",
  },
  {
    id: "product-management",
    title: "Product Management",
    description:
      "Write detailed PRDs, prioritize backlog sprints, define success metrics, and make realistic stakeholder tradeoff decisions.",
    image: "/workexp/track_pm.jpg",
    skills: ["PRD Writing", "Agile Sprints", "Backlog Grooming", "KPIs"],
    duration: "6 Weeks",
    badgeColor: "bg-purple-600",
  },
  {
    id: "growth-marketing",
    title: "Growth Marketing",
    description:
      "Design customer acquisition funnels, run simulated A/B tests, craft email campaigns, and analyze CAC/LTV performance.",
    image: "/workexp/track_growth.jpg",
    skills: ["Funnels", "A/B Testing", "Email Drip", "CAC/LTV"],
    duration: "6 Weeks",
    badgeColor: "bg-amber-600",
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    description:
      "Query messy SQL databases, clean real-world transactional data, build executive BI dashboards, and present strategic insights.",
    image: "/workexp/track_analytics.jpg",
    skills: ["SQL", "Python", "PowerBI", "Data Cleaning"],
    duration: "6 Weeks",
    badgeColor: "bg-emerald-600",
  },
];

// Workplace Pillars (6 cards matching Section 6)
const pillars = [
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

// FAQ items
const faqs = [
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

export default function WorkExp() {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    track: "product-design",
  });

  const handleOpenEnroll = (track?: Track) => {
    if (track) {
      setSelectedTrack(track);
      setFormData((prev) => ({ ...prev, track: track.id }));
    }
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsModalOpen(false);
    }, 2500);
  };

  return (
    <AOSProvider>
      <UnauthorisedLayout main={true}>
        <div className="w-full min-h-screen bg-[#1D1348] text-white font-figtree selection:bg-[#5160E7] selection:text-white relative overflow-x-hidden">

          {/* =========================================================================
            SECTION 1: HERO
           ========================================================================= */}
          <section className="relative pt-36 lg:pt-44 pb-20 lg:pb-32 px-[5%] lg:px-[10%] overflow-hidden bg-gradient-to-b from-[#170E3A] via-[#1D1348] to-[#140D33]">
            {/* Ambient background glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#5160E7]/20 blur-[140px] pointer-events-none rounded-full" />
            <div className="absolute top-1/3 right-[10%] w-[400px] h-[350px] bg-[#B1CA4D]/10 blur-[160px] pointer-events-none rounded-full" />

            <div className="max-w-6xl mx-auto text-center relative z-10">
              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]"
              >
                Experience work before <br className="hidden sm:inline" />
                you <span className="text-[#C2DE55] inline-block relative drop-shadow-[0_0_25px_rgba(194,222,85,0.35)]">get hired.</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                className="mt-6 text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed"
              >
                Bridge the gap between theoretical knowledge and real-world execution.
                Work on simulated team sprints, tackle enterprise briefs, and graduate with
                verifiable proof employers trust.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
                className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <button
                  onClick={() => handleOpenEnroll()}
                  className="w-full sm:w-auto px-8 py-4 bg-[#5160E7] hover:bg-[#4352D9] text-white font-semibold text-base rounded-full shadow-[0_10px_30px_rgba(81,96,231,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <span>Explore Tracks & Enroll</span>
                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <a
                  href="#how-it-works"
                  className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/15 text-white font-medium text-base rounded-full border border-white/15 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2"
                >
                  <span>How It Works</span>
                </a>
              </motion.div>

              {/* Hero Dashboard Preview with Floating Cards */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
                className="mt-14 lg:mt-20 relative mx-auto"
              >
                <div className="relative rounded-2xl lg:rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-white/20 via-white/10 to-transparent border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.6)] backdrop-blur-md">
                  {/* Browser bar top */}
                  <div className="bg-[#18113A] rounded-t-xl lg:rounded-t-2xl px-4 py-3 flex items-center gap-2 border-b border-white/10">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                      <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                      <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                    </div>
                    <div className="mx-auto bg-white/5 border border-white/10 rounded-full px-6 py-1 text-xs text-gray-400 font-mono flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      app.ryzly.com/workplace/sprint-14
                    </div>
                    <div className="w-12" />
                  </div>

                  {/* Dashboard Image */}
                  <div className="relative overflow-hidden rounded-b-xl lg:rounded-b-2xl aspect-[16/9]">
                    <Image
                      src="/workexp/hero_dashboard.jpg"
                      alt="Ryzly Workplace Simulator Dashboard"
                      width={1400}
                      height={788}
                      priority
                      className="w-full h-full object-cover object-top hover:scale-[1.01] transition-transform duration-700"
                    />
                    {/* Subtle glass reflection overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
                  </div>
                </div>

                {/* Floating Badge 1 - Left */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="hidden lg:flex absolute -bottom-6 -left-6 bg-[#18113A]/95 border border-white/20 rounded-2xl p-4 shadow-2xl backdrop-blur-xl items-center gap-3 z-20 text-left"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#5160E7]/20 border border-[#5160E7]/40 flex items-center justify-center text-[#C2DE55]">
                    <HiOutlineRocketLaunch className="text-2xl" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Simulated Agile Sprint</div>
                    <div className="text-sm font-semibold text-white">Sprint 14: Q3 Roadmap • Active</div>
                  </div>
                </motion.div>

                {/* Floating Badge 2 - Right */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="hidden lg:flex absolute -top-8 -right-6 bg-[#18113A]/95 border border-white/20 rounded-2xl p-4 shadow-2xl backdrop-blur-xl items-center gap-3 z-20 text-left"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <FiCheckCircle className="text-2xl" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Senior PR Review</div>
                    <div className="text-sm font-semibold text-white">LGTM! Approved for Staging</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* =========================================================================
            SECTION 2: "You learned the skill. But have you practiced the job?"
           ========================================================================= */}
          <section
            id="how-it-works"
            className="py-24 lg:py-32 px-[5%] lg:px-[10%] bg-[#FAFAFC] text-gray-900 relative"
          >
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
                <div className="inline-flex items-center justify-center mb-4">
                  <Image
                    src="/landingPage/RainbowImage.png"
                    alt="Badge"
                    width={140}
                    height={24}
                    className="h-5 w-auto object-contain"
                  />
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1D1348] tracking-tight leading-tight">
                  You learned the skill. But <br className="hidden sm:inline" />
                  have you practiced the job?
                </h2>
                <p className="mt-4 text-base sm:text-lg text-gray-600">
                  Tutorials teach syntax and isolated exercises. But companies hire for execution,
                  communication, dealing with messy requirements, and cross-functional teamwork.
                </p>
              </div>

              {/* Split Comparison Content */}
              <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Left Column: Authentic Photo */}
                <div className="lg:col-span-5" data-aos="fade-right">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4]">
                    <Image
                      src="/workexp/practicing_job.jpg"
                      alt="Professional practicing real job challenges"
                      fill
                      className="object-cover"
                    />
                    {/* Overlay pill */}
                    <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-gray-100 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#1D1348] text-[#C2DE55] flex items-center justify-center shrink-0 font-bold">
                        <FiBriefcase className="text-lg" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#1D1348]">Cross-Functional Sprint</div>
                        <div className="text-xs text-gray-500">Handling live PRD feedback</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Comparative Cards */}
                <div className="lg:col-span-7 flex flex-col gap-6" data-aos="fade-left">
                  {/* Traditional Learning Card */}
                  <div className="bg-white p-7 sm:p-8 rounded-3xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold uppercase tracking-wider">
                        Traditional Learning
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl sm:text-2xl font-bold text-[#1D1348]">
                      Theoretical Trial
                    </h3>
                    <ul className="mt-4 space-y-3">
                      <li className="flex items-start gap-3 text-sm sm:text-base text-gray-600">
                        <div className="w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                          ✕
                        </div>
                        <span>Following step-by-step video tutorials where everything works on the first try</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm sm:text-base text-gray-600">
                        <div className="w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                          ✕
                        </div>
                        <span>Building generic clone projects that fail to demonstrate actual problem-solving</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm sm:text-base text-gray-600">
                        <div className="w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                          ✕
                        </div>
                        <span>Working in isolation without PMs, Designers, or peer code review</span>
                      </li>
                    </ul>
                  </div>

                  {/* The Ryzly Way Card */}
                  <div className="bg-gradient-to-br from-[#1D1348] to-[#2B1B68] text-white p-7 sm:p-8 rounded-3xl border border-[#5160E7]/40 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#5160E7]/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="flex items-center gap-3 relative z-10">
                      <span className="px-3.5 py-1 bg-[#5160E7] text-white rounded-full text-xs font-bold uppercase tracking-wider shadow">
                        With Ryzly
                      </span>
                      <span className="text-xs text-[#C2DE55] font-semibold flex items-center gap-1">
                        <HiOutlineSparkles /> Simulated Workplace
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl sm:text-2xl font-bold text-white relative z-10">
                      Actual Job Simulation
                    </h3>
                    <ul className="mt-4 space-y-3 relative z-10">
                      <li className="flex items-start gap-3 text-sm sm:text-base text-gray-200">
                        <div className="w-5 h-5 rounded-full bg-[#C2DE55] text-[#1D1348] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                          <FiCheck />
                        </div>
                        <span>Tackle messy enterprise briefs with real constraints and shifting requirements</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm sm:text-base text-gray-200">
                        <div className="w-5 h-5 rounded-full bg-[#C2DE55] text-[#1D1348] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                          <FiCheck />
                        </div>
                        <span>Collaborate in simulated team sprints with PMs, Designers, and Engineers</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm sm:text-base text-gray-200">
                        <div className="w-5 h-5 rounded-full bg-[#C2DE55] text-[#1D1348] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                          <FiCheck />
                        </div>
                        <span>Receive rigorous reviews and feedback from senior industry practitioners</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm sm:text-base text-gray-200">
                        <div className="w-5 h-5 rounded-full bg-[#C2DE55] text-[#1D1348] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                          <FiCheck />
                        </div>
                        <span>Ship verifiable proof of work directly into an employer-facing portfolio</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
            SECTION 3: "What you actually get beyond technical execution."
           ========================================================================= */}
          <section
            id="what-you-get"
            className="py-24 lg:py-32 px-[5%] lg:px-[10%] bg-[#1D1348] relative overflow-hidden"
          >
            {/* Subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#5160E7]/15 blur-[130px] pointer-events-none rounded-full" />

            <div className="max-w-6xl mx-auto relative z-10">
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  What you actually get <br />
                  beyond technical execution.
                </h2>
                <p className="mt-4 text-base sm:text-lg text-gray-300">
                  Hard skills get you past the ATS filter. Professional execution, cross-functional
                  alignment, and delivery velocity get you the high-paying job offer.
                </p>
              </div>

              {/* 3 Value Cards */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="bg-white text-gray-900 rounded-3xl p-8 flex flex-col justify-between shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-gray-100"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-[#EEF0FF] text-[#5160E7] flex items-center justify-center text-2xl font-bold mb-6">
                      <HiOutlineUserGroup />
                    </div>
                    <h3 className="text-xl font-bold text-[#1D1348] leading-snug">
                      Cross-Functional Collaboration
                    </h3>
                    <ul className="mt-5 space-y-3.5 text-sm sm:text-base text-gray-600">
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#5160E7] font-bold mt-1">•</span>
                        <span>Experience realistic handoffs between PMs, designers, and developers</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#5160E7] font-bold mt-1">•</span>
                        <span>Participate in simulated standups, sprint reviews, and retrospective calls</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#5160E7] font-bold mt-1">•</span>
                        <span>Articulate architectural and design tradeoffs with confidence</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-8 pt-4 border-t border-gray-100 text-xs font-semibold text-[#5160E7] uppercase tracking-wider flex items-center gap-1">
                    <span>Team Competency</span>
                    <FiArrowRight />
                  </div>
                </div>

                {/* Card 2 */}
                <div
                  data-aos="fade-up"
                  data-aos-delay="200"
                  className="bg-white text-gray-900 rounded-3xl p-8 flex flex-col justify-between shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-gray-100"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-[#F9FCEE] text-[#6A8118] flex items-center justify-center text-2xl font-bold mb-6">
                      <FiTerminal />
                    </div>
                    <h3 className="text-xl font-bold text-[#1D1348] leading-snug">
                      Real Feedback & Code Reviews
                    </h3>
                    <ul className="mt-5 space-y-3.5 text-sm sm:text-base text-gray-600">
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#6A8118] font-bold mt-1">•</span>
                        <span>Receive direct critiques from senior practitioners in top tech companies</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#6A8118] font-bold mt-1">•</span>
                        <span>Learn production standards, edge-case testing, and scalable conventions</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#6A8118] font-bold mt-1">•</span>
                        <span>Iterate and push updates before committing to your permanent record</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-8 pt-4 border-t border-gray-100 text-xs font-semibold text-[#6A8118] uppercase tracking-wider flex items-center gap-1">
                    <span>Senior Mentorship</span>
                    <FiArrowRight />
                  </div>
                </div>

                {/* Card 3 */}
                <div
                  data-aos="fade-up"
                  data-aos-delay="300"
                  className="bg-white text-gray-900 rounded-3xl p-8 flex flex-col justify-between shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-gray-100"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-[#FFF4ED] text-[#FC7753] flex items-center justify-center text-2xl font-bold mb-6">
                      <FiAward />
                    </div>
                    <h3 className="text-xl font-bold text-[#1D1348] leading-snug">
                      Verifiable Proof of Work
                    </h3>
                    <ul className="mt-5 space-y-3.5 text-sm sm:text-base text-gray-600">
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#FC7753] font-bold mt-1">•</span>
                        <span>Graduate with an ATS-proof portfolio containing actual project deliverables</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#FC7753] font-bold mt-1">•</span>
                        <span>Employers click directly into your verified sprint PRs, PRDs, and specs</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#FC7753] font-bold mt-1">•</span>
                        <span>Verifiable Ryzly Experience Credential with immutable proof of completion</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-8 pt-4 border-t border-gray-100 text-xs font-semibold text-[#FC7753] uppercase tracking-wider flex items-center gap-1">
                    <span>Career Proof</span>
                    <FiArrowRight />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
            SECTION 4: "Choose your track. Build real experience."
           ========================================================================= */}
          <section
            id="tracks"
            className="py-24 lg:py-32 px-[5%] lg:px-[10%] bg-[#FAFAFC] text-gray-900 relative"
          >
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="max-w-2xl" data-aos="fade-right">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1D1348] tracking-tight leading-tight">
                  Choose your track. <br />
                  <span className="text-[#FC7753]">Build real</span>{" "}
                  <span className="text-[#FC7753]">experiences.</span>
                </h2>
                <p className="mt-4 text-base sm:text-lg text-gray-600">
                  Immerse yourself in simulated workplace sprints designed specifically for your target role.
                  Deliver real work alongside a dedicated cohort.
                </p>
              </div>

              {/* 4 Tracks Grid */}
              <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
                {tracks.map((track, idx) => (
                  <div
                    key={track.id}
                    data-aos="fade-up"
                    data-aos-delay={idx * 100}
                    className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
                  >
                    {/* Track Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                      <Image
                        src={track.image}
                        alt={track.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-[#1D1348]/85 backdrop-blur-md shadow">
                          {track.duration} Cohort
                        </span>
                      </div>
                    </div>

                    {/* Track Content */}
                    <div className="p-7 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-[#1D1348] group-hover:text-[#5160E7] transition-colors">
                          {track.title}
                        </h3>
                        <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                          {track.description}
                        </p>

                        {/* Skills Tags */}
                        <div className="mt-5 flex flex-wrap gap-2">
                          {track.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="mt-7 pt-5 border-t border-gray-100 flex items-center justify-between">
                        <button
                          onClick={() => handleOpenEnroll(track)}
                          className="px-6 py-2.5 bg-[#5160E7] hover:bg-[#4352D9] text-white text-sm font-semibold rounded-full transition-all duration-200 shadow-sm hover:shadow flex items-center gap-2 cursor-pointer"
                        >
                          <span>View Track</span>
                          <FiArrowRight />
                        </button>
                        <span className="text-xs text-gray-400 font-medium">Limited to 25 seats</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =========================================================================
            SECTION 5: "What makes Ryzly different"
           ========================================================================= */}
          <section
            id="why-ryzly"
            className="py-24 lg:py-32 px-[5%] lg:px-[10%] bg-[#170E3A] relative overflow-hidden"
          >
            {/* Subtle lighting */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-[#5160E7]/15 blur-[150px] pointer-events-none rounded-full" />

            <div className="max-w-6xl mx-auto relative z-10">
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
                <div className="inline-flex items-center justify-center mb-4">
                  <Image
                    src="/landingPage/RainbowImage.png"
                    alt="Badge"
                    width={140}
                    height={24}
                    className="h-5 w-auto object-contain"
                  />
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                  What makes Ryzly different
                </h2>
                <p className="mt-4 text-base sm:text-lg text-gray-300">
                  A purpose-built simulation engine designed to replicate high-performance tech cultures.
                </p>
              </div>

              {/* Showcase Grid */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Feature 1 */}
                <div
                  data-aos="fade-right"
                  className="bg-[#1F1648] border border-white/10 rounded-3xl p-7 lg:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Simulated Team Workplace
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-gray-300">
                      Experience the cadence of top product teams with simulated standups, PR reviews,
                      and cross-role channel communication.
                    </p>
                  </div>
                  <div className="mt-6 rounded-2xl overflow-hidden border border-white/10 aspect-[16/10] relative">
                    <Image
                      src="/workexp/different_1.jpg"
                      alt="Simulated Team Workplace"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Feature 2 */}
                <div
                  data-aos="fade-left"
                  className="bg-[#1F1648] border border-white/10 rounded-3xl p-7 lg:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Real-World Chaos & Curveballs
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-gray-300">
                      Client requirements shift. APIs change unexpectedly. Learn how to maintain composure,
                      re-prioritize user stories, and ship on time.
                    </p>
                  </div>
                  <div className="mt-6 rounded-2xl overflow-hidden border border-white/10 aspect-[16/10] relative">
                    <Image
                      src="/workexp/different_2.jpg"
                      alt="Real-World Chaos & Curveballs"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Feature 3 - Full Width Banner */}
                <div
                  data-aos="fade-up"
                  className="md:col-span-2 bg-gradient-to-r from-[#211752] via-[#2A1D6B] to-[#1D1348] border border-white/15 rounded-3xl p-8 lg:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden"
                >
                  <div className="lg:w-3/5">
                    <span className="px-3.5 py-1 bg-[#C2DE55] text-[#1D1348] rounded-full text-xs font-extrabold uppercase tracking-wider">
                      ATS-Proof Credential
                    </span>
                    <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold text-white">
                      Verifiable Proof of Work Employers Trust
                    </h3>
                    <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed">
                      Unlike standard course certificates that get ignored, your Ryzly Experience Credential
                      includes clickable links directly to your sprint pull requests, verified code reviews,
                      and production-grade deliverables.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-gray-200">
                      <div className="flex items-center gap-2">
                        <FiCheck className="text-[#C2DE55] font-bold" />
                        <span>Immutable Verification Link</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiCheck className="text-[#C2DE55] font-bold" />
                        <span>Code Review Audit Trails</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiCheck className="text-[#C2DE55] font-bold" />
                        <span>Hiring Partner Recognition</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-2/5 flex flex-col items-center">
                    <div className="w-full bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-md text-center shadow-inner">
                      <div className="w-16 h-16 rounded-2xl bg-[#5160E7] text-white flex items-center justify-center text-3xl font-bold mx-auto mb-3 shadow-lg">
                        <FiAward />
                      </div>
                      <div className="text-lg font-bold text-white">Ryzly Experience Credential</div>
                      <div className="text-xs text-gray-300 mt-1">Verified Cohort Graduate • ID #RYZ-2026-EXP</div>
                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-[#C2DE55] font-semibold">
                        <span className="w-2 h-2 rounded-full bg-[#C2DE55] animate-ping" />
                        <span>Verified On-Chain & Employer Accessible</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
            SECTION 6: "A simulated workplace with real expectations."
           ========================================================================= */}
          <section
            id="pillars"
            className="py-24 lg:py-32 px-[5%] lg:px-[10%] bg-[#EBE6E8] text-gray-900 relative"
          >
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1D1348] tracking-tight leading-tight">
                  A simulated workplace with <br className="hidden sm:inline" />
                  <span className="text-[#5160E7]">real expectations.</span>
                </h2>
                <p className="mt-4 text-base sm:text-lg text-gray-600">
                  Experience the 6 essential workplace phases of top technology organizations.
                </p>
              </div>

              {/* 6 Themed Tiles matching the mockup */}
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    data-aos="fade-up"
                    data-aos-delay={idx * 80}
                    className={`${pillar.bg} p-8 rounded-3xl shadow-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between min-h-[220px]`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase tracking-widest opacity-75">
                        Pillar {pillar.number}
                      </span>
                      <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </span>
                    </div>

                    <div className="my-4">
                      <h3 className="text-2xl font-bold tracking-tight">{pillar.name}</h3>
                      <p className="mt-2 text-sm opacity-90 leading-relaxed font-normal">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="text-xs opacity-75 font-medium border-t border-current/15 pt-3">
                      {pillar.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =========================================================================
            SECTION 7: 6 Weeks of Real Work Experience (Pricing & Enrollment)
           ========================================================================= */}
          <section
            id="pricing"
            className="py-24 lg:py-32 px-[5%] lg:px-[10%] bg-white text-gray-900 relative"
          >
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1D1348] tracking-tight">
                  6 Weeks of Real Work <br />
                  Experience
                </h2>
                <p className="mt-4 text-base sm:text-lg text-gray-600">
                  Everything you need to break into tech with genuine confidence and verifiable proof of competence.
                </p>
              </div>

              {/* Two-Column Card Container */}
              <div
                data-aos="fade-up"
                data-aos-delay="150"
                className="mt-16 bg-[#FAFAFD] border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
              >
                {/* Left Column: What's included */}
                <div className="lg:col-span-7">
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1D1348]">
                    Everything included in your 6-week cohort:
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-gray-600">
                    Comprehensive, hands-on simulated sprints backed by senior feedback.
                  </p>

                  <div className="mt-8 space-y-4">
                    {[
                      "6 weeks of structured, mentor-led simulated sprints",
                      "Real-world enterprise briefs mirroring production environments",
                      "Weekly 1-on-1 feedback and live office hours with seniors",
                      "Verifiable Ryzly Experience Credential with project evidence links",
                      "Direct access to Ryzly alumni hiring partner network",
                      "ATS-proof portfolio pieces showcasing genuine problem-solving",
                    ].map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#EEF0FF] text-[#5160E7] flex items-center justify-center shrink-0 mt-0.5 text-sm font-bold">
                          <FiCheck />
                        </div>
                        <span className="text-sm sm:text-base text-gray-700 font-medium">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Pricing Box */}
                <div className="lg:col-span-5">
                  <div className="bg-[#1D1348] text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#5160E7]/40 relative overflow-hidden flex flex-col justify-between">
                    {/* Subtle top ambient glow */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#5160E7]/30 rounded-full blur-2xl pointer-events-none" />

                    <div>
                      <span className="px-3.5 py-1 bg-[#C2DE55] text-[#1D1348] rounded-full text-xs font-bold uppercase tracking-wider">
                        Cohort 4 Starting Soon
                      </span>

                      <div className="mt-6">
                        <div className="text-xs uppercase tracking-wider text-gray-300 font-medium">
                          One-Time Enrollment Fee
                        </div>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                            ₦20,000
                          </span>
                          <span className="text-sm text-gray-400">/ 6-week cohort</span>
                        </div>
                      </div>

                      <p className="mt-4 text-xs sm:text-sm text-gray-300 leading-relaxed">
                        Complete access to the simulation engine, enterprise briefs, weekly reviews,
                        and verified credential.
                      </p>
                    </div>

                    <div className="mt-8">
                      <button
                        onClick={() => handleOpenEnroll()}
                        className="w-full py-4 bg-[#5160E7] hover:bg-[#4352D9] text-white font-semibold text-base rounded-full shadow-[0_10px_30px_rgba(81,96,231,0.4)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>Enroll in Cohort</span>
                        <FiArrowRight />
                      </button>
                      <p className="mt-3 text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
                        <FiShield className="text-emerald-400" />
                        <span>30-Day Money-Back Guarantee • No Hidden Fees</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
            SECTION 8: FAQs
           ========================================================================= */}
          <section
            id="faqs"
            className="py-24 lg:py-32 px-[5%] lg:px-[10%] bg-[#170E3A] relative overflow-hidden"
          >
            {/* Subtle lighting */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#5160E7]/15 blur-[140px] pointer-events-none rounded-full" />

            <div className="max-w-4xl mx-auto relative z-10">
              {/* Header */}
              <div className="text-center mb-16" data-aos="fade-up">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center mx-auto mb-4 border border-white/15">
                  <FiMessageSquare className="text-xl" />
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                  Frequently Asked Questions
                </h2>
                <p className="mt-3 text-base text-gray-300">
                  Everything you need to know about Ryzly workplace simulations.
                </p>
              </div>

              {/* Accordion */}
              <div className="space-y-4">
                {faqs.map((faq, index) => {
                  const isOpen = activeFaq === index;
                  return (
                    <div
                      key={index}
                      data-aos="fade-up"
                      data-aos-delay={index * 60}
                      className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg transition-all duration-300 border border-gray-100"
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : index)}
                        className="w-full px-6 sm:px-8 py-5 sm:py-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                      >
                        <span className="text-base sm:text-lg font-bold text-[#1D1348]">
                          {faq.q}
                        </span>
                        <div
                          className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 bg-[#5160E7] text-white" : ""
                            }`}
                        >
                          <FiChevronDown />
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 sm:px-8 pb-6 sm:pb-7 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* =========================================================================
            SECTION 9: FOOTER
           ========================================================================= */}
          <Footer />

          {/* =========================================================================
            ENROLLMENT MODAL
           ========================================================================= */}
          <AnimatePresence>
            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsModalOpen(false)}
                  className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
                />

                {/* Modal Box */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative bg-white text-gray-900 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl z-10 border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <FiX />
                  </button>

                  {formSubmitted ? (
                    <div className="py-8 text-center flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mb-4 font-bold">
                        <FiCheck />
                      </div>
                      <h3 className="text-2xl font-bold text-[#1D1348]">You&apos;re on the list!</h3>
                      <p className="mt-2 text-sm text-gray-600 max-w-xs">
                        We&apos;ve reserved your cohort spot. Check your email for onboarding details and sprint schedules.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <span className="px-3 py-1 bg-[#EEF0FF] text-[#5160E7] text-xs font-bold rounded-full uppercase tracking-wider">
                        {selectedTrack ? `${selectedTrack.title} • Cohort 4` : "Cohort 4 Enrollment"}
                      </span>
                      <h3 className="mt-3 text-2xl font-bold text-[#1D1348]">
                        Start Your Experience
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Join 25 aspiring professionals practicing real tech jobs.
                      </p>

                      <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, name: e.target.value }))
                            }
                            placeholder="e.g. Sarah Connor"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#5160E7] focus:ring-2 focus:ring-[#5160E7]/20 outline-none text-sm text-gray-900 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, email: e.target.value }))
                            }
                            placeholder="sarah@example.com"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#5160E7] focus:ring-2 focus:ring-[#5160E7]/20 outline-none text-sm text-gray-900 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                            Select Career Track
                          </label>
                          <select
                            value={formData.track}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, track: e.target.value }))
                            }
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#5160E7] focus:ring-2 focus:ring-[#5160E7]/20 outline-none text-sm text-gray-900 transition-all bg-white"
                          >
                            <option value="product-design">Product Design (UI/UX)</option>
                            <option value="product-management">Product Management</option>
                            <option value="growth-marketing">Growth Marketing</option>
                            <option value="data-analytics">Data Analytics</option>
                          </select>
                        </div>

                        <div className="pt-2">
                          <button
                            type="submit"
                            className="w-full py-3.5 bg-[#5160E7] hover:bg-[#4352D9] text-white font-semibold text-sm rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                          >
                            <span>Secure Spot (₦20,000)</span>
                            <FiArrowRight />
                          </button>
                        </div>

                        <p className="text-center text-xs text-gray-400">
                          30-day money-back guarantee • No credit card required to apply
                        </p>
                      </form>
                    </div>
                  )}
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </UnauthorisedLayout>
    </AOSProvider>
  );
}
