import { CustomImage } from "@/components/custom";
import { AutoLinkMessage } from "@/components/shared";
import { dateFormat } from "@/helper/utils/dateFormat";
import { isSameDate } from "@/helper/utils/issameDataTime";
import { Avatar } from "@heroui/react";
import { useRouter } from "next/navigation";
import { MessageSquareReply, Trash2 } from "lucide-react";
import React from "react";
import useChatHook from "@/modules/chat-module/hooks/useChatHook";
import { MessageModel } from "@/modules/chat-module/models/Message-model";

export default function ChatCard({
  item,
  self,
  previousDate,
  isReply = false,
}: {
  item: MessageModel;
  self: boolean;
  previousDate?: string;
  isReply?: boolean;
}) {
  const router = useRouter();
  const [active, setActive] = React.useState(false);
  const { setReply, deleteChatById } = useChatHook();

  return (
    <div
      className={`w-full flex flex-col gap-1 items-center ${
        self ? "items-end" : "items-start"
      }`}
      onMouseOver={() => setActive(true)}
      onMouseOut={() => setActive(false)}
    >
      {!isReply &&
        (!previousDate ||
          !isSameDate(new Date(previousDate), new Date(item?.updatedAt))) && (
          <div className="w-full flex justify-center">
            <p className=" text-xs font-medium text-gray-400 mt-2 ">
              {dateFormat(item?.updatedAt as string)}
            </p>
          </div>
        )}

      <div
        className={` w-full flex items-start  gap-2 mb-4 ${
          self ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {!self && !isReply && (
          <button
            onClick={() =>
              router.push(`/dashboard/profile/${item?.sender?._id}`)
            }
            className=" w-fit "
          >
            <Avatar
              size="sm"
              src={item?.sender?.profilePicture}
              name={item?.sender?.fullName}
            />
          </button>
        )}

        <div
          className={` ${
            isReply ? "max-w-[100%]" : "max-w-[60%]"
          } p-2 gap-2 flex flex-col min-w-[30%] rounded-2xl ${
            self
              ? ` rounded-br-[0px] ${
                  isReply ? "" : "bg-neonblue-500"
                } ml-auto text-white `
              : isReply
              ? ""
              : "rounded-tl-[0px] bg-gray-100 "
          } `}
        >
          {!self && !isReply && (
            <p className=" text-sm font-bold ">{item?.sender?.fullName}</p>
          )}
          <div className=" w-full flex flex-col">
            {item.replyMessage && (
              <div
                className={`w-full min-h-[60px] max-h-auto  rounded-md mb-5 ${
                  self ? "bg-neonblue-200" : "bg-gray-300"
                }`}
              >
                <ChatCard item={item?.replyMessage} self={self} isReply />
              </div>
            )}
            {item?.files?.length > 0 && (
              <div className=" w-full h-[150px] ">
                <CustomImage
                  src={item?.files[0]}
                  alt="blue"
                  fillContainer
                  style={{ borderRadius: "8px" }}
                />
              </div>
            )}
            <AutoLinkMessage text={item?.message} self={self} />
          </div>
        </div>
        {active && !isReply && (
          <>
            <div className="flex justify-center items-center">
              <MessageSquareReply
                className="w-5 h-5 cursor-pointer"
                onClick={() => {
                  setReply(item);
                }}
              />
              {self && (
                <Trash2
                  className="w-5 h-5 ml-3 text-red-400 cursor-pointer"
                  onClick={() => {
                    console.log(item);
                    deleteChatById(item._id);
                  }}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
