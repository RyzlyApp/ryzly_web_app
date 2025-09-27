"use client"
import { RiNotification2Line, RiSearchLine } from "react-icons/ri";
import { CustomSearch } from "../custom";
import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { userActionsAtom, userAtom } from "@/helper/atom/user";
import { textLimit } from "@/helper/utils/textlimit";
import { Avatar } from "@heroui/react";

export default function AdminNavbar() {
    const [userState] = useAtom(userAtom);
    const dispatch = useSetAtom(userActionsAtom);

    useEffect(() => {
        dispatch({ type: "fetch" })
    }, [dispatch])

    const { data: user } = userState;

    return (
        <div className=" w-full h-[70px] lg:h-[80px] flex justify-between items-center px-5 " >
            <p className=" text-base lg:text-3xl font-bold " >Dashboard</p>
            <div className=" flex gap-4 items-center " >
                <div className=" lg:flex hidden w-[250px]  " >
                    <CustomSearch />
                </div>
                <button className=" lg:hidden flex cursor-pointer " >
                    <RiSearchLine size={"17px"} />
                </button>
                <button className=" cursor-pointer " >
                    <RiNotification2Line size={"17px"} />
                </button>
                <Avatar className=" w-9 h-9 text-full" src={user?.profilePicture} name={user?.fullName} />
            </div>
        </div>
    )
}
