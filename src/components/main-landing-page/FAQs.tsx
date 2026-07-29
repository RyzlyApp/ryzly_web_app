"use client";
import React, { useState } from "react";
import { BiPlus, BiX } from "react-icons/bi";

type Faq = {
  question: string;
  answer: string;
  tag: "Talent" | "Host" | "Coaches";
};

const faqs: Faq[] = [
  // ---------------------------------------------------------------------
  // Talent
  // ---------------------------------------------------------------------
  {
    tag: "Talent",
    question: "What is Ryzly?",
    answer:
      "Ryzly is a challenge-powered platform where you solve practical challenges, showcase your abilities, earn cash rewards, and unlock career opportunities.",
  },
  {
    tag: "Talent",
    question: "Is Ryzly free to join?",
    answer:
      "Yes. Creating an account and exploring the platform is free. Some premium challenges or features may require a participation fee, which will always be displayed before you join.",
  },
  {
    tag: "Talent",
    question: "Can I join multiple challenges?",
    answer:
      "Yes! You can participate in as many challenges as you'd like, provided you can complete them before their deadlines. You can only join challenges you're skilled in.",
  },
  {
    tag: "Talent",
    question: "Can I withdraw the money I win from challenges?",
    answer:
      "Yes you can. Once you're approved, you can withdraw through your wallet. Withdrawals are paid to the bank account you added in your profile. A 10% platform fee is deducted. Once you request to withdraw, you get the money into your bank account.",
  },
  {
    tag: "Talent",
    question: "Can organizations contact me after a challenge?",
    answer:
      "Yes. Participating in challenges is a great way to showcase your work and get discovered by organizations looking for talented people.",
  },

  // ---------------------------------------------------------------------
  // Organisation (Challenge Hosts)
  // ---------------------------------------------------------------------
  {
    tag: "Host",
    question: "What is Ryzly?",
    answer:
      "Ryzly is a challenge-powered platform that enables challenge hosts to solve real problems, discover top talent, and engage communities through competitions and skill-based challenges while creating opportunities for skilled talents. Instead of relying solely on resumes, organizations can evaluate participants based on real work and identify the best performers.",
  },
  {
    tag: "Host",
    question: "Who can host a challenge on Ryzly?",
    answer:
      "A challenge host is any organization, startup, company, NGO, or individual looking to solve problems, discover talent, build awareness, and gain visibility.",
  },
  {
    tag: "Host",
    question: "What category of challenge can I create?",
    answer:
      "You can create challenges that help solve your business or organizational needs, including Innovation Challenges, Product Challenges, Design Challenges, Marketing Challenges, Coding Challenges, Data Challenges, Writing Challenges, Business Case Challenges, AI Challenges, Research Challenges, and more.",
  },
  {
    tag: "Host",
    question: "Why should I host a challenge instead of posting a job?",
    answer:
      "Challenges let you evaluate people based on what they can actually do rather than just resumes. You receive real solutions to real problems while discovering high-performing talent.",
  },
  {
    tag: "Host",
    question: "What if I don't want my challenge to be public?",
    answer:
      "You can create private challenges. Private challenges can be shared only with invited participants.",
  },
  {
    tag: "Host",
    question: "Can I choose more than one winner?",
    answer:
      "Yes. You can reward a single winner or multiple winners. You decide how many winners there will be, and Ryzly helps distribute the prize pool fairly.",
  },
  {
    tag: "Host",
    question: "Can I hire participants after the challenge?",
    answer:
      "Absolutely. Many hosts use challenges to identify contractors and full-time employees.",
  },
  {
    tag: "Host",
    question: "Will Ryzly help promote my challenge?",
    answer:
      "Yes. Featured and promoted challenge options help increase visibility and attract more qualified participants.",
  },
  {
    tag: "Host",
    question: "Can Ryzly help design my challenge?",
    answer:
      "Yes. We can help you define the problem, evaluation criteria, rewards, and overall challenge structure to maximize participation and quality.",
  },
  {
    tag: "Host",
    question: "What does it cost to host a challenge?",
    answer:
      "Hosting costs depend on the winner prize you set. Ryzly charges a platform fee of 10%, while you set the prize pool for participants. If you require additional services such as challenge design, managed judging, promotion, or recruitment support, kindly reach out to support.",
  },
  {
    tag: "Host",
    question: "Who owns the winning submission?",
    answer:
      "Ownership and usage rights are transferred according to Ryzly's terms and the challenge rules you define. Participants retain ownership of non-winning submissions unless stated otherwise.",
  },

  // ---------------------------------------------------------------------
  // Coaches
  // ---------------------------------------------------------------------
  {
    tag: "Coaches",
    question: "Who are Ryzly coaches?",
    answer:
      "Ryzly coaches help talents who are not yet qualified to join opportunity challenges. You create practice challenges where you help them hone their skills. At least 4 years of experience is required to become a Ryzly coach.",
  },
  {
    tag: "Coaches",
    question: "How do I earn money?",
    answer:
      "You set the participation fee for your practice Challenge. Every approved participant pays to join, and you earn revenue from enrolments, subject to Ryzly's platform fees.",
  },
  {
    tag: "Coaches",
    question: "Do I need to offer prize money?",
    answer:
      "No. Practice Challenges are more of educational experiences. Participants pay to join and learn, so prize money isn't required unless you choose to include it.",
  },
  {
    tag: "Coaches",
    question: "Can I get other opportunities on Ryzly?",
    answer:
      "Yes, organizations can see your work through the challenges you create and run, and want to work with you.",
  },
];
const tags: Faq["tag"][] = ["Host", "Talent", "Coaches"];

const FAQs = () => {
  const [activeTag, setActiveTag] = useState<Faq["tag"]>("Talent");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const visibleFaqs = faqs.filter((faq) => faq.tag === activeTag);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleTagChange = (tag: Faq["tag"]) => {
    setActiveTag(tag);
    setOpenFaq(null);
  };

  return (
    <section className="bg-[#1D1348] py-20 lg:py-32 px-[5%] lg:px-[10%]">
      <div className="2xl:container mx-auto" data-aos="fade-up">
        <h1 className="text-4xl font-bold text-white text-center">FAQs</h1>

        <div data-aos="fade-up" className="flex gap-6 justify-center mt-10">
          {tags.map((tag, index) => (
            <button
              key={index}
              onClick={() => handleTagChange(tag)}
              className={`${tag === activeTag
                ? "bg-[#C2DE55] text-black"
                : "bg-gray-700 text-white"
                } p-2 rounded-lg border-1 border-[#C2DE55] text-xs`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-10 flex flex-col gap-1">
          {visibleFaqs.map((faq, index) => (
            <div
              key={`${activeTag}-${index}`}
              className="border-b border-gray-600 p-4 bg-white text-black rounded-xl"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center text-left"
              >
                <h2 className="font-semibold">{faq.question}</h2>
                <span className="">
                  {openFaq === index ? (
                    <BiX color="blue" size={25} />
                  ) : (
                    <BiPlus />
                  )}
                </span>
              </button>
              {openFaq === index && (
                <div className="mt-4">
                  <p className="text-sm">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;