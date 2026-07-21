"use client";
import React, { useState } from "react";
import { BiPlus, BiX } from "react-icons/bi";

type Faq = {
  question: string;
  answer: string;
  tag: "Talent" | "Organisation" | "Coaches";
};

const faqs: Faq[] = [
  {
    tag: "Talent",
    question: "Can I participate in multiple challenges?",
    answer:
      "Absolutely. You can join as many active challenges as you'd like, as long as you can meet their deadlines and requirements.",
  },
  {
    tag: "Talent",
    question: "Can organizations contact me after a challenge?",
    answer:
      "Yes. Participating in challenges is a great way to showcase your work and get discovered by organizations looking for talented people.",
  },

  {
    tag: "Organisation",
    question: "Why should I post a challenge instead of hiring a freelancer?",
    answer:
      "A challenge lets you see multiple approaches to the same problem before choosing a winner. This is ideal for creative work, ideas, design, marketing, and other tasks where different perspectives can lead to better outcomes.",
  },
  {
    tag: "Organisation",
    question: "What kinds of challenges can I post?",
    answer:
      "You can post challenges across a wide range of categories, including design, copywriting, branding, marketing, software, product strategy, research, and more.",
  },
  {
    tag: "Organisation",
    question: "Can I choose more than one winner?",
    answer:
      "Yes. You can reward a single winner or multiple winners. You decide how many winners there will be, and Ryzly helps distribute the prize pool fairly.",
  },
  {
    tag: "Organisation",
    question: "Who owns the winning submission?",
    answer:
      "Ownership and usage rights are transferred according to Ryzly's terms and the challenge rules you define. Participants retain ownership of non-winning submissions unless stated otherwise.",
  },
  {
    tag: "Organisation",
    question: "Can I communicate with participants?",
    answer:
      "Yes. You can provide updates, answer questions, and clarify your challenge while it's active, ensuring participants have the information they need.",
  },
  {
    tag: "Organisation",
    question: "Can I edit my challenge after publishing?",
    answer:
      "You can update certain details while your challenge is live. Changes that could affect submissions, such as deadlines or requirements, may be restricted once participants have started submitting work.",
  },

  {
    tag: "Coaches",
    question: "How do I earn money?",
    answer:
      "You set the participation fee for your Learning Challenge. Every approved participant pays to join, and you earn revenue from enrolments, subject to Ryzly's platform fees.",
  },
  {
    tag: "Coaches",
    question: "Can I provide feedback to participants?",
    answer:
      "Yes. Learning Challenges are designed to encourage interaction. You can review submissions, provide feedback, and guide participants throughout the challenge.",
  },
  {
    tag: "Coaches",
    question: "Can I limit the number of participants?",
    answer:
      "Yes. You can choose whether your challenge is open to everyone or has a maximum number of participants to ensure a manageable learning experience.",
  },
  {
    tag: "Coaches",
    question: "Do I need to offer prize money?",
    answer:
      "No. Learning Challenges are educational experiences rather than competitions. Participants pay to join and learn, so prize money isn't required unless you choose to include it.",
  },
];

const tags: Faq["tag"][] = ["Talent", "Organisation", "Coaches"];

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
              className={`${
                tag === activeTag
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