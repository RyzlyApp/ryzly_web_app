// src/modules/community-chat/components/ChatComposer.tsx
"use client";

import { useRef, useState } from "react";
import { Avatar, Button } from "@heroui/react";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";
import { cn } from "@/lib/utils";
import {
    RiCloseLine,
    RiImageLine,
    RiPushpin2Fill,
    RiMessage3Line,
    RiBarChartHorizontalLine,
    RiTrophyLine
} from "react-icons/ri";

interface IChatComposerProps {
    isModal?: boolean;
    isSending: boolean;
    isUploading: boolean;
    onSendMessage: (text: string, file?: File, type?: string) => Promise<void>;
}

// Category structure mapped directly from composer.png layout
const POST_CATEGORIES = [
    { id: "share-work", label: "Share Work", icon: RiPushpin2Fill, color: "text-red-500" },
    { id: "ask-feedback", label: "Ask Feedback", icon: RiMessage3Line, color: "text-[#5160E7]" },
    { id: "post-progress", label: "Post Progress", icon: RiBarChartHorizontalLine, color: "text-amber-500" },
    { id: "share-win", label: "Share Win", icon: RiTrophyLine, color: "text-emerald-500" },
];

export const ChatComposer = ({ isModal, isSending, isUploading, onSendMessage }: IChatComposerProps) => {
    const [userState] = useAtom(userAtom);
    const [composerText, setComposerText] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [type, setType] = useState<string>("share-work"); // Default tag based on composer.png

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handlePost = async () => {
        const text = composerText.trim();
        const file = selectedFile;
        const typeSelected = type
        if (!text && !file) return;

        // Passing text, file, and the selected category tag upstream
        await onSendMessage(text, file ?? undefined, typeSelected);
        setComposerText("");
        handleRemoveFile();
    };

    const activeCategory = POST_CATEGORIES.find((cat) => cat.id === type);
    const ActiveIcon = activeCategory?.icon || RiPushpin2Fill;

    return (
        <div className={` ${isModal ? "" : " p-5 border border-[#5160E7]/20 shadow-sm "} bg-white rounded-2xl  shrink-0 w-full flex flex-col gap-4 `}>
            {/* Top Section: User Profile & Dynamic Current Active Tag Indicator */}
            <div className="flex items-center gap-3">
                <Avatar
                    src={userState.data?.profilePicture || ""}
                    name={`${userState.data?.firstName?.[0] ?? ""}${userState.data?.lastName?.[0] ?? ""}`}
                    className="shrink-0 size-10 border border-gray-100"
                />
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">
                    <ActiveIcon className={cn("size-3.5", activeCategory?.color)} />
                    <span>{activeCategory?.label}</span>
                </div>
            </div>

            {/* Category Selection Bar: Styled exactly per composer.png */}
            {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
                {POST_CATEGORIES.map((category) => {
                    const IconComponent = category.icon;
                    const isSelected = selectedTag === category.id;

                    return (
                        <button
                            key={category.id}
                            type="button"
                            onClick={() => setSelectedTag(category.id)}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border transition-all duration-200",
                                isSelected
                                    ? "border-[#5160E7] bg-[#5160E7]/5 text-[#5160E7] font-medium shadow-sm"
                                    : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                            )}
                        >
                            <IconComponent className={cn("size-4", isSelected ? category.color : "text-gray-400")} />
                            <span className="text-xs sm:text-sm whitespace-nowrap">{category.label}</span>
                        </button>
                    );
                })}
            </div> */}

            <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-4 sm:overflow-visible scrollbar-hide scrollbar-none">
                {POST_CATEGORIES.map((category) => {
                    const IconComponent = category.icon;
                    const isSelected = type === category.id;

                    return (
                        <button
                            key={category.id}
                            type="button"
                            onClick={() => setType(category.id)}
                            className={cn(
                                "flex flex-row sm:flex-col items-center justify-center gap-1.5 px-3 py-2 sm:p-3 rounded-xl border transition-all duration-200 shrink-0 sm:shrink min-w-max sm:min-w-0",
                                isSelected
                                    ? "border-[#5160E7] bg-[#5160E7]/5 text-[#5160E7] font-medium shadow-sm"
                                    : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                            )}
                        >
                            <IconComponent className={cn("size-4 shrink-0", isSelected ? category.color : "text-gray-400")} />
                            <span className="text-xs sm:text-sm whitespace-nowrap">{category.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Textarea Input Box Area */}
            <div className="w-full mt-1">
                <textarea
                    rows={3}
                    className="w-full text-sm text-gray-700 bg-transparent border-none outline-none placeholder:text-gray-400 resize-none focus:ring-0"
                    placeholder="What do you want to talk about?"
                    value={composerText}
                    onChange={(e) => setComposerText(e.target.value)}
                />
            </div>

            {/* File Upload Image/Video Preview Panel */}
            {previewUrl && (
                <div className="relative w-fit border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                    <img
                        src={previewUrl}
                        alt="Upload preview"
                        className="h-24 max-w-[180px] object-cover"
                    />
                    <button
                        onClick={handleRemoveFile}
                        className="absolute top-1 right-1 bg-black/70 hover:bg-black/90 text-white rounded-full p-1 transition-colors"
                    >
                        <RiCloseLine className="size-3.5" />
                    </button>
                </div>
            )}

            {/* Bottom Footer Actions: File selector button on the left, Submit button on the right */}
            <div className="flex items-center justify-between pt-3 border-t border-[#E8E7ED]">
                <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-200 hover:border-gray-300 rounded-xl text-xs sm:text-sm text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <RiImageLine className="size-4 text-[#5160E7]" />
                    <span>Image / Video</span>
                </button>

                <Button
                    size="sm"
                    className={cn(
                        "rounded-full px-5 font-medium transition-all",
                        composerText.trim() || selectedFile
                            ? "bg-[#5160E7] text-white shadow-md hover:bg-[#3f4ec7]"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                    )}
                    isLoading={isSending || isUploading}
                    isDisabled={!composerText.trim() && !selectedFile}
                    onPress={handlePost}
                >
                    Post
                </Button>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={handleFilePick}
            />
        </div>
    );
};