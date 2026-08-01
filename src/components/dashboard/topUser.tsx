
"use client"
import { useAtom } from "jotai";
import { LeaderboardTab } from "../challenges"; 
import { userAtom } from "@/helper/atom/user";


export default function TopUser() {

    const [ user ] = useAtom(userAtom)

    return (
        <div className=" w-full rounded-2xl bg-white flex flex-col gap-4 p-4 " >
            <div className=" w-full " >
                <p className=" font-semibold " >{user?.data?.userType === "organization" ? "" : "Global"} Top Talents</p>
            </div> 
            <div className=" flex flex-col gap-2  " >
                <LeaderboardTab systemWide={true} />
            </div>
        </div>
    )
}