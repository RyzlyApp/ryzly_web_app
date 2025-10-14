"use client"
import { RiNotification2Line, RiSearchLine, RiVipDiamondLine } from "react-icons/ri";
import { CustomSearch } from "../custom";
import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { userActionsAtom, userAtom } from "@/helper/atom/user";
import { textLimit } from "@/helper/utils/textlimit";
import CreateChallengeBtn from "../dashboard/createChallengeBtn";
import { usePathname } from "next/navigation";
import { ChallengeNavbar } from "../challenges";
import { searchAtom } from "@/helper/atom/search";

export default function Navbar() {

    const [userState] = useAtom(userAtom);
    const dispatch = useSetAtom(userActionsAtom);
    const [search, setSearch] = useAtom(searchAtom);

    useEffect(() => {
        dispatch({ type: "fetch" })
    }, [dispatch])

    const { data: user } = userState; 

    useEffect(() => {
        setSearch("")
    }, [setSearch])

    const pathname = usePathname()

    return (
        <>
            {!pathname?.includes("/dashboard/challenges/") && (
                <div className=" w-full h-[70px] lg:h-[80px] flex justify-between items-center px-5 " >
                    <p className=" text-base lg:text-3xl font-bold " >Hello {user?.fullName ? textLimit(user?.fullName + "", 10) : ""}</p>
                    <div className=" flex gap-1 items-center " >
                        <RiVipDiamondLine size={"16px"} />
                        <p className=" font-medium text-xs flex gap-1 items-center " >{user?.ryzlyPoints} <span className=" lg:flex hidden " >points available</span></p>
                    </div>
                    <div className=" flex gap-4 items-center " >
                        <div className=" lg:flex hidden w-[250px]  " >
                            <CustomSearch value={search} onClear={()=> setSearch("")} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        <button className=" lg:hidden flex cursor-pointer " >
                            <RiSearchLine size={"17px"} />
                        </button>
                        <CreateChallengeBtn />
                        <button className=" cursor-pointer " >
                            <RiNotification2Line size={"17px"} />
                        </button>
                    </div>
                </div>
            )}
            {pathname?.includes("/dashboard/challenges/") && (
                <ChallengeNavbar />
            )}
        </>
    )
}