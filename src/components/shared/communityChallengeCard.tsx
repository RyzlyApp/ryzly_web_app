"use client";

import { CustomImage } from "../custom";
import { textLimit } from "@/helper/utils/textlimit";
import { useRouter } from "next/navigation";
import { capitalizeFLetter } from "@/helper/utils/capitalLetter";
import { RichTextRenderer } from "../richtextRenderer";

interface ICommunityChallenge {
    _id: string;
    thumbnail: string;
    title: string;
    description: string;
    category: string;
    image: string;
}

interface IProps {
    data: ICommunityChallenge;
    scrollable?: boolean;
}

export default function CommunityChallengeCard({ data, scrollable }: IProps) {
    const router = useRouter();

    return (
        <div
            style={{ width: scrollable ? "350px" : "100%" }}
            className="bg-white rounded-3xl p-4 shadow flex-1 h-full flex flex-col gap-4"
        >
            {/* Image */}
            <div className="w-full h-[140px] rounded-lg relative bg-gray-100 overflow-hidden">
                {data?.image ? (
                    <CustomImage
                        overlayer
                        src={data.image}
                        alt={data.title}
                        fillContainer
                        style={{ borderRadius: "8px" }}
                    />
                ) : data?.thumbnail ? (
                    <CustomImage
                        overlayer
                        src={data.thumbnail}
                        alt={data.title}
                        fillContainer
                        style={{ borderRadius: "8px" }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-xs text-gray-400">No image</span>
                    </div>
                )}

                {/* Category badge */}
                {data?.category && (
                    <div className="absolute top-3 left-3 z-10">
                        <span className="bg-white/80 backdrop-blur-sm text-xs font-medium text-gray-700 px-2 py-1 rounded-full">
                            {data.category}
                        </span>
                    </div>
                )}
            </div>

            {/* Title */}
            <div className="flex flex-col gap-2">
                <p className="text-lg font-bold leading-tight">
                    {capitalizeFLetter(data?.title)}
                </p>
                {data?.description && (
                    <>
                        <div
                            className="text-xs font-medium text-violet-300 line-clamp-2"
                            dangerouslySetInnerHTML={{
                                __html: textLimit(data.description, 100),
                            }}
                        />
                        <RichTextRenderer content={data.description} className="font-normal font" />
                    </>
                )}
            </div>

            {/* Action */}
            <div className="mt-auto w-full">
                <button
                    onClick={() =>
                        router.push(`/dashboard/challenges/${data._id}/details`)
                    }
                    className="w-full h-10 rounded-full bg-[#5160E7] text-white text-sm font-semibold hover:bg-[#4150d6] transition-colors"
                >
                    View Challenge
                </button>
            </div>
        </div>
    );
}