"use client"
import { CustomButton } from "@/components/custom";
import { ChallengeCard, LoadingLayout } from "@/components/shared";
import { searchAtom } from "@/helper/atom/search";
import { userAtom } from "@/helper/atom/user";
import { IChallenge } from "@/helper/model/challenge";
import { useFetchData } from "@/hook/useFetchData";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { useAtom } from "jotai";
import { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";

export default function UsersChallenges() {


    const [userState] = useAtom(userAtom);
    const [createdBy, setCreatedBy] = useState<{
        name: string,
        value: string
    }>({
        name: "As a participant",
        value: ""
    },)
    const [search] = useAtom(searchAtom);

    const { data: user } = userState
    const [selected, setSelected] = useState<string>("ongoing")

    const params = new URLSearchParams();
    params.append('tracks', selected[0] ?? "");

    params.append('q', search);


    const { data, isLoading } = useFetchData<IChallenge[]>({
        endpoint: `/challenge/status`, name: "challenge" + selected, params: {
            userId: user?._id as string,
            status: selected,
            asCoach: createdBy?.value
        }
    })

    const filter = [
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
    ]

    const filterUser = [
        {
            name: "As a participant",
            value: ""
        },
        {
            name: "As a coach",
            value: "coach"
        },
    ]

    return (
        <>
            {user?.email && (

                <div className={`w-full rounded-2xl bg-white overflow-hidden ${user?.challenges.length > 0 ? " flex " : " hidden "} flex-col gap-4 p-4  `}>

                    {/* Tabs */}
                    <div className=" w-full flex justify-between items-center gap-4" >

                        <div className="relative overflow-x-auto scroll-smooth w-full ">
                            <div
                                className="flex gap-4 w-fit pb-2 items-center "
                            >
                                <p className=" font-bold " >Your Challenges</p>
                                {filter?.map((item, index) => {
                                    return (
                                        <CustomButton key={index} onClick={() => setSelected(item?.value)} variant={item?.value === selected ? "primary" : "outline"} height="35px" fontSize="12px">
                                            {item?.name}
                                        </CustomButton>
                                    )
                                })}
                            </div>
                        </div>
                        <div className=" w-fit " > 
                            {user?.isCoach && (
                                <Dropdown  >
                                    <DropdownTrigger>
                                        <button className=" text-sm px-1 w-[150px] gap-3 flex items-center " >
                                            {createdBy?.name}
                                            <RiArrowDownSLine size={"15px"} />
                                        </button>
                                    </DropdownTrigger>
                                    <DropdownMenu>
                                        {filterUser?.map((item) => {
                                            return (
                                                <DropdownItem onClick={() => setCreatedBy(item)} key={item?.name}
                                                >
                                                    <p className=" text-sm font-medium " >{item?.name}</p>
                                                </DropdownItem>
                                            )
                                        })}
                                    </DropdownMenu>
                                </Dropdown>
                            )}
                        </div>
                    </div>
                    <LoadingLayout loading={isLoading} >
                        <div className=" w-full grid gap-4 grid-cols-1 lg:grid-cols-3 " >
                            {data?.map((item, index) => {
                                return (
                                    <ChallengeCard joined={createdBy?.value === "coach" ? false : true} key={index} data={item} />
                                )
                            })}
                        </div>
                    </LoadingLayout>
                </div>
            )}
        </>
    )
}