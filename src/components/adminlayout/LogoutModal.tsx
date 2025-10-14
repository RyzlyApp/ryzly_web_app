"use client";
import CustomButton from "@/components/custom/customButton";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

interface AdminLogoutProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function AdminLogout({
  open,
  onClose,
  onConfirm,
}: AdminLogoutProps) {
  return (
    <Modal
      isOpen={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
      size="md"
    >
      <ModalContent>
        <ModalHeader className="justify-center">
          <div className="bg-[#f4c6c3] p-2 rounded-full">
            <div className="p-2 rounded-full bg-[#FDA29B]">
              <AiOutlineExclamationCircle className="text-red-500" size={23} />
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="text-center space-y-3">
            <h1 className="text-lg font-semibold">Logout</h1>
            <p className="text-xs text-gray-600">
              Are you sure you want to log out? You’ll be signed out of the
              admin dashboard and will need to log in again to continue managing
              Rhyzly.
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
              Logout
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
