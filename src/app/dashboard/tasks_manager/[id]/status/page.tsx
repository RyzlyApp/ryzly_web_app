"use client";

import { useSearchParams, useRouter, useParams } from "next/navigation";
import { CustomButton } from "@/components/custom";
import { RiDownloadLine, RiFileTextLine, RiCheckLine, RiExternalLinkLine, RiCloseCircleLine, RiWallet3Line, RiBankCardLine } from "react-icons/ri";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Spinner, Button, Avatar } from "@heroui/react";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";
import { workTalentDraftAtom } from "@/helper/atom/workTalentDraft";
import StorageClass from "@/dal/storage/StorageClass";
import { STORAGE_KEYS } from "@/dal/storage/StorageKeys";
import { useFetchData } from "@/hook/useFetchData";
import { useTalentTask } from "@/hook/useTalentTask";
import { IChallenge } from "@/helper/model/challenge";
import { IProjectFile, ISubmissionItem, IChallengeStatWinner, IReassignTaskPayload } from "@/types/talentTask";
import { addToast } from "@heroui/toast";

export default function HostTaskStatusPage() {
    const router = useRouter();
    const params = useParams();
    const taskId = params.id as string;

    const [userState] = useAtom(userAtom);
    const [taskDraft, setTaskDraft] = useAtom(workTalentDraftAtom);
    const [selectedTalentId, setSelectedTalentId] = useState<string>("");
    const [selectedTalentName, setSelectedTalentName] = useState<string>("");

    const {
        isOpen: isRequestChangesOpen,
        onOpen: onRequestChangesOpen,
        onOpenChange: onRequestChangesOpenChange,
    } = useDisclosure();
    const {
        isOpen: isCancelOpen,
        onOpenChange: onCancelOpenChange,
    } = useDisclosure();

    const [changeNotes, setChangeNotes] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<"WALLET" | "PAYSTACK">("WALLET");

    // Custom Hook for Task Data & Mutations
    const {
        taskData,
        isTaskLoading,
        refetchTask,
        fundTask,
        cancelMutation,
        requestChangesHostMutation,
        approveMutation,
        reassignMutation,
    } = useTalentTask(taskId);

    // Dependent Challenge Details
    const challengeId =
        typeof taskData?.challenge === "object"
            ? taskData?.challenge?._id
            : taskData?.challenge;
    const { data: challengeData } = useFetchData<IChallenge>({
        endpoint: `/challenge/single/${challengeId}`,
        name: `challengeDetails-${challengeId}`,
        enable: Boolean(challengeId),
    });

    const isTaskDeclined = taskData?.status?.toUpperCase() === "DECLINED" || taskData?.status?.toUpperCase() === "CANCELLED";

    const { data: challengeStatsData, isLoading: isLoadingStats } = useFetchData<any>({
        endpoint: `/leaderboard/getPerChallengeStats/${challengeId}`,
        name: `challengeStats-${challengeId}`,
        enable: Boolean(isTaskDeclined && challengeId),
    });

    // Auto-save existing task details into Jotai localStorage atom when declined
    useEffect(() => {
        if (isTaskDeclined && taskData) {
            const orgId =
                typeof taskData.organization === "object"
                    ? (taskData.organization as any)?._id
                    : taskData.organization;

            setTaskDraft((prev) => ({
                isRejectedReassignment: true,
                originalTaskId: taskData._id,
                challengeId: challengeId || "",
                organizationId: orgId || "",
                title: taskData.title || "",
                description: taskData.description || "",
                deliverables: taskData.deliverables || [],
                projectFiles: taskData.projectFiles || [],
                startDate: taskData.startDate || "",
                dueDate: taskData.dueDate || "",
                amount: taskData.compensation?.amount ?? (taskData as any).amount ?? 0,
                currency: taskData.compensation?.currency || (taskData as any).currency || "NGN",
                talentId: prev?.talentId || "",
                talentName: prev?.talentName || "",
            }));
        }
    }, [isTaskDeclined, taskData, challengeId, setTaskDraft]);

    // Parse winners list from /leaderboard/getPerChallengeStats/${challengeId}
    const rawWinners: IChallengeStatWinner[] = Array.isArray(challengeStatsData)
        ? challengeStatsData
        : Array.isArray(challengeStatsData?.data)
        ? challengeStatsData.data
        : [];

    const rejectedTalentId =
        typeof taskData?.talent === "object"
            ? taskData?.talent?._id
            : taskData?.talent;

    const availableWinners = rawWinners.filter(
        (winner) => String(winner._id) !== String(rejectedTalentId)
    );

    const handleSelectTalent = (winner: IChallengeStatWinner) => {
        setSelectedTalentId(winner._id);
        const fullName = `${winner.firstName || ""} ${winner.lastName || ""}`.trim() || "Talent";
        setSelectedTalentName(fullName);

        setTaskDraft((prev) => ({
            ...(prev || {
                isRejectedReassignment: true,
                originalTaskId: taskData?._id,
                challengeId: challengeId || "",
                title: taskData?.title || "",
                description: taskData?.description || "",
                deliverables: taskData?.deliverables || [],
                projectFiles: taskData?.projectFiles || [],
                startDate: taskData?.startDate || "",
                dueDate: taskData?.dueDate || "",
                amount: taskData?.compensation?.amount ?? (taskData as any)?.amount ?? 0,
                currency: taskData?.compensation?.currency || (taskData as any)?.currency || "NGN",
            }),
            talentId: winner._id,
            talentName: fullName,
        }));
    };

    const handleReassignTask = () => {
        if (!selectedTalentId) {
            addToast({
                title: "Selection Required",
                description: "Please select a talent from the cards above to reassign.",
                color: "warning",
            });
            return;
        }

        const formatToISO = (dateStr?: string) => {
            if (!dateStr) return new Date().toISOString();
            try {
                return new Date(dateStr).toISOString();
            } catch {
                return dateStr;
            }
        };

        const rawAmount = taskDraft?.amount ?? (taskData?.compensation?.amount ?? (taskData as any)?.amount ?? 0);
        const numericAmount = typeof rawAmount === "number" ? rawAmount : Number(String(rawAmount).replace(/[^0-9.]/g, "")) || 0;

        const files: IProjectFile[] = (taskDraft?.projectFiles || taskData?.projectFiles || []).map((file) => ({
            name: file.name || "File",
            url: file.url || "",
            key: file.key || file.name || "",
            size: typeof file.size === "number" ? file.size : 0,
            mimeType: file.mimeType || "application/octet-stream",
        }));

        const payload: IReassignTaskPayload = {
            title: taskDraft?.title || taskData?.title || "",
            description: taskDraft?.description || taskData?.description || "",
            deliverables: taskDraft?.deliverables || taskData?.deliverables || [],
            projectFiles: files,
            startDate: formatToISO(taskDraft?.startDate || taskData?.startDate),
            dueDate: formatToISO(taskDraft?.dueDate || taskData?.dueDate),
            amount: numericAmount,
            talentId: selectedTalentId,
        };

        reassignMutation.mutate(payload, {
            onSuccess: (res: any) => {
                setTaskDraft(null);
                const newId =
                    res?.data?.data?._id ||
                    res?.data?._id ||
                    res?.data?.data?.task?._id ||
                    res?.data?.task?._id;
                if (newId && String(newId) !== String(taskId)) {
                    router.push(`/dashboard/tasks_manager/${newId}/status`);
                } else {
                    refetchTask();
                }
            },
        });
    };

    // Logged-in user ID from Jotai user state or localStorage
    const loggedInUserId =
        userState?.data?._id ||
        StorageClass.getValue<string>(STORAGE_KEYS.USERID, { isJSON: false }) ||
        StorageClass.getValue<any>(STORAGE_KEYS.USER_DETAILS, { isJSON: true })?._id;

    // Role-based Access Guard: status page is strictly for the host (createdBy === loggedInUserId)
    useEffect(() => {
        if (taskData && loggedInUserId) {
            const createdById =
                typeof taskData.createdBy === "object"
                    ? (taskData.createdBy as any)?._id
                    : taskData.createdBy;
            if (createdById && String(createdById) !== String(loggedInUserId)) {
                router.replace(`/dashboard/tasks_manager/${taskId}`);
            }
        }
    }, [taskData, loggedInUserId, taskId, router]);

    const handleSendRequestChanges = (onClose: () => void) => {
        if (!changeNotes.trim()) {
            addToast({
                title: "Validation Error",
                description: "Please provide details for the requested changes.",
                color: "warning",
            });
            return;
        }
        requestChangesHostMutation.mutate(
            { feedback: changeNotes.trim() },
            {
                onSuccess: () => {
                    setChangeNotes("");
                    onClose();
                },
            }
        );
    };

    if (isTaskLoading || !taskData) {
        return (
            <div className="w-full h-full min-h-[400px] flex items-center justify-center">
                <Spinner size="lg" color="primary" label="Loading task status..." />
            </div>
        );
    }

    const createdById =
        typeof taskData.createdBy === "object"
            ? (taskData.createdBy as any)?._id
            : taskData.createdBy;
    if (loggedInUserId && createdById && String(createdById) !== String(loggedInUserId)) {
        return (
            <div className="w-full h-full min-h-[400px] flex items-center justify-center">
                <Spinner size="lg" color="primary" label="Redirecting to task view..." />
            </div>
        );
    }

    // Status mapping
    const apiStatus = taskData.status?.toUpperCase() || "PENDING";
    const isCancelled = apiStatus === "CANCELLED";
    const isDeclined = apiStatus === "DECLINED" || isCancelled;
    const isPending = apiStatus === "PENDING";
    const isAwaitingPayment = apiStatus === "AWAITING_PAYMENT";
    const isTodo = apiStatus === "TODO";
    const isInProgress = apiStatus === "IN_PROGRESS";
    const isInReview = apiStatus === "IN_REVIEW" || apiStatus === "SUBMITTED";
    const isChangesRequested = apiStatus === "CHANGES_REQUESTED";
    const isCompleted = apiStatus === "COMPLETED";

    const talentName =
        [taskData.talent?.firstName, taskData.talent?.lastName]
            .filter(Boolean)
            .join(" ")
            .trim() || "Talent";

    const declineReason =
        taskData.declineReason ||
        taskData.history?.find((h) => h.to === "DECLINED" || h.to === "CANCELLED")?.reason ||
        (isCancelled ? "Invitation was cancelled by host." : "No decline reason was provided.");

    const amount = taskData.compensation?.amount || 0;
    const platformFee = taskData.organizationFee ?? amount * 0.1;
    const totalFunded = taskData.totalCharged ?? amount + platformFee;

    const formatCurrency = (num: number) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(num).replace("NGN", "₦");
    };

    const formatTimeline = (startDate?: string, dueDate?: string) => {
        if (!startDate || !dueDate) return "2 Weeks";
        const start = new Date(startDate).getTime();
        const due = new Date(dueDate).getTime();
        const diffDays = Math.max(0, Math.round((due - start) / (1000 * 60 * 60 * 24)));
        if (diffDays >= 7 && diffDays % 7 === 0) {
            const weeks = diffDays / 7;
            return `${weeks} Week${weeks > 1 ? "s" : ""}`;
        }
        return `${diffDays} Day${diffDays !== 1 ? "s" : ""}`;
    };

    const handleDownload = (file: IProjectFile) => {
        if (file.url) {
            window.open(file.url, "_blank");
        }
    };

    // Submissions
    const latestSubmission: ISubmissionItem | undefined =
        taskData.submissions && taskData.submissions.length > 0
            ? taskData.submissions[taskData.submissions.length - 1]
            : undefined;

    const rawHostSubmissionLinks =
        latestSubmission?.links || (latestSubmission?.link ? [latestSubmission.link] : []);
    const hostSubmissionLinks: string[] = Array.isArray(rawHostSubmissionLinks)
        ? rawHostSubmissionLinks
            .map((item: any) => (typeof item === "string" ? item : item?.url || item?.link || ""))
            .filter((url: string) => Boolean(url && typeof url === "string"))
        : [];
    const hostSubmissionNote = latestSubmission?.note || latestSubmission?.description;
    const hasSubmission = Boolean(latestSubmission || isInReview || isChangesRequested || isCompleted);

    // Timeline calculation
    const getTimelineStepStatus = (stepIndex: number) => {
        if (isCompleted) return "done";

        let currentActive = 0;
        if (isPending) currentActive = 0;
        else if (isAwaitingPayment) currentActive = 1;
        else if (isTodo) currentActive = 2;
        else if (isInProgress || isChangesRequested) currentActive = 3;
        else if (hasSubmission && !isInReview) currentActive = 4;
        else if (isInReview) currentActive = 5;

        if (stepIndex < currentActive) return "done";
        if (stepIndex === currentActive) return "current";
        return "upcoming";
    };

    const handleFundEscrow = (type: string = "WALLET") => {
        fundTask.mutate({ source: type });
    };

    const timelineSteps = [
        {
            label: "Invitation Accepted",
            date: taskData.history?.find(
                (h) => h.to === "AWAITING_PAYMENT" || h.to === "TODO" || h.to === "IN_PROGRESS"
            )?.at
                ? new Date(
                    taskData.history.find(
                        (h) => h.to === "AWAITING_PAYMENT" || h.to === "TODO" || h.to === "IN_PROGRESS"
                    )!.at
                ).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
                : "",
            description: "",
        },
        {
            label: "Pending",
            date: "",
            description: isPending || isAwaitingPayment ? "Escrow funding required before talent begins" : "",
        },
        {
            label: "TODO",
            date: "",
            description: isTodo ? "Payment has been made and awaiting talent to start" : "",
        },
        {
            label: "In Progress",
            date: "",
            description: isInProgress ? "The Talent is currently working on the deliverables" : "",
        },
        {
            label: "Submitted",
            date: "",
            description: hasSubmission ? "Talent submitted work for review" : "",
        },
        {
            label: "In Review",
            date: "",
            description: isInReview ? "You review talent work" : "",
        },
        {
            label: "Completed",
            date: "",
            description: "Payment will be released to the talent once you approve the work",
        },
    ];

    // Header Title
    let headerTitle = `${talentName} has accepted your invitation`;
    if (isCancelled) {
        headerTitle = "Invitation Cancelled";
    } else if (isDeclined) {
        headerTitle = "Invitation Declined";
    } else if (isPending) {
        headerTitle = `Invitation sent to ${talentName}`;
    } else if (isTodo) {
        headerTitle = `Escrow Funded - Awaiting ${talentName} to Start`;
    }

    // Status description banner text
    let statusBannerText = `${talentName} has reviewed and accepted the terms of the engagement. The project is now ready to move forward to the funding stage.`;
    if (isCancelled) {
        statusBannerText = `You cancelled the invitation sent to ${talentName}.`;
    } else if (isDeclined) {
        statusBannerText = `${talentName} has reviewed and declined the terms of the engagement.`;
    } else if (isPending) {
        statusBannerText = `Your invitation has been sent to ${talentName} and is awaiting their response.`;
    } else if (isTodo) {
        statusBannerText = `Escrow is funded. Awaiting ${talentName} to click start and begin working on the deliverables.`;
    } else if (isInProgress) {
        statusBannerText = `${talentName} is currently working on the deliverables.`;
    } else if (isInReview) {
        statusBannerText = `${talentName} has submitted their work for review.`;
    } else if (isChangesRequested) {
        statusBannerText = `You have requested revisions on the submitted work.`;
    } else if (isCompleted) {
        statusBannerText = `This project has been approved and completed.`;
    }

    return (
        <div className="w-full h-fit max-h-full bg-transparent rounded-2xl overflow-y-auto scrollbar-hide pb-10 px-3 sm:px-6 lg:px-8 py-2 sm:py-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                <h1 className="text-[20px] sm:text-[24px] lg:text-[28px] font-bold text-gray-900 break-words">
                    {headerTitle}
                </h1>
                {/* {isPending && (
                    <Button
                        variant="bordered"
                        className="border-[#FF4245] text-[#FF4245] hover:bg-[#FF4245]/5 px-4 h-11 rounded-full font-medium shrink-0 self-start sm:self-auto"
                        onClick={onCancelOpen}
                        disabled={cancelMutation.isPending}
                        isLoading={cancelMutation.isPending}
                    >
                        Cancel Invitation
                    </Button>
                )} */}
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-start">
                {/* Left Column - Details */}
                <div className="flex-1 flex flex-col gap-6 w-full min-w-0">
                    {/* Submitted work card */}
                    {hasSubmission && (
                        <div className="border border-gray-100 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] rounded-2xl p-4 sm:p-6 lg:p-8 bg-white flex flex-col gap-6">
                            <h2 className="text-[18px] font-bold text-[#1C1C36]">Submitted work</h2>

                            {hostSubmissionLinks.length > 0 && (
                                <div className="flex flex-col gap-2">
                                    <h3 className="font-semibold text-[14px] text-[#414651]">
                                        {hostSubmissionLinks.length > 1 ? "Links" : "Link"}
                                    </h3>
                                    <div className="flex flex-col gap-1.5">
                                        {hostSubmissionLinks.map((link, idx) => (
                                            <a
                                                key={idx}
                                                href={link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[14px] text-[#596AFE] hover:underline flex items-center gap-1.5 w-fit max-w-full"
                                            >
                                                <span className="break-all">{link}</span>
                                                <RiExternalLinkLine size={16} className="shrink-0" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {hostSubmissionNote && (
                                <div className="flex flex-col gap-2">
                                    <h3 className="font-semibold text-[14px] text-[#414651]">Description</h3>
                                    <p className="text-[14px] text-gray-500 leading-relaxed whitespace-pre-wrap break-words">
                                        {hostSubmissionNote}
                                    </p>
                                </div>
                            )}

                            {latestSubmission?.files && latestSubmission.files.length > 0 && (
                                <div className="flex flex-col gap-3">
                                    <h3 className="font-semibold text-[14px] text-[#414651]">Submission Files</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {latestSubmission.files.map((file, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-4 bg-[#F8F9FE] rounded-lg">
                                                <div className="flex items-center gap-3 overflow-hidden pr-2">
                                                    <RiFileTextLine size={20} className="text-[#1C1C36] shrink-0" />
                                                    <span className="text-[13px] font-bold text-[#1C1C36] truncate">{file.name}</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDownload(file)}
                                                    className="text-gray-600 hover:text-gray-900 transition-colors p-1 shrink-0"
                                                    title="Download file"
                                                >
                                                    <RiDownloadLine size={20} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {!isCompleted && (
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 mt-2 w-full sm:w-auto sm:ml-auto">
                                    <CustomButton
                                        onClick={onRequestChangesOpen}
                                        variant="outline"
                                        height="48px"
                                        className="w-full sm:w-auto px-6 rounded-full border-[#596AFE] text-[#596AFE] hover:bg-[#596AFE]/5"
                                        isDisabled={requestChangesHostMutation.isPending || approveMutation.isPending}
                                    >
                                        Request Changes
                                    </CustomButton>
                                    <CustomButton
                                        height="48px"
                                        className="w-full sm:w-auto px-6 rounded-full bg-[#596AFE] text-white hover:bg-[#596AFE]/90"
                                        onClick={() => approveMutation.mutate()}
                                        isLoading={approveMutation.isPending}
                                        isDisabled={approveMutation.isPending || requestChangesHostMutation.isPending}
                                    >
                                        Approve Work
                                    </CustomButton>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="border border-gray-100 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] rounded-2xl p-4 sm:p-6 lg:p-8 bg-white flex flex-col gap-6">
                        <p className="text-[15px] font-bold text-[#1C1C36] leading-relaxed break-words">
                            {statusBannerText}
                        </p>

                        {!isDeclined && (
                            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-normal text-[#1C1C36] mt-4 break-words">{taskData.title}</h2>
                        )}

                        {isDeclined && (
                            <div className="mt-2 flex flex-col gap-5 items-start w-full">
                                <div>
                                    <h3 className="font-semibold text-gray-700">Reason</h3>
                                    <p className="text-[14px] text-gray-500 leading-relaxed break-words mt-1">
                                        {declineReason}
                                    </p>
                                </div>

                                {/* Challenge Winners / Top Talents to reassign */}
                                <div className="w-full flex flex-col gap-3 pt-2 border-t border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold text-[15px] text-[#1C1C36]">
                                            Reassign to Challenge Winner
                                        </h3>
                                    </div>
                                    <p className="text-[13px] text-gray-500 leading-relaxed">
                                        Select a talent below to reassign this project with the existing terms and deliverables.
                                    </p>

                                    {isLoadingStats ? (
                                        <div className="flex gap-3 overflow-x-auto py-2 w-full scrollbar-hide">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="min-w-[190px] h-[170px] bg-gray-100 rounded-xl animate-pulse shrink-0" />
                                            ))}
                                        </div>
                                    ) : availableWinners.length === 0 ? (
                                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-500 w-full text-center">
                                            No other participants found for this challenge.
                                        </div>
                                    ) : (
                                        <div className="flex gap-3 overflow-x-auto pb-3 pt-1 w-full scrollbar-hide">
                                            {availableWinners.map((winner) => {
                                                const isSelected = selectedTalentId === winner._id;
                                                const name = `${winner.firstName || ""} ${winner.lastName || ""}`.trim() || "Talent";

                                                return (
                                                    <div
                                                        key={winner._id}
                                                        onClick={() => handleSelectTalent(winner)}
                                                        className={`relative min-w-[190px] max-w-[210px] p-4 rounded-xl border transition-all cursor-pointer flex flex-col items-center text-center gap-2 select-none shrink-0 ${
                                                            isSelected
                                                                ? "border-[#596AFE] bg-[#EEF0FF]/60 shadow-sm ring-2 ring-[#596AFE]"
                                                                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-xs"
                                                        }`}
                                                    >
                                                        {isSelected && (
                                                            <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#596AFE] text-white flex items-center justify-center shadow-xs">
                                                                <RiCheckLine size={13} />
                                                            </div>
                                                        )}
                                                        <Avatar
                                                            size="lg"
                                                            src={winner.profilePicture || undefined}
                                                            name={name}
                                                            className="w-14 h-14 text-sm font-bold bg-[#EEF0FF] text-[#596AFE]"
                                                        />
                                                        <div className="w-full min-w-0">
                                                            <p className="font-bold text-[14px] text-[#1C1C36] truncate w-full" title={name}>
                                                                {name}
                                                            </p>
                                                            {typeof winner.normalizedScore === "number" && (
                                                                <span className="inline-block mt-1 text-[11px] font-semibold text-[#596AFE] bg-[#596AFE]/10 px-2.5 py-0.5 rounded-full">
                                                                    Score: {winner.normalizedScore}%
                                                                </span>
                                                            )}
                                                        </div>
                                                        {typeof winner.tasksCompleted === "number" && (
                                                            <p className="text-[11px] text-gray-400 mt-auto">
                                                                {winner.tasksCompleted} task{winner.tasksCompleted === 1 ? "" : "s"} completed
                                                            </p>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-2 w-full sm:w-auto">
                                    <CustomButton
                                        isDisabled={!selectedTalentId || reassignMutation.isPending}
                                        isLoading={reassignMutation.isPending}
                                        onClick={handleReassignTask}
                                    >
                                        {reassignMutation.isPending ? "Reassigning..." : "Choose Another Person"}
                                    </CustomButton>
                                </div>
                            </div>
                        )}

                        {!isDeclined && (
                            <div className="flex flex-col gap-2 bg-[#EEF0FF] p-4 sm:p-6 rounded-2xl">
                                <h3 className="font-semibold text-[14px] text-[#414651]">Timeline</h3>
                                <p className="text-[20px] sm:text-[24px] font-bold text-[#596AFE]">{formatTimeline(taskData.startDate, taskData.dueDate)}</p>
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <h3 className="font-semibold text-[14px] text-[#414651]">Description</h3>
                            <p className="text-[14px] text-gray-500 leading-relaxed whitespace-pre-wrap">
                                {taskData.description}
                            </p>
                        </div>

                        {taskData.deliverables && taskData.deliverables.length > 0 && (
                            <div className="flex flex-col gap-3">
                                <h3 className="font-semibold text-[14px] text-[#414651]">Deliverables</h3>
                                <ul className="flex flex-col gap-2">
                                    {taskData.deliverables.map((item, idx) => (
                                        <li key={idx} className="text-[14px] text-gray-500 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {taskData.projectFiles && taskData.projectFiles.length > 0 && (
                            <div className="flex flex-col gap-3">
                                <h3 className="font-semibold text-[14px] text-[#414651]">Project Files</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {taskData.projectFiles.map((file, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 bg-[#F8F9FE] rounded-lg">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <RiFileTextLine size={20} className="text-[#1C1C36] shrink-0" />
                                                <span className="text-[13px] font-bold text-[#1C1C36] truncate">{file.name}</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleDownload(file)}
                                                className="text-gray-600 hover:text-gray-900 transition-colors p-1"
                                                title="Download file"
                                            >
                                                <RiDownloadLine size={20} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Summary & Timeline */}
                <div className="w-full lg:w-[360px] shrink-0">
                    <div className="flex flex-col gap-4">
                        {/* Summary Block */}
                        <div className="bg-white p-4 sm:p-6 rounded-2xl space-y-6">
                            <div className="flex flex-col gap-0">
                                <h3 className="font-bold text-[#1C1C36] text-[18px] mb-6">Summary</h3>

                                <div className="flex justify-between items-center mb-6">
                                    <p className="text-[13px] font-bold text-[#1C1C36]">Amount</p>
                                    <p className="text-[13px] font-bold text-[#1C1C36]">{formatCurrency(amount)}</p>
                                </div>

                                <div className="flex justify-between items-center mb-6">
                                    <p className="text-[13px] font-bold text-[#1C1C36]">Platform fee (10%)</p>
                                    <p className="text-[13px] font-bold text-[#1C1C36]">{formatCurrency(platformFee)}</p>
                                </div>

                                <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                                    <p className="text-[14px] font-bold text-[#1C1C36]">Total Funded</p>
                                    <p className="text-[22px] sm:text-[28px] font-bold text-[#596AFE] break-words">{formatCurrency(totalFunded)}</p>
                                </div>
                            </div>

                            {/* State 1: Talent hasn't joined/accepted yet -> Cancel Option */}
                            {/* {isPending && (
                                <div className="flex flex-col gap-4 pt-6 border-t border-gray-100">
                                    <div className="text-sm font-semibold rounded-2xl space-y-2">
                                        <h3 className="font-bold text-[#1C1C36]">Awaiting Talent Response</h3>
                                        <p className="text-[13px] font-medium text-gray-600 leading-relaxed">
                                            The talent has not accepted the invitation yet. You can cancel this invitation if you wish to invite another talent.
                                        </p>
                                    </div>
                                    <Button
                                        variant="bordered"
                                        className="border-[#FF4245] text-[#FF4245] hover:bg-[#FF4245]/5 px-2 py-6 rounded-full font-medium"
                                        onPress={onCancelOpen}
                                        disabled={cancelMutation.isPending}
                                        isLoading={cancelMutation.isPending}
                                    >
                                        Cancel Invitation
                                    </Button>
                                </div>
                            )} */}
                            {isAwaitingPayment && (
                                <div className="flex flex-col gap-4 pt-6">
                                    <div className="text-sm font-semibold rounded-2xl space-y-2 bg-[#7A88FE]/10 border-[#7A88FE]/30 p-4">
                                        <h3 className="font-bold text-[#1C1C36]">What Happens next?</h3>
                                        <p className="text-[13px] font-medium text-gray-600 leading-relaxed">
                                            The total amount will be securely held in escrow. The talent will be able to start working once the escrow is funded.
                                        </p>
                                    </div>

                                    {/* Select Payment Method: Wallet vs Paystack */}
                                    <div className="flex flex-col gap-2">
                                        {/* <p className="text-[13px] font-bold text-[#1C1C36]">Select Payment Method</p> */}
                                        <div className="grid grid-cols-2 gap-2">
                                            {/* <button
                                                type="button"
                                                onClick={() => setPaymentMethod("WALLET")}
                                                className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border text-[13px] font-medium transition-all cursor-pointer ${
                                                    paymentMethod === "WALLET"
                                                        ? "border-[#5160E7] bg-[#5160E7]/10 text-[#5160E7] font-bold shadow-sm"
                                                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                                                }`}
                                            >
                                                <RiWallet3Line size={16} />
                                                <span>Wallet</span>
                                            </button> */}
                                            {/* <button
                                                type="button"
                                                onClick={() => setPaymentMethod("PAYSTACK")}
                                                className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border text-[13px] font-medium transition-all cursor-pointer ${
                                                    paymentMethod === "PAYSTACK"
                                                        ? "border-[#5160E7] bg-[#5160E7]/10 text-[#5160E7] font-bold shadow-sm"
                                                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                                                }`}
                                            >
                                                <RiBankCardLine size={16} />
                                                <span>Paystack</span>
                                            </button> */}
                                        </div>
                                    </div>

                                    <Button
                                        type="button"
                                        variant="solid"
                                        className="bg-[#5160E7] text-white px-2 py-6 rounded-full font-medium cursor-pointer w-full"
                                        onClick={() => handleFundEscrow(paymentMethod)}
                                        onPress={() => handleFundEscrow(paymentMethod)}
                                        isDisabled={fundTask.isPending}
                                        isLoading={fundTask.isPending}
                                    >
                                        Fund Escrow
                                    </Button>
                                </div>
                            )}

                            {isTodo && (
                                <div className="flex flex-col gap-4 pt-6">
                                    <div className="text-sm font-semibold rounded-2xl space-y-2 bg-[#7A88FE]/10 border-[#7A88FE]/30 p-4">
                                        <h3 className="font-bold text-[#1C1C36]">Awaiting Talent to Start</h3>
                                        <p className="text-[13px] font-medium text-gray-600 leading-relaxed">
                                            The escrow has been funded. The talent has been notified and will be able to start working once they click &apos;Start Task&apos;.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* State 2: Talent accepted -> Host can start task */}
                            {/* {isAwaitingPayment && (
                                <div className="flex flex-col gap-4 pt-6 border-t border-gray-100">
                                    <div className="text-sm font-semibold rounded-2xl space-y-2">
                                        <h3 className="font-bold text-[#1C1C36]">What Happens Next?</h3>
                                        <p className="text-[13px] font-medium text-[#1C1C36] leading-relaxed">
                                            The total amount will be securely held in escrow. The talent will be able to start working once the escrow is funded.
                                        </p>
                                    </div>
                                    <Button
                                        variant="solid"
                                        className="bg-[#5160E7] px-2 py-6 rounded-full text-white font-medium"
                                        onClick={() => startMutation.mutate()}
                                        disabled={startMutation.isPending}
                                        isLoading={startMutation.isPending}
                                    >
                                        {startMutation.isPending ? "Starting..." : "Start Task"}
                                    </Button>
                                </div>
                            )} */}

                            {/* Current Status Timeline */}
                            {!isDeclined && (
                                <div className="flex flex-col gap-0 mt-4">
                                    <h3 className="font-bold text-[#1C1C36] text-[18px] mb-6">Current Status</h3>
                                    <div className="flex flex-col">
                                        {timelineSteps.map((step, idx) => {
                                             const stepStatus = getTimelineStepStatus(idx);
                                             const isLast = idx === timelineSteps.length - 1;

                                             return (
                                                 <div key={idx} className="flex gap-4">
                                                     <div className="flex flex-col items-center">
                                                         <div
                                                             className={`w-6 h-6 rounded-full flex items-center justify-center z-10 shrink-0 ${stepStatus === "done"
                                                                     ? "bg-[#596AFE] text-white"
                                                                     : stepStatus === "current"
                                                                         ? "bg-[#596AFE] text-white"
                                                                         : "bg-white border-2 border-gray-300"
                                                                 }`}
                                                         >
                                                             {stepStatus === "done" && <RiCheckLine size={14} />}
                                                         </div>
                                                         {!isLast && (
                                                             <div
                                                                 className={`w-[2px] h-full my-1 ${stepStatus === "done" ? "bg-[#596AFE]" : "bg-gray-300"
                                                                     }`}
                                                             />
                                                         )}
                                                     </div>
                                                     <div className={`pb-8 ${isLast ? "pb-0" : ""} flex-1 min-w-0`}>
                                                         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline w-full gap-1">
                                                             <h4
                                                                 className={`text-[14px] font-bold break-words ${stepStatus === "upcoming"
                                                                         ? "text-gray-500"
                                                                         : stepStatus === "current"
                                                                             ? "text-[#596AFE]"
                                                                             : "text-[#1C1C36]"
                                                                     }`}
                                                             >
                                                                 {step.label}
                                                             </h4>
                                                             {step.date && (
                                                                 <span className="text-[12px] text-gray-500 font-medium sm:whitespace-nowrap sm:ml-2">
                                                                     {step.date}
                                                                 </span>
                                                             )}
                                                         </div>
                                                         {step.description && (
                                                             <p className="text-[13px] text-gray-500 mt-1 max-w-full leading-snug break-words">
                                                                 {step.description}
                                                             </p>
                                                         )}
                                                     </div>
                                                 </div>
                                             );
                                         })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* About Talent */}
                        <div className="flex flex-col gap-4 mt-4 bg-white p-4 sm:p-6 rounded-2xl">
                            <h3 className="font-bold text-[#1C1C36] text-[18px]">About Talent</h3>
                            <div className="border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <div className="w-10 h-10 rounded-full bg-[#596AFE]/10 text-[#596AFE] flex items-center justify-center font-bold text-sm shrink-0">
                                        {talentName.charAt(0) || "T"}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <p className="text-[14px] font-bold text-[#1C1C36] truncate">{talentName}</p>
                                        <p className="text-[12px] text-gray-500 truncate">{challengeData?.title || "Talent"}</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (taskData.talent?._id) {
                                            router.push(`/dashboard/profile/${taskData.talent._id}`);
                                        }
                                    }}
                                    className="text-[13px] font-medium text-[#596AFE] border border-[#596AFE] rounded-full px-3 py-1 hover:bg-white transition-colors bg-transparent self-end sm:self-auto shrink-0"
                                >
                                    View Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Request Changes Modal */}
            <Modal isOpen={isRequestChangesOpen} onOpenChange={onRequestChangesOpenChange} size="md" classNames={{ base: "max-w-[92vw] sm:max-w-md mx-auto" }}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 pb-2 pt-6 px-4 sm:px-6">
                                <h2 className="text-[18px] sm:text-[20px] font-bold text-[#1C1C36]">Request Changes</h2>
                            </ModalHeader>
                            <ModalBody className="px-4 sm:px-6 py-2">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[14px] font-medium text-[#414651]">Feedback / Notes</label>
                                    <textarea
                                        value={changeNotes}
                                        onChange={(e) => setChangeNotes(e.target.value)}
                                        className="w-full min-h-[140px] p-3 sm:p-4 border border-gray-200 rounded-xl resize-none text-[14px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#596AFE] focus:ring-1 focus:ring-[#596AFE]"
                                        placeholder="Detail the changes you are requesting regarding the submission..."
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter className="px-4 sm:px-6 pb-6 pt-4 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
                                <Button variant="light" radius="full" onClick={onClose} disabled={requestChangesHostMutation.isPending} className="w-full sm:w-auto">
                                    Cancel
                                </Button>
                                <CustomButton
                                    className="bg-[#596AFE] text-white px-6 rounded-full w-full sm:w-auto"
                                    onClick={() => handleSendRequestChanges(onClose)}
                                    isLoading={requestChangesHostMutation.isPending}
                                    isDisabled={requestChangesHostMutation.isPending}
                                >
                                    Send Request
                                </CustomButton>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* Cancel Invitation Confirmation Modal */}
            <Modal isOpen={isCancelOpen} onOpenChange={onCancelOpenChange} size="md" classNames={{ base: "max-w-[92vw] sm:max-w-md mx-auto" }}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex items-center gap-2 pb-2 pt-6 px-4 sm:px-6">
                                <h2 className="text-[18px] sm:text-[20px] font-bold text-[#1C1C36]">Cancel Invitation</h2>
                            </ModalHeader>
                            <ModalBody className="px-4 sm:px-6 py-2">
                                <p className="text-[14px] text-gray-600 leading-relaxed text-center sm:text-left">
                                    Are you sure you want to cancel the invitation sent to{" "}
                                    <span className="font-semibold text-gray-900">{talentName}</span>?
                                    The talent will no longer be able to accept it and the project will be marked as cancelled.
                                </p>
                            </ModalBody>
                            <ModalFooter className="px-4 sm:px-6 pb-6 pt-4 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
                                <Button
                                    variant="solid"
                                    radius="full"
                                    onPress={onClose}
                                    disabled={cancelMutation.isPending}
                                    className="w-full sm:w-auto"
                                >
                                    Keep Invitation
                                </Button>
                                <Button
                                    className="bg-[#FF4245] text-white px-6 rounded-full font-medium w-full sm:w-auto"
                                    isLoading={cancelMutation.isPending}
                                    onClick={() => {
                                        cancelMutation.mutate(undefined, {
                                            onSuccess: () => {
                                                onClose();
                                            },
                                        });
                                    }}
                                >
                                    Yes, Cancel
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
