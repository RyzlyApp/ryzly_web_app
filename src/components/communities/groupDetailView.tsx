import React, { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { useAtom } from 'jotai'
import Image from 'next/image'
import {  Button, Spinner } from '@heroui/react'

import { userAtom } from '@/helper/atom/user'
import { useCommunityGroup } from '@/hook/useCommunitiesGroup'
import ChatScreen from './chats/chatscreen'
import RenderParticipants from '../shared/renderParticipant'

const GroupDetailView = ({ onOpen }: { onOpen: () => void }) => {
    const [userState] = useAtom(userAtom)
    const params = useParams<{ id: string }>()

    // Fetching data and mutation from your custom hook
    const { joinGroup, currentGroup, isLoadingGroup } = useCommunityGroup(false, params?.id)

    const userId = userState.data?._id
    const imagebase = process.env.NEXT_PUBLIC_IMAGE_BASE ?? ''

    const { isMember, isCreator, showMessages, showCanJoin } = useMemo(() => {
        const currentUserId = userId?.toString();
        const creatorId = (currentGroup?.creator?._id || currentGroup?.creator)?.toString();
        const isCreator_ = !!(currentUserId && creatorId === currentUserId);

        // Check if user is a member (handling duplicates)
        const isMember_ = currentGroup?.members?.some(member => {
            const memberId = (member._id || member)?.toString();
            return memberId === currentUserId;
        }) || false;

        const authorized = isMember_ || isCreator_;

        return {
            isMember: isMember_,
            isCreator: isCreator_,
            showMessages: authorized,
            // Show join button ONLY if: NOT a member AND NOT the creator AND user is logged in
            showCanJoin: !isMember_ && !isCreator_ && !!currentUserId
        };
    }, [currentGroup, userId]);

    // Loading State
    if (isLoadingGroup || !currentGroup) {
        return (
            <div className="w-full h-96 flex items-center justify-center">
                <Spinner color="primary" label="Loading Group..." />
            </div>
        )
    }

    return (
        <>
            <div className="w-full lg:w-4/6">
                <div className="overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100">
                    {/* 1. Hero / Banner Image */}
                    <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 bg-gray-100">
                        <Image
                            src={currentGroup?.thumbnail || `${imagebase}/user.png`}
                            alt={currentGroup?.title ?? "Group Thumbnail"}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="p-4 sm:p-6 space-y-6">
                        <div className="flex flex-col gap-y-4">
                            {/* 2. Group Title and Description */}
                            <h2 className="text-black text-xl sm:text-2xl font-bold leading-tight">
                                {currentGroup?.title}
                            </h2>

                            <p className="text-[#686184] text-sm sm:text-base font-medium leading-relaxed">
                                {currentGroup?.description}
                            </p>

                            <div className="flex items-center justify-between pt-2">
                                {/* 3. Members Preview Stack */}
                                <div
                                    className="flex items-center gap-x-2 sm:gap-x-3 cursor-pointer group"
                                    onClick={onOpen}
                                >
                                    <div className="flex items-center -space-x-2">
                                        {/* {currentGroup?.member?.slice(0, 4).map((member: any, index: number) => (
                                            <Avatar
                                                key={member._id || index}
                                                src={member.profilePicture || member.profilePicture}
                                                name={member.firstName}
                                                className="border-2 border-white w-8 h-8"
                                                fallback={<AvatarIcon />}
                                            />
                                        ))} */}
                                        {currentGroup &&
                                            <RenderParticipants participants={currentGroup?.members} maxDisplay={3} totalParticipants={currentGroup.members?.length} />
                                        }
                                    </div>
                                    <span className="text-xs text-[#686184] font-medium group-hover:text-[#5160E7] transition-colors">
                                        {currentGroup?.totalMembers || 0} member{currentGroup?.totalMembers !== 1 ? 's' : ''}
                                    </span>
                                </div>

                                {/* 4. JOIN BUTTON: Hidden automatically if showChat is true */}
                                {showCanJoin && (
                                    <Button
                                        isLoading={isLoadingGroup}
                                        isDisabled={isLoadingGroup}
                                        className="ml-auto h-10 rounded-full bg-[#5160E7] text-white px-8 font-bold shadow-lg shadow-indigo-100"
                                        onPress={() => joinGroup(currentGroup._id!)}
                                    >
                                        Join Group
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* 5. Admin / Creator Section */}
                        <div className="flex flex-col gap-y-4 bg-[#F9F9FB] rounded-2xl p-4 sm:p-5 border border-gray-50">
                            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Admin</h3>
                            <div className="flex items-center gap-x-3">
                                <Image
                                    src={currentGroup?.creator?.profilePicture || "/user.png"}
                                    alt={currentGroup?.creator?.firstName ?? "Admin"}
                                    width={44}
                                    height={44}
                                    className="rounded-full size-11 object-cover border border-gray-200"
                                />
                                <div className="space-y-0.5 min-w-0">
                                    <h3 className="text-sm sm:text-base font-bold text-black truncate">
                                        {currentGroup?.creator?.firstName} {currentGroup?.creator?.lastName}
                                    </h3>
                                    <p className="text-xs text-[#686184] truncate italic">
                                        {currentGroup?.creator?.about || "Community Leader"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 6. CHAT SECTION: Controls access and view state */}
            <ChatScreen
                showMessages={showMessages}
                isMember={isMember || isCreator}
            />
        </>
    )
}

export default GroupDetailView