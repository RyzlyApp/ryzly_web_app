'use client'

import { CommunityContent } from '@/components/communities/communityContent'
import { userAtom } from '@/helper/atom/user'
import { Spinner } from '@heroui/react'
import { useAtom } from 'jotai'

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