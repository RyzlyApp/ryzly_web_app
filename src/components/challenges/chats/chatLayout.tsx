import { CustomInput } from "@/components/custom";
import { IChallenge } from "@/helper/model/challenge";
import useChat from "@/hook/useChat";
import { Tabs, Tab, Spinner } from "@heroui/react";
import { FormikProvider } from "formik";
import { useEffect, useState } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import ChatCard from "./chatCard";
import { useFetchData } from "@/hook/useFetchData";
import { IChatDetail, IMessages } from "@/helper/model/chat";
import { ImagePicker, LoadingLayout } from "@/components/shared";
import { uniqBy } from "lodash";
import { atom, useAtom } from "jotai";
import { Socket } from "@/lib/socket-io";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

// CHAT MESSAGE ATOM
export const CHAT_MESSAGE = atom<IMessages[]>([]);

export default function ChatLayout({ item }: { item: IChallenge }) {
    const [tab, setTab] = useState("");
    const tablink = [
        {
            label: "Messages",
            key: "",
        },
        {
            label: "Announcements",
            key: "task",
        },
        {
            label: "Help",
            key: "resources",
        },
        {
            label: "Coaches",
            key: "reviews",
        },
    ];

    const { formik, isLoading, chatId, user, setChatId } = useChat();
    const [dataChat, setDataChat] = useAtom<IMessages[]>(CHAT_MESSAGE);
      const [d, setD] = useState<IMessages[]>([]);

    const queryClient = useQueryClient()


    const { data: chatdata, isLoading: ChatLoading } = useFetchData<IChatDetail>({
        endpoint: `/chat/challenge/${item?._id}`,
        name: "chat" + user?._id,
    });

    //   useEffect(() => {
    // setDataChat(uniqBy([...d], "_id"));
    //   }, [d]);

    useEffect(() => {
        if (chatdata?.chatType) {
            setChatId(chatdata);
        }
    }, [ChatLoading]);

    useEffect(() => {
        if (chatId) {
            formik.setFieldValue("chatId", chatId?._id);
        }
    }, [chatId]);

    const { data = [], isLoading: loading } = useFetchData<Array<IMessages>>({
        endpoint: `/chat/${chatId?._id}/messages?limit=100`,
        name: "chatmessage" + user?._id,
        enable: chatId?._id ? true : false,
    });

    useEffect(() => {
        if (data && data?.length) {
            setDataChat((prev) => uniqBy([...prev, ...(data as IMessages[])], "_id"));
        }
        console.log(data);

    }, [data]);



    useEffect(() => {
        console.log("SOCKET WAITING", chatdata?._id); 
        const handler = (item: any) => {
            //   console.log("THIS IS THE CHATS from the socket", item); 
            //     const clone = uniqBy([...data, item], "_id");

            //     console.log(data);

            //     setD(clone); 
            
            // d.push(item)

            // d.push(data)
            // d.push(dataChat)

            queryClient.invalidateQueries({ queryKey: ["chatmessage" + user?._id] });
        };



        if (chatdata?._id) {
            Socket.on(`chat:${chatdata._id}`, handler);
        }

        return () => {
            if (chatdata?._id) {
                Socket.off(`chat:${chatdata._id}`, handler);
            }
        };
    }, [chatdata?._id]); 

    console.log(d);
    

    return (
        <FormikProvider value={formik}>
            <div className=" w-full flex flex-col h-full p-4 rounded-2xl bg-white ">
                <div className=" w-full flex items-center justify-between ">
                    <p className=" font-bold ">Finlytics Forum</p>
                </div>
                <div className=" w-full flex flex-col h-[75vh] ">
                    <Tabs
                        selectedKey={tab ? tab : ""}
                        aria-label="Tabs"
                        variant={"underlined"}
                    >
                        {tablink?.map((item) => {
                            return (
                                <Tab
                                    key={item?.key}
                                    onClick={() => setTab(item?.key)}
                                    title={item?.label}
                                />
                            );
                        })}
                    </Tabs>
                    <div className=" w-full flex flex-col-reverse h-full overflow-y-auto gap-2 py-1 ">
                        <LoadingLayout loading={loading}>
                            {[...d, ...dataChat].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())?.map((item, index) => {
                                return (
                                    <ChatCard
                                        key={index}
                                        item={item}
                                        self={item?.senderId === user?._id}
                                        previousDate={dataChat[index - 1]?.updatedAt}
                                    />
                                );
                            })}
                        </LoadingLayout>
                    </div>
                    <form onSubmit={formik.handleSubmit} className=" w-full flex pt-2 ">
                        <CustomInput
                            startContent={<ImagePicker type="chat" />}
                            disabled={chatId?._id ? false : true}
                            rounded="999px"
                            placeholder="Write a message"
                            name="message"
                            endContent={
                                <button
                                    disabled={!formik.values?.message}
                                    className=" w-8 h-8 disabled:bg-neonblue-100 rounded-full flex justify-center items-center bg-neonblue-600 "
                                >
                                    {!isLoading ? (
                                        <RiSendPlane2Fill size={"16px"} color="white" />
                                    ) : (
                                        <Spinner size="sm" color="white" />
                                    )}
                                </button>
                            }
                        />
                    </form>
                </div>
            </div>
        </FormikProvider>
    );
}
