"use client";

import Footer from "@/components/landing-page/Footer";
import { LenisProvider } from "@/components/landing-page/LenisProvider";
import Navbar from "@/components/landing-page/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiX } from "react-icons/bi";
import { BsSendCheckFill } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { LiaLightbulb } from "react-icons/lia";
import { RiNodeTree, RiTeamLine } from "react-icons/ri";

export default function Home() {
  const targetDate = new Date("2025-09-30T23:59:59");
  // targetDate.setDate(targetDate.getDate() + 40);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [detailsSending, setDetailsSending] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalOpen]);

  const whys = [
    {
      heading: "Learn by doing",
      color: "bg-[#596AFE]",
      desc: "Get access to real-world briefs not theory. Rhyzly helps you build a trackable project record that speaks louder than words.",
    },
    {
      heading: "Expert guidance",
      color: "bg-[#C2DE55]",
      desc: "Get access to real-world briefs not theory. Rhyzly helps you build a trackable project record that speaks louder than words.",
    },
    {
      heading: "Real Impact",
      color: "bg-[#1D1348]",
      desc: "Get access to real-world briefs not theory. Rhyzly helps you build a trackable project record that speaks louder than words.",
    },
  ];

  const who = [
    {
      heading: "Creators",
      desc: "Build real proof-of-work with mentorship",
      icon: <LiaLightbulb size={25} />,
    },
    {
      heading: "Coaches",
      desc: "Share expertise, develop students, grow your reputation",
      icon: <RiTeamLine size={25} />,
    },
    {
      heading: "organizations",
      desc: "Engage new talent on meaningful projects",
      icon: <RiNodeTree size={25} />,
    },
  ];

  const openModal = () => setModalOpen(true);
  const submitEmail = async () => {
    try {
      setDetailsSending(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/waitlist`,
        {
          name,
          email,
        }
      );
      if (response.status === 201) {
        console.log("Form submitted successfully");
        setSuccessModal(true);
        setModalOpen(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setDetailsSending(false);
    }
  };

  return (
    <LenisProvider>
      <div>
        <Navbar openModal={openModal} />
        <section className="bg-gradient-to-b from-[#1D1348] to-blue-500 via-[#1D1348] py-32 px-[5%] lg:px-[10%]">
          <div className="flex flex-col lg:flex-row 2xl:container mx-auto gap-20">
            <div className="lg:w-3/5 flex flex-col justify-center">
              <h1 className=" text-white text-2xl lg:text-4xl font-semibold">
                Real challenges for human potential{" "}
              </h1>
              <h1 className="text-gray-400 text-2xl lg:text-4xl font-semibold mt-14">
                Rhyzly is a challenge-based learning platform trusted by
                creators, coaches, and companies to turn real problems into real
                impact.
              </h1>
            </div>
            <div className="lg:w-2/5">
              <div className="bg-white rounded-lg p-5">
                <h1 className="text-3xl font-semibold">Join the waitlist</h1>
                <form action="" className="w-full mt-5">
                  <p className="text-gray-500 text-sm font-semibold">
                    What&apos;s your name?
                  </p>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="px-4 py-4 border rounded-lg w-full text-sm font-semibold mt-1"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <p className="text-gray-500 text-sm font-semibold mt-3">
                    Email
                  </p>
                  <input
                    type="text"
                    placeholder="Enter your email address"
                    className="px-4 py-4 border rounded-lg w-full text-sm font-semibold mt-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    type="button"
                    disabled={detailsSending}
                    onClick={submitEmail}
                    className="cursor-pointer w-full bg-[#5160E7] text-white font-semibold text-sm py-3 rounded-full mt-5"
                  >
                    {detailsSending ? (
                      <div className="w-[30px] h-[30px] rounded-full border-b border-white mx-auto animate-spin" />
                    ) : (
                      "Join the waitlist"
                    )}
                  </button>
                </form>
                <div className="flex items-center justify-around mt-5">
                  <div className="flex flex-col items-center">
                    <h4 className="text-xl font-semibold">{timeLeft.days}</h4>
                    <p className="text-sm">Days</p>
                  </div>

                  <h1 className="text-2xl font-bold">:</h1>

                  <div className="flex flex-col items-center">
                    <h4 className="text-xl font-semibold">{timeLeft.hours}</h4>
                    <p className="text-sm">Hours</p>
                  </div>

                  <h1 className="text-2xl font-bold">:</h1>

                  <div className="flex flex-col items-center">
                    <h4 className="text-xl font-semibold">
                      {timeLeft.minutes}
                    </h4>
                    <p className="text-sm">Minutes</p>
                  </div>

                  <h1 className="text-2xl font-bold">:</h1>

                  <div className="flex flex-col items-center">
                    <h4 className="text-xl font-semibold">
                      {timeLeft.seconds}
                    </h4>
                    <p className="text-sm">Seconds</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="p">
          <div className="2xl:container mx-auto flex">
            <div
              className="w-[300px] lg:w-[400px] bg-cover bg-no-repeat bg-left-top lg:bg-top"
              style={{
                backgroundImage: "url(/bannerImage.png)",
                // backgroundSize: "cover",
                // backgroundPosition: "top",
                // backgroundRepeat: "no-repeat",
              }}
            >
              <div className="w-full h-full bg-gradient-to-l from-lime-200 via-transparent to-transparent"></div>
            </div>

            <div className="flex flex-col lg:flex-row items-center bg-gradient-to-l py-10 from-lime-600 to-lime-200 px-5 lg:px-10 w-full">
              <h3 className="font-semibold text-xs lg:text-base w-3/4 text-center">
                Where creators grow, coaches lead, <br /> and companies solve
                real problems.
              </h3>
              <button
                type="button"
                onClick={openModal}
                className="bg-white text-xs lg:text-base font-semibold rounded-full px-5 py-3 text-blue-500 mt-3 lg:mt-0 lg:ms-auto"
              >
                Join the waitlist
              </button>
            </div>
          </div>
        </div>

        <section className="px-[5%] lg:px-[10%] py-20 lg:py-32 bg-gray-100">
          <div className="flex flex-col lg:flex-row items-center">
            <div
              style={{
                backgroundImage: "url(/staredImage.png)",
                backgroundSize: "cover",
              }}
              className="w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] translate-y-10 lg:translate-y-0 lg:translate-x-10 z-10"
            />
            <div className="-tanslate-y-10 lg:-translate-x-10 rounded-full w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] text-xl lg:text-3xl font-bold bg-blue-500 text-white grid place-content-center p-10 lg:p-14 text-center">
              We&apos;re Changing How People Learn and Grow Through Real
              Challenges
            </div>
          </div>
        </section>

        <section className="px-[5%] lg:px-[10%] py-32">
          <div>
            <h1 className="text-5xl lg:text-8xl text-blue-500 font-bold text-center">
              <span className="text-blue-950">Why</span> rhyzly
            </h1>

            <div className="flex flex-col lg:flex-row items-center gap-5 justify-center mt-20">
              {whys.map((why, index) => (
                <div
                  key={index}
                  className={`${why.color} ${
                    index % 2 !== 0 ? "text-gray-950" : "text-white"
                  } w-[300px] h-[300px] rounded-full p-10 grid place-content-center text-center`}
                >
                  <h3 className="text-2xl font-bold">{why.heading}</h3>
                  <p className="text-xs mt-4">{why.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-[5%] lg:px-[10%] py-20 lg:py-32 bg-[#EBE6E8]">
          <div className="2xl:container mx-auto">
            <h1 className="text-4xl lg:text-6xl text-[#1D1348] font-bold text-center">
              Who&apos;s Rhyzly
            </h1>
            <h1 className="w-fit mx-auto flex items-center text-4xl lg:text-6xl text-[#1D1348] font-bold text-center">
              <div>
                <img src="/waitlistFingers.png" alt="" />
              </div>
              For?{" "}
              <div className="">
                <img src="/waitlistFingers.png" alt="" />
              </div>
            </h1>
            <div className="flex flex-col lg:flex-row gap-5 gap-y-10 justify-center mt-20">
              {who.map((w, index) => (
                <div
                  key={index}
                  className={`${
                    index % 2 !== 0 ? "bg-[#FC7753]" : "bg-white"
                  } py-14 lg:py-20 flex flex-col relative lg:w-1/3 items-center px-8 rounded-xl overflow-hidden
                `}
                >
                  {index % 2 !== 0 && (
                    <div className="absolute -top-[350px]  -bottom-0 z-30 bg-white w-[400px] h-[400px] rotate-45 blur-3xl"></div>
                  )}
                  <span>{w.icon}</span>
                  <h3 className="text-2xl font-extrabold mt-3">{w.heading}</h3>
                  <p className="text-center text-sm mt-4 w-2/3 mx-auto">
                    {w.desc}
                  </p>
                  <button
                    onClick={openModal}
                    className="font-semibold flex gap-2 items-center text-xs mt-10"
                  >
                    Join the waitlist <FaArrowRightLong />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {successModal && (
          <div className="w-full h-full top-0 left-0 fixed bg-black/50 flex justify-center items-center">
            <div className="bg-white w-[80%] lg:w-[50%] relative rounded-lg p-5 py-10">
              <div className="flex justify-center">
                <BsSendCheckFill color="#596AFE" size={100} />
              </div>
              <h1 className="mt-5 text-center font-semibold">
                Email Sent Successfully
              </h1>
              <button
                onClick={() => setSuccessModal(false)}
                className="absolute cursor-pointer text-xs text-[#596AFE] mx-auto top-3 right-3"
              >
                <BiX size={30} />
              </button>
            </div>
          </div>
        )}

        {modalOpen && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 px-5">
            <div className="relative bg-white rounded-2xl w-full max-w-4xl flex flex-col lg:flex-row max-h-[90vh] overflow-y-auto">
              <div className="py-10 lg:py-20 px-5 lg:px-10 lg:w-1/2">
                <h1 className="text-2xl lg:text-3xl font-semibold">
                  Join the waitlist
                </h1>
                <p className="text-xs mt-2 text-gray-600">
                  We&apos;re putting the final touches on something exciting.
                  Join the waitlist to get early access and exclusive updates
                  before we go live.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitEmail();
                  }}
                  action=""
                  className="mt-5"
                >
                  <p className="text-gray-500 text-sm font-semibold">
                    What&apos;s your name?
                  </p>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="px-4 py-4 border rounded-lg w-full text-sm font-semibold mt-1"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <p className="text-gray-500 text-sm font-semibold mt-3">
                    Email
                  </p>
                  <input
                    type="text"
                    placeholder="Enter your email address"
                    className="px-4 py-4 border rounded-lg w-full text-sm font-semibold mt-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    type="submit"
                    disabled={detailsSending}
                    onClick={(e) => {
                      e.preventDefault();
                      submitEmail();
                    }}
                    className="cursor-pointer w-full bg-[#1D1348] text-white font-semibold text-sm py-3 rounded-full mt-10"
                  >
                    {detailsSending ? (
                      <div className="w-[30px] h-[30px] rounded-full border-b border-white mx-auto animate-spin" />
                    ) : (
                      "Join the waitlist"
                    )}
                  </button>
                </form>
              </div>
              <div className="bg-[#F9FCEE] py-10 lg:w-1/2 rou">
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-5 right-5 bg-[#E3F0B1] p-2 rounded-full"
                >
                  <BiX size={20} />
                </button>
                <img
                  src="/3DRhyzlyLogo.png"
                  alt=""
                  className="w-[150px] lg:w-[200px] mx-auto"
                />
                <h1 className="text-xl font-semibold text-center mt-20">
                  Rhyzly Launches in
                </h1>
                <div className="flex items-center justify-around mt-5 w-4/5 mx-auto">
                  <div className="flex flex-col items-center">
                    <h4 className="text-lg font-semibold">{timeLeft.days}</h4>
                    <p className="text-xs">Days</p>
                  </div>

                  <h1 className="text-xl font-bold">:</h1>

                  <div className="flex flex-col items-center">
                    <h4 className="text-lg font-semibold">{timeLeft.hours}</h4>
                    <p className="text-xs">Hours</p>
                  </div>

                  <h1 className="text-xl font-bold">:</h1>

                  <div className="flex flex-col items-center">
                    <h4 className="text-lg font-semibold">
                      {timeLeft.minutes}
                    </h4>
                    <p className="text-xs">Minutes</p>
                  </div>

                  <h1 className="text-xl font-bold">:</h1>

                  <div className="flex flex-col items-center">
                    <h4 className="text-lg font-semibold">
                      {timeLeft.seconds}
                    </h4>
                    <p className="text-xs">Seconds</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Footer openModal={openModal} />
      </div>
    </LenisProvider>
  );
}
