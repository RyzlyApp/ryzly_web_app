"use client";

import { ICommunity } from '@/helper/model/community';
import { Avatar, AvatarIcon, Button } from '@heroui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

interface CommunityCardProps {
    community: ICommunity;
    /** 'list' = horizontal (sidebar/joined/created), 'grid' = vertical (explore/not-joined) */
    variant?: 'list' | 'grid';
    /** Show join button (typically true for 'notJoined' context) */
    showJoinButton?: boolean;
    /** Pass parent's mutation loading state to avoid duplicate hooks */
    isJoining?: boolean;
    onNavigate?: () => void;
    onJoin?: (communityId: string) => void;
}

const CommunityCard = ({
    community,
    variant = 'grid',
    showJoinButton = false,
    isJoining = false,
    onJoin,
}: CommunityCardProps) => {
    const router = useRouter();
    const isList = variant === 'list';

    // console.log(onNavigate?.toString());

    const handleCardClick = () => {
        router.push(`/dashboard/communities/${community._id}`);
    };

    const handleJoinClick = () => {
        if (onJoin) {
            onJoin(community._id);
        }
    };

    // ✅ Safe data extraction
    const members = community.members?.slice(0, 4) || [];
    const memberCount = community.totalMembers ?? members.length ?? 0;
    const plainDescription = community.description
        ? community.description.replace(/<[^>]*>/g, '').trim()
        : 'No description';

    // 🎨 Dynamic layout classes
    const wrapperClass = isList
        ? "flex items-start gap-x-3.5 rounded-2xl h-fit w-full px-3 py-3.5 cursor-pointer shadow group duration-500 transition-all mt-3"
        : "flex flex-col rounded-2xl h-[284px] w-full cursor-pointer shadow group duration-500 transition-all";

    const imageContainerClass = isList
        ? "relative overflow-hidden rounded-2xl h-[100px] w-[100px] shrink-0"
        : "relative w-full overflow-hidden rounded-t-2xl h-[100px]";

    const contentClass = isList
        ? "flex flex-col gap-y-2 w-full"
        : "flex flex-col px-3 py-4 gap-y-2 flex-1";

    return (
        <div
            className={wrapperClass}
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
        >
            {/* Image */}
            <div className={imageContainerClass}>
                <Image
                    src={community.thumbnail || '/placeholder-community.jpg'}
                    alt={community.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes={isList ? "100px" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                />
            </div>

            {/* Content */}
            <div className={contentClass}>
                <h2 className="text-black text-base font-bold leading-tight truncate">
                    {community.title}
                </h2>

                <p className="text-[#686184] text-xs font-medium leading-relaxed line-clamp-2 h-9">
                    {plainDescription}
                </p>

                {/* Members & Avatars */}
                <div className="flex items-center gap-x-2 h-6">
                    <div className="flex items-center -space-x-2">
                        {members.map((member) => (
                            <Avatar
                                key={`${member._id}-${Math.random()}`}
                                src={member.profilePicture}
                                name={`${member.firstName?.[0] || ''}${member.lastName?.[0] || ''}`}
                                className="border-2 border-white size-6 bg-gray-200"
                            >
                                <AvatarIcon />
                            </Avatar>
                        ))}
                    </div>
                    <span className="text-xs text-[#686184] font-medium">
                        {memberCount} member{memberCount !== 1 ? 's' : ''}
                    </span>
                </div>

                {/* Join Button (only renders when explicitly enabled) */}
                {showJoinButton && (
                    <Button
                        className="w-full hidden group-hover:flex rounded-full bg-[#5160E7] text-white mt-auto transition-all"
                        onPress={handleJoinClick}
                        isLoading={isJoining}
                        isDisabled={isJoining}
                        data-join-button="true"
                    >
                        {isJoining ? 'Joining...' : 'Join Community'}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CommunityCard;