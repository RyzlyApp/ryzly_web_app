"use client";
import React, { useState } from "react";
import { BiPlus, BiX } from "react-icons/bi";

const faqs = [
  {
    question: "What is Rhyzly?",
    answer:
      "Rhyzly is a challenge-based learning platform that connects creators, coaches, and companies to solve real-world problems and foster professional growth.",
  },
  {
    question: "How do I join a challenge?",
    answer:
      "You can browse the available challenges on our platform and join the ones that align with your skills and interests. Simply click the 'Join Challenge' button to get started.",
  },
  {
    question: "Can I get feedback on my work?",
    answer:
      "Yes, our platform is built around mentorship and feedback. Coaches and industry experts are available to guide you and provide constructive feedback on your projects.",
  },
  {
    question: "Is Rhyzly suitable for beginners?",
    answer:
      "Absolutely! We have challenges designed for all skill levels, from beginner to advanced. It's a great way to build your portfolio and gain practical experience.",
  },
];

const FAQs = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="bg-[#1D1348] py-20 lg:py-32 px-[5%] lg:px-[10%]">
      <div className="2xl:container mx-auto">
        <h1 className="text-4xl font-bold text-white text-center">FAQs</h1>
        <div className="max-w-3xl mx-auto mt-20 flex flex-col gap-1">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-600 p-4 bg-white text-black rounded-xl"
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
