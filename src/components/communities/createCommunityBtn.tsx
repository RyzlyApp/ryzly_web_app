import React from 'react'
import { CustomButton } from '../custom'
import { Button, Tooltip, useDisclosure } from '@heroui/react'
import CreateCommunityModal from './modals/createCommunityModal'
import { useResponsive } from '@/hook/useMediaQeury'
import { Plus } from 'lucide-react'

const CreateCommunitieBtn = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { up } = useResponsive()

    return (
        <>
            <div className="" >
                {up('lg') ? (
                    <CustomButton onClick={() => onOpen()} height="36px" >Create Community</CustomButton >
                ) :
                    <Tooltip content='Create Community'>
                        <Button isIconOnly variant='light' onPress={() => onOpen()}><Plus /></Button>
                    </Tooltip>
                }
            </div>
            <CreateCommunityModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default CreateCommunitieBtn