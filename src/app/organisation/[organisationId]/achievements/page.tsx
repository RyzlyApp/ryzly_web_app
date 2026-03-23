"use client";
import { BadgesList, CertificateList } from "@/components/achievements";
import { userAtom } from "@/helper/atom/user";
import { IUser } from "@/helper/model/user";
import { Tabs, Tab } from "@heroui/react";
import { useAtom } from "jotai";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import React from "react";

export default function Achievements() {
    const query = useSearchParams();
    const tab = query?.get("tab") as string;
    const router = useRouter();
    const param = useParams();
    const organisationId = param.organisationId;

    const tablink = [
        {
            label: "Certificates",
            key: "",
        },
        {
            label: "Badges",
            key: "badges",
        },
    ];

    const [userState] = useAtom(userAtom);

    const handleClick = (item: string) => {
        router.push(`/dashboard/achievements${item ? `?tab=${item}` : ""}`);
    };

    return (
        <div className="w-full h-full flex flex-col gap-6">
            {/* <div className=" w-full h-fit ">
        <AchievementHeader />
      </div> */}
            <div className=" w-full flex py-4 px-1 lg:px-4 bg-white rounded-2xl flex-col gap-4 ">
                {!organisationId && (
                    <Tabs
                        selectedKey={tab ? tab : ""}
                        aria-label="Tabs"
                        onSelectionChange={(key) => handleClick(String(key))}
                        variant={"underlined"}
                    >
                        {tablink?.map((item) => {
                            return <Tab key={item?.key} title={item?.label} />;
                        })}
                    </Tabs>
                )}
                {organisationId && (
                    <div className=" w-full flex flex-col gap-4 ">
                        <BadgesList user={userState?.data as IUser} />
                    </div>
                )}
                {!organisationId && (
                    <div className=" w-full flex flex-col gap-4 ">
                        {!tab && (
                            <CertificateList
                                userId={userState?.data?._id + ""}
                            />
                        )}
                        {tab === "badges" && (
                            <BadgesList user={userState?.data as IUser} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
