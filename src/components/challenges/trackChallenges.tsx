"use client"
import { CustomButton } from "@/components/custom";
import { ChallengeCard, Loader } from "@/components/shared";
import { searchAtom } from "@/helper/atom/search";
import { userAtom } from "@/helper/atom/user";
import { IChallenge } from "@/helper/model/challenge";
import { ITrack } from "@/helper/model/interest";
import { useFetchData } from "@/hook/useFetchData";
import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader } from "@heroui/react";
import { useAtom } from "jotai";
import { useState } from "react";
import { RiFilter3Line } from "react-icons/ri";

export default function TrackChallenges() {


    const [userState] = useAtom(userAtom);
    const [isOpen, setIsOpen] = useState(false)
    const [search] = useAtom(searchAtom);

    const { data: user } = userState
    const [selected, setSelected] = useState<string[]>([])

    const { data, isLoading } = useFetchData<IChallenge[]>({
        endpoint: "/challenge", name: "challenge" + selected[0], params: {
            userId: user?._id as string,
            tracks: selected?.length > 0 ? [...selected] : [],
            q: search
        }
    })

    const { data: track } = useFetchData<ITrack[]>({ endpoint: "/track/tracks", name: "tracks" })

    return (
        <div className="w-full rounded-2xl bg-white overflow-hidden flex flex-col gap-4 p-4">

            {/* Tabs */}
            <div className=" w-full flex justify-between items-center gap-4" >

                <div className="relative overflow-x-auto scroll-smooth w-full ">
                    <div
                        className="flex gap-4 w-fit pb-2"
                    >
                        <CustomButton onClick={() => setSelected([])} variant={selected?.length > 0 ? "outline" : "primary"} height="35px" fontSize="12px">
                            All
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
                <button onClick={() => setIsOpen(true)} >
                    <RiFilter3Line size={"20px"} />
                </button>
            </div>
            <div className=" w-full grid gap-4 grid-cols-1 lg:grid-cols-3 " >
                <Loader loading={isLoading} >
                    {data?.map((item, index) => {
                        return (
                            <ChallengeCard key={index} data={item} />
                        )
                    })}
                </Loader>
            </div>
            <Drawer isOpen={isOpen} size={"sm"} onClose={() => setIsOpen(false)}>
                <DrawerContent>
                    {() => (
                        <>
                            <DrawerHeader className="flex flex-col gap-1">Filter</DrawerHeader>
                            <DrawerBody>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                                    risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                                    quam.
                                </p>
                                <p>
                                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
                                    adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                                    officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                </p>
                            </DrawerBody>
                            <DrawerFooter>
                                <Button color="danger" variant="light" onPress={() => setIsOpen(false)}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={() => setIsOpen(false)}>
                                    Action
                                </Button>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </div>
    )
}