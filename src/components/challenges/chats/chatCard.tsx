import { CustomImage } from "@/components/custom";
import { AutoLinkMessage } from "@/components/shared";
import { IMessages } from "@/helper/model/chat";
import { dateChatFormat } from "@/helper/utils/dateFormat";
import { isSameDateTime } from "@/helper/utils/issameDataTime";
import { Avatar } from "@heroui/react";


export default function ChatCard(
    { item, self, previousDate }: { item: IMessages, self: boolean, previousDate: string }
) {

    return (
        <div className=" w-full flex flex-col gap-1 items-center " >
            {!isSameDateTime(new Date(previousDate), new Date(item?.createdAt)) && (
                <p className=" text-xs font-medium text-gray-400 mt-2 " >{dateChatFormat(item?.createdAt as string)}</p>
            )}
            <div className={` w-full flex  gap-2`} >
                {!self && (
                    <div className=" w-fit " >
                        <Avatar size="sm" src={item?.sender?.profilePicture} name={item?.sender?.fullName} />
                    </div>
                )}
                <div className={` max-w-[80%] p-2 gap-2 flex flex-col min-w-[50%] rounded-2xl ${self ? " rounded-br-[0px] bg-neonblue-500 ml-auto text-white " : " rounded-tl-[0px] bg-gray-100 "} `} >
                    {!self && (
                        <p className=" text-sm font-bold " >{item?.sender?.fullName}</p>
                    )}
                    <div className=" w-full flex flex-col " >
                        {item?.fileUrls?.length > 0 && (
                            <div className=" w-full h-[150px] " >
                                <CustomImage
                                    src={item?.fileUrls[0]}
                                    alt="blue"
                                    fillContainer
                                    style={{ borderRadius: "8px" }}
                                />
                            </div>
                        )}
                        <AutoLinkMessage text={item?.message} self={self} />
                    </div>
                    {/* {isLink && (
                        <a href={item?.message} target="_blank" className=" text-sm font-medium underline text-neonblue-500 " >{item?.message}</a>
                    )}
                    {!isLink && (
                        <p className=" text-sm font-medium " >{item?.message}</p>
                    )} */}
                </div>
            </div>
        </div>
    )
}