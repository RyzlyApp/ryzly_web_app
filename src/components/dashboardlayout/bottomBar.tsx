import { userAtom } from "@/helper/atom/user";
import { bottombarlink } from "@/helper/utils/databank";
import { textLimit } from "@/helper/utils/textlimit";
import { Avatar, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiUser3Line, RiInformationLine, RiAddLine, RiLogoutCircleLine } from "react-icons/ri";
import Cookies from "js-cookie";

export default function BottomBar() {

    const [userState] = useAtom(userAtom);
    const { data: user } = userState;

    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)

    const logout =()=>{
        Cookies.remove("accesstoken")
        router.push("/auth")
    }

    const clickHandler = (link: string) => {
        router.push(link)
        setIsOpen(false)
    }

    return (
        <div className=" h-[56px] w-full flex justify-between items-center " >
            {bottombarlink?.map((item, index) => {
                if (item?.label === "Profile") {
                    return (
                        <Popover isOpen={isOpen} onOpenChange={(value) => setIsOpen(value)} showArrow backdrop={"opaque"} offset={10} placement="top">
                            <PopoverTrigger>
                                <button key={index} className=" w-full h-full flex flex-col justify-center items-center cursor-pointer " >
                                    {item?.label !== "Profile" && (
                                        <item.icon size={"24px"} />
                                    )}
                                    {item?.label === "Profile" && (
                                        <Avatar src={user?.profilePicture} size="sm" name={user?.fullName} />
                                    )}
                                    <p className=" text-[10px] " >{item?.label}</p>
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
                                        <button onClick={() => clickHandler(`/dashboard/profile/${user?._id}`)} className=" px-3 h-[45px] gap-2 items-center flex " >
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
                    )
                } else {
                    return (
                        <button onClick={() => router.push(item?.link === "/dashboard/profile" ? `/dashboard/profile/${user?._id}` : item?.link)} key={index} className=" w-full h-full flex flex-col justify-center items-center cursor-pointer " >
                            {item?.label !== "Profile" && (
                                <item.icon size={"24px"} />
                            )}
                            {item?.label === "Profile" && (
                                <Avatar src={user?.profilePicture} size="sm" name={user?.fullName} />
                            )}
                            <p className=" text-[10px] " >{item?.label}</p>
                        </button>
                    )
                }
            })}

        </div>
    )
}