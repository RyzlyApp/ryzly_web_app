import CustomButton from "../custom/customButton";
import { RiArrowDownSLine, RiCheckFill } from "react-icons/ri";
import { useState } from "react";

export default function Badges() {

    const milestones = [
        {
            title: "Milestone 1",
            description: "Joined your first challenge"
        },
        {
            title: "Milestone 2",
            description: "Submitted 1 task to a challenge"
        },
        {
            title: "Milestone 3",
            description: "Gave 2 peer helpful feedback"
        }
    ]

    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className=" w-full rounded-2xl bg-white flex flex-col gap-4 p-4 " >
            <div className=" w-full flex flex-col gap-4 max-w-[528px] " >
                <div className=" w-full flex flex-col border gap-4 border-violet-50 p-4 rounded-2xl " >
                    <div className=" w-full flex gap-4 justify-between items-center " >
                        <div className=" flex items-center gap-4 " >
                            <div className=" w-[56px] h-[56px] rounded bg-gray-100 " ></div>
                            <div className=" flex flex-col gap-1 " >
                                <p className=" font-bold " >Rookie Rhyzer</p>
                                <p className=" text-xs font-medium text-violet-300 " >150 points</p>
                            </div>
                        </div>
                        <div className=" flex items-center gap-4 " >
                            <CustomButton >Share</CustomButton>
                        </div>
                    </div>
                    <div className=" w-full flex flex-col gap-4 p-4 bg-violet-50 rounded-2xl " >
                        <div onClick={() => setIsExpanded(!isExpanded)} className=" w-full flex items-center bg-neonblue-50 rounded-lg gap-4 justify-between " >
                            <p className=" font-semibold text-xs " >Milestones you unlocked</p>
                            <RiArrowDownSLine size={"16px"} className={` text-black${isExpanded ? "rotate-180" : ""} `} />
                        </div>
                        <div className={` w-full flex flex-col gap-2 ${isExpanded ? "block transition transform-content duration-300 " : "hidden"} `} >
                            {milestones?.map((item) => {
                                return (
                                    <div key={item?.title} className=" w-full flex items-center gap-2 " >
                                        <RiCheckFill size={"12px"} className=" text-violet-500 " />
                                        <p className=" text-xs font-medium text-violet-300 " >{item?.description}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}