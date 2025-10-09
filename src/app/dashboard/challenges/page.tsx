"use client"
import { TrackChallenges, UsersChallenges } from "@/components/challenges"; 

export default function Challenges() {  

    return ( 
        <div className=" w-full flex flex-col gap-4 " >
            <UsersChallenges />
            <TrackChallenges />
        </div>
    )
}