"use client"

import useCommunity, { CommunityFilters } from "@/hook/useCommunities"
import { useResponsive } from "@/hook/useMediaQeury"
import { useRouter } from "next/navigation"
import { useMemo, useRef, useState } from "react"
import CommunityMobile from "./communityMobile"
import { Chip, Divider, Spinner } from "@heroui/react"
import CommunityCard from "./communityCard"
import { ICommunity } from "@/helper/model/community"
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri"

export const COMMUNITY_TABS = [
    { label: 'All', tag: '' },
    { label: 'Branding & Storytelling', tag: 'branding-storytelling' },
    { label: 'UI/UX', tag: 'ui-ux' },
    { label: 'Frontend & No-Code', tag: 'Frontend & No-Code' },
    { label: 'Product Strategy', tag: 'product-strategy' },
    { label: 'Marketing', tag: 'marketing' },
    { label: 'Video Editing', tag: 'video-editing' },
    { label: 'Game Development', tag: 'game-development' },
    { label: 'Mobile App Development', tag: 'mobile-app-development' },
    { label: 'Web Development', tag: 'web' },
]

export const CommunityContent = ({ userId }: { userId: string }) => {
    const { down } = useResponsive()
    const router = useRouter()
    const tabsContainerRef = useRef<HTMLDivElement>(null)
    const [activeTab, setActiveTab] = useState('All')
    const [activeTags, setActiveTags] = useState<string[]>([])

    // ✅ userId is guaranteed here — no undefined race
    const creatorFilters = useMemo<CommunityFilters>(() => ({
        filterByUser: 'created',
        userId,
    }), [userId])

    const joinedFilters = useMemo<CommunityFilters>(() => ({
        filterByUser: 'joined',
        userId,
    }), [userId])

    const notJoinedFilters = useMemo<CommunityFilters>(() => ({
        filterByUser: 'notJoined',
        userId,
        // tags: activeTags.length ? activeTags : undefined,
        category: activeTags.length ? activeTags[0] : undefined
    }), [userId, activeTags])

    const { joinCommunity, isJoining } = useCommunity()
    const { getCommunities: getCreatedCommunities } = useCommunity(undefined, undefined, creatorFilters)
    const { getCommunities: getJoinedCommunities } = useCommunity(undefined, undefined, joinedFilters)
    const { getCommunities: getNotJoinedCommunities } = useCommunity(undefined, undefined, notJoinedFilters)

    const { data: createdCommunities } = getCreatedCommunities
    const { data: joinedCommunities } = getJoinedCommunities
    const { data: notJoinedCommunities } = getNotJoinedCommunities

    const handleTabClick = (tabLabel: string) => {
        setActiveTab(tabLabel)
        const selected = COMMUNITY_TABS.find(t => t.label === tabLabel)
        setActiveTags(selected?.tag ? [selected.tag] : [])
    }

    const handleTabScroll = (direction: string) => {
        const container = tabsContainerRef.current
        if (!container) return
        container.scrollBy({ left: direction === 'next' ? 150 : -150, behavior: 'smooth' })
    }

    if (down("lg")) return <CommunityMobile />

    return (
        <div className='flex gap-4 h-full'>
            <div className='col-span-1 flex flex-col p-4 h-full rounded-2xl bg-white w-2/6 overflow-hidden'>
                {/* Sticky header */}
                <div className='shrink-0'>
                    <h2 className='text-black text-base font-semibold mb-1'>Your communities</h2>
                    <Divider />
                </div>

                {/* Conditionally Render Empty State OR Lists */}
                {!createdCommunities?.data?.length && !joinedCommunities?.data?.length ? (
                    /* Empty State Screen */
                    <div className='flex-1 flex flex-col items-center justify-center gap-4 p-4'>
                        <div className='flex flex-col items-center justify-center gap-2'>
                            <h3 className='text-black font-bold text-base text-center lg:text-xl'>
                                Looks a little quiet here...
                            </h3>
                            <p className='text-[#686184] text-xs text-center max-w-[280px] leading-relaxed'>
                                Join a community of Rhyzers to share ideas, ask questions, or just vibe with others building alongside you.
                            </p>
                        </div>
                    </div>
                ) : (
                    /* Scrollable Content (Shows if AT LEAST one community exists) */
                    <div className='flex-1 overflow-y-auto mt-3 scrollbar-hide'>
                        {/* Created Communities Section */}
                        {!!createdCommunities?.data?.length && (
                            <div>
                                <h2 className='text-black text-base font-semibold mb-2 sticky top-0 bg-white py-1 z-10'>
                                    Created communities
                                </h2>
                                <div className='flex flex-col gap-1'>
                                    {createdCommunities.data.map((community: ICommunity) => (
                                        <CommunityCard
                                            variant='list'
                                            key={community._id} // Using unique IDs instead of index array positions
                                            community={community}
                                            onNavigate={() => router.push(`/dashboard/communities/${community._id}`)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Joined Communities Section */}
                        {!!joinedCommunities?.data?.length && (
                            <div className={createdCommunities?.data?.length ? 'mt-4' : ''}>
                                <h2 className='text-black text-base font-semibold mb-2 sticky top-0 bg-white py-1 z-10'>
                                    Joined communities
                                </h2>
                                <div className='flex flex-col gap-1'>
                                    {joinedCommunities.data.map((community: ICommunity) => (
                                        <CommunityCard
                                            variant='list'
                                            key={community._id}
                                            community={community}
                                            onNavigate={() => router.push(`/dashboard/communities/${community._id}`)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* All communities */}
            <div className='col-span-3 w-4/6'>
                <div className="relative rounded-2xl">
                    <button
                        onClick={() => handleTabScroll('prev')}
                        aria-label="Scroll tabs left"
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 bg-white text-black rounded-full shadow-md hover:bg-gray-100 border border-[#E8E7ED] transition-colors"
                    >
                        <RiArrowLeftLine />
                    </button>

                    <div
                        ref={tabsContainerRef}
                        role="tablist"
                        className="flex gap-2 bg-white w-full px-12 py-3.5 overflow-x-auto rounded-2xl mb-4 scrollbar-hide"
                    >
                        {COMMUNITY_TABS.map((tab) => (
                            <Chip
                                key={tab.label}
                                role="tab"
                                aria-selected={activeTab === tab.label}
                                tabIndex={activeTab === tab.label ? 0 : -1}
                                onClick={() => handleTabClick(tab.label)}
                                className={`py-4 border border-[#E8E7ED] rounded-3xl transition-all duration-300 whitespace-nowrap cursor-pointer ${activeTab === tab.label
                                    ? 'bg-[#5160E7] border-transparent text-white'
                                    : 'bg-inherit text-black hover:bg-gray-50'
                                    }`}
                            >
                                {tab.label}
                            </Chip>
                        ))}
                    </div>

                    <button
                        onClick={() => handleTabScroll('next')}
                        aria-label="Scroll tabs right"
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 bg-white text-black rounded-full shadow-md hover:bg-gray-100 border border-[#E8E7ED] transition-colors"
                    >
                        <RiArrowRightLine />
                    </button>
                </div>

                {/* {isNotJoinedCommunityLoading && <Spinner />} */}
                <div className='mt-2 bg-white rounded-2xl h-[calc(100vh-200px)] grid lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4 overflow-auto'>
                    {notJoinedCommunities?.data?.length ? (
                        notJoinedCommunities.data.map((community: ICommunity, index: number) => (
                            <CommunityCard
                                variant='grid'
                                key={index}
                                community={community}
                                isJoining={isJoining}
                                showJoinButton={true}
                                onJoin={() => joinCommunity.mutate?.(community._id)}
                            />
                        ))
                    ) : (
                        <div className="w-full flex items-center justify-center col-span-2 lg:col-span-2 xl:col-span-3">
                            <p className="text-[#686184] text-sm font-medium">No communities found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

