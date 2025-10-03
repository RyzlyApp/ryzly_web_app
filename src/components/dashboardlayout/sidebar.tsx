"use client"
import { sidebarlink } from "@/helper/utils/databank";
import { CustomImage } from "../custom";
import { usePathname, useRouter } from "next/navigation";
import { userAtom } from "@/helper/atom/user";
import { useAtom } from "jotai";
import { textLimit } from "@/helper/utils/textlimit";
import Cookies from "js-cookie";
import { Avatar, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { RiAddLine, RiInformationLine, RiLogoutCircleLine, RiUser3Line } from "react-icons/ri";
import { useState } from "react";
// import { coachAtom } from "@/helper/atom/coach";

export default function Sidebar() {

    const pathname = usePathname()
    const router = useRouter()
    const [userState] = useAtom(userAtom);
    const [ isOpen, setIsOpen ] = useState(false)
    // const [isCoach] = useAtom(coachAtom);

    const { data: user } = userState;

    const logout =()=>{
        Cookies.remove("accesstoken")
        router.push("/auth")
    }

    const clickHandler = (link: string) => {
        router.push(link)
        setIsOpen(false)
    }

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
                    return (
                        <button onClick={() => router.push(item?.link)} key={index} className={` w-full flex gap-3 rounded-lg h-[48px] cursor-pointer items-center text-white px-2 ${item?.link === pathname ? " bg-neonblue-500 " : "  "} `} >
                            <item.icon size="20px" />
                            <p className=" font-semibold text-sm " >{item?.label}</p>
                        </button>
                    )
                })}
            </div>
            <Popover isOpen={isOpen} onOpenChange={(value) => setIsOpen(value)} showArrow backdrop={"opaque"} offset={10} placement="top">
                <PopoverTrigger>
                    <button className=" w-full h-[58px] py-2 px-3 mt-auto text-white flex gap-2 items-center " >
                        <Avatar className=" w-9 h-9 text-full" src={user?.profilePicture} name={user?.fullName} />
                        <div className=" flex flex-col items-start " >
                            <p className=" font-semibold " >{user?.fullName ? textLimit(user?.fullName + "", 15) : ""}</p>
                            {user?.skills && (
                                <p className=" text-xs " >{user?.username}</p>
                            )}
                        </div>
                    </button>
                </PopoverTrigger>

                <PopoverContent className="w-[330px]">
                    <div className="px-1 py-2 w-full flex flex-col text-black  ">
                        <button className=" w-full h-[58px] px-3 border-b border-b-gray-200 flex gap-2 items-center " >
                            <Avatar className=" w-9 h-9 text-full  text-black  " src={user?.profilePicture} name={user?.fullName} />
                            <div className=" flex flex-col items-start  " >
                                <p className=" font-semibold text-violet-300 " >{user?.fullName ? textLimit(user?.fullName + "", 15) : ""}</p>
                                {user?.skills && (
                                    <p className=" text-xs " >{user?.skills[0]}</p>
                                )}
                            </div>
                        </button>
                        <div className=" border-b border-b-gray-200 flex flex-col w-full">
                            <button onClick={()=> clickHandler("/dashboard/profile")} className=" px-3 h-[45px] gap-2 items-center flex " >
                                <RiUser3Line size={"20px"} />
                                <p className=" font-medium text-violet-300 " >Your Profile</p>
                            </button>
                            <button className=" px-3 h-[45px] gap-2 items-center flex " >
                                <RiInformationLine size={"20px"} />
                                <p className=" font-medium text-violet-300 " >Contact Support</p>
                            </button>
                        </div>
    
                        <div className=" gap-2 py-2 border-b border-b-gray-200 flex flex-col w-full">
                            <p className=" text-xs " >Organization</p>
                            <button className=" px-3 h-[45px] gap-2 text-neonblue-600 items-center flex " >
                                <RiAddLine size={"20px"} />
                                <p className=" font-medium text-violet-300 " >Add an organization</p>
                            </button>
                        </div>
                        <div className=" py-2 " >

                        <button onClick={logout} className=" px-3 h-[45px] gap-2 items-center flex " >
                            <RiLogoutCircleLine size={"20px"} />
                            <p className=" font-medium text-violet-300 " >Logout</p>
                        </button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}