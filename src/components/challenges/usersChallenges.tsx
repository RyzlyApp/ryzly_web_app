"use client"
import { CustomButton } from "@/components/custom";
import { ChallengeCard, LoadingLayout } from "@/components/shared";
import { searchAtom } from "@/helper/atom/search";
import { userAtom } from "@/helper/atom/user";
import { IChallenge } from "@/helper/model/challenge";
import { useFetchData } from "@/hook/useFetchData";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { useAtom } from "jotai";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { RiArrowDownSLine, RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const ALLOWED_USER_IDS = [
    "6adb7dcc9fb7608dab794b9f",
    "69beab2b7e91a2634fd80866",
    "6a650186aa78585fdbfee42b",
    "6999c33355ebdc736e47e08d",
    "694dab54e3eb9ed1f6c24879",
    "6a7e172c1b4b2fc55d0708b7",
    "6a7e15c11b4b2fc55d070297",
    "694288aa7b9cc808acfd2fd9",
    "6a652695aa78585fdbff1108",
    "694461e57b9cc808ac1b78cd",
    "6a7dfeb91b4b2fc55d06cc8b",
    "690e7e399e745e508fef9fc1",
    "690c75829e745e508fef9abf",
    "695971b0e30d29dd075fe9d3",
    "69275c43cd65993f7cbfd8f8"
];

const isOneDayAfterEnded = (challenge: IChallenge): boolean => {
    if (challenge?.endDate) {
        const endDate = new Date(challenge.endDate);
        if (!isNaN(endDate.getTime())) {
            // Check 24 hours after target end timestamp
            const oneDayAfterMs = endDate.getTime() + 24 * 60 * 60 * 1000;
            if (Date.now() >= oneDayAfterMs) {
                return true;
            }

            // Also check by calendar day (at least 1 day after end day)
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const endDay = new Date(challenge.endDate);
            endDay.setHours(0, 0, 0, 0);
            endDay.setDate(endDay.getDate() + 1);

            return today >= endDay;
        }
    }

    if (challenge?.isEnded || challenge?.IsEnded) {
        if (challenge?.updatedAt) {
            const updatedAt = new Date(challenge.updatedAt);
            if (!isNaN(updatedAt.getTime())) {
                const oneDayAfterMs = updatedAt.getTime() + 24 * 60 * 60 * 1000;
                return Date.now() >= oneDayAfterMs;
            }
        }
        return true;
    }

    return false;
};

export default function UsersChallenges() {

    const [userState] = useAtom(userAtom);
    const { data: user } = userState

    const param = useParams();
    const organisationId = param.organisationId;

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [createdBy, setCreatedBy] = useState<{
        name: string,
        value: string
    }>({
        name: user?.userType === "organization" ? "As a coach" : "As a talents",
        value: user?.userType === "organization" ? "coach" : ""
    },)
    const [search] = useAtom(searchAtom);

    const [selected, setSelected] = useState<string>("ongoing")

    const params = new URLSearchParams();
    params.append('tracks', selected[0] ?? "");

    params.append('q', search);

    const { data = [], isLoading } = useFetchData<IChallenge[]>({
        endpoint: selected === "draft" ? `/challenge/drafts` : selected === "bookmark" ? `/challenge/bookmarks` : `/challenge/status`, name: "challenge", params:
            user?.userType === "organization" ? {
                status: selected,
                asCoach: organisationId ? "coach" : createdBy?.value,
                userId: user?._id,
            } : selected === "draft" ? {
                status: selected,
                userId: user?._id,
                asCoach: organisationId ? "coach" : createdBy?.value
            } : {
                status: selected,
                userId: user?._id,
                asCoach: organisationId ? "coach" : createdBy?.value,
            }
    })

    const isAllowedUser = Boolean(user?._id && ALLOWED_USER_IDS.includes(user._id));

    const { data: primary, isLoading: loading } = useFetchData<IChallenge[]>({
        endpoint: user?.userType === "organization" ? `/challenge/status` : `/challenge?q=excellentbridge`,
        name: "challenge" + user?._id,
        params: user?.userType === "organization" ? {
            asCoach: "true",
            userId: user?._id,
        } : {
            userId: user?._id as string,
            isApproved: "true",
            limit: 20,
            isPublic: "true",
        },
        enable: user?.userType ? (user?.userType === "organization" ? true : isAllowedUser) : false
    })

    const filteredPrimary = isAllowedUser
        ? (primary?.filter(
            (item) =>
                isOneDayAfterEnded(item) &&
                !data?.some((existing) => existing?._id === item?._id)
        ) || [])
        : [];

    const totalChallengesCount = (data?.length || 0) + filteredPrimary.length;

    const scroll = (amount: number) => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: amount,
                behavior: "smooth",
            });
        }
    };

    const filter = [
        {
            name: "Ongoing",
            value: "ongoing"
        },
        {
            name: "Upcoming",
            value: "pending"
        },
        {
            name: "Completed",
            value: "completed"
        },
        {
            name: "Bookmark",
            value: "bookmark"
        },
    ]

    const filterCoach = [
        {
            name: "Ongoing",
            value: "ongoing"
        },
        {
            name: "Pending",
            value: "pending"
        },
        {
            name: "Completed",
            value: "completed"
        },
        {
            name: "Draft",
            value: "draft"
        },
        {
            name: "Bookmark",
            value: "bookmark"
        },
    ]

    const filterUser = [
        {
            name: "As a talent",
            value: ""
        },
        {
            name: "As a coach",
            value: "coach"
        },
    ]

    useEffect(() => {
        if (user?.userType === "organization") {
            setCreatedBy({
                name: "As a coach",
                value: "coach"
            })
        }
    }, [user?.userType])

    return (
        <>
            {user?.email && (
                <div className={`w-full rounded-2xl bg-white overflow-hidden flex flex-col gap-4 p-4  `}>

                    {/* Tabs */}
                    <div className=" w-full flex lg:flex-row flex-col-reverse justify-between lg:items-center gap-7 lg:gap-4" >

                        <div className="relative overflow-x-auto scroll-smooth w-full ">
                            <div
                                className="flex gap-4 w-fit pb-2 items-center "
                            >
                                <p className=" font-bold lg:block hidden " >Your Challenges</p>
                                {createdBy?.value !== "coach" && (
                                    <>
                                        {filter?.map((item, index) => {
                                            return (
                                                <CustomButton key={index} onClick={() => setSelected(item?.value)} variant={item?.value === selected ? "primary" : "outline"} height="35px" fontSize="12px">
                                                    {item?.name}
                                                </CustomButton>
                                            )
                                        })}
                                    </>
                                )}
                                {createdBy?.value === "coach" && (
                                    <>
                                        {filterCoach?.map((item, index) => {
                                            return (
                                                <CustomButton key={index} onClick={() => setSelected(item?.value)} variant={item?.value === selected ? "primary" : "outline"} height="35px" fontSize="12px">
                                                    {item?.name}
                                                </CustomButton>
                                            )
                                        })}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className=" lg:w-fit flex justify-between items-center " >
                            <p className=" font-bold lg:hidden " >Your Challenges</p>
                            <div className=" w-fit ml-auto lg:ml-0 " >
                                {(user?.isCoach && !organisationId) && (
                                    <Dropdown  >
                                        <DropdownTrigger>
                                            <button className=" text-base px-1 w-[150px] gap-3 flex items-center " >
                                                {createdBy?.name}
                                                <RiArrowDownSLine size={"15px"} />
                                            </button>
                                        </DropdownTrigger>
                                        <DropdownMenu>
                                            {filterUser?.map((item) => {
                                                return (
                                                    <DropdownItem onClick={() => setCreatedBy(item)} key={item?.name}
                                                    >
                                                        <p className=" text-base font-medium " >{item?.name}</p>
                                                    </DropdownItem>
                                                )
                                            })}
                                        </DropdownMenu>
                                    </Dropdown>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className=" relative w-full h-full " >
                        <LoadingLayout loading={isLoading} lenght={totalChallengesCount} >
                            <div ref={containerRef} className="relative overflow-x-auto scroll-smooth w-full h-full ">
                                <div
                                    className="flex gap-4 h-full flex-1 w-auto px-2 pb-2"
                                >
                                    {filteredPrimary.map((item, index) => {
                                        return (
                                            <div key={`primary-${item?._id || index}`} className=" w-[350px] h-auto "  >
                                                <ChallengeCard isCoach={createdBy?.value === "coach"} scrollable={true} joined={createdBy?.value === "coach" ? false : true} data={item} />
                                            </div>
                                        )
                                    })}
                                    {data?.map((item, index) => {
                                        return (
                                            <div key={`data-${item?._id || index}`} className=" w-[350px] h-auto "  >
                                                <ChallengeCard isCoach={createdBy?.value === "coach"} scrollable={true} joined={createdBy?.value === "coach" ? false : true} data={item} />
                                            </div>
                                        )
                                    })}
                                </div>

                            </div>
                        </LoadingLayout>
                        {totalChallengesCount > 3 && (
                            <>
                                {/* Left arrow */}
                                <button
                                    onClick={() => scroll(-400)} // scroll left
                                    className="w-8 h-8 rounded-full border border-blue-50 bg-white shadow-md z-20 absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer flex justify-center items-center"
                                >
                                    <RiArrowLeftSLine size={20} />
                                </button>

                                {/* Right arrow */}
                                <button
                                    onClick={() => scroll(400)} // scroll right
                                    className="w-8 h-8 rounded-full border border-blue-50 bg-white shadow-md z-20 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer flex justify-center items-center"
                                >
                                    <RiArrowRightSLine size={20} />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}