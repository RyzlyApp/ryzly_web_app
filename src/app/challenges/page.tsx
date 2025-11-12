"use client"
import { ExploreChallenges, ExploreFilter } from "@/components/explore";
import { UnauthorisedLayout } from "@/components/shared";

export default function ExplorePage() {
    return (
        <UnauthorisedLayout>
            <ExploreFilter />
            <ExploreChallenges />
        </UnauthorisedLayout>
    )
}