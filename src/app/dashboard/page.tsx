"use client";
import {
    BadgeCard,
    BadgeEarned,
    ListChallenges,
    TopUser,
    UserStats,
} from "@/components/dashboard";
import { useState } from "react";
import { IoIosLogIn } from "react-icons/io";

export default function Dashboard() {

    const [show, setShow] = useState(true);
    const [mounted, setMounted] = useState(true);

    const toggle = () => {
        if (show) {
            // closing: animate first, then remove from layout
            setShow(false);
            setTimeout(() => setMounted(false), 400); // match CSS duration
        } else {
            // opening: mount first, then animate in
            setMounted(true);
            requestAnimationFrame(() => setShow(true));
        }
    };

    return (
        <div className=" w-full h-fit flex overflow-hidden lg:flex-row flex-col gap-4 ">
            <div className="flex-1 min-w-0 flex overflow-hidden flex-col gap-4">
                <BadgeCard />
                <UserStats />
                <ListChallenges />
                <BadgeEarned />
            </div>
            <div className="relative shrink-0 lg:w-fit w-full">
                <button
                    onClick={toggle}
                    className={` menu_top_button ${show ? "open" : ""} absolute top-10 ${
                        show ? "-left-10" : "-left-7"
                    } shadow rounded-full w-10 h-10 bg-white flex justify-center items-center`}
                >
                    <IoIosLogIn size={"20px"} />
                </button>

                {mounted && (
                    <div
                        className={`lg:w-[380px] w-full menu_top_div ${!show ? "open" : ""}`}
                    >
                        <TopUser />
                    </div>
                )}
            </div>
        </div>
    );
}
