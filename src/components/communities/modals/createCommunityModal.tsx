import React from 'react'
import CustomModal from '@/components/shared/modalLayout'
import CreateCommunityForm from '@/components/forms/createcommunity'



const CreateCommunityModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title='Create Community'
      size='2xl'
    >
      <CreateCommunityForm onClose={onClose}/>
    </CustomModal>
  )
}

export default CreateCommunityModal