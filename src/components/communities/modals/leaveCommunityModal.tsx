"use client";

import CustomModal from '@/components/shared/modalLayout';
import useCommunities from '@/hook/useCommunities';
import { useCommunityGroup } from '@/hook/useCommunitiesGroup';
import { Button } from '@heroui/react';
import { useParams, useSearchParams } from 'next/navigation';
import React from 'react';
import { RxExit } from 'react-icons/rx';

interface LeaveCommunityModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LeaveCommunityModal = ({ isOpen, onClose }: LeaveCommunityModalProps) => {
    const params = useParams<{ id: string }>();
    const searchParams = useSearchParams();

    const communityId = params.id;
    const groupId = searchParams.get('group');

    const { leaveCommunity } = useCommunities();
    const { leaveGroup } = useCommunityGroup(false, communityId);

    // ✅ Pick the correct mutation & ID based on context
    const isGroup = !!groupId;
    const leaveMutation = isGroup ? leaveGroup : leaveCommunity;
    const targetId = isGroup ? groupId : communityId;
    const actionLabel = isGroup ? "Leave Group" : "Leave Community";

    const handleLeave = () => {
        if (!targetId) return;

        console.log(targetId);

        leaveMutation.mutate(targetId, {
            onSuccess: () => {
                // ✅ Close modal only after successful API call
                onClose();
            },
        });
    };

    return (
        <CustomModal isOpen={isOpen} onClose={onClose} className="p-4" size="md">
            <div className="flex flex-col items-center text-center">
                <RxExit className="text-4xl text-[#4A426D] mb-4" />

                {/* ✅ Dynamic title & description */}
                <h2 className="text-lg text-black font-bold mb-2">{actionLabel}</h2>
                <p className="text-sm text-[#686184] w-[90%]">
                    {isGroup
                        ? "Leaving this group means you'll no longer see its posts or participate in discussions. You can rejoin anytime."
                        : "Leaving this community means you'll no longer receive updates or be able to join discussions. You can rejoin anytime."}
                </p>

                {/* ✅ Clean two-button layout */}
                <div className="flex flex-col gap-3 w-full mt-6">
                    <Button
                        color="danger"
                        onPress={handleLeave}
                        isLoading={leaveMutation.isPending}
                        isDisabled={leaveMutation.isPending || !targetId}
                        className="w-full rounded-full font-medium"
                    >
                        {leaveMutation.isPending ? "Leaving..." : actionLabel}
                    </Button>

                    <Button
                        variant="bordered"
                        onPress={onClose}
                        isDisabled={leaveMutation.isPending}
                        className="w-full rounded-full font-medium border-[#A4A7AE] text-[#1D1348]"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </CustomModal>
    );
};

export default LeaveCommunityModal;