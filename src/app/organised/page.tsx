import { CustomButton, CustomImage } from "@/components/custom";
import Marquee from "@/components/main-landing-page/Marquee";
import { UnauthorisedLayout } from "@/components/shared";
import Footer from "@/components/main-landing-page/Footer";

export default function Organization() {
    return (
        <UnauthorisedLayout main={true}>
            <div className=" w-full flex flex-col bg-white ">
                <div className=" w-full flex h-[60vh] pt-20 bg-[#DBD5F5]  ">
                    <div className=" w-full h-full flex flex-col justify-center gap-8 items-center ">
                        <div className=" max-w-[588px] flex flex-col gap-3 ">
                            <p className=" text-3xl lg:text-5xl font-bold text-center text-[#1D1348] ">
                                Hire with Proof, Grow with Confidence
                            </p>
                            <p className=" max-w-[588px] text-sm text-center text-[#121010] font-medium ">
                                Rhyzly connects you with skilled professionals
                                who have already proven their abilities through
                                real-world challenges and mentorship
                            </p>
                        </div>
                        <div className=" w-fit ">
                            <CustomButton variant="primary">
                                Partner with Rhyzly
                            </CustomButton>
                        </div>
                    </div>
                </div>
                <div className=" w-full flex lg:flex-row flex-col justify-center gap-6 py-10 px-4 lg:py-20 bg-[#DBD5F5]">
                    <div className=" w-full lg:w-fit flex flex-col gap-4 text-white ">
                        <div className=" w-full lg:max-w-[400px] rounded-xl flex flex-col gap-3 py-8 justify-center px-5 bg-[#1D1348] ">
                            <p className=" text-xl font-bold ">
                                Access Ready Talent
                            </p>
                            <p className=" text-sm font-medium ">
                                Discover practitioners who have solved real
                                challenges and can deliver from day one.
                            </p>
                        </div>
                        <div className=" w-full lg:max-w-[400px] rounded-xl flex flex-col gap-3 py-8 justify-center px-5 bg-[#1D1348] ">
                            <p className=" text-xl font-bold ">
                                Reduce Hiring Risk
                            </p>
                            <p className=" text-sm font-medium ">
                                Proof of work replaces guesswork, ensuring you
                                hire people who can actually do the job.
                            </p>
                        </div>
                        <div className=" w-full lg:max-w-[400px] rounded-xl flex flex-col gap-3 py-8 justify-center px-5 bg-[#1D1348] ">
                            <p className=" text-xl font-bold ">
                                Partner for Growth
                            </p>
                            <p className=" text-sm font-medium ">
                                Collaborate with Rhyzly to shape workforce-ready
                                talent for your industry needs.
                            </p>
                        </div>
                        <div className=" w-full lg:max-w-[400px] rounded-xl flex flex-col gap-3 py-8 justify-center px-5 bg-[#1D1348] ">
                            <p className=" text-xl font-bold ">
                                Save Time & Resources
                            </p>
                            <p className=" text-sm font-medium ">
                                Skip endless screening Rhyzly's talent already
                                comes validated by projects and coaching.
                            </p>
                        </div>
                    </div>
                    <div className=" lg:max-w-[400px] w-full h-full flex flex-col gap-4 ">
                        <div className=" w-full h-[383px] rounded-xl flex flex-col ">
                            <CustomImage
                                src={"/images/orgone.png"}
                                fillContainer
                                alt="orgone"
                                className="rounded-xl!"
                            />
                        </div>
                        <div className=" w-full h-[227px] ">
                            <CustomImage
                                src={"/images/orgtwo.png"}
                                fillContainer
                                alt="orgtwo"
                            />
                        </div>
                    </div>
                </div>
                <div className=" w-full bg-[#596AFE] text-white justify-center items-center gap-8 py-10 lg:py-20 px-4 lg:p-10 flex flex-col ">
                    <div className=" flex flex-col gap-2 ">
                        <p className=" text-2xl lg:text-4xl font-bold max-w-[715px] text-center ">
                            Collaborate with Rhyzly, Shape the Future
                        </p>
                        <p className=" font-medium text-center  max-w-[715px] ">
                            Whether you're building teams, advancing skills, or
                            driving social impact, Rhyzly helps you unlock
                            talent through proof-of-work partnerships.
                        </p>
                    </div>
                    <div className=" w-full flex flex-col gap-4 " >
                        <div className=" w-full border lg:h-[120px] border-[#FFFBFB] flex items-center rounded-xl gap-3 px-6 py-3 " >
                            <div className=" w-fit " >
                                <div className=" w-9 h-9 bg-[#1D1348] text-xl font-bold rounded-full border border-white flex justify-center items-center " >
                                    1
                                </div>
                            </div>
                            <div className=" flex-col flex gap-2 " >
                                <p className=" lg:text-2xl font-bold " >Talent Pipeline Partnership</p>
                                <p className=" text-sm max-w-[700px] " >Hire job-ready professionals who've proven their skills through real-world challenges.</p>
                            </div>
                        </div>
                        <div className=" w-full border lg:h-[120px] border-[#FFFBFB] flex items-center rounded-xl gap-3 px-6 py-3 " >
                            <div className=" w-fit " >
                                <div className=" w-9 h-9 bg-[#FC7753] text-xl font-bold rounded-full border border-white flex justify-center items-center " >
                                    2
                                </div>
                            </div>
                            <div className=" flex-col flex gap-2 " >
                                <p className=" lg:text-2xl font-bold " >Workforce Development Partnership</p>
                                <p className=" text-sm max-w-[700px] " >Upskill your teams with practical, mentor-led projects tailored to your industry.</p>
                            </div>
                        </div>
                        <div className=" w-full border lg:h-[120px] border-[#FFFBFB] flex items-center rounded-xl gap-3 px-6 py-3 " >
                            <div className=" w-fit " >
                                <div className=" w-9 h-9 bg-[#6A3223] text-xl font-bold rounded-full border border-white flex justify-center items-center " >
                                    3
                                </div>
                            </div>
                            <div className=" flex-col flex gap-2 " >
                                <p className=" lg:text-2xl font-bold " >Innovation & Project Collaboration</p>
                                <p className=" text-sm max-w-[700px] " >Partner with Rhyzly to co-create projects that solve real problems while evaluating rising talent.</p>
                            </div>
                        </div>
                        <div className=" w-full border lg:h-[120px] border-[#FFFBFB] flex items-center rounded-xl gap-3 px-6 py-3 " >
                            <div className=" w-fit " >
                                <div className=" w-9 h-9 bg-[#FF073D] text-xl font-bold rounded-full border border-white flex justify-center items-center " >
                                    4
                                </div>
                            </div>
                            <div className=" flex-col flex gap-2 " >
                                <p className=" lg:text-2xl font-bold " >Social Impact & Inclusion Partnership</p>
                                <p className=" text-sm max-w-[700px] " >Support diverse, emerging talent by sponsoring challenges that open doors to opportunities.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Marquee />
                <div
                    style={{
                        background:
                            "radial-gradient(60.31% 199.16% at 50% 50%, #462EAE 0%, #1D1348 48.39%, #1D1348 100%)",
                    }}
                    className=" w-full flex flex-col justify-center items-center gap-10 py-30 px-4 xl:px-20 text-[#F6F5FB] "
                >
                    <p className=" text-4xl max-w-[728px] font-bold text-center ">
                        Trusted by Forward Thinking Organizations
                    </p>

                    <div className=" w-fit ">
                        <CustomButton variant="outline">
                            Join Rhyzly
                        </CustomButton>
                    </div>
                </div>
                <Footer />
            </div>
        </UnauthorisedLayout>
    );
}
