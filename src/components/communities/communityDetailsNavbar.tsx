import { Button, useDisclosure } from '@heroui/react'
import { MoreVertical } from 'lucide-react'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useMemo } from 'react'
import { RiArrowLeftLine, RiFlagLine, RiPencilLine } from 'react-icons/ri'
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@heroui/dropdown";
import { PiTrashLight } from 'react-icons/pi'
import { RxExit } from 'react-icons/rx'
import ReportCommunityModal from './modals/reportCommunityModal'
import LeaveCommunityModal from './modals/leaveCommunityModal'
import AddGroupModal from './modals/addGroupModal'
import useCommunity from '@/hook/useCommunities'
import { userAtom } from '@/helper/atom/user'
import { useAtom } from 'jotai'
import { useBack } from '@/hook/useBack'
import DeleteCommunityModal from './modals/deleteCommunityModal'
import EditCommunityModal from './modals/editCommunityModal'
import EditGroupModal from './modals/editGroupModal'
import ShareCommunityBtn from './shareCommunityButton'
import { useCommunityGroup } from '@/hook/useCommunitiesGroup'

const CommunityDetailsNavbar = () => {
    const [userState] = useAtom(userAtom);
    const { back } = useBack()
    const searchParams = useSearchParams();
    const params = useParams<{ id: string }>();
    const communityId = params.id; //

    const groupId = searchParams.get('group');
    const isGroupView = !!groupId;

    const editModal = useDisclosure();
    const leaveModal = useDisclosure();
    const deleteModal = useDisclosure();
    const reportModal = useDisclosure();
    const addGroupModal = useDisclosure();
    const editGroupModal = useDisclosure();

    // ✅ recomputes when switching between group and general view
    const edit = useMemo(
        () => isGroupView ? editGroupModal : editModal,
        [isGroupView]
    );

    const { getCommunity } = useCommunity()
    const { currentGroup } = useCommunityGroup()
    const community = getCommunity.data
    const communityCreator = userState.data?._id === community?.creator._id;

    const title = isGroupView ? currentGroup?.title : community?.title 

    // ✅ items array — no null children passed to DropdownMenu
    const dropdownItems = useMemo(() => [
        ...(communityCreator ? [
            {
                key: 'edit',
                label: isGroupView ? 'Edit Group' : 'Edit Community',
                icon: <RiPencilLine size={20} />,
                danger: false,
                onPress: () => edit.onOpen(),
            },
            {
                key: 'delete',
                label: isGroupView ? 'Delete Group' : 'Delete Community',
                icon: <PiTrashLight size={20} />,
                danger: true,
                onPress: () => deleteModal.onOpen(),
            },
        ] : []),
        ...(!communityCreator ? [
            {
                key: 'leave',
                label: isGroupView ? 'Leave Group' : 'Leave Community',
                icon: <RxExit size={20} />,
                danger: false,
                onPress: () => leaveModal.onOpen(),
            },
            {
                key: 'report',
                label: isGroupView ? 'Report Group' : 'Report Community',
                icon: <RiFlagLine size={20} />,
                danger: false,
                onPress: () => reportModal.onOpen(),
            },
        ] : [])
    ], [communityCreator, isGroupView]);

    return (
        <>
            <div className="px-2 md:px-6 xl:px-8 pt-6.25 pb-4.25 flex items-center justify-between">
                <div className="flex items-center">
                    <Button onPress={back} variant='light' isIconOnly={true}>
                        <RiArrowLeftLine size={20} />
                    </Button>
                    <h2 className="font-semibold text-base md:text-xl lg:text-3xl text-[#252B37]">
                        {title}
                    </h2>
                </div>

                <div className="flex items-center gap-6">
                    {communityCreator && (
                        <Button
                            className='hidden lg:block bg-[#5160E7] text-white rounded-full'
                            onPress={() => addGroupModal.onOpen()}
                        >
                            Add Group
                        </Button>
                    )}

                    <ShareCommunityBtn id={communityId!} />

                    {/* More actions */}
                    <Dropdown className='pt-0 rounded-sm mt-2'>
                        <DropdownTrigger>
                            <Button size="sm" variant="light" isIconOnly={true}>
                                <MoreVertical size={20} />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Community Actions"
                            items={dropdownItems}
                        >
                            {(item: any) => (
                                <DropdownItem
                                    key={item.key}
                                    startContent={item.icon}
                                    className={item.danger ? 'text-danger' : ''}
                                    color={item.danger ? 'danger' : 'default'}
                                    onPress={item.onPress}
                                >
                                    {item.label}
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>

            {/* ✅ lazy mount — only render modals when open */}
            {reportModal.isOpen && (
                <ReportCommunityModal isOpen onClose={reportModal.onClose} />
            )}
            {leaveModal.isOpen && (
                <LeaveCommunityModal
                    isOpen
                    onClose={leaveModal.onClose}
                />
            )}
            {deleteModal.isOpen && (
                <DeleteCommunityModal
                    isOpen
                    onClose={deleteModal.onClose}
                />
            )}
            {addGroupModal.isOpen && (
                <AddGroupModal isOpen onClose={addGroupModal.onClose} />
            )}
            {editModal.isOpen && !isGroupView && (
                <EditCommunityModal isOpen onClose={editModal.onClose} />
            )}
            {editGroupModal.isOpen && isGroupView && (
                <EditGroupModal isOpen onClose={editGroupModal.onClose} />
            )}
        </>
    )
}

export default CommunityDetailsNavbar