import React from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const Impact = () => {
  const feedbacks: {
    name: string;
    role: string;
    response: string;
    image: string;
    bgColor: string;
  }[] = [
    {
      name: "Mariam",
      role: "Web Developer Coach",
      response: "I've always wanted to impact others with my knowledge and monetize my knowledge without turning it into a long course. This platform made it easy to package my expertise into a challenge and earn while helping learners build real skills",
      image: "",
      bgColor: "bg-[#6A3223]",
    },
    {
      name: "MaryStella",
      role: "Data Analysts Coach",
      response: "The structure made hosting the challenges easy. I focused on coaching and feedback instead of worrying about logistics. Everything, from tasks, payment receival, to submissions and grading—was already thought through",
      image: "/images/MaryStella.jpg",
      bgColor: "bg-[#FFECD1]",
    },
    {
      name: "Sussan",
      role: "Virtual Asssistant Talent",
      response: "What surprised me most was how easy it was to turn my challenge work into a portfolio. Once I completed the tasks, everything was already structured—my problem statement, approach, and outcome. I didn’t have to figure out how to package my work; it was already portfolio-ready.",
      image: "",
      bgColor: "bg-[#161925]",
    },
    {
      name: "Elvis",
      role: "Product Design",
      response:
        "The fact that even as a coach, I can easily join other challenges and build my portfolio in other areas is a game change for me.",
      image: "/images/Elvis.jpg",
      bgColor: "bg-[#FFECD1]",
    },
    // {
    //   name: "Funmilayo Adebayo",
    //   role: "UI/UX Researcher",
    //   response:
    //     "Ryzly helped me turn theory into real projects. I finally feel confident applying for roles with a solid portfolio.",
    //   image: "",
    //   bgColor: "bg-[#161925]",
    // },
    // {
    //   name: "Funmilayo Adebayo",
    //   role: "UI/UX Researcher",
    //   response:
    //     "Ryzly helped me turn theory into real projects. I finally feel confident applying for roles with a solid portfolio.",
    //   image: "",
    //   bgColor: "bg-[#6A3223]",
    // },
  ];

  //   let colors: String[] = ["bg-[#6A3223]", "bg-[#FFECD1]", "bg-[#161925]"];

  return (
    <section className="py-20 lg:py-32 px-[5%] lg:px-[10%] bg-[#F2F0FA]">
      <div className="2xl:container mx-auto">
        <div className="relative">
          <img
            src="/landingPage/RainbowImage.png"
            alt=""
            className="left-0 lg:left-20 lg:h-fit absolute w-[8rem] lg:w-[15rem] -top-8 lg:top-2"
          />
          <h1 className="text-4xl text-center font-bold ">
            The Ryzly Impact, <br />
            In Their Words
          </h1>
          <div className="absolute right-0 lg:right-10 -bottom-14 lg:bottom-0">
            <div className="mt-auto ms-auto flex gap-3">
              <button className="p-3 rounded-full bg-white">
                <BsArrowLeft size={20} />
              </button>
              <button className="p-3 rounded-full bg-white">
                <BsArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-3 mt-20">
          {feedbacks.map((feedback, index) => {
            // const randomNumber = Math.floor(Math.random() * colors.length + 1);
            return (
              <div
                key={index}
                className={`p-10 ${feedback.bgColor} ${
                  feedback.bgColor === "bg-[#6A3223]" ||
                  feedback.bgColor === "bg-[#161925]"
                    ? "text-white"
                    : "text-black"
                } rounded-xl`}
              >
                <div className="flex gap-2">
                  <img
                    src={feedback?.image ? feedback?.image : "/landingPage/impactDummyImage.png"}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover "
                  />
                  <div>
                    <h3 className="text-sm font-semibold">{feedback.name}</h3>
                    <p className="text-xs">{feedback.role}</p>
                  </div>
                </div>

                <p className="mt-5 text-sm">{feedback.response}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Impact;
