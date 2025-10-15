import { Drawer, DrawerContent, DrawerHeader, DrawerBody, Checkbox } from "@heroui/react"
import { useState } from "react"
import { RiFilter3Line } from "react-icons/ri"

export default function FilterDrawer() {

    const [isOpen, setIsOpen] = useState(false)
    const filter = [
        {
            title: "Level",
            list: [
                {
                    name: "Newbie"
                },
                {
                    name: "Beginner"
                },
                {
                    name: "Mid Level"
                },
                {
                    name: "Advanced"
                },
            ]
        },
        {
            title: "Track/Path",
            list: [
                {
                    name: "Product Management"
                },
                {
                    name: "Software Engineering"
                },
                {
                    name: "Product Design"
                },
                {
                    name: "Data Analysis"
                },
            ]
        },
        {
            title: "Period",
            list: [
                {
                    name: "Oldest"
                },
                {
                    name: "Newest"
                },
                {
                    name: "Trending"
                }
            ]
        },
        {
            title: "Type",
            list: [
                {
                    name: "Premium"
                },
                {
                    name: "Free"
                },
            ]
        },
        {
            title: "Industry",
            list: [
                {
                    name: "FinTech"
                },
                {
                    name: "EdTech"
                },
                {
                    name: "HealthTech"
                },
                {
                    name: "RealTech"
                },
            ]
        },
    ]

    return (
        <div>
            <button className=" w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center " onClick={() => setIsOpen(true)} >
                <RiFilter3Line size={"20px"} />
            </button>
            <Drawer isOpen={isOpen} size={"sm"} onClose={() => setIsOpen(false)}>
                <DrawerContent>
                    {() => (
                        <>
                            <DrawerHeader className="flex flex-col gap-1">Filter</DrawerHeader>
                            <DrawerBody>
                                <div className=" w-full flex flex-col gap-5 " >
                                    {filter?.map((item, index) => {
                                        return (
                                            <div key={index} className="  w-full flex flex-col gap-4 " >
                                                <div className=" w-full flex items-center justify-between " >
                                                    <p className=" text-xl font-semibold " >{item?.title}</p>
                                                    <p className=" text-neonblue-600 font-medium " >Reset</p>
                                                </div>
                                                <div className=" w-full flex flex-col gap-3 " >
                                                    {item?.list?.map((item, index) => {
                                                        return (
                                                            <div key={index} className=" flex items-center " >
                                                                <Checkbox />
                                                                <p className=" font-medium " >{item?.name}</p>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
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