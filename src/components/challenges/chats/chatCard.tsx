import { CustomImage } from "@/components/custom";
import { AutoLinkMessage, ModalLayout } from "@/components/shared";
import { dateFormat, timeFormat } from "@/helper/utils/dateFormat";
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
  // Image preview modal state
  const [imagePreviewOpen, setImagePreviewOpen] = React.useState(false);
  const [imagePreviewSrc, setImagePreviewSrc] = React.useState<string | null>(
    null
  );

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
          !isSameDate(new Date(previousDate), new Date(item?.createdAt))) && (
          <div className="w-full flex justify-center">
            <p className=" text-xs font-medium text-gray-400 mt-2 ">
              {dateFormat(item?.createdAt as string)}
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

        {item.isDeleted && (
          <div
            className={` ${
              isReply ? "max-w-[100%]" : "max-w-[60%]"
            } p-2 gap-2 flex flex-col min-w-[50%] rounded-2xl ${
              self
                ? ` rounded-br-[0px] ${
                    isReply ? "" : "bg-gray-300"
                  } ml-auto text-white `
                : isReply
                ? ""
                : "rounded-tl-[0px] bg-gray-100 "
            } `}
          >
            <div className=" w-full flex flex-col">
              <p className="italic text-xs">Message deleted</p>
            </div>
          </div>
        )}

        {!item?.isDeleted && (
          <div
            className={` ${
              isReply ? "max-w-[100%]" : "max-w-[70%]"
            } p-2 gap-2 flex flex-col ${
              isReply ? "min-w-[100%]" : "min-w-[50%]"
            } rounded-2xl ${
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
                  <p className="italic text-xs mt-1 mr-1 text-right">Reply</p>
                  <ChatCard item={item?.replyMessage} self={self} isReply />
                </div>
              )}
              {item?.files?.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setImagePreviewSrc(item?.files[0]);
                    setImagePreviewOpen(true);
                  }}
                  className=" w-full h-[150px] cursor-zoom-in "
                >
                  <CustomImage
                    src={item?.files[0]}
                    alt="attachment"
                    fillContainer
                    style={{ borderRadius: "8px" }}
                  />
                </button>
              )}
              <AutoLinkMessage text={item?.message} self={self} />
            </div>
            {/* Timestamp footer */}
            <div className="w-full flex justify-end">
              <span
                className={`text-[10px] mt-1 ${
                  self ? "text-white/80" : "text-gray-500"
                }`}
              >
                {timeFormat(item?.createdAt as string)}
              </span>
            </div>
          </div>
        )}
        {active && !isReply && !item.isDeleted && (
          <>
            <div className="flex justify-center items-center">
              {!item.replyMessage && (
                <MessageSquareReply
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => {
                    setReply(item);
                  }}
                />
              )}
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

      {/* Image preview modal */}
      <ModalLayout
        isOpen={imagePreviewOpen}
        onClose={() => setImagePreviewOpen(false)}
        size="xl"
      >
        <div className="w-full">
          {imagePreviewSrc && (
            <img
              src={imagePreviewSrc}
              alt="image preview"
              className="w-auto h-auto object-contain rounded-lg mx-auto"
            />
          )}
        </div>
      </ModalLayout>
    </div>
  );
}
