"use client";

import { useSearchParams, useRouter, useParams } from "next/navigation";
import { CustomButton } from "@/components/custom";
import {
    RiDownloadLine,
    RiFileTextLine,
    RiCheckLine,
    RiUploadCloudLine,
    RiExternalLinkLine,
} from "react-icons/ri";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Textarea,
    Input,
    Spinner,
} from "@heroui/react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useFetchData } from "@/hook/useFetchData";
import { useTalentTask } from "@/hook/useTalentTask";
import { IChallenge } from "@/helper/model/challenge";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";
import StorageClass from "@/dal/storage/StorageClass";
import { STORAGE_KEYS } from "@/dal/storage/StorageKeys";
import { addToast } from "@heroui/toast";
import { IProjectFile } from "@/types/talentTask";

export default function TalentInvitationPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const params = useParams();
    const taskId = params.id as string;

    const [userState] = useAtom(userAtom);
    const loggedInUserId =
        userState?.data?._id ||
        StorageClass.getValue<string>(STORAGE_KEYS.USERID, { isJSON: false }) ||
        StorageClass.getValue<any>(STORAGE_KEYS.USER_DETAILS, { isJSON: true })?._id;

    // --- Task Details & Centralized Mutations ---
    const {
        taskData,
        isTaskLoading,
        refetchTask,
        startMutation,
        acceptMutation,
        declineMutation,
        requestChangesTalentMutation,
        submitWorkMutation,
        uploadFiles,
    } = useTalentTask(taskId);

    // Guard: If current user is the host/creator, route to the host status page
    useEffect(() => {
        if (taskData && loggedInUserId) {
            const createdById =
                typeof taskData.createdBy === "object"
                    ? (taskData.createdBy as any)?._id
                    : taskData.createdBy;
            if (createdById && String(createdById) === String(loggedInUserId)) {
                router.replace(`/dashboard/tasks_manager/${taskId}/status`);
            }
        }
    }, [taskData, loggedInUserId, taskId, router]);

    // --- Dependent Challenge Details ---
    const challengeId = taskData?.challenge?._id;
    const { data: challengeData } = useFetchData<IChallenge>({
        endpoint: `/challenge/single/${challengeId}`,
        name: `challengeDetails-${challengeId}`,
        enable: Boolean(challengeId),
    });

    // Modal states
    const { isOpen: isAcceptOpen, onOpen: onAcceptOpen, onOpenChange: onAcceptChange } = useDisclosure();
    const { isOpen: isDeclineOpen, onOpen: onDeclineOpen, onOpenChange: onDeclineChange } = useDisclosure();
    const { isOpen: isRequestOpen, onOpen: onRequestOpen, onOpenChange: onRequestChange } = useDisclosure();

    // Strict status from endpoint data
    const rawEndpointStatus = taskData?.status?.toUpperCase() || "";

    // Status mapping:
    // PENDING -> awaiting talent accept
    // AWAITING_PAYMENT -> talent accepted, awaiting host to fund escrow
    // TODO -> escrow funded by host, awaiting talent to start task
    // IN_PROGRESS -> talent started task
    const effectiveApiStatus =
        rawEndpointStatus === "AWAITING_PAYMENT"
            ? "awaiting_payment"
            : rawEndpointStatus === "TODO"
            ? "todo"
            : rawEndpointStatus === "IN_PROGRESS"
            ? "in_progress"
            : rawEndpointStatus === "SUBMITTED" || rawEndpointStatus === "IN_REVIEW"
            ? "submitted"
            : rawEndpointStatus === "CHANGES_REQUESTED"
            ? "changes_requested"
            : rawEndpointStatus === "COMPLETED"
            ? "completed"
            : rawEndpointStatus === "DECLINED" || rawEndpointStatus === "CANCELLED"
            ? "declined"
            : "pending";

    const mockOverride = searchParams.get("mockStatus");
    const status = mockOverride
        ? mockOverride === "in_review"
            ? "submitted"
            : mockOverride
        : effectiveApiStatus;

    // Local form toggle state for 'in_progress' to show the submit form
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Re-calculate effective status
    const effectiveStatus = isSubmitting ? "submitting" : status;

    const isPending = effectiveStatus === "pending";
    const isAwaitingPayment = effectiveStatus === "awaiting_payment" || rawEndpointStatus === "AWAITING_PAYMENT";
    const isTodo = effectiveStatus === "todo" || rawEndpointStatus === "TODO";
    const isAccepted = isAwaitingPayment || isTodo;
    const isInProgress = effectiveStatus === "in_progress";
    const isChangesRequested = effectiveStatus === "changes_requested";
    const isSubmitted =
        effectiveStatus === "submitted" || effectiveStatus === "completed" || isChangesRequested;
    const isCompleted = effectiveStatus === "completed";
    const isDeclined = effectiveStatus === "declined";

    // Talent can start task ONLY when status is "TODO" (after host has funded escrow)
    const canStartTask = isTodo;

    // Header logic
    let pageHeader = "You've been invited to work with a host";
    if (isAwaitingPayment) pageHeader = "Invitation Accepted - Awaiting Escrow Funding";
    if (isTodo) pageHeader = "Escrow Funded - Ready to Start";
    if (isInProgress) pageHeader = "Project In Progress";
    if (effectiveStatus === "submitting") pageHeader = "Submit Work";
    if (isSubmitted) pageHeader = "Submitted Work";
    if (isDeclined) pageHeader = "Invitation Declined / Cancelled";

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

    // Confirm status from endpoint: timer MUST ONLY count down when project is active
    const isConfirmedInProgress =
        rawEndpointStatus === "IN_PROGRESS" ||
        rawEndpointStatus === "CHANGES_REQUESTED" ||
        rawEndpointStatus === "SUBMITTED" ||
        rawEndpointStatus === "IN_REVIEW";

    const isTerminalStatus =
        rawEndpointStatus === "COMPLETED" ||
        rawEndpointStatus === "DECLINED" ||
        rawEndpointStatus === "CANCELLED";

    // Calculate countdown: The timer should NOT start until status changes to "IN_PROGRESS"
    const [timeLeft, setTimeLeft] = useState({ days: 14, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        if (!taskData?.dueDate) return;

        // Terminal status: project finished or cancelled -> 0 time left
        if (isTerminalStatus) {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            return;
        }

        // Pre-start: hold static project duration until host funds escrow & status becomes IN_PROGRESS
        if (!isConfirmedInProgress) {
            if (taskData.startDate && taskData.dueDate) {
                const start = new Date(taskData.startDate).getTime();
                const due = new Date(taskData.dueDate).getTime();
                if (!isNaN(start) && !isNaN(due) && due > start) {
                    const totalDiff = due - start;
                    const days = Math.floor(totalDiff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((totalDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((totalDiff % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((totalDiff % (1000 * 60)) / 1000);
                    setTimeLeft({ days, hours, minutes, seconds });
                    return;
                }
            }
            setTimeLeft({ days: 14, hours: 0, minutes: 0, seconds: 0 });
            return;
        }

        // Active project strictly in progress: countdown to dueDate
        const target = new Date(taskData.dueDate).getTime();
        const start = taskData.startDate ? new Date(taskData.startDate).getTime() : NaN;

        if (isNaN(target)) {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            return;
        }

        const updateTimer = () => {
            const now = Date.now();
            let difference = target - now;
            if (difference <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            if (!isNaN(start) && target > start) {
                const totalDuration = target - start;
                if (difference > totalDuration) {
                    difference = totalDuration;
                }
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            setTimeLeft({ days, hours, minutes, seconds });
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [taskData?.dueDate, taskData?.startDate, taskData?.status, isConfirmedInProgress, isTerminalStatus, rawEndpointStatus]);

    // --- Timeline Steps Logic ---
    const getTimelineStepStatus = (stepIndex: number) => {
        let currentIndex = 0;

        if (isAwaitingPayment || effectiveStatus === "accepted") currentIndex = 1;
        if (isTodo) currentIndex = 2;
        if (effectiveStatus === "in_progress" || effectiveStatus === "submitting") currentIndex = 3;
        if (effectiveStatus === "submitted" || isChangesRequested) currentIndex = 4;
        if (effectiveStatus === "in_review") currentIndex = 5;
        if (effectiveStatus === "completed") currentIndex = 6;

        if (stepIndex < currentIndex) return "done";
        if (stepIndex === currentIndex) return "current";
        return "upcoming";
    };

    const formatDateStr = (dateStr?: string) => {
        if (!dateStr) return "";
        try {
            return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
        } catch {
            return dateStr;
        }
    };

    const timelineSteps = [
        { label: "Invitation Accepted", date: formatDateStr(taskData?.createdAt), description: "" },
        { label: "Pending", date: effectiveStatus !== "pending" ? formatDateStr(taskData?.startDate) : "", description: "The host will fund the escrow to activate the project." },
        { label: "TODO", date: "", description: isTodo ? "Payment has been made and awaiting talent to start." : "" },
        { label: "In Progress", date: isSubmitted ? formatDateStr(taskData?.startDate) : "", description: "You'll be able to start working once the escrow is funded." },
        { label: "Submitted", date: isSubmitted ? formatDateStr(taskData?.dueDate) : "", description: "Submit your work for review" },
        { label: "In Review", date: "", description: "Wait for the host to review your work" },
        { label: "Completed", date: "", description: "Payment will be released once the host approves your work" },
    ];

    // --- Form & File Drag Logic ---
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [submitLink, setSubmitLink] = useState("");
    const [submitDescription, setSubmitDescription] = useState("");
    const [submitFiles, setSubmitFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    // Decline & Request Change States
    const [declineReason, setDeclineReason] = useState("");
    const [talentRequestReason, setTalentRequestReason] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setSubmitFiles((prev) => [...prev, ...files]);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) {
            const files = Array.from(e.dataTransfer.files);
            setSubmitFiles((prev) => [...prev, ...files]);
        }
    };

    const handleSubmitWork = async () => {
        if (!submitLink.trim() && !submitDescription.trim() && submitFiles.length === 0) {
            addToast({
                title: "Validation Error",
                description: "Please provide a link, description, or attach project files.",
                color: "warning",
            });
            return;
        }

        setIsUploading(true);
        let uploadedFiles: IProjectFile[] = [];

        try {
            if (submitFiles.length > 0) {
                uploadedFiles = await uploadFiles(submitFiles);
            }
        } catch {
            setIsUploading(false);
            return;
        }

        setIsUploading(false);

        // Ensure links is strictly an array of strings
        const links: string[] = submitLink.trim()
            ? submitLink
                  .split(/[\n,]/)
                  .map((l) => l.trim())
                  .filter(Boolean)
            : [];

        submitWorkMutation.mutate(
            {
                note: submitDescription.trim(),
                links,
                files: uploadedFiles,
            },
            {
                onSuccess: () => {
                    setIsSubmitting(false);
                    setSubmitLink("");
                    setSubmitDescription("");
                    setSubmitFiles([]);
                },
            }
        );
    };

    // Derived dynamic fields
    const taskTitle = taskData?.title || "Project Details";
    const taskAmount = taskData?.compensation?.amount ?? taskData?.totalCharged ?? 0;
    const taskTimeline = formatTimeline(taskData?.startDate, taskData?.dueDate);
    const taskDescription = taskData?.description || "";
    const taskDeliverables = taskData?.deliverables || [];
    const taskFiles = taskData?.projectFiles || [];

    // Latest submitted work
    const latestSubmission =
        taskData?.submissions && taskData.submissions.length > 0
            ? taskData.submissions[taskData.submissions.length - 1]
            : null;

    const rawSubmissionLinks =
        latestSubmission?.links || (latestSubmission?.link ? [latestSubmission.link] : []);
    const submissionLinks: string[] = Array.isArray(rawSubmissionLinks)
        ? rawSubmissionLinks
              .map((item: any) => (typeof item === "string" ? item : item?.url || item?.link || ""))
              .filter((url: string) => Boolean(url && typeof url === "string"))
        : [];
    const submissionNote = latestSubmission?.note || latestSubmission?.description || taskDescription;

    // Challenge details for reference
    const challengeTitle = challengeData?.title || taskData?.challenge?.title || "Reference Challenge";
    const rawThumbnail = challengeData?.thumbnail || taskData?.challenge?.thumbnail;
    const challengeThumbnail = rawThumbnail
        ? rawThumbnail.startsWith("http")
            ? rawThumbnail
            : `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || "ryzly-apps"}.s3.${
                  process.env.NEXT_PUBLIC_AWS_REGION || "eu-north-1"
              }.amazonaws.com/${rawThumbnail}`
        : "/images/avatar-1.png";

    // --- Extracted Project Details Component ---
    const ProjectDetailsCard = () => {
        let badge = null;
        if (isAccepted)
            badge = (
                <span className="text-[#DC6803] border border-[#DC6803] px-3 py-1 rounded-full text-xs font-medium">
                    Pending
                </span>
            );
        if (isInProgress || effectiveStatus === "submitting")
            badge = (
                <span className="text-[#414651] border border-[#A4A7AE] px-3 py-1 rounded-full text-xs font-medium">
                    In Progress
                </span>
            );
        if (isSubmitted)
            badge = (
                <span className="text-[#414651] border border-[#A4A7AE] px-3 py-1 rounded-full text-xs font-medium">
                    In Review
                </span>
            );

        return (
            <div className="flex-1 flex flex-col gap-6 w-full border border-gray-100 shadow rounded-2xl p-4 sm:p-6 lg:p-8 bg-white min-w-0">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-bold text-[#1C1C36] break-words">{taskTitle}</h2>
                    <div className="shrink-0">{badge}</div>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap gap-6 sm:gap-12 lg:gap-16 mt-2 bg-[#F4F6FF] p-4 sm:px-6 sm:py-4 rounded-2xl">
                    <div className="flex flex-col gap-1 sm:gap-2 min-w-0">
                        <p className="text-[13px] sm:text-[14px] font-medium text-[#414651]">Amount</p>
                        <p className="text-[20px] sm:text-[24px] font-bold text-[#596AFE] break-words">{formatCurrency(taskAmount)}</p>
                    </div>
                    <div className="flex flex-col gap-1 sm:gap-2 min-w-0">
                        <p className="text-[13px] sm:text-[14px] font-medium text-[#414651]">Timeline</p>
                        <p className="text-[20px] sm:text-[24px] font-bold text-[#596AFE] break-words">{taskTimeline}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-[#414651]">Description</h3>
                    <p className="text-[14px] text-gray-500 leading-relaxed whitespace-pre-wrap break-words">{taskDescription}</p>
                </div>

                {taskDeliverables.length > 0 && (
                    <div className="flex flex-col gap-2">
                        <h3 className="font-semibold text-[#414651]">Deliverables</h3>
                        <ul className="flex flex-col gap-2">
                            {taskDeliverables.map((item, idx) => (
                                <li key={idx} className="text-[14px] text-gray-500 flex items-start gap-2 break-words">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {taskFiles.length > 0 && (
                    <div className="mt-2 flex flex-col gap-3">
                        <h3 className="font-semibold text-[#414651]">Project Files</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {taskFiles.map((file, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 sm:p-4 bg-[#F8F9FE] rounded-lg">
                                    <div className="flex items-center gap-3 overflow-hidden pr-2">
                                        <RiFileTextLine size={20} className="text-[#1C1C36] shrink-0" />
                                        <span className="text-[13px] font-bold text-[#1C1C36] truncate">{file.name}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => window.open(file.url, "_blank")}
                                        className="text-gray-600 hover:text-gray-900 transition-colors shrink-0"
                                    >
                                        <RiDownloadLine size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {isPending && (
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-8 pt-6 border-t border-gray-100">
                        <Button
                            onClick={onDeclineOpen}
                            className="w-full sm:flex-1 bg-white border border-[#FF4245] text-[#FF4245] rounded-full h-12 font-medium hover:bg-[#FF4245]/5 transition-colors"
                        >
                            Decline Invitation
                        </Button>
                        <CustomButton
                            isLoading={acceptMutation.isPending}
                            height="48px"
                            onClick={() =>
                                acceptMutation.mutate(undefined, {
                                    onSuccess: () => {
                                        onAcceptOpen();
                                    },
                                })
                            }
                            className="w-full sm:flex-1 bg-[#596AFE] text-white rounded-full hover:bg-[#596AFE]/90"
                        >
                            Accept Invitation
                        </CustomButton>
                    </div>
                )}
            </div>
        );
    };

    if (isTaskLoading || !taskData) {
        return (
            <div className="w-full h-full min-h-[500px] flex items-center justify-center">
                <Spinner color="primary" label="Loading task details..." />
            </div>
        );
    }

    const createdById =
        typeof taskData.createdBy === "object"
            ? (taskData.createdBy as any)?._id
            : taskData.createdBy;
    if (loggedInUserId && createdById && String(createdById) === String(loggedInUserId)) {
        return (
            <div className="w-full h-full min-h-[500px] flex items-center justify-center">
                <Spinner size="lg" color="primary" label="Redirecting to host view..." />
            </div>
        );
    }

    return (
        <div className="w-full h-fit max-h-full px-3 sm:px-6 lg:px-8 py-3 sm:py-6 overflow-y-auto scrollbar-hide">
            <h1 className="text-[20px] sm:text-[24px] lg:text-[28px] font-bold text-[#1E293B] mb-6 sm:mb-8 break-words">{pageHeader}</h1>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
                {/* Left Column - Details */}
                <div className="flex-1 flex flex-col gap-6 w-full min-w-0">
                    {/* Dynamic Top Cards */}
                    {isInProgress && (
                        <div className="border border-gray-100 shadow rounded-2xl p-4 sm:p-6 lg:p-8 bg-white flex flex-col gap-6 min-w-0">
                            <h2 className="text-[18px] font-bold text-[#1C1C36]">Submit your work</h2>
                            <p className="text-[14px] text-gray-500">
                                Once you've completed the project, upload your files and submit for the host's review.
                            </p>
                            <div className="flex justify-end mt-4">
                                <CustomButton
                                    onClick={() => setIsSubmitting(true)}
                                    height="48px"
                                    className="w-full sm:w-auto px-8 bg-[#596AFE] text-white rounded-full font-medium"
                                >
                                    Submit Work
                                </CustomButton>
                            </div>
                        </div>
                    )}

                    {effectiveStatus === "submitting" && (
                        <div className="border border-gray-100 shadow rounded-2xl p-4 sm:p-6 lg:p-8 bg-white flex flex-col gap-6 min-w-0">
                            <div className="flex flex-col gap-2">
                                <label className="text-[14px] font-medium text-gray-700">Link</label>
                                <input
                                    value={submitLink}
                                    onChange={(e) => setSubmitLink(e.target.value)}
                                    className="w-full h-12 px-4 border border-gray-200 rounded-xl text-[14px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#596AFE]"
                                    placeholder="Enter link (or comma-separated links)"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[14px] font-medium text-gray-700">Description</label>
                                <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#596AFE]">
                                    <textarea
                                        value={submitDescription}
                                        onChange={(e) => setSubmitDescription(e.target.value)}
                                        className="w-full min-h-[140px] p-3 sm:p-4 resize-none text-[14px] text-gray-700 focus:outline-none"
                                        placeholder="Describe your submission..."
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[14px] font-medium text-gray-700">Upload Files</label>
                                <div
                                    className={`w-full border-2 border-dashed rounded-xl p-6 sm:p-10 flex flex-col items-center justify-center cursor-pointer transition-colors text-center ${
                                        isDragging ? "border-[#596AFE] bg-[#EEF0FF]" : "border-[#B0B7FF] bg-white hover:bg-gray-50"
                                    }`}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setIsDragging(true);
                                    }}
                                    onDragLeave={() => setIsDragging(false)}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        multiple
                                        accept=".pdf,.docx,.doc,image/*"
                                        onChange={handleFileChange}
                                    />
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#EEF0FF] text-[#596AFE] rounded-full flex items-center justify-center mb-3 sm:mb-4">
                                        <RiUploadCloudLine size={28} />
                                    </div>
                                    <p className="font-semibold text-gray-800 text-[14px] sm:text-[15px] mb-1">Click to upload or drag and drop</p>
                                    <p className="text-gray-500 text-xs">PDF, DOCX, Images (max 50MB)</p>
                                </div>

                                {submitFiles.length > 0 && (
                                    <div className="flex flex-col gap-2 mt-2">
                                        {submitFiles.map((file, idx) => (
                                             <div
                                                 key={idx}
                                                 className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm gap-2"
                                             >
                                                 <span className="truncate max-w-[80%] font-medium text-gray-800">{file.name}</span>
                                                 <button
                                                     type="button"
                                                     onClick={() => setSubmitFiles((prev) => prev.filter((_, i) => i !== idx))}
                                                     className="text-red-500 hover:text-red-700 text-xs font-semibold shrink-0"
                                                 >
                                                     Remove
                                                 </button>
                                             </div>
                                         ))}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-4">
                                <CustomButton
                                    onClick={() => setIsSubmitting(false)}
                                    variant="outline"
                                    height="48px"
                                    className="w-full sm:w-auto px-8 border-[#596AFE] text-[#596AFE] rounded-full font-medium"
                                >
                                    Cancel
                                </CustomButton>
                                <CustomButton
                                    isLoading={submitWorkMutation.isPending || isUploading}
                                    onClick={handleSubmitWork}
                                    height="48px"
                                    className="w-full sm:w-auto px-8 bg-[#596AFE] text-white rounded-full font-medium"
                                >
                                    Submit Work
                                </CustomButton>
                            </div>
                        </div>
                    )}

                    {isSubmitted && (
                        <div className="border border-gray-100 shadow rounded-2xl p-4 sm:p-6 lg:p-8 bg-white flex flex-col gap-6 min-w-0">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <h2 className="text-[18px] font-bold text-[#1C1C36]">Submit your work</h2>
                                {isChangesRequested && (
                                    <span className="text-[#DC6803] border border-[#DC6803] px-3 py-1 rounded-full text-[12px] font-medium bg-white">
                                        Change Requested
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="font-medium text-[14px] text-[#414651]">
                                    {submissionLinks.length > 1 ? "Links" : "Link"}
                                </h3>
                                {submissionLinks.length > 0 ? (
                                    <div className="flex flex-col gap-1.5">
                                        {submissionLinks.map((linkUrl, idx) => (
                                            <a
                                                key={idx}
                                                href={linkUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[14px] text-[#596AFE] underline hover:opacity-80 break-all flex items-center gap-1.5 max-w-full"
                                            >
                                                <span>{linkUrl}</span>
                                                <RiExternalLinkLine size={16} className="shrink-0" />
                                            </a>
                                        ))}
                                    </div>
                                ) : (
                                    <span className="text-[14px] text-gray-400">No link provided</span>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="font-medium text-[14px] text-[#414651]">Description</h3>
                                <p className="text-[14px] text-[#414651] leading-relaxed whitespace-pre-line break-words">
                                    {submissionNote}
                                </p>
                            </div>
                            {latestSubmission?.files && latestSubmission.files.length > 0 && (
                                <div className="flex flex-col gap-3">
                                    <h3 className="font-medium text-[14px] text-[#414651]">Project Files</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {latestSubmission.files.map((file, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center justify-between p-3 sm:p-4 bg-[#F8F9FE] rounded-lg"
                                            >
                                                <div className="flex items-center gap-3 overflow-hidden pr-2">
                                                    <RiFileTextLine size={20} className="text-[#1C1C36] shrink-0" />
                                                    <span className="text-[13px] font-bold text-[#1C1C36] truncate">
                                                        {file.name}
                                                    </span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => window.open(file.url, "_blank")}
                                                    className="text-gray-600 hover:text-gray-900 transition-colors shrink-0"
                                                >
                                                    <RiDownloadLine size={20} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {isChangesRequested && (
                                <>
                                    <div className="flex flex-col gap-2 mt-2 bg-[#FFF9F2] p-4 rounded-xl border border-[#FFE2C2]">
                                        <h3 className="font-bold text-[15px] text-[#DC6803]">Requested Changes</h3>
                                        <p className="text-[14px] text-[#414651] leading-relaxed break-words">
                                            {(taskData?.history?.slice().reverse().find((h) => (h as any)?.feedback) as any)?.feedback ||
                                                (taskData as any)?.feedback ||
                                                taskData?.history?.slice().reverse().find((h) => h.reason)?.reason ||
                                                (taskData?.history?.slice().reverse().find((h) => (h as any)?.note) as any)?.note ||
                                                (taskData as any)?.changeRequestNote ||
                                                "Please review the feedback and update your submission."}
                                        </p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-4">
                                        <CustomButton
                                            variant="outline"
                                            height="48px"
                                            className="w-full sm:w-auto px-6 rounded-full border-[#596AFE] text-[#596AFE] hover:bg-[#596AFE]/5"
                                            onClick={() => setIsSubmitting(true)}
                                        >
                                            Update Submission
                                        </CustomButton>
                                        <CustomButton
                                            height="48px"
                                            className="w-full sm:w-auto px-6 rounded-full bg-[#596AFE] text-white hover:bg-[#596AFE]/90"
                                            onClick={() => setIsSubmitting(true)}
                                        >
                                            Send Response
                                        </CustomButton>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {effectiveStatus !== "submitting" && <ProjectDetailsCard />}
                </div>

                {/* Right Column - Actions / Timeline */}
                <div className={cn("w-full lg:w-[380px] xl:w-[400px] shrink-0 bg-white rounded-2xl shadow p-4 sm:p-6")}>
                    <div className="sticky top-6 flex flex-col gap-6 sm:gap-8">
                        {isPending && (
                            <>
                                <div className="flex flex-col gap-3">
                                    <h3 className="font-bold text-[#1C1C36] text-[16px]">Reference Challenge</h3>
                                    <div className="flex items-start gap-4">
                                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-200 relative">
                                            <img
                                                src={challengeThumbnail}
                                                alt="Challenge Thumbnail"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    (e.currentTarget as HTMLImageElement).src = "/images/avatar-1.png";
                                                }}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2 items-start min-w-0">
                                            <p className="text-[14px] font-bold text-[#1C1C36] line-clamp-2">{challengeTitle}</p>
                                            {challengeId && (
                                                <Button
                                                    onClick={() => router.push(`/dashboard/challenges/${challengeId}`)}
                                                    className="bg-transparent border border-[#596AFE] text-[#596AFE] px-4 py-1.5 rounded-full font-medium text-[13px] hover:bg-[#596AFE]/5 transition-colors h-auto min-h-0"
                                                >
                                                    View Challenge
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <div className="bg-[#EEF0FF] p-4 sm:p-5 rounded-xl flex flex-col gap-2">
                                        <p className="text-[14px] font-bold text-[#1C1C36]">What Happens Next?</p>
                                        <p className="text-[13px] text-[#1C1C36] leading-[1.5]">
                                            Once you accept, the host will be notified and the project will move to the next stage. You will be able to start once the host funds the escrow.
                                        </p>
                                    </div>

                                    <div className="flex gap-3 items-start mt-2">
                                        <div className="w-5 h-5 rounded-full bg-[#596AFE] text-white flex items-center justify-center shrink-0 mt-0.5">
                                            <RiCheckLine size={14} />
                                        </div>
                                        <p className="text-[13px] text-gray-700 leading-snug">
                                            You will start working after the host funds the escrow.
                                        </p>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <div className="w-5 h-5 rounded-full bg-[#596AFE] text-white flex items-center justify-center shrink-0 mt-0.5">
                                            <RiCheckLine size={14} />
                                        </div>
                                        <p className="text-[13px] text-gray-700 leading-snug">
                                            If the scope, timeline or amount needs adjustment, you can request changes.
                                        </p>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <div className="w-5 h-5 rounded-full bg-[#596AFE] text-white flex items-center justify-center shrink-0 mt-0.5">
                                            <RiCheckLine size={14} />
                                        </div>
                                        <p className="text-[13px] text-gray-700 leading-snug">
                                            If you are not interested, you can decline this invitation.
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}

                        {isAwaitingPayment && (
                            <div className="bg-[#EEF0FF] p-4 sm:p-5 rounded-xl flex flex-col gap-2">
                                <p className="text-[14px] font-bold text-[#1C1C36]">Awaiting Escrow Funding</p>
                                <p className="text-[13px] text-[#1C1C36] leading-[1.5]">
                                    You have accepted this invitation. The host has been notified to fund the escrow. You will be able to start once payment is confirmed.
                                </p>
                            </div>
                        )}

                        {isTodo && (
                            <div className="flex flex-col gap-3">
                                <div className="bg-[#EEF0FF] p-4 sm:p-5 rounded-xl flex flex-col gap-2">
                                    <p className="text-[14px] font-bold text-[#1C1C36]">Escrow Funded!</p>
                                    <p className="text-[13px] text-[#1C1C36] leading-[1.5]">
                                        The host has successfully funded the escrow. You can now start working on the deliverables.
                                    </p>
                                </div>
                                <Button
                                    type="button"
                                    className="bg-[#5160E7] hover:bg-[#5160E7]/90 px-2 py-6 rounded-full text-white font-medium w-full text-[15px] cursor-pointer"
                                    onClick={() => startMutation.mutate()}
                                    disabled={startMutation.isPending}
                                >
                                    {startMutation.isPending ? "Starting..." : "Start Task"}
                                </Button>
                            </div>
                        )}

                        {!isPending && (
                            <div className="flex flex-col gap-6 sm:gap-8">
                                {(isInProgress || effectiveStatus === "submitting" || isSubmitted) && (
                                    <div className="flex flex-col gap-4">
                                        <h3 className="font-bold text-[#1C1C36] text-[18px]">Timeline</h3>
                                        <div className="grid grid-cols-4 gap-2 text-center px-1 sm:px-2">
                                            <div className="flex flex-col items-center gap-1 sm:gap-2 min-w-0">
                                                <p className="text-[#596AFE] font-bold text-[20px] sm:text-[24px] truncate w-full">{timeLeft.days}</p>
                                                <p className="text-gray-600 text-[12px] sm:text-[13px] font-medium">Days</p>
                                            </div>
                                            <div className="flex flex-col items-center gap-1 sm:gap-2 min-w-0">
                                                <p className="text-[#596AFE] font-bold text-[20px] sm:text-[24px] truncate w-full">{timeLeft.hours}</p>
                                                <p className="text-gray-600 text-[12px] sm:text-[13px] font-medium">Hours</p>
                                            </div>
                                            <div className="flex flex-col items-center gap-1 sm:gap-2 min-w-0">
                                                <p className="text-[#596AFE] font-bold text-[20px] sm:text-[24px] truncate w-full">{timeLeft.minutes}</p>
                                                <p className="text-gray-600 text-[12px] sm:text-[13px] font-medium">Minutes</p>
                                            </div>
                                            <div className="flex flex-col items-center gap-1 sm:gap-2 min-w-0">
                                                <p className="text-[#596AFE] font-bold text-[20px] sm:text-[24px] truncate w-full">{timeLeft.seconds}</p>
                                                <p className="text-gray-600 text-[12px] sm:text-[13px] font-medium">Seconds</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col gap-0 mt-2">
                                    <h3 className="font-bold text-[#1C1C36] text-[18px] mb-6">Current Status</h3>
                                    <div className="flex flex-col">
                                        {timelineSteps.map((step, idx) => {
                                            const stepStatus = getTimelineStepStatus(idx);
                                            const isLast = idx === timelineSteps.length - 1;

                                            return (
                                                <div key={idx} className="flex gap-4">
                                                    <div className="flex flex-col items-center">
                                                        <div
                                                            className={`w-6 h-6 rounded-full flex items-center justify-center z-10 shrink-0 ${
                                                                stepStatus === "done"
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
                                                                className={`w-[2px] h-full my-1 ${
                                                                    stepStatus === "done" ? "bg-[#596AFE]" : "bg-gray-300"
                                                                }`}
                                                            />
                                                        )}
                                                    </div>
                                                    <div className={`pb-8 ${isLast ? "pb-0" : ""} flex-1 min-w-0`}>
                                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline w-full gap-1">
                                                            <h4
                                                                className={`text-[14px] font-bold break-words ${
                                                                    stepStatus === "upcoming"
                                                                        ? "text-[#414651]"
                                                                        : stepStatus === "current"
                                                                        ? "text-[#596AFE]"
                                                                        : "text-[#1C1C36]"
                                                                }`}
                                                            >
                                                                {step.label}
                                                            </h4>
                                                            {step.date && (
                                                                <span className="text-[12px] text-[#414651] font-medium sm:whitespace-nowrap sm:ml-2">
                                                                    {step.date}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {step.description && (
                                                            <p className="text-[13px] text-[#414651] mt-1 max-w-full leading-snug break-words">
                                                                {step.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Accept Success Modal */}
            <Modal
                isOpen={isAcceptOpen}
                onOpenChange={onAcceptChange}
                placement="center"
                classNames={{
                    base: "max-w-[92vw] sm:max-w-[343px] mx-auto bg-[#FBFFEA] border-1.5 border-[#039855]",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className="flex flex-col items-center text-center pt-6 px-4 sm:px-6">
                                <Image src="/icons/happy.png" alt="Happy Face" width={100} height={100} />
                                <h2 className="text-[22px] sm:text-[24px] font-bold text-[#1E293B]">Invitation Accepted!</h2>
                                <p className="text-[#686184] text-[14px] sm:text-[15px]">
                                    You will get a notification once the host funds the project.
                                </p>
                            </ModalBody>
                            <ModalFooter className="flex justify-center w-full px-4 sm:px-6 pb-6 pt-2">
                                <Button
                                    className="w-full bg-transparent border border-[#A4A7AE] text-[#1D1348] rounded-full h-12 font-medium hover:bg-transparent transition-colors"
                                    onClick={() => {
                                        onClose();
                                        refetchTask();
                                    }}
                                >
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* Decline Modal */}
            <Modal
                isOpen={isDeclineOpen}
                onOpenChange={onDeclineChange}
                placement="center"
                classNames={{
                    base: "max-w-[92vw] sm:max-w-[472px] mx-auto bg-[#FFF4F4] border-1.5 border-[#FF4245]",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className="py-6 px-4 sm:px-6 flex flex-col items-center text-center">
                                <Image src="/icons/sad.png" alt="Sad Face" width={100} height={100} className="mb-2" />
                                <h2 className="text-[20px] sm:text-[22px] font-bold text-black">Decline Invitation</h2>
                                <p className="text-[#686184] text-[13px] sm:text-[14px]">
                                    You are about to decline this host&apos;s invitation to work on their project. Are you sure you want to do that?
                                </p>

                                <div className="w-full text-left mt-4">
                                    <label className="text-[14px] font-medium text-[#1E293B] mb-2 block">Reason</label>
                                    <Textarea
                                        value={declineReason}
                                        onChange={(e) => setDeclineReason(e.target.value)}
                                        placeholder="Briefly describe the reason you are declining this invitation"
                                        minRows={5}
                                        classNames={{
                                            inputWrapper: "bg-white border border-gray-200 shadow-none hover:border-gray-300 rounded-xl",
                                            input: "text-[14px]",
                                        }}
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 w-full px-4 sm:px-6 pb-6 pt-2">
                                <Button
                                    className="w-full sm:flex-1 bg-transparent border border-[#A4A7AE] text-[#1D1348] rounded-full h-12 font-medium hover:bg-gray-50 transition-colors"
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>
                                <CustomButton
                                    isLoading={declineMutation.isPending}
                                    height="48px"
                                    className="w-full sm:flex-1 bg-[#D92D20] text-white rounded-full font-medium hover:bg-[#D92D20]/90 transition-colors"
                                    onClick={() =>
                                        declineMutation.mutate(
                                            { reason: declineReason },
                                            {
                                                onSuccess: () => {
                                                    onClose();
                                                    router.push("/dashboard/tasks_manager");
                                                },
                                            }
                                        )
                                    }
                                >
                                    Decline Invitation
                                </CustomButton>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* Request Changes Modal */}
            <Modal
                isOpen={isRequestOpen}
                onOpenChange={onRequestChange}
                placement="center"
                classNames={{
                    base: "max-w-[92vw] sm:max-w-[500px] mx-auto",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-[18px] sm:text-[22px] font-bold text-[#1E293B] pt-6 px-4 sm:px-6">
                                Request Changes
                            </ModalHeader>
                            <ModalBody className="px-4 sm:px-6 pb-2">
                                <div className="w-full text-left">
                                    <label className="text-[14px] font-medium text-[#414651] mb-2 block">Description</label>
                                    <Textarea
                                        value={talentRequestReason}
                                        onChange={(e) => setTalentRequestReason(e.target.value)}
                                        placeholder="Detail the changes you are requesting regarding scope, deliverables, or terms..."
                                        minRows={5}
                                        classNames={{
                                            inputWrapper: "bg-white border border-gray-200 shadow-none hover:border-gray-300 rounded-xl",
                                            input: "text-[14px]",
                                        }}
                                    />
                                    <p className="text-[12px] font-medium text-[#414651] mt-2 leading-snug">
                                        Do not take conversations off the app. Taking conversations outside the app removes our ability to protect you and may result in account suspension.
                                    </p>
                                </div>
                            </ModalBody>
                            <ModalFooter className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 px-4 sm:px-6 pb-6 pt-4">
                                <Button
                                    variant="ghost"
                                    className="rounded-full w-full sm:w-auto"
                                    onClick={onClose}
                                    disabled={requestChangesTalentMutation.isPending}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="bg-[#5160E7] text-white rounded-full h-12 px-8 font-medium hover:bg-[#5160E7]/90 transition-colors w-full sm:w-auto"
                                    disabled={requestChangesTalentMutation.isPending}
                                    onClick={() => {
                                        if (!talentRequestReason.trim()) {
                                            addToast({
                                                title: "Validation Error",
                                                description: "Please provide details for the requested changes.",
                                                color: "warning",
                                            });
                                            return;
                                        }
                                        requestChangesTalentMutation.mutate(
                                            {
                                                reason: talentRequestReason.trim(),
                                                note: talentRequestReason.trim(),
                                            },
                                            {
                                                onSuccess: () => {
                                                    setTalentRequestReason("");
                                                    onClose();
                                                },
                                            }
                                        );
                                    }}
                                >
                                    {requestChangesTalentMutation.isPending ? "Sending..." : "Send Request"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
