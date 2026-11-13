"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Avatar, Chip, Tabs, Tab } from "@heroui/react";
import {
  RiSearchLine,
  RiHeartLine,
  RiHeartFill,
} from "react-icons/ri";
import ChatInputBar from "./ChatInputBar";

export type MessageFilter = "all" | "direct" | "team";

interface ChatMessage {
  id: string;
  sender: "amaka" | "you" | "daniel" | "other";
  senderName: string;
  senderRole?: string;
  avatarUrl?: string;
  timestamp: string;
  text: string;
  isLiked?: boolean;
}

interface ConversationItem {
  id: string;
  type: "team" | "direct";
  name: string;
  role?: string;
  avatarUrl?: string;
  avatarLetter?: string;
  lastMessage?: string;
  timestamp?: string;
  unreadCount?: number;
  isOnline?: boolean;
  stageInfo?: string;
}

const DEFAULT_CONVERSATIONS: ConversationItem[] = [
  {
    id: "team-group",
    type: "team",
    name: "Product Design Work Experience",
    avatarUrl:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=100&auto=format&fit=crop&q=80",
    lastMessage: "Amaka: Standup looks good!...",
    timestamp: "11:27 AM",
    unreadCount: 3,
    stageInfo: "5 members | Stage 2: Design & Iterate",
  },
  {
    id: "daniel",
    type: "direct",
    name: "Daniel O.",
    role: "Product Design Manager",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    lastMessage: "Can you share the latest wirefra...",
    timestamp: "10:41 AM",
    unreadCount: 1,
    isOnline: true,
    stageInfo: "Product Design Manager | Stage 2: Design & Iterate",
  },
  {
    id: "emeka",
    type: "direct",
    name: "Emeka S.",
    role: "Frontend Developer",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    lastMessage: "No blockers from my side.",
    timestamp: "Oct 29",
    isOnline: false,
    stageInfo: "Frontend Developer | Stage 2: Design & Iterate",
  },
  {
    id: "amaka",
    type: "direct",
    name: "Amaka N.",
    role: "Product Designer",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
    lastMessage: "",
    timestamp: "",
    isOnline: true,
    stageInfo: "Product Designer | Stage 2: Design & Iterate",
  },
  {
    id: "support",
    type: "direct",
    name: "Ryzly Support",
    role: "Support Team",
    avatarLetter: "R",
    lastMessage: "How can we help you today?",
    timestamp: "Oct 27",
    stageInfo: "Official Support | Always Active",
  },
];

const INITIAL_TEAM_MESSAGES: ChatMessage[] = [
  {
    id: "m-1",
    sender: "amaka",
    senderName: "Amaka N.",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
    timestamp: "10:02 AM",
    text: "I've shared my standup for today. I reviewed the feedback and updated the design rationale.",
    isLiked: false,
  },
  {
    id: "m-2",
    sender: "you",
    senderName: "You",
    avatarUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    timestamp: "10:18 AM",
    text: "Nice work! The updated rationale is clear.",
  },
  {
    id: "m-3",
    sender: "daniel",
    senderName: "Daniel O.",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    timestamp: "10:41 AM",
    text: "Can you share the latest wireframes here? I'd like to review them before our sync.",
    isLiked: false,
  },
];

interface WorkExperienceMessagesProps {
  workexperienceId?: string;
  initialConversationId?: string;
}

