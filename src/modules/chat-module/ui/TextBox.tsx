import { Button, Input, Textarea } from "@heroui/react";
import React, { useRef } from "react";
import { Image as ImageIcon, Send, CircleX } from "lucide-react";
import useChatHook from "../hooks/useChatHook";
import Image from "next/image";

function TextBox() {
  const {
    selectedFile,
    setSelectedFile,
    message,
    setMessage,
    sendMessage,
    reply,
    setReply,
  } = useChatHook();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleOnSelected = (files: FileList | []) => {
    console.log(files);
    Array.from(files).forEach((file) => {
      const tempUrl = URL.createObjectURL(file);
      console.log(tempUrl);
      setSelectedFile((prev) => [...prev, file]);
    });
  };

  const handleSendmessage = () => {
    sendMessage();
  };
  return (
    <div className="w-full flex items-center h-auto flex-col min-h-[50px] max-h-[500px]">
      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={(e) => handleOnSelected(e.target.files || [])}
      />
      {selectedFile.length > 0 && (
        <div className="flex items-center w-full h-[100px] overflow-y-hidden overflow-x-auto relative">
          {selectedFile.length > 0 &&
            selectedFile.map((item, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(item)}
                  className="w-[90px] h-[90px] mr-3 rounded-md"
                  alt="selected image"
                />
                <CircleX
                  className="text-red-300 absolute top-[-5px] z-10 right-1 cursor-pointer"
                  onClick={() => setSelectedFile([])}
                />
              </div>
            ))}
        </div>
      )}
      {reply !== null && (
        <div className="w-full flex h-[60px] px-3 mb-2">
          <div className="flex bg-gray-200 px-3 rounded-md w-full justify-start items-center relative flex-wrap">
            {reply.files?.length > 0 && (
              <div className="w-[30px] h-[30px] mr-3">
                <Image
                  src={reply.files[0]}
                  alt={reply.message}
                  width={30}
                  height={30}
                  className="w-full h-full rounded-md"
                />
              </div>
            )}
            <p className="text-sm font-medium">
              {reply.message?.length > 40
                ? reply?.message?.substring(0, 40) + "..."
                : reply.message}
            </p>
            <CircleX
              className="text-red-300 absolute top-[-8px] z-10 right-[-8] cursor-pointer"
              onClick={() => setReply(null)}
            />
          </div>
        </div>
      )}
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        minRows={1}
        maxRows={3}
        className="w-full rounded-full bg-white "
        radius="full"
        variant="flat"
        startContent={
          <ImageIcon
            onClick={() => handleClick()}
            className="w-8 h-8 cursor-pointer"
            size={"50px"}
          />
        }
        endContent={
          <Button
            color="primary"
            isIconOnly
            radius="full"
            size="sm"
            onClick={handleSendmessage}
          >
            <Send className="w-5 h-5" size={"30px"} />
          </Button>
        }
      />
    </div>
  );
}

export default TextBox;
