"use client"
import { userAtom } from '@/helper/atom/user'
import useCommunity from '@/hook/useCommunities'
import { addToast, Button, Select, SelectItem, Spinner } from '@heroui/react'
import { useAtom } from 'jotai'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { ChallengeCard } from '../shared'
import { IChallenge } from '@/helper/model/challenge'
import ChatScreen from './chats/chatscreen'
import RenderParticipants from '../shared/renderParticipant'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import httpService from '@/helper/services/httpService'

const CommunityDetailView = ({ onOpen }: { onOpen: () => void }) => {
    const [userState] = useAtom(userAtom)
    const [selectedChallengeId, setSelectedChallengeId] = useState<string>("");
    const [isAdding, setIsAdding] = useState(false);
    const router = useRouter()
    const params = useParams<{ id: string }>();
    const queryClient = useQueryClient();
    const { getCommunity, joinCommunity, isLoadingCommunity } = useCommunity()

    const community = getCommunity?.data
    const userId = userState.data?._id ?? ""

    const isCreator = !!(userId && community?.creator?._id === userId);
    const isMember = !!(userId && community?.members?.some((m: any) => m._id === userId));
    const isAuthorized = isCreator || isMember;
    const showCanJoin = !isAuthorized && !!userId;
    const showMessages = isAuthorized;

    const imagebase = process.env.NEXT_PUBLIC_IMAGE_BASE;

    const { data: challenges, isLoading: isLoadingChallenges } = useQuery({
        queryKey: ["challenge-status", userId],
        queryFn: async () => {
            const response = await httpService.get(
                `/challenge/status?userId=${userId}&asCoach=true`
            );
            return response.data;
        },
        enabled: !!userId,
    });

    const { data: communityChallenges, isLoading: isLoadingCommunityChallenges, error } = useQuery({
        queryKey: ["community-challenges", community?._id],
        queryFn: async () => {
            const response = await httpService.get(
                `/community/challenge/${community?._id}`
            );
            return response.data;
        },
        enabled: !!community?._id,
    });

    const allChallenges: IChallenge[] = challenges?.data ?? [];

    const handleAddChallenge = async () => {
        if (!selectedChallengeId || !params.id || !userId) return;
        setIsAdding(true);
        try {
            await httpService.patch(`/community/challenge/${params.id}`, {
                challengeId: selectedChallengeId,
            });
            addToast({
                title: "Success",
                description: "Challenge added to community",
                color: "success",
            });
            setSelectedChallengeId("");
            queryClient.invalidateQueries({ queryKey: ["community", params.id] });
        } catch (err: any) {
            addToast({
                title: "Error",
                description: err?.response?.data?.message || "Failed to add challenge",
                color: "danger",
            });
        } finally {
            setIsAdding(false);
        }
    };

    if (isLoadingCommunity) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <Spinner />
            </div>
        );
    }

    return (
        <>
            <div className="w-full lg:w-4/6">
                {/* Banner + Info */}
                <div className="overflow-hidden rounded-3xl bg-white shadow">
                    <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72">
                        <Image
                            src={community?.thumbnail ?? `${imagebase}/user.png`}
                            alt={community?.title ?? "thumbnail"}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                        <div className="flex flex-col gap-y-4">
                            <h2 className="text-black text-xl sm:text-2xl font-bold leading-tight">
                                {community?.title}
                            </h2>
                            <p className="text-[#686184] text-sm sm:text-base font-medium leading-relaxed">
                                {community?.description}
                            </p>

                            <div className="flex items-center justify-between pt-2">
                                <div
                                    className="flex items-center gap-x-2 sm:gap-x-3 cursor-pointer group"
                                    onClick={onOpen}
                                >
                                    <div className="flex items-center -space-x-2">
                                        {community && (
                                            <RenderParticipants
                                                participants={community?.members}
                                                maxDisplay={3}
                                                totalParticipants={community.members?.length}
                                            />
                                        )}
                                    </div>
                                    <span className="text-xs text-[#686184] font-medium group-hover:text-[#5160E7] transition-colors">
                                        {community?.totalMembers || 0} member{community?.totalMembers !== 1 ? "s" : ""}
                                    </span>
                                </div>

                                {showCanJoin && (
                                    <Button
                                        isLoading={isLoadingCommunity}
                                        isDisabled={isLoadingCommunity}
                                        className="ml-auto h-10 rounded-full bg-[#5160E7] text-white px-8 font-bold shadow-lg shadow-indigo-100"
                                        onPress={() => joinCommunity.mutate?.(params.id!)}
                                    >
                                        Join Community
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* About Admin */}
                        <div className="flex flex-col gap-y-4 bg-[#F5F5F5] rounded-2xl p-4 sm:p-5">
                            <h3 className="text-black text-sm sm:text-base font-semibold">About Admin</h3>
                            <div className="flex items-center gap-x-3">
                                <Image
                                    src={community?.creator?.profilePicture || "/user.png"}
                                    alt={community?.creator?.firstName ?? "profile"}
                                    width={48}
                                    height={48}
                                    className="rounded-full size-10 sm:size-12 object-cover"
                                />
                                <div className="space-y-1 min-w-0">
                                    <h3 className="text-sm sm:text-base font-semibold text-black truncate">
                                        {community?.creator?.lastName} {community?.creator?.firstName}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-[#686184]">
                                        {community?.Challenges?.length || 0} challenge{community?.Challenges?.length === 1 ? "" : "s"} hosted
                                    </p>
                                </div>
                            </div>
                            <p className="text-xs sm:text-sm text-[#686184] leading-relaxed">
                                {community?.creator?.about || ""}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Challenges section — single, unified */}
                {isAuthorized && (
                    <div className="p-4 sm:p-6 rounded-2xl mt-4 sm:mt-6 bg-white">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-black text-sm sm:text-base font-semibold">Challenges</p>
                            <span
                                className="text-[#5160E7] text-xs sm:text-sm font-semibold cursor-pointer"
                                onClick={() => router.push(`/dashboard/challenges`)}
                            >
                                See All
                            </span>
                        </div>

                        {/* Add challenge — creator only */}
                        {isCreator && (
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex-1">
                                    <Select
                                        aria-label='select challenges to update the community'
                                        placeholder="Select a challenge to add..."
                                        selectedKeys={selectedChallengeId ? [selectedChallengeId] : []}
                                        onSelectionChange={keys => {
                                            const val = Array.from(keys)[0] as string;
                                            setSelectedChallengeId(val ?? "");
                                        }}
                                        isLoading={isLoadingChallenges}
                                        size="sm"
                                        classNames={{
                                            trigger: "rounded-xl border border-[#E8E7ED]",
                                        }}
                                    >
                                        {(allChallenges ?? [])
                                            .filter(c => !community?.Challenges?.some((cc: any) => cc._id === c._id))
                                            .map(challenge => (
                                                <SelectItem key={challenge._id} textValue={challenge.title}>
                                                    <span className="text-sm font-medium">{challenge.title}</span>
                                                </SelectItem>
                                            ))}
                                    </Select>
                                </div>
                                <Button
                                    size="sm"
                                    className="bg-[#5160E7] text-white rounded-xl px-4 shrink-0"
                                    isLoading={isAdding}
                                    isDisabled={!selectedChallengeId || isAdding}
                                    onPress={handleAddChallenge}
                                >
                                    Add
                                </Button>
                            </div>
                        )}
                        {/* List */}
                        {isLoadingCommunityChallenges ? (
                            <div className="flex items-center justify-center py-10">
                                <Spinner size="lg" color="primary" />
                            </div>
                        ) : (communityChallenges?.data?.length ?? 0) > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {communityChallenges?.data?.map((challenge: any, idx: number) => (
                                    <ChallengeCard key={challenge._id || idx} data={challenge} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 text-gray-500 text-sm">
                                No challenges available at the moment.
                            </div>
                        )}

                    </div>
                )}
            </div>

            <ChatScreen showMessages={showMessages} isMember={isAuthorized} />
        </>
    );
};

export default CommunityDetailView;