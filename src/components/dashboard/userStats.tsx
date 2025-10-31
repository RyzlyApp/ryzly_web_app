"use client"
import { userAtom } from "@/helper/atom/user";
import { userstats } from "@/helper/utils/databank";
import { useAtom } from "jotai";

export default function UserStats() {

    const [userState] = useAtom(userAtom)

    const { data } = userState

    return (
        <div className=" w-full flex lg:flex-row flex-col gap-4 " >
            {userstats?.map((item, index) => {
                return ( 
                    <div key={index} className=" w-full flex items-center gap-3 bg-white rounded-2xl px-4  h-[96px] " >
                        <div style={{ backgroundColor: item?.bgcolor }} className=" w-12 h-12 rounded-full flex justify-center items-center " >
                            <item.icon size={"24px"} color={item?.color} />
                        </div>
                        <div className=" flex flex-col " >
                            <p className=" font-semibold text-lg " >{item?.label === "Challenges Completed" ? data?.challenges?.length : item?.label === "Points Earned" ? data?.ryzlyPoints : "$0.00" }</p>
                            <p className=" text-xs text-violet-300 " >{item?.label}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}