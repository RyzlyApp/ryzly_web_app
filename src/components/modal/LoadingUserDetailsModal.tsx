import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Spinner } from "@heroui/react";

interface LoadingUserDetailsModalProps {
    isOpen: boolean;
    onClose?: () => void;
}

export default function LoadingUserDetailsModal({
    isOpen,
    onClose = () => {},
}: LoadingUserDetailsModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            hideCloseButton={true}
            backdrop="blur"
            size="md"
        >
            <ModalContent>
                <ModalHeader className="flex flex-col text-center pt-6">
                    <h3 className="text-xl font-bold text-gray-900">
                        Loading User Details
                    </h3>
                </ModalHeader>
                <ModalBody className="flex flex-col items-center justify-center gap-4 pb-6">
                    <p className="text-sm text-gray-500 text-center">
                        Please wait while we fetch your user details.
                    </p>
                    <Spinner size="lg" color="primary" />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}