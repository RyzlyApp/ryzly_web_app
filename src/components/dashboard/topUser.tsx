
"use client"
import { LeaderboardTab } from "../challenges"; 


export default function TopUser() {
    return (
        <div className=" w-full rounded-2xl bg-white flex flex-col gap-4 p-4 " >
            <div className=" w-full pb-4 " >
                <p className=" font-semibold " >Badges Earned</p>
            </div>
            {/* <div className=" w-full h-[348px] bg-neonblue-50 rounded-3xl " >

            </div> */}
            <div className=" flex flex-col gap-2  " >
                <LeaderboardTab systemWide={true} />
            </div>
        </div>
    )
}