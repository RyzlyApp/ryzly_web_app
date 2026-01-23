import { RiCheckboxFill } from "react-icons/ri";
import { CustomButton, CustomImage } from "../custom";

export default function CoachDetails(
    {
        setTab
    } : {
        setTab:(by: number) => void
    }
) {
    return (
        <div className=" w-full flex flex-col gap-3 " >
            <div className=" w-full h-[250px] rounded-lg bg-pear-200 flex justify-center items-center " >
                <div className=" w-[60%] h-full " >
                    <CustomImage src={"/images/forcoach.png"} fillContainer alt={"coach"} />
                </div>
            </div>
            <p className=" text-2xl font-bold text-center " >Unlock Coach Mode</p>
            <p className=" text-xs text-center " >{`You're about to access features reserved for coaches. As a coach, you can create and manage challenges, build communities, and guide talents with your expertise and Monetize your Skills. Step up, inspire others, and grow your own impact and wealth.`}</p>
            <div className=" flex flex-col gap-2 " >
                <div className=" flex items-center gap-1 " >
                    <RiCheckboxFill className=" text-neonblue-500 " size={"16px"} />
                    <p className=" text-sm font-medium " >Create and host your own challenges</p>
                </div>
                <div className=" flex items-center gap-1 " >
                    <RiCheckboxFill className=" text-neonblue-500 " size={"16px"} />
                    <p className=" text-sm font-medium " >Monetize Your Skills and Build Wealth</p>
                </div>
                <div className=" flex items-center gap-1 " >
                    <RiCheckboxFill className=" text-neonblue-500 " size={"16px"} />
                    <p className=" text-sm font-medium " >Build and Grow Your Community</p>
                </div>
                <div className=" flex items-center gap-1 " >
                    <RiCheckboxFill className=" text-neonblue-500 " size={"16px"} />
                    <p className=" text-sm font-medium " >Share resources, feedback, and insights</p>
                </div>
                <div className=" flex items-center gap-1 " >
                    <RiCheckboxFill className=" text-neonblue-500 " size={"16px"} />
                    <p className=" text-sm font-medium " >Gain recognition for your Coaching and Guidiance</p>
                </div>
                <div className=" flex items-center gap-1 " >
                    <RiCheckboxFill className=" text-neonblue-500 " size={"16px"} />
                    <p className=" text-sm font-medium " >Inspire and support Upcoming  Talents worldwide</p>
                </div>
            </div>
            <CustomButton onClick={() => setTab(1)} >Become a Coach</CustomButton>
        </div>
    )
}