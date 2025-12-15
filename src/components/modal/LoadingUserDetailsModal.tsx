import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody, 
} from "@heroui/modal";
import { Spinner } from '@heroui/react';

function LoadingUserDetailsModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="text-center">Loading User Details</ModalHeader>
        <ModalBody className="flex flex-col items-center justify-center gap-4">
            <p>Please wait while we fetch your user details.</p>
            <Spinner />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default LoadingUserDetailsModal