"use client"

import useCommunity, { CommunityFilters } from "@/hook/useCommunities"
import { useResponsive } from "@/hook/useMediaQeury"
import { useRouter } from "next/navigation"
import { useMemo, useRef, useState } from "react"
import CommunityMobile from "./communityMobile"
import { Chip, Divider } from "@heroui/react"
import CommunityCard from "./communityCard"
import { ICommunity } from "@/helper/model/community"
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri"
import { useQuery } from "@tanstack/react-query"
import httpService from "@/helper/services/httpService"

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
    const [activeCategory, setActiveCategory] = useState<string>("All") // "All" means no filter

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
        category: activeCategory === "All" ? undefined : activeCategory, // ✅ only send category if not "All"
    }), [userId, activeCategory])

    const { joinCommunity, isJoining } = useCommunity()
    const { getCommunities: getCreatedCommunities } = useCommunity(undefined, undefined, creatorFilters)
    const { getCommunities: getJoinedCommunities } = useCommunity(undefined, undefined, joinedFilters)
    const { getCommunities: getNotJoinedCommunities } = useCommunity(undefined, undefined, notJoinedFilters)

    const { data: createdCommunities } = getCreatedCommunities
    const { data: joinedCommunities } = getJoinedCommunities
    const { data: notJoinedCommunities } = getNotJoinedCommunities

    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await httpService.get('/community/Categories')
            return res.data?.data
        }
    })

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category) // ✅ just set the string
    }
    const handleTabScroll = (direction: string) => {
        const container = tabsContainerRef.current
        if (!container) return
        container.scrollBy({ left: direction === 'next' ? 150 : -150, behavior: 'smooth' })
    }

    if (down("lg")) return <CommunityMobile />

    const allCategories = ["All", ...(categories || [])]

    return (
        <div className='flex gap-4 h-full'>
            {/* Left sidebar – unchanged, omitted for brevity */}
            <div className='col-span-1 flex flex-col p-4 h-full rounded-2xl bg-white w-2/6 overflow-hidden'>
                <div className='shrink-0'>
                    <h2 className='text-black text-base font-semibold mb-1'>Your communities</h2>
                    <Divider />
                </div>

                {!createdCommunities?.data?.length && !joinedCommunities?.data?.length ? (
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
                    <div className='flex-1 overflow-y-auto mt-3 scrollbar-hide'>
                        {!!createdCommunities?.data?.length && (
                            <div>
                                <h2 className='text-black text-base font-semibold mb-2 sticky top-0 bg-white py-1 z-10'>
                                    Created communities
                                </h2>
                                <div className='flex flex-col gap-1'>
                                    {createdCommunities.data.map((community: ICommunity) => (
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

            {/* Right side – all communities with category filter */}
            <div className='col-span-3 w-4/6'>
                <div className="relative rounded-2xl">
                    <button
                        onClick={() => handleTabScroll('prev')}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 bg-white text-black rounded-full shadow-md hover:bg-gray-100 border border-[#E8E7ED]"
                    >
                        <RiArrowLeftLine />
                    </button>

                    <div
                        ref={tabsContainerRef}
                        className="flex gap-2 bg-white w-full px-12 py-3.5 overflow-x-auto rounded-2xl mb-4 scrollbar-hide"
                    >
                        {allCategories.map((cat) => {
                            const isActive = cat === activeCategory 
                            return (
                                <Chip
                                    key={cat}
                                    onClick={() => handleCategoryClick(cat)} 
                                    className={`py-4 border border-[#E8E7ED] rounded-3xl transition-all duration-300 whitespace-nowrap cursor-pointer capitalize ${isActive
                                            ? 'bg-[#5160E7] border-transparent text-white'
                                            : 'bg-inherit text-black hover:bg-gray-50'
                                        }`}
                                >
                                    {cat}
                                </Chip>
                            )
                        })}
                    </div>

                    <button
                        onClick={() => handleTabScroll('next')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 bg-white text-black rounded-full shadow-md hover:bg-gray-100 border border-[#E8E7ED]"
                    >
                        <RiArrowRightLine />
                    </button>
                </div>

                <div className='mt-2 bg-white rounded-2xl h-[calc(100vh-200px)] grid lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4 overflow-auto'>
                    {notJoinedCommunities?.data?.length ? (
                        notJoinedCommunities.data.map((community: ICommunity, index: number) => (
                            <CommunityCard
                                variant='grid'
                                key={community._id || index}
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