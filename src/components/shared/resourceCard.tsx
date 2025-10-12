import { IResourceDetail } from "@/helper/model/challenge";
import { IUser } from "@/helper/model/user";
import { dateFormatHeader } from "@/helper/utils/dateFormat";
import { Avatar } from "@heroui/react";
import { RiDeleteBin6Line, RiEdit2Line, RiThumbUpLine } from "react-icons/ri";
import { CustomImage } from "../custom";
import { useState } from "react";
import { coachAtom } from "@/helper/atom/coach";
import { useAtom } from "jotai";
import { DeleteModal, EditModal } from "../challenges";

export default function ResourceCard(
    { withImg, item, userInfo }: { withImg?: boolean, item: IResourceDetail, userInfo: IUser }
) {

    const [isOpen, setIsOpen] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isCoach] = useAtom(coachAtom);

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>, taskID: string, type: "edit" | "delete") => {
        e.stopPropagation() 
        if(type === "edit") {
            setIsOpenEdit(true)
        } else {
            setIsOpen(true)
        }
    }

    return (
        <div className=" w-full flex gap-4 flex-col rounded-2xl shadow p-4 " >
            <div className=" w-full flex items-center justify-between " >
                <div className=" flex gap-2 items-center " >
                    <Avatar src={userInfo?.profilePicture} name={userInfo?.fullName} />
                    <div className=" flex flex-col " >
                        <div className=" flex items-center gap-1 " >
                            <p className=" text-sm font-semibold " >{userInfo?.fullName}</p>
                            <div className=" px-2 rounded-full bg-neonblue-600 text-white font-semibold h-[18px] flex justify-center items-center text-xs " >
                                Coach
                            </div>
                        </div>
                        <p className=" text-violet-300 text-xs " >{userInfo?.track}</p>
                    </div>
                </div>
                <p className=" text-xs font-medium text-violet-300 " >{dateFormatHeader(item?.createdAt)}</p>
            </div>
            {/* <p>{item?.description}</p> */}
            <div className=" text-sm " dangerouslySetInnerHTML={{ __html: item?.description }} />
            {(withImg && item?.url) && (
                <div className=" w-full h-[300px] rounded-lg bg-white " >
                    <CustomImage fillContainer className=" rounded-lg " style={{ borderRadius: "8px" }} src={item?.url} alt="resources" />
                </div>
            )}
            <div className=" flex items-center justify-between w-full gap-1 text-violet-300 " >
                <div className=" flex gap-1 items-center " > 
                    <RiThumbUpLine size={"12px"} />
                    <p className=" text-xs  " >Helpful</p>
                </div>

                {isCoach && (
                    <div className=" flex gap-3 " >
                        <button onClick={(e) => clickHandler(e, item?._id, "delete")} >
                            <RiDeleteBin6Line className=" text-red-600 " size={"20px"} />
                        </button>
                        <button onClick={(e) => clickHandler(e, item?._id, "edit")} >
                            <RiEdit2Line className=" text-neonblue-600 " size={"20px"} />
                        </button>
                    </div>
                )}
            </div> 
            <DeleteModal type="resource" isOpen={isOpen} onClose={setIsOpen} id={item?._id} />
            <EditModal type="resource" isOpen={isOpenEdit} onClose={setIsOpenEdit} id={item?._id as string} taskID={item?._id} />
        </div> 
    )
}