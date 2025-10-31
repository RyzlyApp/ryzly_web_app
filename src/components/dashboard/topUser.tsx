
"use client"
import { LeaderboardTab } from "../challenges"; 


export default function TopUser() {
    return (
        <div className=" w-full rounded-2xl bg-white flex flex-col gap-4 p-4 " >
            <div className=" w-full " >
                <p className=" font-semibold " >Career Ladder</p>
            </div> 
            <div className=" flex flex-col gap-2  " >
                <LeaderboardTab systemWide={true} />
            </div>
        </div>
    )
}