"use client";
import { FormikProvider } from "formik";
import useSubmitChallenge from "@/hook/useSubmitChallenge";
import { ISubmissionPreview } from "@/helper/model/application";
import { useFetchData } from "@/hook/useFetchData";
import { RiEditLine, RiPlayLargeLine } from "react-icons/ri";
import { IChallenge, IGradeDetail, ITask } from "@/helper/model/challenge";
import { CoachesReview, LoadingLayout } from "../shared";
import React, { useEffect, useState, useMemo } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";
import { dateFormat } from "@/helper/utils/dateFormat";
import { Modal, ModalContent, ModalBody } from "@heroui/react";
import { CustomInput } from "../custom";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpService from "@/helper/services/httpService";
import { addToast } from "@heroui/toast";
import { AxiosError } from "axios";
import { handleError } from "@/helper/utils/hanlderAxoisError";

export default function GradingChallenge({
    item,
    task,
}: {
    item: ISubmissionPreview;
    task?: ITask;
}) {
    const params = useParams();
    const [tab, setTab] = useState(false);
    const [user] = useAtom(userAtom);
    const queryClient = useQueryClient();

    const { data: challengeData } = useFetchData<IChallenge>({
        endpoint: `/challenge/single/${params.id}`,
        name: "challengeDetailsGrading",
    });

    const { data = [], isPending, refetch: refetchGrade } = useFetchData<IGradeDetail[]>({
        endpoint: `/grade`,
        params: {
            taskID: item?.taskID?._id,
            userId: item?.userId?._id,
        },
    });

    // Fetch submission messages for this submission
    const {
        data: submissionMessagesData,
        refetch: refetchSubmissionMessages,
    } = useFetchData<any>({
        endpoint: `/submission/messages/${item?._id}`,
        name: `submission_messages_${item?._id}`,
        enable: Boolean(item?._id),
    });

    // Parse messages list
    const messagesList: any[] = useMemo(() => {
        if (!submissionMessagesData) return [];
        if (Array.isArray(submissionMessagesData)) return submissionMessagesData;
        if (Array.isArray(submissionMessagesData?.data)) return submissionMessagesData.data;
        if (submissionMessagesData?.message && typeof submissionMessagesData.message === "object") {
            return [submissionMessagesData.message];
        }
        if (submissionMessagesData?._id) return [submissionMessagesData];
        return [];
    }, [submissionMessagesData]);

    const latestMessage = messagesList.length > 0 ? messagesList[messagesList.length - 1] : null;
    const existingMessageId = latestMessage?._id || latestMessage?.id || "";
    const existingMessageText =
        typeof latestMessage?.message === "string"
            ? latestMessage.message
            : typeof latestMessage?.content === "string"
                ? latestMessage.content
                : "";

    const { formikGrade, isLoading, isOpen, setIsOpen } = useSubmitChallenge(
        item?._id,
        item?.userId?._id,
        data.length > 0 ? data[0]?._id : "",
    );

    const [lastFeedback, setLastFeedback] = useState("");
    const [lastScore, setLastScore] = useState("");

    const isOrg = Boolean(
        user?.data?.userType === "organization" ||
        challengeData?.creatorType === "ORGANIZATION" ||
        challengeData?.organization
    );

    const isApproved = Boolean(
        item?.status?.toLowerCase() === "approved" ||
        item?.status?.toLowerCase() === "winner" ||
        (item as any)?.isApproved === true ||
        (data?.length > 0 && Number(data[0]?.score) === 100)
    );

    // Sync incoming feedback & score
    useEffect(() => {
        const currentFeedback = existingMessageText || (data?.length > 0 ? data[0]?.feedBack : "") || "";
        const currentScore = (data?.length > 0 ? (data[0]?.score || "") : "") + "";

        if (currentFeedback || currentScore) {
            if (currentFeedback !== lastFeedback || currentScore !== lastScore) {
                setTab(true);
                formikGrade.setFieldValue("feedBack", currentFeedback);
                formikGrade.setFieldValue("score", currentScore);
                setLastFeedback(currentFeedback);
                setLastScore(currentScore);
            }
        }
    }, [existingMessageText, data, lastFeedback, lastScore, formikGrade]);

    // Create Submission Message Mutation (POST /submission/message)
    const createMessageMutation = useMutation({
        mutationFn: (messageText: string) =>
            httpService.post(
                `/submission/message`,
                {
                    id: item?._id,
                    message: messageText,
                },
                {
                    params: {
                        isOrganization: isOrg,
                    },
                }
            ),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (res) => {
            addToast({
                title: "Feedback Sent",
                description: res?.data?.message || "Feedback sent successfully",
                color: "success",
            });
            refetchSubmissionMessages();
            queryClient.invalidateQueries({ queryKey: [`submission_messages_${item?._id}`] });
            queryClient.invalidateQueries({ queryKey: ["submission_messages"] });
            queryClient.invalidateQueries({ queryKey: ["reviewCount"] });
            setLastFeedback(formikGrade.values.feedBack);
            setTab(true);
        },
    });

    // Update Submission Message Mutation (PATCH /submission/message/{id})
    const updateMessageMutation = useMutation({
        mutationFn: ({ messageId, messageText }: { messageId: string; messageText: string }) =>
            httpService.patch(
                `/submission/message/${messageId}`,
                {
                    id: item?._id,
                    message: messageText,
                },
                {
                    params: {
                        isOrganization: isOrg,
                    },
                }
            ),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (res) => {
            addToast({
                title: "Feedback Updated",
                description: res?.data?.message || "Feedback updated successfully",
                color: "success",
            });
            refetchSubmissionMessages();
            queryClient.invalidateQueries({ queryKey: [`submission_messages_${item?._id}`] });
            queryClient.invalidateQueries({ queryKey: ["submission_messages"] });
            queryClient.invalidateQueries({ queryKey: ["reviewCount"] });
            setLastFeedback(formikGrade.values.feedBack);
            setTab(true);
        },
    });

    const isMessageSubmitting = createMessageMutation.isPending || updateMessageMutation.isPending;
    const isActionLoading = isLoading || isMessageSubmitting;

    // Derived task fields
    const taskTitle =
        task?.title ||
        item?.taskID?.title ||
        "Draft three quick layout concepts for your landing page.";

    const taskRawDescription =
        task?.description ||
        item?.taskID?.description ||
        "Draft three quick layout concepts. Create three distinct layout ideas that showcase different structures, arrangements, and styles for your landing page. Focus on speed and variety rather than perfection — the goal is to explore multiple design directions. Each concept should include a clear header section, a primary call-to-action, and space for key content. Keep them simple, sketched, or wireframed so they can be refined later.";

    const taskStatus = task?.status || item?.taskID?.status || "Pending";
    const taskEndDate = task?.endDate || item?.taskID?.endDate;

    const creatorId =
        typeof challengeData?.creator === "object"
            ? challengeData?.creator?._id
            : challengeData?.creator ||
            (typeof item?.challengeID?.creator === "object"
                ? item?.challengeID?.creator?._id
                : item?.challengeID?.creator) ||
            "";

    // Handle sending or updating feedback when talent is not approved
    const handleFeedbackSubmit = () => {
        const feedbackText = formikGrade.values.feedBack?.trim();
        if (!feedbackText) {
            addToast({
                title: "Feedback Required",
                description: "Please enter feedback before submitting.",
                color: "danger",
            });
            return;
        }

        if (!item?._id) {
            addToast({
                title: "Error",
                description: "Submission ID not found.",
                color: "danger",
            });
            return;
        }

        // If talent is not approved, use Submission Management endpoints:
        if (!isApproved) {
            if (existingMessageId) {
                // Update feedback if message already exists
                updateMessageMutation.mutate({
                    messageId: existingMessageId,
                    messageText: feedbackText,
                });
            } else {
                // Send new feedback
                createMessageMutation.mutate(feedbackText);
            }
            return;
        }

        // If talent is approved, update the grade
        formikGrade.handleSubmit();
    };

    const handleOpenApproveModal = () => {
        formikGrade.setFieldValue("score", "100");
        setIsOpen(true);
    };

    const handleConfirmApprove = async () => {
        formikGrade.setFieldValue("score", "100");
        formikGrade.handleSubmit();

        // Also sync feedback to submission messages if provided
        const feedbackText = formikGrade.values.feedBack?.trim();
        if (feedbackText && item?._id) {
            try {
                if (existingMessageId) {
                    await httpService.patch(
                        `/submission/message/${existingMessageId}`,
                        { id: item._id, message: feedbackText },
                        { params: { isOrganization: isOrg } }
                    );
                } else {
                    await httpService.post(
                        `/submission/message`,
                        { id: item._id, message: feedbackText },
                        { params: { isOrganization: isOrg } }
                    );
                }
                refetchSubmissionMessages();
            } catch (err) {
                console.warn("Could not sync submission message during approval:", err);
            }
        }

        setIsOpen(false);
    };

    return (
        <div className="w-full lg:w-full bg-white p-6 rounded-2xl h-fit max-h-full overflow-y-auto flex flex-col gap-4">
            <LoadingLayout loading={isPending}>
                <FormikProvider value={formikGrade}>
                    {/* Card 1: Review Form or Existing Review */}
                    {!tab ? (
                        <div className="w-full bg-white rounded-2xl p-5 border border-zinc-100 shadow-sm flex flex-col gap-3">
                            <h2 className="text-sm font-bold text-zinc-900">
                                Review
                            </h2>
                            <div className="flex flex-col gap-1.5">
                                <CustomInput
                                    name="feedBack"
                                    label="Feedback"
                                    placeholder="Leave constructive feedback for this submission"
                                    textarea={true}
                                />
                                {user?.data?.userType !== "organization" && (
                                    <CustomInput
                                        name="score"
                                        label="Score (/100%)"
                                        placeholder="Enter score"
                                        type="number"
                                    />
                                )}
                            </div>
                            {user?.data?.userType === "organization" && (
                                <div className="flex items-center gap-3 pt-1 flex-wrap">
                                    <button
                                        type="button"
                                        disabled={isActionLoading}
                                        onClick={handleFeedbackSubmit}
                                        className="px-4 py-2 rounded-full border border-[#5160E7] text-[#5160E7] hover:bg-indigo-50/50 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
                                    >
                                        {isActionLoading
                                            ? "Submitting..."
                                            : (existingMessageId || lastFeedback)
                                                ? "Update Feedback Only"
                                                : "Send Feedback Only"}
                                    </button>
                                    {!isApproved && (
                                        <button
                                            type="button"
                                            disabled={isActionLoading}
                                            onClick={handleOpenApproveModal}
                                            className="px-4 py-2 rounded-full bg-[#5160E7] hover:bg-[#4351d4] text-white text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer shadow-sm disabled:opacity-50"
                                        >
                                            Approve as Winner
                                        </button>
                                    )}
                                </div>
                            )}
                            {user?.data?.userType !== "organization" && (
                                <div className="flex items-center gap-3 pt-1 flex-wrap">
                                    <button
                                        type="button"
                                        disabled={isActionLoading}
                                        onClick={handleFeedbackSubmit}
                                        className="px-4 py-2 rounded-full bg-[#5160E7] ml-auto hover:bg-[#4351d4] text-white text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer shadow-sm disabled:opacity-50"
                                    >
                                        {isActionLoading
                                            ? "Submitting..."
                                            : (existingMessageId || lastFeedback)
                                                ? "Update"
                                                : "Post"}
                                    </button>
                                </div>
                            )}

                            {user?.data?.userType === "organization" && (
                                <p className="text-[11px] text-zinc-400 leading-tight">
                                    Send Feedback won&apos;t approve this person as the winner
                                    unless you use the approve button.
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="w-full bg-white rounded-2xl p-5 border border-zinc-100 shadow-sm flex flex-col gap-3">
                            <div className="w-full flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-sm font-bold text-zinc-900">
                                        Review {isApproved && "& score"}
                                    </h2>
                                    {isApproved && (
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                                            Approved as Winner
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={() => setTab(false)}
                                    type="button"
                                    className="text-[#5160E7] hover:opacity-80 p-1 cursor-pointer flex items-center gap-1 text-xs font-semibold"
                                    aria-label="Edit review"
                                >
                                    <RiEditLine size={16} />
                                    <span>Edit</span>
                                </button>
                            </div>
                        </div>
                    )}
                    {/* Feedback and Work with talent */}
                    <div className="flex flex-col gap-4 rounded-2xl shadow p-4">
                        <h2 className="text-[16px] font-bold">Feedback</h2>
                        <p className="text-sm text-[#121212]">
                            {lastFeedback || existingMessageText || "No feedback provided yet."}
                        </p>
                        <div className="flex gap-4">
                            <Link href={""} className="flex items-center justify-center h-[48px] w-[140px] bg-[#5160E7] text-white  border border-[#5160E7] rounded-full">Tip Talent</Link>
                            {/* <Link href={`/dashboard/challenges/${params.id}/tasks/${params.slug}/grading/work_talent?userId=${item?.userId?._id}&talentId=${item?.userId?._id}&id=${creatorId}`} className="flex-1 flex items-center justify-center h-[48px] w-full bg-[#5160E7] text-white  border border-[#5160E7] rounded-full">Work with this talent</Link> */}
                        </div>
                    </div>

                    {/* Card 2: Task details */}
                    <div className="w-full bg-white rounded-2xl p-5 border border-zinc-100 shadow-sm flex flex-col gap-4">
                        <h2 className="text-sm font-bold text-zinc-900">
                            Task details
                        </h2>

                        <div className="flex flex-col gap-1.5">
                            <h3 className="text-sm font-bold text-zinc-900 leading-snug">
                                {taskTitle}
                            </h3>
                            {taskRawDescription.includes("<") ? (
                                <div
                                    className="text-xs text-zinc-500 font-normal leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                        __html: taskRawDescription,
                                    }}
                                />
                            ) : (
                                <p className="text-xs text-zinc-500 font-normal leading-relaxed">
                                    {taskRawDescription}
                                </p>
                            )}
                        </div>

                        {/* Metadata: Status & Due date */}
                        <div className="flex flex-col gap-2 pt-1 border-t border-zinc-100/80">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-zinc-400 font-medium">
                                    Status
                                </span>
                                <span className="text-zinc-500 text-xs font-medium">
                                    {taskStatus}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-zinc-400 font-medium">
                                    Due date
                                </span>
                                <span className="text-zinc-900 font-semibold">
                                    {taskEndDate
                                        ? dateFormat(taskEndDate)
                                        : "01 Aug 2025"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Image 1: Approve Submission Modal */}
                    <Modal
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        placement="center"
                        hideCloseButton
                        size="md"
                        classNames={{
                            base: "rounded-[28px] p-2 bg-white max-w-[420px] mx-4 shadow-2xl",
                            backdrop: "bg-black/50 backdrop-blur-sm",
                        }}
                    >
                        <ModalContent>
                            {() => (
                                <ModalBody className="p-6 flex flex-col items-center text-center">
                                    <h3 className="text-2xl font-bold text-zinc-900 mb-3 tracking-tight">
                                        Approve Submission
                                    </h3>
                                    <p className="text-sm text-zinc-500 font-normal leading-relaxed max-w-[340px] mb-8">
                                        By approving this submission, you confirm it
                                        meets your requirements. For challenges with
                                        multiple winners, the first approved
                                        submission is treated as your
                                        highest-ranked winner. This action cannot be
                                        undone.
                                    </p>
                                    <div className="w-full flex flex-col gap-3">
                                        <button
                                            type="button"
                                            disabled={isLoading}
                                            onClick={handleConfirmApprove}
                                            className="w-full py-3.5 bg-[#5160E7] hover:bg-[#4351d4] text-white rounded-full font-semibold text-sm transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                                        >
                                            {isLoading
                                                ? "Approving..."
                                                : "Approve Submission"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsOpen(false)}
                                            className="w-full py-3.5 bg-white hover:bg-zinc-50 border border-zinc-300 text-zinc-900 rounded-full font-semibold text-sm transition-colors cursor-pointer"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </ModalBody>
                            )}
                        </ModalContent>
                    </Modal>
                </FormikProvider>
            </LoadingLayout>
        </div>
    );
}
