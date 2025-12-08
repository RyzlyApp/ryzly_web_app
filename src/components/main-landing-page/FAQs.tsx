"use client";
import React, { useState } from "react";
import { BiPlus, BiX } from "react-icons/bi"; 

const faqs = [
  {
    question: "What exactly is Ryzly?",
    answer:
      "Ryzly is a challenge-based learning platform where talents build real experience and skills by completing guided projects that reflect real industry challenges created by expert coaches. Each completed challenge generates a verifiable portfolio that stands out to employers.",
  },
  {
    question: "Who is Ryzly for?",
    answer:
      "Ryzly is designed for digital talents seeking opportunities, early-career professionals, job seekers, career switchers, and working professionals who want to sharpen their skills while building a strong portfolio.",
  },
  {
    question: "What makes Ryzly different from traditional courses?",
    answer:
      "Ryzly focuses on doing, not just watching. Learners complete real tasks, submit outputs, receive scores and feedback, earn cash prizes, badges, certificates, and career points, and grow a verifiable portfolio.",
  },
  {
    question: "Do I need prior experience to join a challenge?",
    answer:
      "No. Many challenges are beginner-friendly, while advanced challenges clearly specify any prerequisites.",
  },
  {
    question: "Do I get a certificate?",
    answer:
      "Yes. Certificates are available for talents who meet the certification criteria, and they are offered for a fee.",
  },
  {
    question: "Can I get certified later?",
    answer:
      "Yes. You can complete the challenge first and choose to opt in for certification and feedback at the end.",
  },
  {
    question: "What goes into my Ryzly portfolio/profile?",
    answer:
      "Your profile includes completed projects and challenges, certificates earned, verified skills, and badges that test both technical and soft skills.",
  },
  {
    question: "Can I share my portfolio?",
    answer:
      "Yes. Ryzly generates a public link to your verified challenge history and project outputs.",
  },
  {
    question: "Who are Ryzly career coaches?",
    answer:
      "They are professionals with proven expertise in their fields and strong real-world work experience. Every coach must pass Ryzly’s quality checks.",
  },
  {
    question: "Can companies sponsor challenges?",
    answer:
      "Yes. Companies can sponsor challenges for hiring, talent development, or CSR programs. Sponsored challenges typically attract hundreds of applicants.",
  },
  {
    question: "How do I get opportunities through Ryzly?",
    answer:
      "Opportunities are earned through performance. As you complete challenges, your submissions, scores, verified skills, and consistency increase your visibility to hiring companies. Top performers are highlighted to recruiters, featured on the Ryzly talent board, and recommended to companies. High-performing talents may also earn cash prizes.",
  },
  {
    question: "How does Ryzly help job seekers?",
    answer:
      "By providing real portfolio projects, verified skills, assessment-based visibility, and direct opportunities to stand out to hiring partners.",
  },
  {
    question: "Is Ryzly beginner-friendly?",
    answer:
      "Yes. The platform is simple, intuitive, and designed for learners who may not be very tech-savvy.",
  },
  {
    question: "What happens if I submit the wrong file?",
    answer:
      "You can resubmit your work before the deadline. After the deadline, resubmission rules depend on the coach.",
  },
  {
    question: "Does Ryzly support mobile?",
    answer:
      "Yes. You can complete most tasks directly from your mobile browser.",
  },
];


const FAQs = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="bg-[#1D1348] py-20 lg:py-32 px-[5%] lg:px-[10%]">
      <div className="2xl:container mx-auto" data-aos="fade-up">
        <h1 className="text-4xl font-bold text-white text-center">FAQs</h1>
        <div className="max-w-3xl mx-auto mt-20 flex flex-col gap-1">
          {faqs.map((faq, index) => (
            <div
              key={index}
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
