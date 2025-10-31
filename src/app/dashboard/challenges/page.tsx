"use client"
import { TrackChallenges, UsersChallenges } from "@/components/challenges"; 
import { searchAtom } from "@/helper/atom/search";
import { useAtom } from "jotai";

export default function Challenges() {  
    
    const [search] = useAtom(searchAtom);

    return ( 
        <div className=" w-full flex flex-col gap-4 " >
            {!search && (
                <UsersChallenges />
            )}
            <TrackChallenges />
        </div>
    )
}