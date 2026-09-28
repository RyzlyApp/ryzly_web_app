"use client";

import React, { useEffect, useState } from "react";
import { ModalLayout } from "@/components/shared";
import { CustomButton } from "@/components/custom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpService from "@/helper/services/httpService";
import { handleError } from "@/helper/utils/hanlderAxoisError";
import { addToast } from "@heroui/toast";
import { AxiosError } from "axios";
import { RiStarFill, RiChatSmile3Line } from "react-icons/ri";

interface RateChallengeModalProps {
    isOpen: boolean;
    onClose: () => void;
    challengeId: string;
    challengeTitle?: string;
    initialRating?: number;
    initialComment?: string;
    isEdit?: boolean;
    onSuccess?: () => void;
}

const RATING_LABELS: Record<number, { title: string; color: string }> = {
    1: { title: "Poor", color: "text-red-500" },
    2: { title: "Fair", color: "text-amber-500" },
    3: { title: "Good", color: "text-yellow-500" },
    4: { title: "Very Good", color: "text-lime-500" },
    5: { title: "Excellent!", color: "text-emerald-500" },
};

const SUGGESTIONS = [
    "Great learning experience 💡",
    "Well organized 👏",
    "Challenging tasks 💪",
    "Clear instructions 📋",
    "Inspiring challenge 🚀",
];

export default function RateChallengeModal({
    isOpen,
    onClose,
    challengeId,
    challengeTitle,
    initialRating = 0,
    initialComment = "",
    isEdit = false,
    onSuccess,
}: RateChallengeModalProps) {
    const queryClient = useQueryClient();
    const [rating, setRating] = useState<number>(initialRating);
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [comment, setComment] = useState<string>(initialComment);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setRating(initialRating || 0);
            setHoverRating(0);
            setComment(initialComment || "");
            setError(null);
        }
    }, [isOpen, initialRating, initialComment]);

    const rateMutation = useMutation({
        mutationFn: (payload: { rating: number; comment?: string }) =>
            httpService.post(`/challenge/rate/${challengeId}`, payload),
        onError: (err: AxiosError) => {
            handleError(err);
        },
        onSuccess: (data) => {
            addToast({
                title: isEdit ? "Review Updated" : "Review Submitted",
                description:
                    data?.data?.message ||
                    (isEdit
                        ? "Your review has been updated successfully."
                        : "Thank you for rating this challenge!"),
                color: "success",
            });
            queryClient.invalidateQueries({ queryKey: ["getRating"] });
            queryClient.invalidateQueries({ queryKey: ["challengedetails"] });
            queryClient.invalidateQueries({ queryKey: ["challenge"] });
            onSuccess?.();
            onClose();
        },
    });

    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (!rating || rating < 1) {
            setError("Please select at least 1 star to submit your rating.");
            return;
        }

        setError(null);
        rateMutation.mutate({
            rating,
            comment: comment.trim() || undefined,
        });
    };

    const handleChipClick = (suggestion: string) => {
        setComment((prev) => {
            if (!prev.trim()) return suggestion;
            if (prev.includes(suggestion)) return prev;
            return `${prev.trim()}, ${suggestion}`;
        });
    };

    const activeRating = hoverRating || rating;
    const currentLabel = activeRating > 0 ? RATING_LABELS[activeRating] : null;

    return (
        <ModalLayout isOpen={isOpen} onClose={onClose} size="md">
            <div className="w-full flex flex-col items-center gap-5 p-2">
                {/* Header */}
                <div className="flex flex-col items-center text-center gap-1.5">
                    <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mb-1">
                        <RiStarFill size={26} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                        {isEdit ? "Update Your Review" : "Rate This Challenge"}
                    </h3>
                    {challengeTitle ? (
                        <p className="text-xs text-gray-500 max-w-sm line-clamp-1 font-medium">
                            {challengeTitle}
                        </p>
                    ) : (
                        <p className="text-xs text-gray-500">
                            Share your feedback and experience
                        </p>
                    )}
                </div>

                {/* Stars Picker */}
                <div className="flex flex-col items-center gap-2 py-1">
                    <div
                        className="flex items-center gap-2.5"
                        onMouseLeave={() => setHoverRating(0)}
                    >
                        {[1, 2, 3, 4, 5].map((star) => {
                            const isFilled = star <= activeRating;
                            return (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => {
                                        setRating(star);
                                        setError(null);
                                    }}
                                    onMouseEnter={() => setHoverRating(star)}
                                    className="p-1 rounded-lg transition-transform duration-150 hover:scale-125 focus:outline-none"
                                    aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                                >
                                    <RiStarFill
                                        size={34}
                                        className={`transition-colors duration-150 ${
                                            isFilled
                                                ? "text-[#FFBC0A] drop-shadow-sm"
                                                : "text-gray-200 hover:text-amber-200"
                                        }`}
                                    />
                                </button>
                            );
                        })}
                    </div>

                    {/* Dynamic Rating Label */}
                    <div className="h-6 flex items-center justify-center">
                        {currentLabel ? (
                            <span
                                className={`text-sm font-semibold transition-all duration-150 ${currentLabel.color}`}
                            >
                                {activeRating} / 5 — {currentLabel.title}
                            </span>
                        ) : (
                            <span className="text-xs text-gray-400 font-medium">
                                Tap a star to rate
                            </span>
                        )}
                    </div>

                    {error && (
                        <p className="text-xs text-red-500 font-medium text-center">
                            {error}
                        </p>
                    )}
                </div>

                {/* Quick suggestions */}
                <div className="w-full flex flex-col gap-2">
                    <p className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                        <RiChatSmile3Line size={14} className="text-gray-400" />
                        Quick feedback tags (tap to add):
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {SUGGESTIONS.map((tag, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => handleChipClick(tag)}
                                className="text-xs py-1 px-2.5 rounded-full bg-gray-100 hover:bg-neonblue-50 hover:text-neonblue-600 text-gray-700 font-medium transition-colors border border-gray-200 cursor-pointer"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Comment Textarea */}
                <div className="w-full flex flex-col gap-1.5">
                    <label
                        htmlFor="challenge-review-comment"
                        className="text-xs font-semibold text-gray-700"
                    >
                        Your thoughts (optional)
                    </label>
                    <textarea
                        id="challenge-review-comment"
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="What did you like most? Any constructive suggestions for participants or organizers?"
                        className="w-full p-3 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-neonblue-500 focus:border-transparent transition-all placeholder:text-gray-400 resize-none"
                    />
                    <div className="flex justify-between items-center text-[11px] text-gray-400 px-0.5">
                        <span>Help others choose great challenges</span>
                        <span>{comment.length} characters</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="w-full flex items-center justify-between gap-3 pt-2">
                    <CustomButton
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        isDisabled={rateMutation.isPending}
                    >
                        Cancel
                    </CustomButton>
                    <CustomButton
                        type="button"
                        variant="primary"
                        onClick={handleSubmit}
                        isLoading={rateMutation.isPending}
                        isDisabled={rateMutation.isPending || rating === 0}
                    >
                        {isEdit ? "Update Review" : "Submit Review"}
                    </CustomButton>
                </div>
            </div>
        </ModalLayout>
    );
}
