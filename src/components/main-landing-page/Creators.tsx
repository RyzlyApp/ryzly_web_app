import React from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const Creators = () => {
  const creators: string[] = [
    "/landingPage/creator1.jpg",
    "/landingPage/creator2.jpg",
    "/landingPage/creator3.jpg",
  ];
  return (
    <section
      className="relative bg-[#FEFEFE] py-20 lg:py-32"
      style={{
        backgroundImage: "url(/landingPage/CreatorsBackground.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="px-[5%] lg:px-[10%] " data-aos="fade-down">
        <div className="2xl:container mx-auto">
          <div className="text-white text-center relative">
            <img
              src="/landingPage/RainbowImage.png"
              alt=""
              className="left-0 lg:left-10 absolute w-[5rem] lg:w-[15rem] top-2"
            />
            <h1 className="text-3xl lg:text-4xl font-bold text-[#1D1348]">
              These are the creations <br />
              of <span className="text-orange-500">Rhyzers</span>{" "}
            </h1>
          </div>
        </div>
      </div>
      <div
        className="px-5 flex flex-col lg:flex-row gap-3 mt-20 overflow-auto"
        data-aos="fade-up"
      >
        {creators.map((creator, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden"
            data-aos="zoom-in"
            data-aos-delay={index * 100}
          >
            <img src={creator} alt="" className="w-[50rem]" />
          </div>
        ))}
      </div>
      <div className="flex" data-aos="fade-up">
        <div className="mx-auto flex gap-3 mt-10">
          <button className="p-3 rounded-full bg-gray-100">
            <BsArrowLeft size={20} />
          </button>
          <button className="p-3 rounded-full bg-gray-100">
            <BsArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Creators;
