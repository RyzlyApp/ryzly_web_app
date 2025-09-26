import React from "react";

const WhyRhyzly = () => {
  return (
    <section className="px-[5%] lg:px-[10%] py-20 lg:py-32 bg-[#1D1348]">
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
            Why <span className="text-[#C2DE55]">Rhyzly</span>
          </h1>
        </div>
        <div className="text-white mt-20 lg:w-[90%] mx-auto">
          <div className="flex flex-col lg:flex-row gap-10">
            <div
              data-aos="zoom-in"
              className="rounded-lg lg:w-1/2 p-7 lg:p-14 relative bg-[#241275B2] shadow-2xl overflow-hidden min-h-[20rem] lg:min-h-[30rem]"
            >
              <div className="absolute h-full w-full top-0 left-0 flex z-0">
                <div className="w-[60%] h-[60%] my-auto bg-[#4421DB] top-[20%] m-auto rounded-full blur-3xl" />
              </div>
              <div className="relative z-20">
                <h3 className="font-bold text-lg">Learn by Doing</h3>
                <p className="text-xs mt-5">
                  Get access to real-world briefs not theory. Rhyzly helps you
                  build a trackable project record that speaks louder than
                  words.
                </p>
              </div>
              <img
                src="/landingPage/learnbydoing.png"
                alt=""
                className="absolute mt-10 left-0 rounded-xl"
              />
            </div>
            <div
              data-aos="zoom-in"
              data-aos-delay={100}
              className="rounded-lg p-7 lg:p-14 lg:w-1/2 relative bg-[#241275B2] shadow-2sxl overflow-hidden  min-h-[20rem] lg:min-h-[30rem]"
            >
              <div className="absolute h-full w-full top-0 left-0 flex z-0">
                <div className="w-[60%] h-[60%] my-auto bg-[#4421DB] top-[20%] m-auto rounded-full blur-3xl" />
              </div>
              <div className="relative z-20">
                <h3 className="font-bold text-lg">Expert Guidance</h3>
                <p className="text-xs mt-5">
                  Work side-by-side with Coaches who mentor through actionable
                  feedback, so you’re never learning alone.
                </p>
              </div>
              <img
                src="/landingPage/expertguidance.png"
                alt=""
                className="absolute mt-10 left-0 rounded-xl"
              />
            </div>
          </div>

          <div
            data-aos="zoom-in"
            data-aos-delay={200}
            className="rounded-lg mt-10 col-span-2 flex flex-col-reverse lg:flex-row relative bg-[#241275B2] shadow-2xl overflow-hidden min-h-[20rem]"
          >
            <div className="lg:w-1/2 mt-auto pt-10 lg:pt-20">
              <img
                src="/landingPage/realimpact.png"
                alt=""
                className="w-[600px]"
              />
            </div>
            <div className="lg:w-1/2 ms-auto p-10  lg:p-14 flex items-center">
              <div>
                <h3 className="font-bold text-lg">Real Impact </h3>
                <p className="text-xs mt-3">
                  Host organizations post real challenges. Participants get
                  experience, partners get results everyone wins.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyRhyzly;
