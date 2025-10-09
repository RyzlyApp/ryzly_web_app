"use client"
import { ExploreChallenges, ExploreFilter, ExploreNavbar } from "@/components/explore";

export default function ExplorePage() {
    return (
        <div className=" w-full flex flex-col gap-6 p-6 h-screen overflow-y-auto bg-[#EBE6E8] " >
            <div className=" w-full h-fit " >
                <ExploreNavbar />
            </div>
            <ExploreFilter />
            <ExploreChallenges />
        </div>
    )
}