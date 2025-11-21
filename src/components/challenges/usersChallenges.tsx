"use client"
import { CustomButton } from "@/components/custom";
import { ChallengeCard, LoadingLayout } from "@/components/shared";
import { searchAtom } from "@/helper/atom/search";
import { userAtom } from "@/helper/atom/user";
import { IChallenge } from "@/helper/model/challenge";
import { useFetchData } from "@/hook/useFetchData";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { useAtom } from "jotai";
import { useRef, useState } from "react";
import { RiArrowDownSLine, RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

export default function UsersChallenges() {


    const [userState] = useAtom(userAtom);

    const containerRef = useRef<HTMLDivElement | null>(null);
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


    const { data = [], isLoading } = useFetchData<IChallenge[]>({
        endpoint: selected === "draft" ? `/challenge/drafts` : selected === "bookmark" ? `/challenge/bookmarks` : `/challenge/status`, name: "challenge", params: {
            userId: user?._id as string,
            status: selected,
            asCoach: createdBy?.value
        }
    })

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

                <div className={`w-full rounded-2xl bg-white overflow-hidden flex flex-col gap-4 p-4  `}>

                    {/* Tabs */}
                    <div className=" w-full flex lg:flex-row flex-col-reverse justify-between lg:items-center gap-7 lg:gap-4" >

                        <div className="relative overflow-x-auto scroll-smooth w-full ">
                            <div
                                className="flex gap-4 w-fit pb-2 items-center "
                            >
                                <p className=" font-bold lg:block hidden " >Your Challenges</p>
                                {filter?.filter((item) => createdBy?.value !== "coach" ? item?.value !== "draft" : item )?.map((item, index) => {
                                    return (
                                        <CustomButton key={index} onClick={() => setSelected(item?.value)} variant={item?.value === selected ? "primary" : "outline"} height="35px" fontSize="12px">
                                            {item?.name}
                                        </CustomButton>
                                    )
                                })}
                            </div>
                        </div>
                        <div className=" lg:w-fit flex justify-between items-center " > 
                            <p className=" font-bold lg:hidden " >Your Challenges</p>
                            <div className=" w-fit ml-auto lg:ml-0 " >
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
                    </div>

                    <div className=" relative w-full h-full " >
                        <LoadingLayout loading={isLoading} lenght={data?.length} >
                            <div ref={containerRef} className="relative h-full overflow-x-auto scroll-smooth w-full ">
                                <div
                                    className="flex gap-4 w-fit h-full px-2 pb-2"
                                >
                                    {data?.map((item, index) => {
                                        return (
                                            <div className=" w-fit " key={index}  >
                                                <div className=" w-[350px] " >
                                                    <ChallengeCard isCoach={createdBy?.value === "coach"} joined={createdBy?.value === "coach" ? false : true} data={item} />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                            </div>
                        </LoadingLayout>
                        {data?.length > 3 && (
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