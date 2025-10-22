"use client"
import { AchievementHeader, BadgesList, CertificateList } from "@/components/achievements"; 
import { userAtom } from "@/helper/atom/user";
import { IUser } from "@/helper/model/user";
import { Tabs, Tab } from "@heroui/react";
import { useAtom } from "jotai";
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

    const [userState] = useAtom(userAtom)

    return (
        <div className="w-full h-full flex flex-col gap-6">
            <div className=" w-full h-fit " >
                <AchievementHeader />
            </div>
            <div className=" w-full flex py-4 px-1 lg:px-4 bg-white rounded-2xl flex-col gap-4 " >
                <Tabs selectedKey={tab ? tab : ""} aria-label="Tabs" variant={"underlined"} >
                    {tablink?.map((item) => {
                        return (
                            <Tab key={item?.key} onClick={() => setTab(item?.key)} title={item?.label} />
                        )
                    })}
                </Tabs>
                <div className=" w-full flex flex-col gap-4 " >
                    {tab === "" && <CertificateList userId={userState?.data?._id+""} />}
                    {tab === "badges" && <BadgesList user={userState?.data as IUser} />}
                </div>
            </div>
        </div>
    )
}