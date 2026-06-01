
import EditGroupCommunityForm from '@/components/forms/editgroupcommunity'
import CustomModal from '@/components/shared/modalLayout'
import React from 'react'

const EditGroupModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <CustomModal 
      isOpen={isOpen}
      onClose={onClose}
      title='Edit Group'
      size='2xl'
    >
      <EditGroupCommunityForm onClose={onClose} />
    </CustomModal>
  )
}

export default EditGroupModal