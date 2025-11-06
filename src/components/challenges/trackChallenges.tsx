"use client"
import { CustomButton, CustomInput } from "@/components/custom";
import { ChallengeCard, FilterDrawer, Loader } from "@/components/shared";
import { filtersAtom, updateFilterAtom } from "@/helper/atom/filter";
import { searchAtom } from "@/helper/atom/search";
import { userAtom } from "@/helper/atom/user";
import { IChallenge } from "@/helper/model/challenge";
import { IIndustry, ILevel, ITrack } from "@/helper/model/interest";
import { URLS } from "@/helper/services/urls";
import { convertDataForSelect } from "@/helper/utils/convertDataForSelect";
import { useFetchData } from "@/hook/useFetchData";
import { Checkbox, Drawer, DrawerBody, DrawerContent, DrawerHeader, Input } from "@heroui/react";
import { useAtom } from "jotai";
import { useState } from "react";
import { RiFilter3Line } from "react-icons/ri";

export default function TrackChallenges() {


    const [userState] = useAtom(userAtom);
    const [isOpen, setIsOpen] = useState(false)
    const [search] = useAtom(searchAtom);

    const { data: user } = userState
    const [selected, setSelected] = useState<string[]>([])

    const [filters] = useAtom(filtersAtom);


    const params = new URLSearchParams();
    params.append('tracks', filters.tracks[0] ?? "");
    params.append('q', search);
    params.append('tags', filters.tags[0] ?? "");
    params.append('type', filters.type ?? "");
    params.append('participationFee', filters.participationFee?.toString() ?? "");
    params.append('winningPrice', filters.winningPrice?.toString() ?? "");
    params.append('Level', filters.level ?? "");
    params.append('Industry', filters.industry ?? "");


    const { data, isLoading } = useFetchData<IChallenge[]>({
        endpoint: `/challenge?${params.toString()}`, name: "challenge", params: {
            userId: user?._id as string,
            // tracks: selected?.length > 0 ? selected[0] : [],
            // q: search
        }
    })

    const { data: track = [] } = useFetchData<ITrack[]>({ endpoint: "/track/tracks", name: "tracks" })

    const { data: level = [] } = useFetchData<ILevel[]>({ name: "level", endpoint: URLS.LEVEL });

    const { data: industry = [] } = useFetchData<IIndustry[]>({ name: "industry", endpoint: URLS.INDUSTRY });


    const [, updateFilters] = useAtom(updateFilterAtom);
    const leveloptions = convertDataForSelect(level, ["name", "_id"]);
    const industryoptions = convertDataForSelect(industry, ["name", "_id"]);

    const filter = [
        {
            title: "Level",
        },
        {
            title: "Industry",
        },
        {
            title: "Participation Fee",
        },
        {
            title: "Winning Price",
        },
        {
            title: "Type",
            list: [
                {
                    name: "Paid"
                },
                {
                    name: "Free"
                },
            ]
        },
    ]

    return (
        <div className="w-full rounded-2xl bg-white overflow-hidden flex flex-col gap-4 p-4">

            {/* Tabs */}
            <div className=" w-full flex justify-between items-center gap-4" >

                <div className="relative overflow-x-auto scroll-smooth w-full ">
                    <div className="flex gap-4 w-fit pb-2" >
                        <CustomButton onClick={() => setSelected([])} variant={selected?.length > 0 ? "outline" : "primary"} height="35px" fontSize="12px">
                            Discover Challenges
                        </CustomButton>
                        {track?.map((item, index) => {
                            return (
                                <CustomButton key={index} onClick={() => setSelected([item._id])} variant={item?._id === selected[0] ? "primary" : "outline"} height="35px" fontSize="12px">
                                    {item?.name}
                                </CustomButton>
                            )
                        })}
                    </div>
                </div>
                <FilterDrawer />
            </div>
            <div className=" w-full grid gap-4 grid-cols-1 lg:grid-cols-3 " >
                <Loader loading={isLoading} >
                    {data?.map((item, index) => {
                        return (
                            <ChallengeCard bookmark={true} key={index} data={item} />
                        )
                    })}
                </Loader>
            </div>
            {(data?.length === 0 && !isLoading) && (
                <div className=" w-full py-6 flex justify-center items-center " >
                    <p className=" font-semibold text-lg " >No Records Found</p>
                </div>
            )}
            <Drawer isOpen={isOpen} size={"sm"} onClose={() => setIsOpen(false)}>
                <DrawerContent>
                    {() => (
                        <>
                            <DrawerHeader className="flex flex-col gap-1">Filter</DrawerHeader>
                            <DrawerBody>
                                <div className=" w-full flex flex-col gap-5" >
                                    {filter?.map((item, index) => {
                                        return (
                                            <div key={index} className="  w-full flex flex-col gap-4 " >
                                                <div className=" w-full flex items-center justify-between " >
                                                    <p className=" text-xl font-semibold " >{item?.title}</p>
                                                    {index === 0 && (
                                                        <button onClick={() => updateFilters({ level: "", participationFee: null, winningPrice: null })} className=" text-neonblue-600 font-medium " >Reset</button>
                                                    )}
                                                </div>
                                                {item?.title === "Level" && (
                                                    <>
                                                        {leveloptions.map((level) => (
                                                            <div key={level?.value} className=" flex items-center " >
                                                                <Checkbox isSelected={filters.level === level?.value} onValueChange={(checked) => updateFilters({ level: checked ? level?.value : "" })} />
                                                                <p className=" font-medium " >{level?.label}</p>
                                                            </div>
                                                        ))}
                                                    </>
                                                )}

                                                {item?.title === "Industry" && (
                                                    <>
                                                        {industryoptions.map((industry) => (
                                                            <div key={industry?.value} className=" flex items-center " >
                                                                <Checkbox isSelected={filters.industry === industry?.value} onValueChange={(checked) => updateFilters({ industry: checked ? industry?.value : "" })} />
                                                                <p className=" font-medium " >{industry?.label}</p>
                                                            </div>
                                                        ))}
                                                    </>
                                                )}
                                                {item?.title === "Participation Fee" && (
                                                    <div className=" w-full flex items-center gap-2 " >
                                                        <Input
                                                            value={"0"}
                                                            isDisabled={true}
                                                            type="number"
                                                            placeholder="Enter participation fee"
                                                        />
                                                        <p className=" text-sm text-gray-500 " >to</p>
                                                        <Input
                                                            value={filters.participationFee?.toString() ?? ""}
                                                            onKeyPress={(e) => {
                                                                if (!/[0-9]/.test(e.key)) {
                                                                    e.preventDefault()
                                                                }
                                                            }}
                                                            onValueChange={(item: string) => {
                                                                if (/^\d*$/.test(item)) {
                                                                    updateFilters({ participationFee: Number(item) })
                                                                }
                                                            }}
                                                            type="number"
                                                            placeholder="1000"
                                                        />
                                                    </div>
                                                )}
                                                {item?.title === "Winning Price" && (
                                                    <div className=" w-full flex items-center gap-2 " >

                                                        <Input
                                                            value={"0"}
                                                            isDisabled={true}
                                                            type="number"
                                                            placeholder="Enter participation fee"
                                                        />
                                                        <p className=" text-sm text-gray-500 " >to</p>
                                                        <Input
                                                            value={filters.winningPrice?.toString() ?? ""}
                                                            onValueChange={(item: string) => {
                                                                if (/^\d*$/.test(item)) {
                                                                    updateFilters({ winningPrice: Number(item) })
                                                                }
                                                            }}
                                                            onKeyPress={(e) => {
                                                                if (!/[0-9]/.test(e.key)) {
                                                                    e.preventDefault()
                                                                }
                                                            }}
                                                            type="number"
                                                            placeholder="1000"
                                                        />
                                                    </div>
                                                )}
                                                {item?.title === "Type" && (
                                                    <>
                                                        {item?.list?.map((item) => (
                                                            <div key={item?.name} className=" flex items-center " >
                                                                <Checkbox isSelected={filters.type === item?.name} onValueChange={(checked) => updateFilters({ type: checked ? item?.name as "Paid" | "Free" : "" })} />
                                                                <p className=" font-medium " >{item?.name}</p>
                                                            </div>
                                                        ))}
                                                    </>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            </DrawerBody>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </div>
    )
}