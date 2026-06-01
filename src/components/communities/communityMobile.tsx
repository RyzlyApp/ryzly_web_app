import React, { useEffect, useRef, useState } from 'react'
import { Tabs, Tab, Avatar, AvatarIcon, Button, Chip, Divider } from "@heroui/react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';
import useCommunity, { CommunityFilters } from '@/hook/useCommunities';
import { userAtom } from '@/helper/atom/user';
import { useAtom } from 'jotai';
import { ICommunity } from '@/helper/model/community';
import CommunityCard from './communityCard';

// constants/communityTabs.ts
export const COMMUNITY_TABS = [
    { label: 'All', tag: '' },
    { label: 'Branding & Storytelling', tag: 'branding-storytelling' },
    { label: 'UI/UX', tag: 'ui-ux' },
    { label: 'Frontend & No-Code', tag: 'frontend-no-code' },
    { label: 'Product Strategy', tag: 'product-strategy' },
    { label: 'Marketing', tag: 'marketing' },
    { label: 'Video Editing', tag: 'video-editing' },
    { label: 'Game Development', tag: 'game-development' },
    { label: 'Mobile App Development', tag: 'mobile-app-development' },
    { label: 'Web Development', tag: 'web' },
    { label: 'ReactJs', tag: 'react-js' },
];

