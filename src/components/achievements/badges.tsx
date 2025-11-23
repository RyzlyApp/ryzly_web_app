import CustomButton from "../custom/customButton";
import { RiArrowDownSLine, RiCheckFill } from "react-icons/ri";
import { useState } from "react";
import { CustomImage } from "../custom";
import { IUser } from "@/helper/model/user";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";

export default function Badges(
    {
        user
    }: { user: IUser }
) {

    const [userState] = useAtom(userAtom)

    const { data } = userState

    const ryzlerLevels = [
        {
            title: "Rookie Ryzler",
            criteria: [
                "Talent completes their profile",
                "Joins at least 1 challenge",
                "Completes 1 challenge and adds it to their portfolio",
                "Scores a cumulative average of 50% or more in at least 1 challenge (cumulative average = total average from each challenge ÷ total number of challenges)",
            ],
        },
        {
            title: "Active Ryzler",
            criteria: [
                "Completed at least 5 challenges across at least 2 levels",
                "Got an average cumulative score ≥ 60% across all challenges",
                "Gave 3 or more peer reviews/help rated 'helpful' by peers",
                "Maintained at least a 7-day challenge streak",
            ],
        },
        {
            title: "Champ Ryzler",
            criteria: [
                "Completed 10 or more challenges, including at least 3 advanced-level ones in one track",
                "Got an average cumulative score ≥ 80% across all challenges",
                "Gave 5 or more peer reviews/help rated 'helpful' by peers",
                "Participated in at least 1 group challenge (team collaboration)",
            ],
        },
    ];


    console.log(user?.badgeLevel);
    console.log(user?.badgeLevel?.toString());

    const [isExpanded, setIsExpanded] = useState<string[]>([])

    return (
        <div className=" w-full rounded-2xl bg-white flex flex-col gap-4 p-4 " >
            <div className={` w-full flex flex-col gap-4 ${!user.badgeLevel ? "" : "max-w-[528px]"}  `} >
                {(!user?.badgeLevel?.toString() || user?.badgeLevel?.length !== 0) && (
                    <>
                        {ryzlerLevels?.map((item, index) => {
                            return (
                                <div key={index} className={` ${(!user.badgeLevel?.includes(item?.title) && user?._id !== data?._id) ? " hidden " : ""} w-full flex flex-col border gap-4 border-violet-50 p-4 rounded-2xl `} >
                                    <div className=" w-full flex gap-4 justify-between items-center " >
                                        <div className=" flex items-center gap-4 " >
                                            <div className={` w-[56px] h-[56px] ${user.badgeLevel?.includes(item?.title) ? " " : " blur-sm "} rounded bg-gray-100 `} >
                                                {item?.title === "Rookie Ryzler" && <CustomImage src={"/images/levelone.png"} alt="levelone" width={56} height={56} />}
                                                {item?.title === "Active Ryzler" && <CustomImage src={"/images/leveltwo.png"} alt="leveltwo" width={56} height={56} />}
                                                {item?.title === "Champ Ryzler" && <CustomImage src={"/images/levelthree.png"} alt="levelthree" width={56} height={56} />}
                                            </div>
                                            <div className=" flex flex-col gap-1 " >
                                                <p className=" font-bold " >{item?.title}</p>
                                            </div>
                                        </div>
                                        {user.badgeLevel?.includes(item?.title) && (
                                            <div className={" flex items-center gap-4 "} >
                                                <CustomButton >Share</CustomButton>
                                            </div>
                                        )}
                                    </div>
                                    <div className=" w-full flex flex-col gap-4 p-4 bg-violet-50 rounded-2xl " >
                                        <div onClick={() => setIsExpanded(!isExpanded.includes(item?.title) ? [...isExpanded, item?.title] : (isExpanded.filter((subitem) => subitem !== item?.title)))} className=" w-full flex items-center rounded-lg gap-4 justify-between " >
                                            <p className=" font-semibold text-xs " >Milestones you unlocked</p>
                                            <RiArrowDownSLine size={"16px"} className={` text-black ${item?.title ? isExpanded.includes(item?.title) ? "rotate-180" : "" : ""} `} />
                                        </div>
                                        <div className={` w-full flex flex-col gap-2 ${item?.title ? isExpanded.includes(item?.title) ? "block transition transform-content duration-300 " : "hidden" : "hidden"} `} >
                                            {item?.criteria?.map((item, index) => {
                                                return (
                                                    <div key={index} className=" w-full flex gap-2 " >
                                                        <div className=" w-fit mt-[2px] " >
                                                            <RiCheckFill size={"12px"} className=" text-violet-500 " />
                                                        </div>
                                                        <p className=" text-xs font-medium text-violet-300 " >{item}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </>
                )}
            </div>
            {(!user?.badgeLevel?.toString() || user?.badgeLevel?.length === 0) && (
                <div className=" w-full flex flex-col justify-center py-7 items-center " >
                    <CustomImage
                        src="/images/medal.png"
                        alt="logo"
                        width={40}
                        height={40}
                        className="w-[40px] h-[40px] "
                    />
                    <p className=" text-xl font-bold " >No badges earned yet </p>
                    {/* <p className=" max-w-[222px] text-center text-xs font-medium  text-violet-300 " >{`You haven't earned a badge yet but your first one is just a challenge away!`}</p> */}
                </div>
            )}
        </div>
    )
}