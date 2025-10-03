import { IResourceDetail } from "@/helper/model/challenge";
import { IUser } from "@/helper/model/user";
import { dateFormatHeader } from "@/helper/utils/dateFormat";
import { Avatar } from "@heroui/react";
import { RiThumbUpLine } from "react-icons/ri";
import { CustomImage } from "../custom";

export default function ResourceCard(
    { withImg, item, userInfo }: { withImg?: boolean, item: IResourceDetail, userInfo: IUser }
) {

    return (
        <div className=" w-full flex gap-4 flex-col  " > 
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
            <p>{item?.description}</p>
            {withImg && (
                <div className=" w-full h-[300px] rounded-lg bg-white " >
                    <CustomImage fillContainer className=" rounded-lg " style={{ borderRadius: "8px" }} src={item?.url} alt="resources" />
                </div>
            )}
            <div className=" flex items-center gap-1 text-violet-300 " >
                <RiThumbUpLine size={"12px"} />
                <p className=" text-xs  " >Helpful</p>
            </div>
        </div>

    )
}