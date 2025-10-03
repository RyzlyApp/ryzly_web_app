"use client";
import CustomButton from "@/components/custom/customButton";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";

interface RemoveAdminModalProps {
  open: boolean;
  onClose: () => void;
  adminName: string;
  avatarUrl?: string;
  onConfirm: () => void;
}

export default function RemoveAdminModal({
  open,
  onClose,
  adminName,
  avatarUrl = "/work.jpg",
  onConfirm,
}: RemoveAdminModalProps) {
  return (
    <Modal
      isOpen={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
      size="md"
    >
      <ModalContent>
        <ModalHeader className="justify-center">Remove</ModalHeader>
        <ModalBody>
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-3">
              <img
                src={avatarUrl}
                alt={adminName}
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="text-sm text-gray-900">{adminName}</span>
            </div>
            <p className="text-xs text-gray-600">
              Are you sure you want to remove this admin? Once removed, they
              will lose all administrative privileges and access to the
              dashboard.
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex flex-col items-center justify-center gap-3 w-full">
            <CustomButton
              variant="customDanger"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              fullWidth={true}
            >
              Remove
            </CustomButton>
            <CustomButton variant="outline" onClick={onClose} fullWidth={true}>
              Cancel
            </CustomButton>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
