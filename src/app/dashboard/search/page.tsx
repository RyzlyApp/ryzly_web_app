"use client"
import { TrackChallenges } from "@/components/challenges";
import { searchAtom } from "@/helper/atom/search";
import { useAtom } from "jotai";


export default function Search() { 

    const [search] = useAtom(searchAtom);

    return(
        <div className={` w-full ${search ? "flex" : "hidden"} `} >
            <TrackChallenges />
        </div>
    )
}