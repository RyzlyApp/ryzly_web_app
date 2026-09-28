"use client";

import { useState } from "react";
import { LoadingLayout } from "@/components/shared";
import UserCard from "@/components/shared/userCard";
import { IChallenge, IRatingDetail } from "@/helper/model/challenge";
import { dateFormat } from "@/helper/utils/dateFormat";
import { useFetchData } from "@/hook/useFetchData";
import { RiStarFill, RiStarLine, RiEditLine, RiMessage3Line } from "react-icons/ri";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";
import { CustomButton } from "@/components/custom";
import RateChallengeModal from "../modals/rateChallengeModal";

export default function Review({ item }: { item: IChallenge }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userState] = useAtom(userAtom);
    const currentUser = userState?.data;

    const { data = [], isLoading } = useFetchData<IRatingDetail[]>({
        endpoint: `/challenge/getRating`,
        name: "getRating",
        params: {
            id: item?._id,
        },
    });

    const totalReviews = data?.length || 0;
    const averageRating =
        totalReviews > 0
            ? data.reduce((acc, curr) => acc + (curr?.rating || 0), 0) /
              totalReviews
            : 0;

    const myReview = data?.find(
        (review) =>
            review?.user?._id &&
            currentUser?._id &&
            review?.user?._id === currentUser?._id
    );

    return (
        <div className="w-full flex flex-col p-4 md:p-6 gap-6">
            {/* Header / Summary Bar */}
            <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-gray-50 via-white to-gray-50 border border-gray-200">
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-gray-900">
                            Reviews
                        </h2>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-neonblue-50 text-neonblue-600">
                            {totalReviews}
                        </span>
                    </div>

                    {totalReviews > 0 ? (
                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-extrabold text-gray-900">
                                {averageRating.toFixed(1)}
                            </span>
                            <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <RiStarFill
                                        key={star}
                                        size={18}
                                        className={
                                            star <= Math.round(averageRating)
                                                ? "text-[#FFBC0A]"
                                                : "text-gray-200"
                                        }
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-gray-500 font-medium">
                                Based on {totalReviews} review
                                {totalReviews !== 1 ? "s" : ""}
                            </span>
                        </div>
                    ) : (
                        <p className="text-xs text-gray-500">
                            No reviews yet for this challenge
                        </p>
                    )}
                </div>

                <div className="flex items-center">
                    <CustomButton
                        onClick={() => setIsModalOpen(true)}
                        variant={myReview ? "outline" : "primary"}
                        startIcon={
                            myReview ? (
                                <RiEditLine size={16} />
                            ) : (
                                <RiStarFill size={16} className="text-[#FFBC0A]" />
                            )
                        }
                    >
                        {myReview ? "Edit Your Review" : "Rate Challenge"}
                    </CustomButton>
                </div>
            </div>

            {/* Content / Reviews List */}
            <LoadingLayout loading={isLoading}>
                {totalReviews === 0 ? (
                    <div className="w-full flex flex-col items-center justify-center py-12 px-4 rounded-2xl border border-dashed border-gray-300 bg-gray-50/50 gap-3 text-center">
                        <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                            <RiStarLine size={28} />
                        </div>
                        <div className="flex flex-col gap-1 max-w-sm">
                            <h4 className="text-base font-bold text-gray-800">
                                Be the first to leave a review!
                            </h4>
                            <p className="text-xs text-gray-500 font-medium">
                                Share your experience and let the community know what you learned from this challenge.
                            </p>
                        </div>
                        <div className="mt-2">
                            <CustomButton
                                onClick={() => setIsModalOpen(true)}
                                variant="primary"
                                startIcon={<RiStarFill size={16} />}
                            >
                                Rate This Challenge
                            </CustomButton>
                        </div>
                    </div>
                ) : (
                    <div className="w-full flex flex-col divide-y divide-gray-100">
                        {data.map((review, index) => {
                            const isCurrentUserReview =
                                review?.user?._id &&
                                currentUser?._id &&
                                review?.user?._id === currentUser?._id;

                            return (
                                <div
                                    key={review?._id || index}
                                    className={`py-5 w-full flex flex-col gap-3 transition-colors ${
                                        isCurrentUserReview
                                            ? "bg-neonblue-50/20 -mx-3 px-3 rounded-xl border border-neonblue-100/50"
                                            : ""
                                    }`}
                                >
                                    <div className="w-full flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <UserCard
                                                item={review?.user}
                                                showCoach={false}
                                            />
                                            {isCurrentUserReview && (
                                                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-neonblue-100 text-neonblue-700">
                                                    You
                                                </span>
                                            )}
                                        </div>

                                        {isCurrentUserReview && (
                                            <button
                                                type="button"
                                                onClick={() => setIsModalOpen(true)}
                                                className="flex items-center gap-1 text-xs font-semibold text-neonblue-600 hover:text-neonblue-700 hover:underline transition-colors p-1"
                                            >
                                                <RiEditLine size={14} />
                                                <span>Edit</span>
                                            </button>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: 5 }).map((_, starIdx) => (
                                                <RiStarFill
                                                    key={starIdx}
                                                    size={14}
                                                    color={
                                                        starIdx < (review?.rating || 0)
                                                            ? "#FFBC0A"
                                                            : "#E0E0E0"
                                                    }
                                                />
                                            ))}
                                            <p className="text-sm font-semibold text-gray-700 ml-1">
                                                {(review?.rating || 0).toFixed(1)}
                                            </p>
                                        </div>
                                        <div className="pl-2 border-l border-gray-300 text-xs font-medium text-gray-500">
                                            {dateFormat(review?.createdAt)}
                                        </div>
                                    </div>

                                    {review?.comment && (
                                        <p className="text-sm font-normal text-gray-700 leading-relaxed whitespace-pre-line">
                                            {review?.comment}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </LoadingLayout>

            {/* Rate Challenge Modal */}
            <RateChallengeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                challengeId={item?._id}
                challengeTitle={item?.title}
                initialRating={myReview?.rating || 0}
                initialComment={myReview?.comment || ""}
                isEdit={!!myReview}
            />
        </div>
    );
}