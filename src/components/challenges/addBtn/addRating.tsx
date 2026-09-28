"use client";

import { useState } from "react";
import { CustomButton } from "@/components/custom";
import { useParams } from "next/navigation";
import RateChallengeModal from "../modals/rateChallengeModal";

interface AddRatingBtnProps {
    challengeId?: string;
    challengeTitle?: string;
    initialRating?: number;
    initialComment?: string;
    isEdit?: boolean;
    buttonText?: string;
    variant?: "primary" | "outline" | "auth" | "secondary";
    fullWidth?: boolean;
    className?: string;
    onSuccess?: () => void;
    trigger?: (open: () => void) => React.ReactNode;
}

export default function AddRatingBtn({
    challengeId,
    challengeTitle,
    initialRating,
    initialComment,
    isEdit = false,
    buttonText = "Leave a Review",
    variant = "outline",
    fullWidth = false,
    className = "",
    onSuccess,
    trigger,
}: AddRatingBtnProps) {
    const params = useParams<{ id: string }>();
    const activeChallengeId = challengeId || params?.id || "";
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {trigger ? (
                trigger(() => setIsOpen(true))
            ) : (
                <div className={className || (fullWidth ? "w-full" : "w-[250px]")}>
                    <CustomButton
                        onClick={() => setIsOpen(true)}
                        variant={variant}
                        fullWidth={fullWidth}
                    >
                        {buttonText}
                    </CustomButton>
                </div>
            )}

            {activeChallengeId && (
                <RateChallengeModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    challengeId={activeChallengeId}
                    challengeTitle={challengeTitle}
                    initialRating={initialRating}
                    initialComment={initialComment}
                    isEdit={isEdit}
                    onSuccess={onSuccess}
                />
            )}
        </>
    );
}