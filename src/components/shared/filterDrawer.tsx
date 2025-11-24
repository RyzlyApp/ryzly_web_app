"use client"
import { filtersAtom, updateFilterAtom } from "@/helper/atom/filter"
import { ILevel, IIndustry } from "@/helper/model/interest"
import { URLS } from "@/helper/services/urls"
import { convertDataForSelect } from "@/helper/utils/convertDataForSelect"
import { useFetchData } from "@/hook/useFetchData"
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, Checkbox, Input } from "@heroui/react"
import { useAtom } from "jotai"
import { useState } from "react"
import { RiFilter3Line } from "react-icons/ri"

export default function FilterDrawer() {

    const [isOpen, setIsOpen] = useState(false)
    const [filters] = useAtom(filtersAtom);
    const [, updateFilters] = useAtom(updateFilterAtom);

    const { data: level = [] } = useFetchData<ILevel[]>({ name: "level", endpoint: URLS.LEVEL });

    const { data: industry = [] } = useFetchData<IIndustry[]>({ name: "industry", endpoint: URLS.INDUSTRY });



    const filter = [
        {
            title: "Level",
        },
        {
            title: "Industry",
        },
        // {
        //     title: "Participation Fee",
        // },
        // {
        //     title: "Winning Price",
        // },
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

    const leveloptions = convertDataForSelect(level, ["name", "_id"]);
    const industryoptions = convertDataForSelect(industry, ["name", "_id"]);

    return (
        <div className=" w-fit " >
            <button className=" w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center " onClick={() => setIsOpen(true)} >
                <RiFilter3Line size={"20px"} />
            </button>
            <Drawer isOpen={isOpen} size={"sm"} onClose={() => setIsOpen(false)}>
                <DrawerContent>
                    {() => (
                        <>
                            <DrawerHeader className="flex flex-col gap-1">Filter</DrawerHeader>
                            <DrawerBody>

                                <div className=" w-full flex flex-col text-sm gap-5" >
                                    {filter?.map((item, index) => {
                                        return (
                                            <div key={index} className="  w-full flex flex-col gap-4 " >
                                                <div className=" w-full flex items-center justify-between " >
                                                    <p className=" font-semibold " >{item?.title}</p>
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