"use client"
import { sidebarlink } from "@/helper/utils/databank";
import { CustomImage } from "../custom";
import { usePathname, useRouter } from "next/navigation";
import { userAtom } from "@/helper/atom/user";
import { useAtom } from "jotai";
import { textLimit } from "@/helper/utils/textlimit";

export default function Sidebar() {

    const pathname = usePathname() 
    const router = useRouter()
    const [userState] = useAtom(userAtom);

    const { data: user } = userState; 
     
    return (
        <div className=" w-[280px] bg-violet-500 h-screen p-5 flex flex-col " >
            <div className=" w-full h-[78px] " >
                <CustomImage
                    src="/images/logowhite.png"
                    alt="logo"
                    width={140}
                    height={40}
                    className="w-[140px] h-auto"
                />
            </div>
            <div className=" w-full flex flex-col py-3 " >
                {sidebarlink?.map((item, index) => {
                    return(
                        <button onClick={()=> router.push(item?.link)} key={index} className={` w-full flex gap-3 rounded-lg h-[48px] cursor-pointer items-center text-white px-2 ${item?.link === pathname ? " bg-neonblue-500 " : "  "} `} >
                            <item.icon size="20px" />
                            <p className=" font-semibold text-sm " >{item?.label}</p>
                        </button>
                    )
                })}
            </div>
            <div className=" w-full h-[58px] py-2 px-3 mt-auto text-white flex gap-2 items-center " >
                <div className=" w-9 h-9 bg-amber-500 rounded-full " />
                <div className=" flex flex-col " >
                    <p className=" font-semibold " >{textLimit(user?.fullName+"", 15)}</p>
                    <p className=" text-xs " >{user?.skills[0]}</p>
                </div>
            </div>
        </div>
    )
}