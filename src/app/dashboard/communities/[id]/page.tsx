'use client'

import { Button, useDisclosure } from '@heroui/react'
import { useParams } from 'next/navigation'
import { useAtom } from 'jotai'
import { userAtom } from '@/helper/atom/user'
import CommunityMembersModal from '@/components/communities/modals/communityMembersModal'
import { cn } from '@/lib/utils'
import { useCommunityChat } from '@/components/communities/hook/useCommunityChat'
import ExpandedChatView from '@/components/communities/chats/ExpandedChatView'
import { useCommunityGroup } from '@/hook/useCommunitiesGroup'
import { Plus } from 'lucide-react'
import AddGroupModal from '@/components/communities/modals/addGroupModal'
import useCommunity from '@/hook/useCommunities'
import CommunityDetailView from '@/components/communities/communityDetailView'
import GroupDetailView from '@/components/communities/groupDetailView'

const CommunityDetail = () => {
    const [userState] = useAtom(userAtom)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const params = useParams<{ id: string }>()
    const addGroupModal = useDisclosure();

    const { getCommunity, getCommunityMembers } = useCommunity()
    const { currentGroup } = useCommunityGroup(false, params.id)

    const community = getCommunity.data
    const communityCreator = userState.data?._id === community?.creator._id || currentGroup?.creator._id;

    const creatorAndMembers = {
        creator: community?.creator,
        members: getCommunityMembers.data
    }

    const handleMainAction = (key: React.Key) => {
        if (key === 'addGroup') addGroupModal.onOpen();
    }

    const { isExpanded } = useCommunityChat()               // ← from params
    const { groups, currentGroupId, setActiveGroup, isGeneralView } = useCommunityGroup(false, params.id)
    
    return (
        <>
            <div className='h-[calc(100vh-112px)] flex flex-col'>
                {/* Group tabs — always visible */}
                {!isExpanded && (
                    <div className='flex gap-2 bg-white w-full px-4 py-3.5 overflow-x-auto rounded-2xl mb-4 shrink-0'>
                        <Button
                            variant='solid'
                            className={cn(
                                'px-4 py-2 bg-inherit border border-[#E8E7ED] text-black rounded-3xl transition-colors duration-300',
                                isGeneralView && 'bg-[#5160E7] text-white'
                            )}
                            onPress={() => setActiveGroup(null)}
                        >
                            General
                        </Button>
                        {groups
                            .map((group) => (
                                <Button
                                    key={group._id}
                                    variant='solid'
                                    className={cn(
                                        'px-4 py-2 bg-inherit border border-[#E8E7ED] text-black rounded-3xl transition-colors duration-300',
                                        currentGroupId === group._id && 'bg-[#5160E7] text-white'
                                    )}
                                    onPress={() => setActiveGroup(group._id)}
                                >
                                    {group.title}
                                </Button>
                            ))
                        }
                        {communityCreator && (
                            <Button isIconOnly variant='light' onPress={() => handleMainAction('addGroup')} className='lg:hidden'>
                                <Plus />
                            </Button>
                        )}
                    </div>
                )}

                {/* Content area */}
                <div className='flex-1 flex gap-6 min-h-0'>
                    {isExpanded ? (
                        <ExpandedChatView />
                    ) : (
                        isGeneralView
                            ? <CommunityDetailView onOpen={onOpen} />
                            : <GroupDetailView onOpen={onOpen} />
                    )}
                </div>
            </div>

            <CommunityMembersModal isOpen={isOpen} onClose={onClose} isGeneralView={isGeneralView} creatorAndMembers={creatorAndMembers} />
            <AddGroupModal isOpen={addGroupModal.isOpen} onClose={addGroupModal.onClose} />

        </>
    )
}

export default CommunityDetail