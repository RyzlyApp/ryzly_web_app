import React from 'react'
import CustomModal from '@/components/shared/modalLayout'
import EditCommunityForm from '@/components/forms/editcommunity'



const EditCommunityModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title='Edit Community'
      size='2xl'
    >
      <EditCommunityForm onClose={onClose}/>
    </CustomModal>
  )
}

export default EditCommunityModal