"use client";
import { useEffect, useState } from "react";
import CustomButton from "@/components/custom/customButton";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";

interface EditAccessModalProps {
  open: boolean;
  onClose: () => void;
  adminName: string;
  currentAccess: string[];
  onSave: (updatedAccess: string[]) => void;
}

const ACCESS = [
  "dashboard",
  "users",
  "challenges",
  "communities",
  "approvals",
  "transactions",
  "rewards",
  "reports",
  "analytics",
  "admin_roles",
];

export default function EditAccessModal({
  open,
  onClose,
  adminName,
  currentAccess,
  onSave,
}: EditAccessModalProps) {
  const [access, setAccess] = useState<string[]>([]);
  useEffect(() => {
    if (open) setAccess(currentAccess);
  }, [open, currentAccess]);

  const toggle = (id: string) => {
    setAccess((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  return (
    <Modal
      isOpen={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
      size="md"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader>
          <h3 className="text-lg font-semibold">Edit Access</h3>
        </ModalHeader>
        <ModalBody className="space-y-4">
          <p className="text-sm text-gray-600">
            Update permissions for {adminName}.
          </p>
          <div className="space-y-3">
            {ACCESS.map((key) => (
              <label key={key} className="flex items-center justify-between">
                <span className="text-sm capitalize text-gray-800">
                  {key.replace("_", " ")}
                </span>
                <input
                  type="checkbox"
                  checked={access.includes(key)}
                  onChange={() => toggle(key)}
                  className="h-4 w-4"
                />
              </label>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex items-center justify-end gap-3 w-full">
            <CustomButton variant="outline" onClick={onClose}>
              Cancel
            </CustomButton>
            <CustomButton
              variant="primary"
              onClick={() => {
                onSave(access);
                onClose();
              }}
            >
              Save Changes
            </CustomButton>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
