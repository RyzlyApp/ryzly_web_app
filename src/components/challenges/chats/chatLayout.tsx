"use client";

import { IChallenge } from "@/helper/model/challenge";
import useChat from "@/hook/useChat";
import { Tabs, Tab, Spinner } from "@heroui/react";
import { useEffect, useRef, useState } from "react";
import { RiChatSmile2Line, RiVideoChatLine } from "react-icons/ri";
import { IMessages } from "@/helper/model/chat";
import { GrAnnounce } from "react-icons/gr";
import { useAtom } from "jotai";
import React from "react";
import { CHAT_MESSAGE } from "@/helper/atom/chat";
import useChatHook from "@/modules/chat-module/hooks/useChatHook";

// dynamically import the components
const ChatSection = React.lazy(
    () => import("@/modules/chat-module/ui/ChatSection"),
);
const HelpSection = React.lazy(
    () => import("@/modules/chat-module/ui/HelpSection"),
);
const CoachesSection = React.lazy(
    () => import("@/modules/chat-module/ui/Coaches"),
);
const AnnouncementSection = React.lazy(
    () => import("@/modules/chat-module/ui/AnnouncementSection"),
);

// CHAT MESSAGE ATOM

export default function ChatLayout({ item }: { item: IChallenge }) {
    const [tab, setTab] = useState("chat");
    const tablink = [
        { label: "Messages", key: "chat", icon: RiChatSmile2Line },
        { label: "Meeting", key: "meeting", icon: RiVideoChatLine },
        { label: "Announcements", key: "announcement", icon: GrAnnounce },
        // { label: "Help", key: "help" },
        // { label: "Coaches", key: "coaches" },
    ];

    console.log(item);

    const { resetChatState } = useChatHook();

    React.useEffect(() => {
        return () => resetChatState();
    }, []);

    return (
        <div className="w-full flex flex-col h-full p-4 rounded-2xl bg-white">
            {/* Header */}
            <div className="w-full flex items-center justify-between">
                <p className="font-bold">{item.title}</p>
            </div>

            {/* Tabs and Messages */}
            <div className="w-full flex flex-col h-[75vh] overflow-y-hidden">
                <Tabs
                    selectedKey={tab || ""}
                    aria-label="Tabs"
                    variant="underlined"
                >
                    {tablink.map((item) => (
                        <Tab
                            key={item.key}
                            onClick={() => setTab(item.key)}
                            title={
                                <div className=" flex items-center gap-2 ">
                                    <item.icon size={15} />
                                    {item.label}
                                </div>
                            }
                        />
                    ))}
                </Tabs>

                {/* Message List */}
                {tab === "chat" && (
                    <React.Suspense
                        fallback={
                            <div className="w-full flex flex-col-reverse h-full overflow-y-auto gap-2 py-1">
                                Loading…
                            </div>
                        }
                    >
                        <div className="w-full flex flex-col-reverse h-full overflow-y-auto gap-2 py-1">
                            <ChatSection challengeId={item._id} />
                        </div>
                    </React.Suspense>
                )}

                {/* Announcements List */}
                {tab === "announcement" && (
                    <React.Suspense
                        fallback={
                            <div className="w-full flex flex-col-reverse h-full overflow-y-auto gap-2 py-1">
                                <Spinner />
                            </div>
                        }
                    >
                        <div className="w-full flex flex-col-reverse h-full overflow-y-auto gap-2 py-1">
                            <AnnouncementSection challengeId={item._id} />
                        </div>
                    </React.Suspense>
                )}

                {/* Announcements List */}
                {tab === "meeting" && (
                    <React.Suspense
                        fallback={
                            <div className="w-full flex flex-col-reverse h-full overflow-y-auto gap-2 py-1">
                                <Spinner />
                            </div>
                        }
                    >
                        <div className="w-full flex h-full flex-col justify-end  gap-2 py-1">
                            {item?.meetingLink ? (
                                <a target="_blank" href={item?.url} className=" text-primary ">
                                    Join Meeting
                                </a>
                            ) : (
                                <p>No Meeting Link</p>
                            )}
                        </div>
                    </React.Suspense>
                )}

                {tab === "help" && (
                    <React.Suspense
                        fallback={
                            <div className="w-full flex flex-col-reverse h-full overflow-y-auto gap-2 py-1">
                                <Spinner />
                            </div>
                        }
                    >
                        <div className="w-full flex flex-col-reverse h-full overflow-y-auto gap-2 py-1">
                            <HelpSection challengeId={item._id} />
                        </div>
                    </React.Suspense>
                )}

                {tab === "coaches" && (
                    <React.Suspense
                        fallback={
                            <div className="w-full flex flex-col-reverse h-full overflow-y-auto gap-2 py-1">
                                <Spinner />
                            </div>
                        }
                    >
                        <div className="w-full flex flex-col-reverse h-full overflow-y-auto gap-2 py-1">
                            <CoachesSection challengeId={item._id} />
                        </div>
                    </React.Suspense>
                )}
            </div>
        </div>
    );
}
