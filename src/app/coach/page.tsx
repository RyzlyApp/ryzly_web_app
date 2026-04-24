import { CustomButton } from "@/components/custom";
import Marquee from "@/components/main-landing-page/Marquee";
import { UnauthorisedLayout } from "@/components/shared";

export default function Coach() {
    return (
        <UnauthorisedLayout main={true}>
            <div className=" w-full flex flex-col ">
                <div className=" w-full h-auto lg:pt-0 px-4  pt-40 lg:gap-0 gap-8 lg:h-screen flex lg:flex-row flex-col ">
                    <div className=" w-full h-full flex flex-col items-center justify-center ">
                        <div className=" lg:max-w-[70%] w-full  flex flex-col gap-6">
                            <p className=" text-2xl lg:text-5xl font-bold ">
                                Share your expertise. <br /> Shape real careers
                            </p>
                            <p className=" font-medium ">
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
            </div>
        </UnauthorisedLayout>
    );
}
