"use client"
import { AchievementHeader, Certificates } from "@/components/achievements";
import Badges from "@/components/achievements/badges";
import { Tabs, Tab } from "@heroui/react";
import { useState } from "react";

export default function Achievements() {

    const [tab, setTab] = useState("")

    const tablink = [
        {
            label: "Certificates",
            key: ""
        },
        {
            label: "Badges",
            key: "badges"
        },
    ]

    return (
        <div className="w-full h-full flex flex-col gap-6">
            <div className=" w-full h-fit " >
                <AchievementHeader />
            </div>
            <div className=" w-full flex p-4 bg-white rounded-2xl flex-col gap-4 " >
                <Tabs selectedKey={tab ? tab : ""} aria-label="Tabs" variant={"underlined"} >
                    {tablink?.map((item) => {
                        return (
                            <Tab key={item?.key} onClick={() => setTab(item?.key)} title={item?.label} />
                        )
                    })}
                </Tabs>
                <div className=" w-full flex flex-col gap-4 " >
                    {tab === "" && <Certificates />}
                    {tab === "badges" && <Badges />}
                </div>
            </div>
        </div>
    )
}