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
import VerificationModal from "./VerificationModal";

interface ChangeEmailModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ChangeEmailModal({
  open,
  onClose,
}: ChangeEmailModalProps) {
  const [currentEmail, setCurrentEmail] = useState("oluwaseunobioma@mail.com");
  const [newEmail, setNewEmail] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const handleChangeEmail = () => {
    console.log("Requesting email change to:", newEmail);
    setShowOtp(true);
  };

  const handleClose = () => {
    setShowOtp(false);
    setNewEmail("");
    onClose();
  };

  const handleOtpVerified = () => {
    console.log("Email changed successfully!");
    handleClose();
  };

  return (
    <Modal
      isOpen={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose();
      }}
      size="md"
    >
      <ModalContent>
        {showOtp ? (
          <VerificationModal
            email={newEmail}
            open={showOtp}
            onClose={handleClose}
          />
        ) : (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Change your email
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 ">Current Email</p>
                  <input
                    name="Current Email"
                    value={currentEmail}
                    onChange={(e) => setCurrentEmail(e.target.value)}
                    disabled
                    className="w-full rounded-lg border py-3 px-2 border-gray-300 text-xs mt-1"
                  />
                </div>

                <div>
                  <p className="text-xs text-gray-500 ">New Email</p>
                  <input
                    name="New Email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Enter your new email"
                    type="email"
                    className="w-full rounded-lg border py-3 px-2 border-gray-300 text-xs mt-1"
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <CustomButton
                fullWidth={true}
                variant="primary"
                onClick={handleChangeEmail}
                // disabled={!newEmail}
              >
                Change Email
              </CustomButton>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
