import { CustomButton, CustomImage } from "@/components/custom";
import Footer from "@/components/main-landing-page/Footer";
import Marquee from "@/components/main-landing-page/Marquee";
import { UnauthorisedLayout } from "@/components/shared";

export default function Coach() {
    const why = [
        {
            title: "Teach with Purpose",
            content:
                "Guide creators through hands-on challenges that help them grow faster than traditional learning ever could.",
        },
        {
            title: "Build your influence",
            content:
                "Get featured, build credibility, and expand your network in a growing ecosystem of creators, coaches, and partner companies.",
        },
        {
            title: "Earn for your expertise",
            content:
                "Guide creators through hands-on challenges that help them grow faster than traditional learning ever could.",
        },
    ];

    const way = [
        {
            title: "Real-Time Feedback & Progress Tracking",
            content:
                "Monitor growth instantly and give feedback that moves learners forward.",
        },
        {
            title: "Creator Collaboration Tools",
            content:
                "Foster teamwork and idea-sharing through live sessions and co-creation spaces.",
        },
        {
            title: "AI Insights for Smarter Guidance",
            content:
                "Leverage intelligent analytics to understand learners’ strengths and guide them better  with less effort.",
        },
    ];

    const step = [
        {
            title: "Visibility Tools",
        },
        {
            title: "Performance Tracking",
        },
        {
            title: "Recognition Badges",
        },
        {
            title: "Seamless Onboarding",
        },
    ];

    return (
        <UnauthorisedLayout main={true}>
            <div className=" w-full flex flex-col bg-white ">
                <div className=" w-full h-auto lg:pt-0 px-4  pt-40 lg:gap-0 gap-8 lg:h-screen flex lg:flex-row flex-col ">
                    <div className=" w-full h-full flex flex-col items-center justify-center ">
                        <div className=" lg:max-w-[75%] w-full  flex flex-col gap-6">
                            <p className=" text-2xl lg:text-5xl font-bold ">
                                Share your expertise. <br /> Shape real careers
                            </p>
                            <p className=" font-medium lg:text-xl ">
                                Rhyzly connects you with rising creators who are
                                ready to learn through real projects turning
                                your knowledge into measurable impact.
                            </p>
                            <div className=" w-fit ">
                                <CustomButton variant="primary">
                                    Become a coach
                                </CustomButton>
                            </div>
                        </div>
                    </div>
                    <div className=" w-full h-[500px] lg:h-full flex flex-col justify-end items-center  ">
                        <div className=" h-full lg:h-[70%] w-full lg:w-[80%] bg-amber-300 "></div>
                    </div>
                </div>
                <Marquee />
                <div className=" w-full flex flex-col items-center py-20 gap-4 ">
                    <p className=" lg:text-5xl text-2xl font-bold ">
                        Why Join Rhyzly
                    </p>
                    <p className=" font-medium max-w-[510px] text-center ">{`Rhyzly isn't just another platform it's where your experience becomes proof that transforms lives`}</p>
                    <div className=" w-full flex justify-center mt-8 gap-4 ">
                        {why.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className=" w-[384px] h-[278px] flex flex-col rounded-3xl items-center border-1 border-[#C2DE55] "
                                >
                                    <div className=" w-full rounded-t-3xl bg-[#C2DE55] h-[62px]  "></div>
                                    <div className=" flex-1 max-w-[292px] text-[#161925] flex justify-center flex-col gap-2 ">
                                        <p className=" text-2xl font-semibold ">
                                            {item?.title}
                                        </p>
                                        <p className="  ">{item?.content}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className=" w-full flex flex-col items-center py-20 gap-4 px-4 ">
                    <p className=" lg:text-5xl text-2xl font-bold ">
                        Your Work. Your Way
                    </p>
                    <p className=" font-medium max-w-[510px] text-center ">{`You decide how to teach  from one-on-one sessions to project challenges. We give you the tools to mentor effectively`}</p>
                    <div className=" w-full flex mt-8 gap-4 ">
                        <div className=" w-full flex justify-center items-center ">
                            <div className=" w-[80%] h-[500px] bg-amber-200 "></div>
                        </div>
                        <div className=" w-full flex justify-center items-center ">
                            <div className=" w-full lg:max-w-[90%] flex flex-col gap-8  ">
                                <div className=" flex flex-col gap-1 ">
                                    <p className=" text-2xl font-medium ">
                                        Transform Your Coaching Experience
                                    </p>
                                    <p>{`Run personal sessions, group classes, or real-world project challenges. Rhyzly adapts to your unique mentoring style, not the other way around.`}</p>
                                </div>
                                <div className=" w-full flex flex-col gap-3 ">
                                    {way.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className=" w-full flex gap-3 "
                                            >
                                                <div className=" w-[54px] h-[50px] rounded-[10px] bg-blue-400 "></div>
                                                <div className=" flex flex-col flex-1 ">
                                                    <p className=" text-lg font-medium ">
                                                        {item?.title}
                                                    </p>
                                                    <p>{item?.content}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className=" w-fit ">
                                    <CustomButton variant="primary">
                                        Start Mentoring
                                    </CustomButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" w-full flex flex-col items-center py-20 gap-30 px-4 xl:px-20 ">
                    <p className=" lg:text-5xl text-2xl font-bold ">
                        Coach Experience Highlight
                    </p>
                    <div className=" w-full h-[447px] flex bg-[#1D1348] rounded-3xl ">
                        <div className=" w-full flex h-[500px] -mt-[53px] items-center ">
                            <CustomImage
                                src={"/images/coach.png"}
                                fillContainer
                                alt="coach"
                            />
                        </div>
                        <div className=" w-full h-full flex text-white items-center justify-center ">
                            <div className=" max-w-[80%] w-full flex-col flex  gap-4  ">
                                <p className="  text-2xl ">
                                    {`“Rhyzly made it simple for me to connect with learners who are serious about growing.`}{" "}
                                    <span className=" font-semibold ">{`It's not just teaching it's watching real transformation happen through proof.”`}</span>{" "}
                                </p>
                                <div className=" text-[#DCDCDE] ">
                                    <p>Daniel Morgan</p>
                                    <p className=" text-xs ">
                                        Product Design Coach
                                    </p>
                                </div>
                                <div className=" flex gap-4 items-center mt-4 ">
                                    <button className=" w-14 h-14 rounded-full bg-[#F9F9FE] flex justify-center items-center "></button>
                                    <button className=" w-14 h-14 rounded-full bg-[#F9F9FE] flex justify-center items-center "></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" w-full flex text-white gap-8 items-center py-20 px-4 xl:px-20 bg-[#1D1348] ">
                    <div className=" w-full h-[443px] bg-amber-300 "></div>
                    <div className=" w-full flex flex-col gap-4 ">
                        <div className=" flex flex-col gap-2 ">
                            <p className=" text-4xl font-bold ">
                                We're With You Every Step
                            </p>
                            <p className=" font-medium ">{`You don't mentor alone on Rhyzly. From onboarding to recognition, our platform gives you the guidance, insights, and visibility to grow as a trusted coach.`}</p>
                        </div>
                        <div className=" w-full grid grid-cols-2 gap-4 text-[#1D1348] ">
                            {step?.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className=" h-[56px] w-full bg-white rounded-2xl flex gap-3 px-4 items-center "
                                    >
                                        <div
                                            style={{
                                                background:
                                                    "linear-gradient(135deg, #7482F7 0%, #596AFE 100%)",
                                            }}
                                            className=" w-8 h-8 rounded-xl flex justify-center items-center "
                                        ></div>
                                        <p className=" font-medium ">
                                            {item?.title}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                        <div className=" w-fit ">
                            <CustomButton variant="primary">
                                Join as a Coach
                            </CustomButton>
                        </div>
                    </div>
                </div>
                <div style={{ background: "radial-gradient(60.31% 199.16% at 50% 50%, #462EAE 0%, #1D1348 48.39%, #1D1348 100%)" }} className=" w-full flex flex-col justify-center items-center gap-10 py-30 px-4 xl:px-20 text-[#F6F5FB] ">
                    <p className=" text-4xl max-w-[728px] font-bold text-center " >Join Rhyzly. Coach the next generation of creators</p>

                    <div className=" w-fit ">
                            <CustomButton variant="outline">
                                Start Coaching Today
                            </CustomButton>
                        </div>
                </div>
                <Footer />
            </div>
        </UnauthorisedLayout>
    );
}
