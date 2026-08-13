'use client'

import { CommunityContent } from '@/components/communities/communityContent'
import { userAtom } from '@/helper/atom/user'
import { Spinner } from '@heroui/react'
import { useAtom } from 'jotai'
import { COMMUNITY_TABS } from '@/helper/utils/databank'

const Communities = () => {
    const [userState] = useAtom(userAtom)
    const userId = userState?.data?._id

    if (!userId) {
        return (
            <div className="flex items-center justify-center h-full">
                <Spinner size="lg" color="primary" />
            </div>
        )
    }

    return <CommunityContent userId={userId} />
}

export default Communities