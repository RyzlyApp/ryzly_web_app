"use client";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Avatar,
} from "@heroui/react";
import { RiCameraLine } from "react-icons/ri";
import CustomButton from "@/components/custom/customButton";
import SearchInput from "../../SearchInput";

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export default function EditProfileModal({
  open,
  onClose,
}: EditProfileModalProps) {
  const [fullName, setFullName] = useState("Ngozi Nnamani");

  const handleSave = () => {
    console.log("Saving profile:", { fullName });
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
        <ModalHeader className="flex flex-col gap-1">Edit profile</ModalHeader>
        <ModalBody>
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <div className="w-24 h-24 grid place-content-center relative p-10 bg-[#596AFE] rounded-full">
                <p className="text-white text-center text-2xl font-bold">N</p>
                <button className="absolute bottom-0 right-0 bg-white text-white rounded-full p-2 hover:bg-blue-600 transition-colors">
                  <RiCameraLine size={16} color="gray" />
                </button>
              </div>
            </div>
            <div className="w-full">
              <input
                type="text"
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="rounded-lg border border-gray-400 text-xs w-full py-3 px-2"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <CustomButton variant="primary" onClick={handleSave}>
            Save
          </CustomButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
