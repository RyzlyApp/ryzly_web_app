"use client"
import { RiArrowLeftLine, RiDeleteBin6Line, RiEdit2Line, RiEyeOffLine, RiFlagLine, RiGroupLine, RiLoginBoxLine, RiMore2Fill, RiShare2Line } from "react-icons/ri";
import AddTasksBtn from "./addBtn/addTasksBtn";
import { useParams, usePathname, useRouter } from "next/navigation";
import { coachAtom } from "@/helper/atom/coach";
import { useAtom } from "jotai";
import AddResourcesBtn from "./addBtn/addResourcesBtn";
import { Button, Dropdown, DropdownItem, DropdownTrigger, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { addToast } from "@heroui/toast"
import { DropdownMenu } from "@heroui/react";
import { useState } from "react";
import { AddCoachForm } from "../forms";
import { ReportChallengeModal, EditModal, DeleteModal } from "./modals";
import { loadingChallenge } from "@/helper/atom/loadingChallenge";
import { CustomImage } from "../custom";

export default function ChallengeNavbar() {

    const router = useRouter()
    const [isCoach] = useAtom(coachAtom);

    const [loading] = useAtom(loadingChallenge);

    const [isOpen, setIsOpen] = useState(false)
    const [isOpenReport, setIsOpenReport] = useState(false)
    const [isOpenCoach, setIsOpenCoach] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const pathname = usePathname()

    const param = useParams();
    const id = param.id;

    const shareUrl = `/challenges/${id}/opengraph`;

    const shareTo = (platform: "twitter" | "facebook" | "linkedin" | "whatsapp" | "copy") => {
        const encodedUrl = encodeURIComponent(shareUrl);
        const text = encodeURIComponent("Check out this challenge!");
      
        const links = {
          twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`,
          facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
          linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
          whatsapp: `https://wa.me/?text=${text}%20${encodedUrl}`,
        };
      
        if (platform === "copy") {
          navigator.clipboard.writeText(shareUrl);
          
          addToast({ 
            description: "Copied",
            color: "primary", 
        })
          return;
        }
      
        window.open(links[platform], "_blank", "noopener,noreferrer");
      };

    const backHandler = () => {
        if (pathname?.includes("/dashboard/challenges/create/")) {
            router.back()
        } else if (pathname?.includes("challenges") && !pathname?.includes("task") && !pathname?.includes("grading") && !pathname?.includes("submission")) {
            router.push(`/dashboard/challenges`)
        } else if (pathname?.includes("task") && !pathname?.includes("grading") && !pathname?.includes("submission")) {
            router.push(`/dashboard/challenges/${id}`)
        } else {
            router.back()
        }
    }

    return (
        <div className=" w-full h-[70px] lg:h-[80px] flex justify-between items-center px-5 " >
            <button onClick={backHandler} className=" flex gap-4 items-center " >
                <RiArrowLeftLine size={"20px"} className=" text-violet-500" />
                {pathname?.includes("/dashboard/challenges/create") && (
                    <p className=" font-bold " >{pathname?.includes("edit") ? "Edit" : "Create"} Challenges</p>
                )}
                {pathname?.includes("create-task") && (
                    <p className=" font-bold " >{pathname?.includes("edit") ? "Create Task" : "Edit Task"}</p>
                )}
                {pathname?.includes("portfolio") && (
                    <p className=" font-bold " >Add Portfolio</p>
                )}
            </button>
            {(!pathname?.includes("/dashboard/challenges/create") && !pathname?.includes("create-task") && !pathname?.includes("portfolio") && !loading) && (
                <div className=" flex gap-3 items-center " >
                    {isCoach && (
                        <div className=" lg:flex hidden gap-3 " >
                            <AddResourcesBtn />
                            <AddTasksBtn height="36px" variant="primary" />
                        </div>
                    )}
                    {isCoach && (
                        <AddTasksBtn mobile={true} />
                    )}
                    {/* <button onClick={() => copyHandler()} className=" text-blue-900 px-2 " >
                        <RiShare2Line size={"20px"} />
                    </button> */}


                    <Popover placement="bottom-end" showArrow={true}>
                        <PopoverTrigger>
                            <button className=" text-blue-900 px-2 " >
                                <RiShare2Line size={"20px"} />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className=" flex flex-col gap-3 items-center p-2 " >
                                <p className=" text-sm font-semibold " >Share to</p>
                                <div className=" flex gap-3 pb-2 items-center " >
                                    <button onClick={()=> shareTo("twitter")} className=" w-10 h-10 " >
                                        <CustomImage src={"/social/twitter.png"} alt="twitter" fillContainer />
                                    </button>
                                    <button onClick={()=> shareTo("facebook")} className=" w-10 h-10 " >
                                        <CustomImage src={"/social/facebook.png"} alt="facebook" fillContainer />
                                    </button>
                                    <button onClick={()=> shareTo("linkedin")} className=" w-10 h-10 " >
                                        <CustomImage src={"/social/linkedin.png"} alt="linkedin" fillContainer />
                                    </button>
                                    {/* <button onClick={()=> shareTo("twitter")} className=" w-10 h-10 " >
                                        <CustomImage src={"/social/instagram.png"} alt="instagram" fillContainer />
                                    </button> */}
                                    <button onClick={()=> shareTo("whatsapp")} className=" w-10 h-10 " >
                                        <CustomImage src={"/social/whatsapp.png"} alt="whatsapp" fillContainer />
                                    </button>
                                    <button onClick={()=> shareTo("copy")} className=" w-10 h-10 " >
                                        <CustomImage src={"/social/copy.png"} alt="copy" fillContainer />
                                    </button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>

                    {/* <Dropdown  >
                        <DropdownTrigger>
                            <button className=" text-blue-900 px-2 " >
                                <RiShare2Line size={"20px"} />
                            </button>
                        </DropdownTrigger>
                        <DropdownMenu className=" flex gap-3 " >
                            <DropdownItem className=" lg:flex hidden " onClick={() => setIsOpenEdit(true)} key={"what"} >
                                <button className=" w-10 h-10 " >
                                    <CustomImage src={"/social/whatsapp.png"} alt="whatsapp" fillContainer />
                                </button>
                            </DropdownItem>
                            <DropdownItem className=" lg:flex hidden " onClick={() => setIsOpenEdit(true)} key={"what"} >
                                <button className=" w-10 h-10 " >
                                    <CustomImage src={"/social/whatsapp.png"} alt="whatsapp" fillContainer />
                                </button>
                            </DropdownItem>
                            <DropdownItem className=" lg:flex hidden " onClick={() => setIsOpenEdit(true)} key={"what"} >
                                <button className=" w-10 h-10 " >
                                    <CustomImage src={"/social/whatsapp.png"} alt="whatsapp" fillContainer />
                                </button>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown> */}
                    {isCoach && (
                        <Dropdown  >
                            <DropdownTrigger>
                                <button className=" text-violet-500 px-2 " >
                                    <RiMore2Fill size={"20px"} />
                                </button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem className=" lg:flex hidden " onClick={() => setIsOpenEdit(true)} key="edit"
                                    startContent={<RiEdit2Line size={"20px"} />} >
                                    <p className=" text-sm font-medium " >Edit</p>
                                </DropdownItem>
                                <DropdownItem className=" lg:hidden " onClick={() => router.push(`/dashboard/challenges/create/${id}/edit`)} key="edit-mobile"
                                    startContent={<RiEdit2Line size={"20px"} />} >
                                    <p className=" text-sm font-medium " >Edit</p>
                                </DropdownItem>
                                {/* <DropdownItem onClick={() => setIsOpenCoach(true)} key="add"
                                    startContent={<RiGroupLine size={"20px"} />} >
                                    <p className=" text-sm font-medium " >Add coach</p>
                                </DropdownItem> */}
                                <DropdownItem key="unpublish"
                                    startContent={<RiEyeOffLine size={"20px"} />} >
                                    <p className=" text-sm font-medium " >Unpublish</p>
                                </DropdownItem>
                                <DropdownItem onClick={() => setIsOpen(true)} key="delete"
                                    startContent={<RiDeleteBin6Line size={"20px"} />}>
                                    <p className=" text-sm font-medium " >Delete</p>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    )}
                    {!isCoach && (
                        <Dropdown  >
                            <DropdownTrigger>
                                <button className=" text-violet-500 px-2 " >
                                    <RiMore2Fill size={"20px"} />
                                </button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem onClick={() => setIsOpenReport(true)} key="unpublish"
                                    startContent={<RiFlagLine size={"20px"} />} >
                                    <p className=" text-sm font-medium " >Report</p>
                                </DropdownItem>
                                {/* <DropdownItem onClick={() => setIsOpenCoach(true)} key="add"
                                    startContent={<RiLoginBoxLine size={"20px"} />} >
                                    <p className=" text-sm font-medium " >Leave</p>
                                </DropdownItem> */}
                            </DropdownMenu>
                        </Dropdown>
                    )}
                </div>
            )}
            <DeleteModal isOpen={isOpen} id={id as string} type="challenge" onClose={setIsOpen} />
            <AddCoachForm isOpen={isOpenCoach} setIsCoach={setIsOpenCoach} />
            <EditModal isOpen={isOpenEdit} id={id as string} type="challenge" onClose={setIsOpenEdit} />
            <ReportChallengeModal isOpen={isOpenReport} onClose={setIsOpenReport} />
        </div>

    )
}