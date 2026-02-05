"use client"
import { sidebarlink } from "@/helper/utils/databank";
import { CustomImage } from "../custom";
import { usePathname, useRouter } from "next/navigation";
import { userAtom } from "@/helper/atom/user";
import { useAtom } from "jotai";
import { textLimit } from "@/helper/utils/textlimit";
import { Avatar, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { RiAddLine, RiInformationLine, RiLogoutCircleLine, RiUser3Line } from "react-icons/ri";
import { useState } from "react";
import { IUser } from "@/helper/model/user"; 
import useOrganisation from "@/hook/useOrganisation";
import { ModalLayout } from "../shared";
import { ApplicationForm, OrganisationForm } from "../forms";
import useChallenge from "@/hook/useChallenge";
import CoachDetails from "../shared/coachDetails";
// import { coachAtom } from "@/helper/atom/coach";

export default function Sidebar() {

    const pathname = usePathname()
    const router = useRouter()
    const [userState, setUser] = useAtom(userAtom);
    const { isOpen: open, setIsOpen: setOpen, formik, image, setImage, isLoading } = useOrganisation()
    const { applyForCoach, formik: formikApplication, isOpen: show, setIsOpen: setShow, tab, setTab } = useChallenge()
    const [isOpen, setIsOpen] = useState(false)
    // const [isCoach] = useAtom(coachAtom);

    const { data: user } = userState;

    const logout = () => {
        localStorage.clear()
        setUser({
            ...userState,
            data: {} as IUser
        })
        router.push("/main")
    }

    const clickHandler = (link: string) => {
        router.push(link)
        setIsOpen(false)
    }

    const openHandler = () => {
        setOpen(true)
        setIsOpen(false)
    }

    return (
        <div className=" w-[280px] bg-violet-500 h-screen p-5 flex flex-col " >
            <button onClick={() => router.push("/")} className=" w-full h-[78px] " >
                <CustomImage
                    src="/ryzlyLogo.png"
                    alt="logo"
                    width={140}
                    height={40}
                    className="w-[140px] h-auto"
                />
            </button>
            <div className=" w-full flex flex-col py-3 " >
                {sidebarlink?.map((item, index) => {
                    if (index === 0) {
                        return (
                            <button onClick={() => router.push(item?.link)} key={index} className={` w-full flex gap-3 rounded-lg h-[48px] cursor-pointer items-center text-white px-2 ${item?.link === pathname ? " bg-neonblue-500 " : "  "} `} >
                                <item.icon size="20px" />
                                <p className=" font-semibold text-sm " >{item?.label}</p>
                            </button>
                        )
                    } else {
                        return (
                            <button onClick={() => router.push(item?.link)} key={index} className={` w-full flex gap-3 rounded-lg h-[48px] cursor-pointer items-center text-white px-2 ${pathname?.includes(item?.link) ? " bg-neonblue-500 " : "  "} `} >
                                <item.icon size="20px" />
                                <p className=" font-semibold text-sm " >{item?.label}</p>
                            </button>
                        )
                    }
                })}
            </div>
            <Popover isOpen={isOpen} onOpenChange={(value) => setIsOpen(value)} showArrow backdrop={"opaque"} offset={10} placement="top">
                <PopoverTrigger>
                    <button className=" w-full h-[58px] py-2 px-3 mt-auto text-white flex gap-2 items-center " >
                        <Avatar className=" w-9 h-9 text-full" src={user?.profilePicture} name={user?.firstName} />
                        <div className=" flex flex-col items-start " >
                            <p className=" font-semibold " >{user?.firstName ? textLimit(user?.firstName + " " + user?.lastName + "", 15) : ""}</p>
                            {user?.skills && (
                                <p className=" text-xs " >{user?.username}</p>
                            )}
                        </div>
                    </button>
                </PopoverTrigger>

                <PopoverContent className="w-[330px]">
                    <div className="px-1 py-2 w-full flex flex-col text-black  ">
                        <button className=" w-full h-[58px] px-3 border-b border-b-gray-200 flex gap-2 items-center " >
                            <Avatar className=" w-9 h-9 text-full  text-black  " src={user?.profilePicture} name={user?.firstName + " " + user?.lastName} />
                            <div className=" flex flex-col items-start  " >
                                <p className=" font-semibold text-violet-300 " >{user?.firstName ? textLimit(user?.firstName + " " + user?.lastName + "", 15) : ""}</p>
                                {user?.skills && (
                                    <p className=" text-xs " >{user?.skills[0]}</p>
                                )}
                            </div>
                        </button>
                        <div className=" border-b border-b-gray-200 pb-2 flex flex-col w-full">
                            <button onClick={() => clickHandler(`/dashboard/profile/${user?._id}`)} className=" px-3 w-full  h-[45px] gap-2 items-center flex " >
                                <RiUser3Line size={"20px"} />
                                <p className=" font-medium text-violet-300 " >Your Profile</p>
                            </button>
                            <a
                                href="mailto:ryzlyapps@gmail.com"
                                className="px-3 h-[45px] gap-2 items-center w-full flex"
                            >
                                <RiInformationLine size="20px" />
                                <p className="font-medium text-violet-300">Contact Support</p>
                            </a>
                            {!user?.isCoach && (
                                <button onClick={() => { setShow(true), setIsOpen(false) }} className=" px-3 w-full hidden h-[45px] gap-2 items-center lg:flex " >
                                    <RiAddLine size={"20px"} />
                                    <p className=" font-medium text-violet-300 " >Become A Coach</p>
                                </button>
                            )}
                            {!user?.isCoach && (
                                <button onClick={() => router.push("/dashboard/challenges/create")} className=" px-3 w-full lg:hidden h-[45px] gap-2 items-center flex " >
                                    <RiAddLine size={"20px"} />
                                    <p className=" font-medium text-violet-300 " >Become A Coach</p>
                                </button>
                            )}
                        </div>

                        <div className=" gap-2 py-2 border-b border-b-gray-200 flex flex-col w-full">
                            <p className=" text-xs " >Organization</p>
                            <button onClick={openHandler} className=" lg:flex hidden items-center gap-3 text-neonblue-600 " >
                                <div className=" w-8 h-8 rounded-full flex justify-center items-center bg-neonblue-50 " >
                                    <RiAddLine size={"18px"} />
                                </div>
                                <p className=" font-medium text-violet-300 " >Add an organization</p>
                            </button>
                        </div>
                        <div className=" py-2 " >

                            <button onClick={logout} className=" px-3 h-[45px] w-full gap-2 items-center flex " >
                                <RiLogoutCircleLine size={"20px"} />
                                <p className=" font-medium text-violet-300 " >Logout</p>
                            </button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>


            <ModalLayout title="Become A Coach" isOpen={show} onClose={() => setShow(false)} >
                <div className="w-full flex flex-col gap-4 items-center">
                    {tab === 0 && (
                        <CoachDetails setTab={setTab} />
                    )}
                    {tab === 1 && (
                        <ApplicationForm isLoading={applyForCoach.isPending} formik={formikApplication} />
                    )}
                </div>
            </ModalLayout>

            <ModalLayout title="Add Organization" isOpen={open} onClose={() => setOpen(false)} >
                <div className="w-full flex flex-col gap-4 items-center">
                    <OrganisationForm formik={formik} isLoading={isLoading} image={image} setImage={setImage} />
                </div>
            </ModalLayout>
        </div>
    )
}