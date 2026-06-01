import AddGroupCommunityForm from '@/components/forms/addgroupcommunity'
import CustomModal from '@/components/shared/modalLayout'
import React from 'react'

const AddGroupModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <CustomModal 
      isOpen={isOpen}
      onClose={onClose}
      title='Add Group'
      size='2xl'
    >
      {/* <AddGroupForm /> */}
      <AddGroupCommunityForm onClose={onClose} />
    </CustomModal>
  )
}

export default AddGroupModal