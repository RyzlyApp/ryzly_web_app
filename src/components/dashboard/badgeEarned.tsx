"use client"
import { useAtom } from "jotai";
import { CustomImage } from "../custom";
import { userAtom } from "@/helper/atom/user";

export default function BadgeEarned() {

    const [userState] = useAtom(userAtom)

    const { data: user } = userState

    return (
        <div className=" w-full rounded-2xl bg-white flex flex-col gap-4 p-4 " >
            <div className=" w-full flex justify-between items-center " >
                <p className=" font-semibold " >Badges Earned</p>
                <p className=" text-xs text-neonblue-600 font-medium " >See All</p>
            </div>
            {user?.badgeLevel && (
                <div className=" w-full flex items-center justify-around gap-6 py-7 " >
                    <div className=" w-full " >
                        {(user?.badgeLevel === "Rookie Ryzler" || user?.badgeLevel === "Active Ryzler" || user?.badgeLevel === "Champ Ryzler") && (
                            <div className=" w-full h-fit flex flex-col gap-2 items-center " >
                                <CustomImage src={"/images/levelone.png"} alt="levelone" width={114} height={114} />
                                <p className=" text-sm font-medium " >Rookie Rhyzer</p>
                            </div>
                        )}
                    </div>
                    <div className=" w-full " >
                        {(user?.badgeLevel === "Active Ryzler") && (
                            <div className=" w-full h-fit flex flex-col gap-2 items-center " >
                                <CustomImage src={"/images/leveltwo.png"} alt="leveltwo" width={114} height={114} />
                                <p className=" text-sm font-medium " >Active Rhyzer</p>
                            </div>
                        )}
                    </div>
                    <div className=" w-full " >
                        {(user?.badgeLevel === "Champ Ryzler") && (
                            <div className=" w-full h-fit flex flex-col gap-2 items-center " >
                                <CustomImage src={"/images/levelthree.png"} alt="levelthree" width={114} height={114} />
                                <p className=" text-sm font-medium " >Champ Ryzler</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {!user?.badgeLevel && (
                <div className=" w-full flex flex-col justify-center py-7 items-center " >
                    <CustomImage
                        src="/images/medal.png"
                        alt="logo"
                        width={40}
                        height={40}
                        className="w-[40px] h-[40px] "
                    />
                    <p className=" text-xl font-bold " >No badges earned yet </p>
                    <p className=" max-w-[222px] text-center text-xs font-medium  text-violet-300 " >{`You haven't earned a badge yet but your first one is just a challenge away!`}</p>
                </div>
            )}
        </div>
    )
}