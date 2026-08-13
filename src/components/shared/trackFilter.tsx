"use client";

import React from "react";
import { ITrack } from "@/helper/model/interest";
import { useFetchData } from "@/hook/useFetchData";
import { CustomButton, CustomSearch } from "../custom";
import LoadingLayout from "./loadingLayout";
import { useAtom } from "jotai";
import { filtersAtom } from "@/helper/atom/filter";
import FilterDrawer from "./filterDrawer";
import { searchAtom } from "@/helper/atom/search";

export default function TrackFilter({
    fullWidth = false,
}: {
    fullWidth?: boolean;
}) {
    const { data: track, isLoading } = useFetchData<ITrack[]>({
        endpoint: "/track/tracks",
        name: "tracks",
    });

    const [filters, setFilters] = useAtom(filtersAtom);
    const [search, setSearch] = useAtom(searchAtom);

    const handleTrackSelect = (trackId: string) => {
        setFilters((prev) => ({
            ...prev,
            tracks: prev.tracks[0] === trackId ? [] : [trackId],
        }));
    };

    const handleClearTracks = () => {
        setFilters((prev) => ({
            ...prev,
            tracks: [],
        }));
    };

    const isAllActive = filters?.tracks?.length === 0;

    return (
        <LoadingLayout loading={isLoading} bgColor={false}>
            <div className={fullWidth ? "w-full" : "w-[90%] lg:w-[80%] mx-auto"}>
                {/* Responsive container: stacks vertically on mobile, single row on desktop (lg) */}
                <div className="flex flex-col-reverse lg:flex-row items-stretch lg:items-center justify-between gap-4 w-full">
                    
                    {/* Left/Bottom (on mobile): Horizontal scrollable track buttons */}
                    <div className="flex-1 min-w-0 overflow-x-auto scrollbar-hide py-1.5" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        <div className="flex items-center gap-3 w-max">
                            <CustomButton
                                onClick={handleClearTracks}
                                variant={isAllActive ? "primary" : "outline"}
                                height="40px"
                                fontSize="13px"
                            >
                                All
                            </CustomButton>
                            
                            {track?.map((item, index) => {
                                const isActive = item?._id === filters?.tracks[0];
                                return (
                                    <CustomButton
                                        key={index}
                                        onClick={() => handleTrackSelect(item._id)}
                                        variant={isActive ? "primary" : "outline"}
                                        height="40px"
                                        fontSize="13px"
                                    >
                                        {item?.name}
                                    </CustomButton>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right/Top (on mobile): Search Bar and Filter Drawer */}
                    <div className="flex items-center gap-3 flex-shrink-0 w-full lg:w-auto">
                        <div className="flex-1 lg:w-[350px] lg:flex-initial">
                            <CustomSearch
                                value={search}
                                onClear={() => setSearch("")}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search for a challenge"
                            />
                        </div>
                        <div className="flex-shrink-0">
                            <FilterDrawer />
                        </div>
                    </div>

                </div>
            </div>
        </LoadingLayout>
    );
}