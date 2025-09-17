"use client"
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { CustomButton } from "../custom";
import { ChallengeCard } from "../shared";
import { useRef } from "react";

export default function ListChallenges() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const scroll = (amount: number) => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: amount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="w-full rounded-2xl overflow-hidden bg-white flex flex-col gap-4 p-4">
            {/* Tabs */}
            <div className="flex gap-3">
                <CustomButton height="35px" fontSize="12px">
                    For you
                </CustomButton>
                <CustomButton variant="outline" height="35px" fontSize="12px">
                    Explore
                </CustomButton>
            </div>

            {/* Scrollable container */}
            <div className=" relative w-full " >

                <div ref={containerRef} className="relative overflow-x-auto scroll-smooth w-full ">
                    <div
                        className="flex gap-4 w-fit pb-2"
                    >
                        <ChallengeCard scrollable={true} />
                        <ChallengeCard scrollable={true} />
                        <ChallengeCard scrollable={true} />
                        <ChallengeCard scrollable={true} />
                    </div>

                </div>
                {/* Left arrow */}
                <button
                    onClick={() => scroll(-200)} // scroll left
                    className="w-8 h-8 rounded-full border border-blue-50 bg-white shadow-md z-20 absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer flex justify-center items-center"
                >
                    <RiArrowLeftSLine size={20} />
                </button>

                {/* Right arrow */}
                <button
                    onClick={() => scroll(200)} // scroll right
                    className="w-8 h-8 rounded-full border border-blue-50 bg-white shadow-md z-20 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer flex justify-center items-center"
                >
                    <RiArrowRightSLine size={20} />
                </button>
            </div>
        </div>
    );
}
