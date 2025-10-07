"use client";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import CustomButton from "@/components/custom/customButton";
import CustomInput from "@/components/custom/customInput";
import SearchInput from "../../SearchInput";

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({
  open,
  onClose,
}: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Changing password:", { currentPassword, newPassword });
    onClose();
  };

  return (
    <Modal
      isOpen={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
      size="md"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Change your password
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div className="">
              <p className="text-xs text-gray-500">Currrent password</p>
              <input
                type="password"
                placeholder="Enter your current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full rounded-lg border py-3 px-2 border-gray-300 text-xs mt-1"
              />
            </div>

            <div className="">
              <p className="text-xs text-gray-500">New password</p>
              <input
                type="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-lg border py-3 px-2 border-gray-300 text-xs mt-1"
              />
            </div>

            <div className="">
              <p className="text-xs text-gray-500">Confirm new password</p>
              <input
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border py-3 px-2 border-gray-300 text-xs mt-1"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <CustomButton
            fullWidth={true}
            variant="primary"
            onClick={handleChangePassword}
          >
            Change Password
          </CustomButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
