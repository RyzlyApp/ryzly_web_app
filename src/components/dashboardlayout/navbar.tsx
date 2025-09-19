"use client"
import { RiNotification2Line, RiSearchLine, RiVipDiamondLine } from "react-icons/ri";
import { CustomSearch } from "../custom"; 
import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { userActionsAtom, userAtom } from "@/helper/atom/user";
import { textLimit } from "@/helper/utils/textlimit";
import CreateChallengeBtn from "../dashboard/createChallengeBtn";

export default function Navbar() {

    const [userState] = useAtom(userAtom);
    const dispatch = useSetAtom(userActionsAtom);
  
    useEffect(()=> {
        dispatch({type: "fetch"})
    }, [])

    const { data: user } = userState; 
     
    return (
        <div className=" w-full h-[70px] lg:h-[80px] flex justify-between items-center px-5 " >
            <p className=" text-base lg:text-3xl font-bold " >Hello {textLimit(user?.fullName+"", 10)}</p>
            <div className=" flex gap-1 items-center " >
                <RiVipDiamondLine size={"16px"} />
                <p className=" font-medium text-xs flex gap-1 items-center " >0 <span className=" lg:flex hidden " >points available</span></p>
            </div>
            <div className=" flex gap-4 items-center " >
                <div className=" lg:flex hidden w-[250px]  " >
                    <CustomSearch />
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
    )
}