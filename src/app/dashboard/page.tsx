'use client';
import { BadgeCard, BadgeEarned, ListChallenges, TopUser, UserStats } from "@/components/dashboard";

export default function Dashboard() {
    return (
        <div className=" w-full h-fit flex overflow-hidden lg:flex-row flex-col gap-4 " >
            <div className=" flex-1 flex overflow-hidden flex-col gap-4 " >
                <BadgeCard />
                <UserStats />
                <ListChallenges />
                <BadgeEarned />
            </div>
            <div className=" w-full lg:w-[380px] " >
                <TopUser />
            </div>
        </div>
    )
}