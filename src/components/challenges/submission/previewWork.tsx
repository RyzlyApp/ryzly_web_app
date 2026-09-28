"use client";
import { CoachesReview } from "@/components/shared";
import { userAtom } from "@/helper/atom/user";
import { ISubmissionPreview } from "@/helper/model/application";
import { IGradeDetail } from "@/helper/model/challenge";
import { dateFormat } from "@/helper/utils/dateFormat";
import { useFetchData } from "@/hook/useFetchData";
import { useAtom } from "jotai";
import { useParams, useRouter } from "next/navigation";
import React from "react";

// Tool brand icons matching Image 2
const FigmaIcon = () => (
    <svg width="14" height="20" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
    </svg>
);

const IllustratorIcon = () => (
    <span className="w-5 h-5 rounded-[4px] bg-[#330000] border border-[#FF9A00]/40 flex items-center justify-center text-[10px] font-bold text-[#FF9A00] tracking-tight shrink-0 select-none">
        Ai
    </span>
);

const RiveIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-900 shrink-0">
        <path d="M4 8h9a5 5 0 0 1 0 10H7" />
        <path d="M14 8l6 10" />
    </svg>
);

const AfterEffectsIcon = () => (
    <span className="w-5 h-5 rounded-[4px] bg-[#00005B] border border-[#9999FF]/40 flex items-center justify-center text-[10px] font-bold text-[#9999FF] tracking-tight shrink-0 select-none">
        Ae
    </span>
);

const renderToolItem = (toolName: string, index: number) => {
    const trimmed = toolName.trim();
    const lower = trimmed.toLowerCase();

    let icon: React.ReactNode = (
        <span className="w-5 h-5 rounded-[4px] bg-zinc-800 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
            {trimmed.charAt(0).toUpperCase()}
        </span>
    );

    if (lower.includes("figma")) {
        icon = <FigmaIcon />;
    } else if (lower.includes("illustrator") || lower === "ai") {
        icon = <IllustratorIcon />;
    } else if (lower.includes("rive")) {
        icon = <RiveIcon />;
    } else if (lower.includes("after effect") || lower.includes("aftereffect") || lower === "ae") {
        icon = <AfterEffectsIcon />;
    }

    return (
        <div key={index} className="flex items-center gap-2">
            {icon}
            <span className="text-xs font-medium text-zinc-800">{trimmed}</span>
        </div>
    );
};

export default function PreviewWork({
    item,
    showHeader = true,
}: {
    item: ISubmissionPreview;
    showHeader?: boolean;
}) {
    const router = useRouter();
    const param = useParams();
    const slug = param.slug;
    const id = param.id;
    const { data = [] } = useFetchData<IGradeDetail[]>({
        endpoint: `/grade`,
        name: "gradeuser",
        params: {
            taskID: item?.taskID?._id,
            userId: item?.userId?._id,
        },
    });

    const [user] = useAtom(userAtom);

    // Parse tools list or fallback to standard tools from the design
    const defaultTools = ["Figma", "Illustrator", "Rive", "After Effect"];
    const toolsList = item?.tools
        ? item.tools.split(",").map((t) => t.trim()).filter(Boolean)
        : defaultTools;

    const displayTools = toolsList.length > 0 ? toolsList : defaultTools;

    const projectLink = item?.link
        ? item.link.startsWith("http")
            ? item.link
            : `https://${item.link}`
        : null;

    return (
        <div className="w-full flex flex-col gap-4">
            {showHeader && (
                <h2 className="text-base font-bold text-zinc-900">
                    Submission details
                </h2>
            )}

            {/* Media Image Preview */}
            <div className="w-full rounded-xl overflow-hidden bg-zinc-100 relative max-h-[520px] aspect-[16/10] border border-zinc-100">
                <img
                    src={item?.url || item?.file || "/images/work.jpg"}
                    alt={item?.title || "Submission preview"}
                    className="w-full h-full object-cover rounded-xl"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/work.jpg";
                    }}
                />
            </div>

            {/* Metadata */}
            <p className="text-xs font-medium text-zinc-400">
                Posted on {item?.createdAt ? dateFormat(item.createdAt) : "29 Jul 2025"}
            </p>

            {/* Title & Description */}
            <div className="flex flex-col w-full gap-1.5">
                <h3 className="text-base font-bold text-zinc-900">
                    {item?.title || "Mobile Banking App UI"}
                </h3>
                <p className="text-xs font-normal text-zinc-500 leading-relaxed">
                    {item?.description ||
                        "A sleek and secure mobile banking experience designed for today's digital-first users. This solution combines modern UI patterns with intuitive navigation, enabling seamless money management, real-time insights, and strong user trust all in one beautifully crafted app."}
                </p>
            </div>

            {/* Divider */}
            <hr className="border-t border-zinc-100 w-full" />

            {/* Attached link row */}
            <div className="flex justify-between items-center py-0.5">
                <span className="text-xs font-medium text-zinc-500">
                    Attached link
                </span>
                {projectLink ? (
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={projectLink}
                        className="px-5 py-2 bg-[#5160E7] hover:bg-[#4351d4] text-white text-xs font-semibold rounded-full transition-colors shadow-sm"
                    >
                        Link to Project
                    </a>
                ) : (
                    <button
                        type="button"
                        className="px-5 py-2 bg-[#5160E7] hover:bg-[#4351d4] text-white text-xs font-semibold rounded-full transition-colors shadow-sm cursor-pointer"
                    >
                        Link to Project
                    </button>
                )}
            </div>

            {/* Divider */}
            <hr className="border-t border-zinc-100 w-full" />

            {/* Tools used row */}
            <div className="flex flex-col gap-3">
                <span className="text-xs font-medium text-zinc-500">
                    Tools used
                </span>
                <div className="flex items-center gap-6 flex-wrap">
                    {displayTools.map((tool, idx) => renderToolItem(tool, idx))}
                </div>
            </div>

            {/* Coach feedback if already exists */}
            {(data[0]?.feedBack || (data[0]?.score && data[0]?.score > 0)) && (
                <div className="pt-2 flex gap-3 flex-col border-t border-zinc-100">
                    <p className="text-xs font-medium text-zinc-500">
                        Coach feedback
                    </p>
                    <CoachesReview data={data[0]} />
                </div>
            )}

            {/* Edit button for participant creator if allowed */}
            {item?.challengeID?.creator !== user?.data?._id &&
                data?.length === 0 && (
                    <div className="w-full flex justify-end pt-2">
                        <button
                            type="button"
                            onClick={() =>
                                router.push(
                                    `/dashboard/challenges/${id}/tasks/${slug}/submission/edit`,
                                )
                            }
                            className="px-5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-full transition-colors"
                        >
                            Edit
                        </button>
                    </div>
                )}
        </div>
    );
}
