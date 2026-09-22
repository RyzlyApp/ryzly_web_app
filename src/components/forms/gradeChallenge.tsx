"use client";
import { FormikProvider } from "formik";
import useSubmitChallenge from "@/hook/useSubmitChallenge";
import { ISubmissionPreview } from "@/helper/model/application";
import { useFetchData } from "@/hook/useFetchData";
import { RiEditLine, RiPlayLargeLine } from "react-icons/ri";
import { IGradeDetail, ITask } from "@/helper/model/challenge";
import { CoachesReview, LoadingLayout } from "../shared";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";
import { dateFormat } from "@/helper/utils/dateFormat";
import { Modal, ModalContent, ModalBody } from "@heroui/react";

export default function GradingChallenge({
    item,
    task,
}: {
    item: ISubmissionPreview;
    task?: ITask;
}) {
    const [tab, setTab] = useState(false);
    const [user] = useAtom(userAtom);

    const { data = [], isPending } = useFetchData<IGradeDetail[]>({
        endpoint: `/grade`,
        params: {
            taskID: item?.taskID?._id,
            userId: item?.userId?._id,
        },
    });

    const { formikGrade, isLoading, isOpen, setIsOpen } = useSubmitChallenge(
        item?._id,
        item?.userId?._id,
        data.length > 0 ? data[0]?._id : "",
    );

    useEffect(() => {
        if (data?.length > 0) {
            setTab(true);
            formikGrade.setFieldValue("feedBack", data[0]?.feedBack);
            formikGrade.setFieldValue("score", data[0]?.score + "");
        }
    }, [isPending, data]);

    console.log(item?.userId)

    useEffect(() => {
        if (user?.data?.userType === "organization") {
            formikGrade.setFieldValue("score", "100");
        }
    }, [user?.data?.userType]);

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

    const handleSendFeedbackOnly = () => {
        // if (!formikGrade.values.score || formikGrade.values.score === "") {
        formikGrade.setFieldValue("score", "0");
        // }
        formikGrade.handleSubmit();
    };

    const handleOpenApproveModal = () => {
        formikGrade.setFieldValue("score", "100");
        setIsOpen(true);
    };

    const handleConfirmApprove = () => {
        formikGrade.setFieldValue("score", "100");
        formikGrade.handleSubmit();
        setIsOpen(false);
    };

    console.log(formikGrade.errors);

    return (
        <div className="w-full flex flex-col gap-4">
            <LoadingLayout loading={isPending}>
                <FormikProvider value={formikGrade}>
                    {/* Card 1: Review Form or Existing Review */}
                    {!tab ? (
                        <div className="w-full bg-white rounded-2xl p-5 border border-zinc-100 shadow-sm flex flex-col gap-3">
                            <h2 className="text-sm font-bold text-zinc-900">
                                Review
                            </h2>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-zinc-700">
                                    Feedback
                                </label>
                                <textarea
                                    name="feedBack"
                                    value={formikGrade.values.feedBack}
                                    onChange={formikGrade.handleChange}
                                    placeholder="Leave constructive feedback for this submission"
                                    className="w-full min-h-[110px] p-3 text-xs text-zinc-800 placeholder:text-zinc-400 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5160E7]/20 focus:border-[#5160E7] resize-none"
                                />
                            </div>

                            <div className="flex items-center gap-3 pt-1 flex-wrap">
                                <button
                                    type="button"
                                    disabled={isLoading}
                                    onClick={handleSendFeedbackOnly}
                                    className="px-4 py-2 rounded-full border border-[#5160E7] text-[#5160E7] hover:bg-indigo-50/50 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
                                >
                                    {data?.length > 0
                                        ? "Update Feedback"
                                        : "Send Feedback Only"}
                                </button>
                                <button
                                    type="button"
                                    disabled={isLoading}
                                    onClick={handleOpenApproveModal}
                                    className="px-4 py-2 rounded-full bg-[#5160E7] hover:bg-[#4351d4] text-white text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer shadow-sm disabled:opacity-50"
                                >
                                    Approve as Winner
                                </button>
                            </div>

                            <p className="text-[11px] text-zinc-400 leading-tight">
                                Send Feedback won&apos;t approve this person as the winner
                                unless you use the approve button.
                            </p>
                        </div>
                    ) : (
                        <div className="w-full bg-white rounded-2xl p-5 border border-zinc-100 shadow-sm flex flex-col gap-3">
                            <div className="w-full flex justify-between items-center">
                                <h2 className="text-sm font-bold text-zinc-900">
                                    Review & score
                                </h2>
                                <button
                                    onClick={() => setTab(false)}
                                    type="button"
                                    className="text-[#5160E7] hover:opacity-80 p-1 cursor-pointer"
                                    aria-label="Edit review"
                                >
                                    <RiEditLine size={16} />
                                </button>
                            </div>
                            <CoachesReview data={data[0]} />
                        </div>
                    )}

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
