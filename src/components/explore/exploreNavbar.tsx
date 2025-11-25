import { usePathname, useRouter } from "next/navigation";
import { CustomButton, CustomImage } from "../custom";
import { useAtom, useSetAtom } from "jotai";
import { userActionsAtom, userAtom } from "@/helper/atom/user";
import { useEffect, useState } from "react";
import { textLimit } from "@/helper/utils/textlimit";
import { Popover, PopoverTrigger, Avatar, user, PopoverContent } from "@heroui/react";
import { PiGearSix, PiGridFourFill } from "react-icons/pi";
import { RiUser3Line, RiInformationLine, RiAddLine, RiLogoutCircleLine, RiMedalLine } from "react-icons/ri";
import { IoChevronDown } from "react-icons/io5";

export default function ExploreChallengeNavbar() {

    const router = useRouter()

    const path = usePathname()

    const linkdata = [
        {
            name: "Challenges",
            link: "/challenges"
        },
        {
            name: "Portfolio",
            link: "/portfolio"
        },
        {
            name: "How to Use",
            link: "/whyrhyzly"
        },
    ]


    const [userState] = useAtom(userAtom);
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useSetAtom(userActionsAtom);

    const logout = () => {
        localStorage.clear()
        router.push("/main")
        if(path?.includes("/main")) {
            router.refresh()
        }
        dispatch({ type: "fetch" });
        setIsOpen(false)
    }

    const { data: user } = userState

    useEffect(() => {
        dispatch({ type: "fetch" });
    }, [dispatch]);


    const clickHandler = (link: string) => {
        router.push(link)
        setIsOpen(false)
    }

    return (
        <div className="w-full max-w-[90%] mx-auto lg:max-w-[80%] px-4 py-5 gap-4 bg-white rounded-3xl shadow flex justify-between items-center">
            <div className=" lg:flex hidden " >
                <CustomImage
                    src="/images/logo.png"
                    alt="logo"
                    width={100}
                    height={40}
                />
            </div>
            <div className=" lg:hidden " >
                <CustomImage
                    src="/images/logo.png"
                    alt="logo"
                    width={90}
                    height={40}
                />
            </div>
            <div className=" hidden lg:flex items-center gap-4 " >
                {linkdata?.map((MenuItem, index) => {
                    return (
                        <button key={index} onClick={() => router.push(MenuItem?.link)} className={` ${path?.includes(MenuItem?.link) ? " text-primary " : ""} font-medium hover:text-primary text-violet- text-sm flex `} >{MenuItem?.name}</button>
                    )
                })}
            </div>
            {!userState.data?._id && (
                <div className="flex gap-4 items-center text-sm">
                    <CustomButton onClick={() => router.push("/auth")} variant="outline" rounded="full" >Login</CustomButton>
                    <CustomButton
                        onClick={() => router.push("/auth/signup")}
                        variant="auth"
                        rounded="full"
                    >
                        Get Started
                    </CustomButton>
                </div>
            )}

            {userState.data?._id && (
                <Popover isOpen={isOpen} onOpenChange={(value) => setIsOpen(value)} showArrow backdrop={"opaque"} offset={10} placement="top">
                    <PopoverTrigger>
                        <button className=" w-fit h-fit border-gray-300 flex gap-2 px-2 py-1 border rounded-full justify-center items-center cursor-pointer " >
                            <Avatar src={user?.profilePicture} className=" w-7 h-7 text-[10px] " name={user?.fullName} />
                            <IoChevronDown />
                        </button>
                    </PopoverTrigger>

                    <PopoverContent className="w-[270px]">
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
                                <button onClick={() => clickHandler(`/dashboard`)} className=" px-3 h-[45px] gap-2 items-center flex " >
                                    <PiGridFourFill size={"20px"} />
                                    <p className=" font-medium text-violet-300 " >Dashboard</p>
                                </button>
                                <button onClick={() => clickHandler(`/dashboard/achievements`)} className=" px-3 h-[45px] gap-2 items-center flex " >
                                    <RiMedalLine size={"20px"} />
                                    <p className=" font-medium text-violet-300 " >Achievements</p>
                                </button>
                                <button onClick={() => clickHandler(`/dashboard/settings`)} className=" px-3 h-[45px] gap-2 items-center flex " >
                                    <PiGearSix size={"20px"} />
                                    <p className=" font-medium text-violet-300 " >Settings</p>
                                </button>
                                <button className=" px-3 h-[45px] gap-2 items-center flex " >
                                    <RiInformationLine size={"20px"} />
                                    <p className=" font-medium text-violet-300 " >Contact Support</p>
                                </button>
                            </div> 
                            <div className=" lg:hidden flex-col pb-0 p-4 flex" >
                                {linkdata?.map((MenuItem, index) => {
                                    return (
                                        <button key={index} onClick={() => router.push(MenuItem?.link)} className={` ${path?.includes(MenuItem?.link) ? " text-primary " : ""} font-medium hover:text-primary h-[45px] text-violet- text-sm flex `} >{MenuItem?.name}</button>
                                    )
                                })}
                            </div>
                            <div className=" pb-2 " >

                                <button onClick={logout} className=" px-3 h-[45px] gap-2 items-center flex " >
                                    <RiLogoutCircleLine size={"20px"} />
                                    <p className=" font-medium text-violet-300 " >Logout</p>
                                </button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            )}
        </div>
    )
}