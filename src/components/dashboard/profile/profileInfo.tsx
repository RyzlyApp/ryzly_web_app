"use client";

import Challenges from "@/components/dashboard/profile/Challenges";
import Work from "@/components/dashboard/profile/Work";
import React, { useEffect, useState } from "react";
import { BsDot } from "react-icons/bs";
import { userAtom } from "@/helper/atom/user";
import { useAtom } from "jotai";
import { Avatar } from "@heroui/react";
import {
    EditOrganisationBtn,
    EditUserBtn,
} from "@/components/dashboard/settings";
import { useParams } from "next/navigation";
import { useFetchData } from "@/hook/useFetchData";
import { IOrganisationDetails, IUser } from "@/helper/model/user";
import { LoadingLayout } from "@/components/shared";
import { BadgesList, CertificateList } from "@/components/achievements";

const ProfileInfo = () => {
    const [currentTab, setCurrentTab] = useState("Portfolio");

    const param = useParams();
    const id = param.id;
    const organisationId = param.organisationId;

    const AWS_BUCKET_NAME = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string;
    const AWS_REGION = process.env.NEXT_PUBLIC_AWS_REGION as string;

    const [userState] = useAtom(userAtom);

    const { data } = userState;

    const { data: user, isLoading } = useFetchData<IUser>({
        endpoint: `/user/${id}`,
        name: "userdetails",
    });

    const { data: organisation } = useFetchData<IOrganisationDetails>({
        endpoint: `/organization/${organisationId}`,
        name: "organizationdetails",
        enable: organisationId ? true : false,
    });

    const tabs = ["Portfolio", "Certificates", "Badges", "Hosted"];

    useEffect(() => {
        if (organisationId) {
            setCurrentTab("Hosted");
        }
    }, [organisationId]);

    return (
        <LoadingLayout loading={isLoading}>
            <div>
                {/* Edit Profile Modal */}

                <div className="bg-white rounded-lg p-4 flex flex-col gap-3 relative">
                    <div className=" w-full flex justify-between ">
                        <Avatar
                            size="lg"
                            src={
                                organisationId
                                    ? `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${organisation?.profilePicture}`
                                    : user?.profilePicture
                            }
                            name={user?.firstName}
                        />
                        {data?._id === user?._id && (
                            <>
                                {organisationId ? (
                                    <EditOrganisationBtn />
                                ) : (
                                    <EditUserBtn />
                                )}
                            </>
                        )}
                    </div>
                    <div className=" w-full ">
                        <div className="flex lg:flex-row flex-col gap-2 lg:items-center">
                            <h2 className="font-semibold capitalize text-lg">
                                {organisationId
                                    ? organisation?.name
                                    : user?.firstName + " " + user?.lastName}
                            </h2>
                            <p className="text-xs text-gray-600">
                                {user?.badgeLevel[user?.badgeLevel?.length -1]}
                            </p>
                            {!organisationId && (
                                <>
                                    {user?.isCoach && (
                                        <div className=" px-2 w-fit rounded-full bg-neonblue-600 text-white font-semibold h-[18px] flex justify-center items-center text-xs ">
                                            Coach
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        {!organisationId && (
                            <div className=" w-full flex text-sm items-center mt-2">
                                {/* <p className="font-semibold">{user?.username}</p> */}
                                <div className=" w-full flex flex-wrap gap-3 ">
                                    {user?.interests?.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className=" flex gap-1 items-center "
                                            >
                                                <BsDot />
                                                <p>{item}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                        {!organisationId && (
                            <p className="text-sm text-[#686184] mt-2">
                                {user?.about}
                            </p>
                        )}
                        {/* <div className="mt-2">LinkedIn, X</div> */}
                    </div>
                </div>

                {!organisationId && (
                    <div className="p-4 w-full rounded-lg bg-white mt-5 flex justify-between">
                        <div className=" w-full flex flex-col gap-2 ">
                            <h4 className="text-sm font-semibold">Skills</h4>
                            <div className=" w-full flex flex-wrap gap-2 ">
                                {user?.skills?.map((item, index) => {
                                    return (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-[#E9EAEB] text-xs rounded-full"
                                        >
                                            {item}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-lg p-4 mt-5">
                    <div className="flex gap-1">
                        {tabs
                            ?.filter((item) =>
                                organisationId
                                    ? item !== "Portfolio" &&
                                      item !== "Certificates"
                                    : !user?.isCoach
                                      ? item !== "Challenges"
                                      : item,
                            )
                            .map((tab, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentTab(tab)}
                                    className={`${
                                        tab === currentTab
                                            ? "border-b-2 border-[#596AFE]"
                                            : ""
                                    } text-sm px-3 py-1 cursor-pointer`}
                                >
                                    {tab}
                                </button>
                            ))}
                    </div>

                    <div className="mt-5">
                        {currentTab === "Portfolio" && (
                            <Work userId={id + ""} portfolio={true} />
                        )}
                        {currentTab === "Certificates" && (
                            <CertificateList
                                userId={id + ""}
                                portflio={
                                    data?._id === user?._id ? false : true
                                }
                            />
                        )}
                        {currentTab === "Badges" && (
                            <BadgesList user={user as IUser} />
                        )}
                        {currentTab === "Hosted" && (
                            <Challenges user={user as IUser} />
                        )}
                    </div>
                </div>
            </div>
        </LoadingLayout>
    );
};

export default ProfileInfo;
