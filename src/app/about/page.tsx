import { CustomButton, CustomImage } from "@/components/custom";
import Marquee from "@/components/main-landing-page/Marquee";
import { UnauthorisedLayout } from "@/components/shared";
import Footer from "@/components/main-landing-page/Footer";

export default function About() {
    return (
        <UnauthorisedLayout main={true}>
            <div className=" w-full flex flex-col bg-white ">
                <div className=" w-full flex lg:flex-row flex-col gap-6 lg:gap-0 h-fit lg:h-screen bg-[#DBD5F5]  ">
                    <div className=" w-full h-[380px] lg:h-full ">
                        <CustomImage
                            src={"/images/aboutone.png"}
                            fillContainer
                            alt="aboutone"
                        />
                    </div>
                    <div className=" w-full h-full flex justify-center items-center ">
                        <div className=" w-full lg:w-[80%] flex flex-col lg:px-0 px-4 gap-3 ">
                            <p className=" font-black text-[#1D1348] ">
                                OUR STORY
                            </p>
                            <p className=" text-sm text-[#121010] font-medium ">
                                At Rhyzly, we believe talent deserves more than
                                a resume it deserves proof. Our platform
                                empowers creators to take on real challenges,
                                gain mentorship, and turn skills into proof of
                                work employers trust. Coaches shape the next
                                generation of talent, while organizations
                                discover skilled professionals through authentic
                                projects. Rhyzly is where you rise, showcase
                                your abilities, and unlock new opportunities.
                            </p>
                        </div>
                    </div>
                </div>
                <div className=" w-full flex h-fit lg:flex-row flex-col-reverse lg:h-[457px] pt-10 lg:pt-0 lg:-mt-20 bg-[#DBD5F5]  ">
                    <div className=" lg:flex-1 flex items-center justify-center">
                        <div className=" w-full lg:w-[80%] lg:px-0 px-4 lg:py-0 py-10 grid grid-cols-4 gap-4 ">
                            <div className=" flex flex-col text-[#1D1348] ">
                                <p className=" font-extrabold text-[32px] text-[#1D1348] font-figtree ">
                                    600k
                                </p>
                                <p className=" text-xs font-medium font-figtree ">
                                    register users in more than 100
                                    countries{" "}
                                </p>
                            </div>
                            <div className=" flex flex-col text-[#1D1348] ">
                                <p className=" font-extrabold text-[32px] text-[#1D1348] font-figtree ">
                                    450k
                                </p>
                                <p className=" text-xs font-medium font-figtree ">
                                    project completed by creators{" "}
                                </p>
                            </div>
                            <div className=" flex flex-col text-[#1D1348] ">
                                <p className=" font-extrabold text-[32px] text-[#1D1348] font-figtree ">
                                    200+
                                </p>
                                <p className=" text-xs font-medium font-figtree ">
                                    coaches & organizations already active
                                </p>
                            </div>
                            <div className=" flex flex-col text-[#1D1348] ">
                                <p className=" font-extrabold text-[32px] text-[#1D1348] font-figtree ">
                                    80%
                                </p>
                                <p className=" text-xs font-medium font-figtree ">
                                    of creators landed more opportunities
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className=" w-full lg:w-[40%] h-[474px] lg:h-full flex justify-end ">
                        <CustomImage
                            src={"/images/abouttwo.png"}
                            fillContainer
                            alt="abouttwo"
                        />
                    </div>
                </div>
                <Marquee />
                <div className=" w-full flex lg:h-[797px] lg:flex-row flex-col py-10 lg:gap-0 gap-6 lg:py-20 px-4 lg:px-10 ">
                    <div className=" w-full h-full flex justify-center items-center ">
                        <div className=" w-full lg:w-[80%] flex flex-col gap-3 ">
                            <p className=" font-black text-[#1D1348] ">
                                OUR MISSION
                            </p>
                            <p className=" text-sm text-[#121010] font-medium ">
                                At Rhyzly, our mission is to empower creators to
                                rise by turning skills into proof-of-work that
                                speaks louder than resumes. We connect creators,
                                coaches, and organizations through real
                                challenges, mentorship, and authentic projects
                                unlocking recognition, credibility, and
                                opportunities for every talent.
                            </p>
                        </div>
                    </div>
                    <div className=" w-full h-[400px] lg:h-full ">
                        <CustomImage
                            src={"/images/aboutthree.png"}
                            fillContainer
                            alt="aboutthree"
                        />
                    </div>
                </div>
                <div className=" w-full flex items-center flex-col justify-center lg:py-20 px-4 lg:px-10 gap-8 ">
                    <div className=" flex flex-col gap-2 ">
                        <p className=" text-2xl lg:text-4xl font-bold max-w-[715px] text-center ">
                            At Rhyzly we are shaping the future of proof of work
                        </p>
                        <p className=" font-medium text-center  max-w-[715px] ">
                            We connect creators, coaches, and organizations
                            through real challenges, mentorship, and authentic
                            projects that unlock opportunity and recognition.
                        </p>
                    </div>
                    <div className=" flex lg:flex-row flex-col gap-3 text-white ">
                        <div className=" bg-[#1D1348] rounded-xl px-4 w-full lg:w-[283px] h-[290px] justify-center flex flex-col gap-3 ">
                            <div className=" w-8 h-8 bg-primary rounded-full " />
                            <p className=" text-2xl font-semibold ">
                                Own the Outcome
                            </p>
                            <p className=" text-sm ">
                                Turn skills into projects that prove ability,
                                with results employers recognize and
                                opportunities unlocked.
                            </p>
                        </div>
                        <div className=" bg-[#1D1348] rounded-xl px-4 w-full lg:w-[283px] h-[290px] justify-center flex flex-col gap-3 ">
                            <div className=" w-8 h-8 bg-primary rounded-full " />
                            <p className=" text-2xl font-semibold ">
                                Own the Outcome
                            </p>
                            <p className=" text-sm ">
                                Turn skills into projects that prove ability,
                                with results employers recognize and
                                opportunities unlocked.
                            </p>
                        </div>
                        <div className=" bg-[#1D1348] rounded-xl px-4 w-full lg:w-[283px] h-[290px] justify-center flex flex-col gap-3 ">
                            <div className=" w-8 h-8 bg-primary rounded-full " />
                            <p className=" text-2xl font-semibold ">
                                Own the Outcome
                            </p>
                            <p className=" text-sm ">
                                Turn skills into projects that prove ability,
                                with results employers recognize and
                                opportunities unlocked.
                            </p>
                        </div>
                        <div className=" bg-[#1D1348] rounded-xl px-4 w-full lg:w-[283px] h-[290px] justify-center flex flex-col gap-3 ">
                            <div className=" w-8 h-8 bg-primary rounded-full " />
                            <p className=" text-2xl font-semibold ">
                                Own the Outcome
                            </p>
                            <p className=" text-sm ">
                                Turn skills into projects that prove ability,
                                with results employers recognize and
                                opportunities unlocked.
                            </p>
                        </div>
                    </div>
                </div>
                <div className=" w-full h-[400px] lg:h-[1000px] lg:py-0 py-10 ">
                    <CustomImage
                        src={"/images/aboutfour.png"}
                        fillContainer
                        alt="aboutfour"
                    />
                </div>
                <div className=" w-full flex items-center flex-col justify-center py-10 lg:py-20 px-4 lg:px-10 gap-8 ">
                    <div className=" flex flex-col gap-2 ">
                        <p className=" text-2xl lg:text-4xl font-bold max-w-[715px] text-center ">
                            Meet the Team Driving the Mission
                        </p>
                        <p className=" font-medium text-center  max-w-[715px] ">
                            Our team is a group of creators, coaches, and
                            innovators committed to helping talent rise.
                            Together, we're building a platform where proof of
                            work unlocks real opportunities.
                        </p>
                    </div>
                    <div className=" w-full flex lg:flex-row flex-col gap-3 text-white ">
                        <div className=" w-full lg:w-[283px] flex flex-col text-[#1D1348] gap-3 ">
                            <div className=" w-full h-[330px] bg-[#1D1348] rounded-xl " />
                            <p className=" font-semibold ">Sophia Metty</p>
                            <p className=" text-sm ">Mentorship Director</p>
                        </div>
                        <div className=" w-full lg:w-[283px] flex flex-col text-[#1D1348] gap-3 ">
                            <div className=" w-full h-[330px] bg-[#1D1348] rounded-xl " />
                            <p className=" font-semibold ">David Brown</p>
                            <p className=" text-sm ">Head of Product Design</p>
                        </div>
                        <div className=" w-full lg:w-[283px] flex flex-col text-[#1D1348] gap-3 ">
                            <div className=" w-full h-[330px] bg-[#1D1348] rounded-xl " />
                            <p className=" font-semibold ">Beauty Wise</p>
                            <p className=" text-sm ">Marketing & Growth Strategist</p>
                        </div>
                        <div className=" w-full lg:w-[283px] flex flex-col text-[#1D1348] gap-3 ">
                            <div className=" w-full h-[330px] bg-[#1D1348] rounded-xl " />
                            <p className=" font-semibold ">Micheal Bard</p>
                            <p className=" text-sm ">Chief Technology officer</p>
                        </div>
                    </div>
                </div>
                <div style={{ background: "radial-gradient(60.31% 199.16% at 50% 50%, #462EAE 0%, #1D1348 48.39%, #1D1348 100%)" }} className=" w-full flex flex-col justify-center items-center gap-4 lg:px-10 py-30 px-4 xl:px-20 text-[#F6F5FB] ">
                    <p className=" text-2xl lg:text-4xl max-w-[728px] font-bold text-center " >Rise with Creators, Coaches, and Innovators Worldwide.</p>

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
