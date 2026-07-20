import React from "react";

const WhyRyzly = () => {
  return (
    <section className="px-[5%] font-figtree lg:px-[10%] py-20 lg:py-32 bg-[#1D1348]">
      <div className="2xl:container mx-auto">
        <div className="text-white text-center relative">
          <img
            src="/landingPage/RainbowImage.png"
            alt=""
            data-aos="fade-up"
            className="left-0 lg:left-20 absolute w-[5rem] lg:w-[15rem] top-2"
          />
          <h1
            data-aos="fade-up"
            data-aos-delay={100}
            className="text-3xl lg:text-4xl font-bold"
          >
            Why <span className="text-[#C2DE55]">Ryzly</span>
          </h1>
        </div>
        <div className="text-white mt-20 lg:w-[90%] mx-auto">
          <div className="flex flex-col lg:flex-row gap-10">
            <div
              data-aos="zoom-in"
              className="rounded-3xl lg:w-1/2 p-7 lg:p-14 relative bg-[#241275B2] shadow-2xl overflow-hidden min-h-[20rem] lg:min-h-[30rem]"
            >
              <div className="absolute h-full w-full top-0 left-0 flex z-0">
                <div className="w-[60%] h-[60%] my-auto bg-[#4421DB] top-[20%] m-auto rounded-full blur-3xl" />
              </div>
              <div className="relative z-20">
                <h3 className="font-semibold text-3xl">Find Talent that Fits</h3>
                <p className="text-sm mt-5 w-2/3">
                  Move beyond resumes and discover people by evaluating real work on real challenges.
                </p>
              </div>
              <img
                src="/landingPage/learnbydoing.png"
                alt=""
                className="absolute mt-10 left-0 rounded-3xl"
              />
            </div>
            <div
              data-aos="zoom-in"
              data-aos-delay={100}
              className="rounded-3xl p-7 lg:p-14 lg:w-1/2 relative bg-[#241275B2] shadow-2sxl overflow-hidden  min-h-[20rem] lg:min-h-[30rem]"
            >
              <div className="absolute h-full w-full top-0 left-0 flex z-0">
                <div className="w-[60%] h-[60%] my-auto bg-[#4421DB] top-[20%] m-auto rounded-full blur-3xl" />
              </div>
              <div className="relative z-20">
                <h3 className="font-semibold text-3xl">Validate Product and Ideas</h3>
                <p className="text-sm mt-5 w-2/3">
                  Test products, gather feedback, conduct research, and make informed decisions with real participants.
                </p>
              </div>
              <img
                src="/landingPage/expertguidance.png"
                alt=""
                className="absolute mt-10 left-0 rounded-3xl"
              />
            </div>
          </div>

          <div
            data-aos="zoom-in"
            data-aos-delay={200}
            className="rounded-3xl mt-10 col-span-2 flex flex-col-reverse lg:flex-row relative bg-[#241275B2] shadow-2xl overflow-hidden min-h-[20rem]"
          >
            <div className="flex-1 mt-auto pt-10 lg:pt-11.5 lg:pl-30">
              <img
                src="/landingPage/realimpact.png"
                alt=""
                className="w-[610px] rounded-3xl -mb-10"
              />
            </div>
            <div className="flex-1 ms-auto py-10  lg:p-14 flex items-center">
              <div className="">
                <h3 className="font-semibold text-3xl">Grow Through Community</h3>
                <p className="text-sm mt-3 w-2/3">
                  Launch marketing campaigns, build brand awareness, generate creative ideas, and reward meaningful contributions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyRyzly;
