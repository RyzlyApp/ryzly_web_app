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

interface VerificationModalProps {
  open: boolean;
  onClose: () => void;
  email: string;
}

export default function VerificationModal({
  open,
  onClose,
  email,
}: VerificationModalProps) {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const maskEmail = (email: string) => {
    if (!email) return "";
    const atIndex = email.lastIndexOf("@");
    if (atIndex < 4) return email;
    const name = email.substring(0, atIndex);
    const domain = email.substring(atIndex);
    const maskedName =
      name.substring(0, name.length - 3).replace(/./g, "*") +
      name.substring(name.length - 3);
    return maskedName + domain;
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = () => {
    const code = verificationCode.join("");
    console.log("Verifying code:", code);
    onClose();
  };

  const handleResendOTP = () => {
    console.log("Resending OTP");
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
          Enter verification code
        </ModalHeader>
        <ModalBody>
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              Enter the verification code that was sent to {maskEmail(email)}
            </p>

            <div className="flex justify-center gap-2">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ))}
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-between">
          <button
            onClick={handleResendOTP}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Resend OTP
          </button>
          <CustomButton variant="primary" onClick={handleVerify}>
            Verify
          </CustomButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