const CommunityMobile = () => {
    const [userState] = useAtom(userAtom);

    const [activeTab, setActiveTab] = useState('All')
    const tabsContainerRef = useRef<HTMLDivElement>(null)
    const router = useRouter()


    const [notJoinedFilters, setNotJoinedFilters] = useState<CommunityFilters>({
        filterByUser: 'notJoined',
        // here filtering by tags and search will be done here
        tags: []
    });
    const [joinedFilters, setJoinedFilters] = useState<CommunityFilters>({
        filterByUser: 'joined',
    });
    const [creatorFilters, setCreatorFilters] = useState<CommunityFilters>({
        filterByUser: 'created',
    });

    const { getCommunities: getCreatedCommunities } = useCommunity(undefined, undefined, creatorFilters)
    const { getCommunities: getJoinedCommunities } = useCommunity(undefined, undefined, joinedFilters)
    const { getCommunities: getNotJoinedCommunities } = useCommunity(undefined, undefined, notJoinedFilters)
    const { joinCommunity } = useCommunity()

    const { data: createdCommunities } = getCreatedCommunities
    const { data: joinedCommunities } = getJoinedCommunities
    const { data: notJoinedCommunities } = getNotJoinedCommunities

    useEffect(() => {
        if (userState?.data?._id) {
            const userId = userState.data._id;
            setJoinedFilters(prev => ({ ...prev, userId }));
            setNotJoinedFilters(prev => ({ ...prev, userId }));
            setCreatorFilters(prev => ({ ...prev, userId }));
        }
    }, [userState?.data?._id]);

    const isCommunity = ((joinedCommunities?.data?.length || 0) +
        (createdCommunities?.data?.length || 0)) > 0;

    const handleTabClick = (tabLabel: string) => {
        setActiveTab(tabLabel);

        const selected = COMMUNITY_TABS.find(t => t.label === tabLabel);
        const newTags = selected?.tag ? [selected.tag] : [];

        setNotJoinedFilters(prev => ({
            ...prev,
            tags: newTags,
        }));
    };

    const isActive = (tab: string) => {
        return activeTab === tab
    }
    const handleTabScroll = (direction: string) => {
        const container = tabsContainerRef.current;
        if (!container) return;
        // Slide 150px per click. Adjust as needed.
        const amount = direction === 'next' ? 150 : -150;
        container.scrollBy({ left: amount, behavior: 'smooth' });
    };


    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options"
                variant='underlined'
                color='default'
                fullWidth
                className='overflow-hidden rounded-t-2xl'
                classNames={{
                    tabList: "gap-6 w-full relative overflow-hidden bg-white rounded-none p-0 border-b border-[#CCD1FF] ",
                    tab: "max-w-full px-0 h-12 text-xs text-black",
                    cursor: "w-full bg-[#596AFE]",
                    tabContent: "group-data-[selected=true]:text-[#000]",
                    panel: 'bg-white h-[calc(100vh-208px)] overflow-y-auto'
                }}
            >
                <Tab key="your_communities" title="Your Communities" >
                    {/* <div className='col-span-1 p-4 px-0 h-full w-full'>
                        {
                            !isCommunity && (
                                <div className='h-full flex flex-col items-center justify-center gap-2'>
                                    <h3 className='text-black font-bold text-base text-center lg:text-xl'>Looks a little quiet here...</h3>
                                    <p className='text-[#686184] text-xs text-center max-w-[280px]'>Join a community of Rhyzers to share ideas, ask questions, or just vibe with others building alongside you.</p>
                                </div>
                            )
                        }
                        <div className='mt-2.5 bg-white'>
                            <div className='pl-2'>
                                <h2 className='text-base text-black font-semibold mb-2'>Created Communities</h2>
                                <div>
                                    {createdCommunities?.data.map((community: ICommunity, index: number) => (
                                        <CommunityCard
                                            variant='list'
                                            key={index}
                                            community={community}
                                            onNavigate={() => router.push(`/communities/${community._id}`)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className='pl-2'>
                                <h2 className=' text-base text-black font-semibold mt-3 mb-2'>Joined Communities</h2>
                                <div>
                                    {joinedCommunities && joinedCommunities?.data?.length > 0 ? joinedCommunities?.data.map((community: ICommunity, index: number) => (
                                        <CommunityCard
                                            variant='list'
                                            key={index}
                                            community={community}
                                            onNavigate={() => router.push(`/communities/${community._id}`)}
                                        />
                                    )) : (
                                        <div className='flex items-center justify-center h-full'>
                                            <h2 className='mt-16 text-sm text-[#686184] font-medium'>You haven't joined a community yet</h2>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <div className='col-span-1 flex flex-col p-4 h-full w-full'>
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
                </Tab>
                <Tab key="explore_communities" title="Explore Communities">
                    <div className='w-full'>
                        <div className="relative rounded-2xl">
                            {/* Back Button (Left) */}
                            <button
                                onClick={() => handleTabScroll('prev')}
                                aria-label="Scroll tabs left"
                                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 bg-white text-black rounded-full shadow-md hover:bg-gray-100 border border-[#E8E7ED] transition-colors"
                            >
                                <RiArrowLeftLine />
                            </button>

                            {/* Scrollable Tabs Container */}
                            <div
                                ref={tabsContainerRef}
                                role="tablist"
                                className="flex gap-2 bg-white w-full px-12 py-3.5 overflow-x-auto rounded-2xl mb-4 scrollbar-hide"
                            >
                                {COMMUNITY_TABS.map((tab) => (
                                    <Chip
                                        key={tab.label}
                                        role="tab"
                                        aria-selected={isActive(tab.label)}
                                        tabIndex={isActive(tab.label) ? 0 : -1}
                                        onClick={() => handleTabClick(tab.label)}
                                        className={`px-4 py-2 border border-[#E8E7ED] rounded-3xl transition-all duration-300 whitespace-nowrap cursor-pointer ${isActive(tab.label)
                                            ? 'bg-[#5160E7] border-transparent text-white'
                                            : 'bg-inherit text-black hover:bg-gray-50'
                                            }`}
                                    >
                                        {tab.label}
                                    </Chip>
                                ))}
                            </div>

                            {/* Next Button (Right) */}
                            <button
                                onClick={() => handleTabScroll('next')}
                                aria-label="Scroll tabs right"
                                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 bg-white text-black rounded-full shadow-md hover:bg-gray-100 border border-[#E8E7ED] transition-colors"
                            >
                                <RiArrowRightLine />
                            </button>
                        </div>

                        <div className='mt-2 bg-white rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 sm:gap-x-2.5 p-2 overflow-auto'>
                            {notJoinedCommunities && notJoinedCommunities?.data?.map((community: ICommunity, index: number) => (
                                <CommunityCard
                                    variant='grid'
                                    key={index}
                                    showJoinButton={true}
                                    community={community}
                                    isJoining={joinCommunity.isPending}
                                    onJoin={() => joinCommunity.mutate(community._id)}
                                    onNavigate={() => router.push(`/communities/${community._id}`)}
                                />
                            ))}
                        </div>
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}
export default CommunityMobile