export default function WorkExperienceMessages({
  workexperienceId: _workexperienceId,
  initialConversationId = "amaka",
}: WorkExperienceMessagesProps) {
  const [filter, setFilter] = useState<MessageFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeConvId, setActiveConvId] = useState<string>(initialConversationId);

  // Group thread messages state
  const [teamMessages, setTeamMessages] = useState<ChatMessage[]>(INITIAL_TEAM_MESSAGES);
  // Direct messages mapping (id -> messages)
  const [directMessages, setDirectMessages] = useState<Record<string, ChatMessage[]>>({
    amaka: [],
  });

  const activeConversation =
    DEFAULT_CONVERSATIONS.find((c) => c.id === activeConvId) ||
    DEFAULT_CONVERSATIONS[0];

  const filteredConversations = DEFAULT_CONVERSATIONS.filter((c) => {
    if (filter === "direct" && c.type !== "direct") return false;
    if (filter === "team" && c.type !== "team") return false;
    if (searchQuery.trim()) {
      return (
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.lastMessage &&
          c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    return true;
  });

  const handleSendMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "you",
      senderName: "You",
      avatarUrl:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      timestamp: new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }).format(new Date()),
      text,
    };

    if (activeConvId === "team-group") {
      setTeamMessages((prev) => [...prev, newMessage]);
    } else {
      setDirectMessages((prev) => ({
        ...prev,
        [activeConvId]: [...(prev[activeConvId] || []), newMessage],
      }));
    }
  };

  const toggleLike = (messageId: string) => {
    setTeamMessages((prev) =>
      prev.map((m) =>
        m.id === messageId ? { ...m, isLiked: !m.isLiked } : m
      )
    );
  };

  const activeMessages =
    activeConvId === "team-group"
      ? teamMessages
      : directMessages[activeConvId] || [];

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 items-start pt-2 font-inter">
      {/* LEFT COLUMN: Filter Pills, Search Bar & Conversations List */}
      <div className="w-full lg:w-[320px] xl:w-[360px] flex flex-col gap-4 shrink-0 bg-white px-2 py-4 rounded-3xl h-[680px] overflow-hidden shadow-xs">
        {/* Top Filters & Mockup Switcher */}
        <div className="flex items-center justify-between gap-2 shrink-0">
          {/* Filter Pills (All / Direct / Team) */}
          <div className="px-3 py-1">
            <Tabs
              aria-label="Messages filter"
              selectedKey={filter}
              onSelectionChange={(key) => setFilter(key as MessageFilter)}
              radius="full"
              variant="light"
              classNames={{
                base: "p-0",
                tabList: "bg-transparent p-0 gap-1",
                cursor: "bg-[#1D1348] rounded-full shadow-xs",
                tab: "rounded-full px-3.5 py-1.5 h-auto text-xs font-semibold data-[selected=true]:text-white",
                tabContent:
                  "group-data-[selected=true]:text-white text-[#475467] group-data-[hover=true]:text-[#1D1348] group-data-[selected=true]:font-semibold",
              }}
            >
              <Tab key="all" title="All" />
              <Tab key="direct" title="Direct" />
              <Tab key="team" title="Team" />
            </Tabs>
          </div>

          {/* Quick Mockup Switcher (Direct Amaka vs Team Chat) */}
          <div className="inline-flex items-center gap-1 bg-gray-100 p-0.5 rounded-lg text-[10px] font-medium shrink-0 mr-2">
            <button
              type="button"
              onClick={() => setActiveConvId("amaka")}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                activeConvId === "amaka"
                  ? "bg-white font-bold text-[#1D1348] shadow-xs"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              title="Amaka N. Direct Empty State (Image 1)"
            >
              Direct
            </button>
            <button
              type="button"
              onClick={() => setActiveConvId("team-group")}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                activeConvId === "team-group"
                  ? "bg-white font-bold text-[#1D1348] shadow-xs"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              title="Team Group Thread (Image 2)"
            >
              Team
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full px-2 shrink-0">
          <RiSearchLine
            size={16}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-[#64748B]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages..."
            className="w-full bg-[#F9FAFB] border border-gray-100 rounded-full pl-9 pr-4 py-2 text-xs text-[#1C1C1E] placeholder-gray-400 focus:outline-none focus:border-[#5160E7] focus:bg-white transition-all"
          />
        </div>

        {/* Conversations List - Fixed Height & Scrollable */}
        <div className="flex flex-col gap-1 flex-1 min-h-0 overflow-y-auto px-1 pr-1.5">
          {filteredConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-6 text-center text-[#64748B] gap-2">
              <Image
                src="/icons/sad.png"
                alt="No messages found"
                width={48}
                height={48}
                className="opacity-80"
              />
              <span className="text-xs font-medium">No messages found</span>
            </div>
          ) : (
            filteredConversations.map((conv) => {
              const isSelected = activeConvId === conv.id;
              return (
                <button
                  key={conv.id}
                  type="button"
                  onClick={() => setActiveConvId(conv.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all text-left cursor-pointer ${
                    isSelected
                      ? "bg-[#F2F4FF] shadow-xs"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="relative shrink-0">
                      {conv.avatarLetter ? (
                        <div className="w-10 h-10 rounded-xl bg-[#F2F4FF] text-[#5160E7] font-bold text-sm flex items-center justify-center">
                          {conv.avatarLetter}
                        </div>
                      ) : (
                        <Avatar
                          name={conv.name}
                          src={conv.avatarUrl}
                          className={`w-10 h-10 text-xs font-bold ${
                            conv.type === "team" ? "rounded-xl" : "rounded-full"
                          }`}
                        />
                      )}
                      {conv.isOnline && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#10B981] ring-2 ring-white" />
                      )}
                    </div>

                    <div className="flex flex-col overflow-hidden">
                      <span className="text-xs sm:text-sm font-bold text-[#1C1C1E] truncate">
                        {conv.name}
                      </span>
                      {conv.lastMessage && (
                        <span className="text-[11px] sm:text-xs text-[#3A3A3C] truncate mt-0.5">
                          {conv.lastMessage}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
                    {conv.timestamp && (
                      <span className="text-[10px] sm:text-[11px] text-[#3A3A3C]">
                        {conv.timestamp}
                      </span>
                    )}
                    {conv.unreadCount && conv.unreadCount > 0 && (
                      <Chip
                        variant="solid"
                        size="sm"
                        classNames={{
                          base: "bg-[#5160E7] text-white h-4 min-w-[18px] px-1.5 rounded-full",
                          content: "text-[10px] font-bold p-0 leading-none",
                        }}
                      >
                        {conv.unreadCount}
                      </Chip>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Active Chat Thread or Empty State */}
      <div className="flex-1 w-full flex flex-col h-[680px] bg-white rounded-3xl overflow-hidden shadow-xs">
        {/* Header Bar */}
        <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4 pb-3.5 shrink-0">
          <div className="relative shrink-0">
            {activeConversation.avatarLetter ? (
              <div className="w-10 h-10 rounded-xl bg-[#F2F4FF] text-[#5160E7] font-bold text-sm flex items-center justify-center">
                {activeConversation.avatarLetter}
              </div>
            ) : (
              <Avatar
                name={activeConversation.name}
                src={activeConversation.avatarUrl}
                className={`w-10 h-10 text-xs font-bold ${
                  activeConversation.type === "team"
                    ? "rounded-full"
                    : "rounded-full"
                }`}
              />
            )}
            {activeConversation.isOnline && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#10B981] ring-2 ring-white" />
            )}
          </div>

          <div className="flex flex-col">
            <h3 className="text-sm sm:text-base font-bold text-[#1C1C1E]">
              {activeConversation.name}
            </h3>
            <span className="text-xs text-[#3A3A3C]">
              {activeConversation.stageInfo ||
                `${activeConversation.role || "Member"} | Stage 2: Design & Iterate`}
            </span>
          </div>
        </div>

        {/* Conversation Body */}
        {activeMessages.length === 0 ? (
          /* EMPTY STATE (Image 1: Amaka N. with /icons/happy.png) */
          <div className="flex-1 min-h-0 flex flex-col items-center justify-center text-center py-8 px-8 overflow-y-auto my-auto">
            {/* Real Happy 3D Icon from public/icons/happy.png */}
            <div className="relative w-20 h-20 sm:w-22 sm:h-22 flex items-center justify-center mb-4 transition-transform hover:scale-105">
              <Image
                src="/icons/happy.png"
                alt="Happy face icon"
                width={84}
                height={84}
                className="object-contain drop-shadow-sm"
                priority
              />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-[#1D1348] tracking-tight">
              Start a conversation with {activeConversation.name.split(" ")[0]}
            </h2>
            <p className="text-xs sm:text-sm text-[#3A3A3C] max-w-sm mt-2 leading-relaxed">
              This is the beginning of your conversation with{" "}
              {activeConversation.name}. Say hi, ask a question or discuss your
              work.
            </p>
          </div>
        ) : (
          /* ACTIVE MESSAGES FEED (Image 2: Product Design Work Experience) */
          <div className="flex-1 min-h-0 flex flex-col gap-4 overflow-y-auto px-6 py-4">
            {/* Centered Date Separator Pill */}
            <div className="flex items-center justify-center my-1">
              <span className="bg-[#F2F4F7] text-[#64748B] text-[11px] font-semibold px-3 py-1 rounded-full">
                Today
              </span>
            </div>

            {activeMessages.map((msg) => {
              const isYou = msg.sender === "you";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    isYou ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`flex items-start gap-2.5 max-w-[85%] sm:max-w-[75%] ${
                      isYou ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {/* Avatar */}
                    <Avatar
                      name={msg.senderName}
                      src={msg.avatarUrl}
                      className="w-7 h-7 sm:w-8 sm:h-8 text-[11px] font-bold shrink-0 mt-0.5"
                    />

                    {/* Content Column */}
                    <div
                      className={`flex flex-col ${
                        isYou ? "items-end" : "items-start"
                      }`}
                    >
                      {/* Name & Time Header */}
                      <div
                        className={`flex items-center gap-2 mb-1 ${
                          isYou ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <span className="text-xs font-bold text-[#1C1C1E]">
                          {msg.senderName}
                        </span>
                        <span className="text-[10px] text-[#3A3A3C]">
                          {msg.timestamp}
                        </span>
                      </div>

                      {/* Message Bubble */}
                      <div
                        className={`rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed ${
                          isYou
                            ? "bg-[#F2F4FF] text-[#1C1C1E] rounded-tr-xs"
                            : "bg-gray-100 text-[#1C1C1E] rounded-tl-xs"
                        }`}
                      >
                        {msg.text}
                      </div>

                      {/* Heart Reaction Toggle (for other members) */}
                      {!isYou && (
                        <button
                          type="button"
                          onClick={() => toggleLike(msg.id)}
                          className="mt-1 p-1 text-[#64748B] hover:text-[#F04438] transition-colors cursor-pointer"
                          title="Like message"
                        >
                          {msg.isLiked ? (
                            <RiHeartFill size={15} className="text-[#F04438]" />
                          ) : (
                            <RiHeartLine size={15} />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* BOTTOM INPUT BAR */}
        <div className="shrink-0 w-full border-t border-gray-100 py-3.5 px-6 bg-white">
          <ChatInputBar onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}
