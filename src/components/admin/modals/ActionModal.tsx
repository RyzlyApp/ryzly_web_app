"use client";
import { Modal, ModalContent, ModalBody } from "@heroui/react";
import CustomButton from "@/components/custom/customButton";
import { Avatar } from "@heroui/react";

type ActionType = "ban" | "unban" | "report" | "suspend" | "reinstate";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: ActionType;
  title?: string;
  targetName?: string;
  targetImage?: string;
  description?: string;
}

export default function ActionModal({
  isOpen,
  onClose,
  onConfirm,
  type,
  title,
  targetName,
  targetImage,
  description,
}: ActionModalProps) {
  const getModalContent = () => {
    switch (type) {
      case "ban":
        return {
          title: title || "Ban Challenge",
          description:
            description ||
            "Banning this challenge will stop all activity and hide it from users. Please confirm if you want to proceed",
          confirmText: "Ban Challenge",
          confirmVariant: "customDanger" as const,
        };
      case "unban":
        return {
          title: title || "Unban Challenge",
          description:
            description ||
            "Are you sure you want to unban this challenge? It will be visible to users again.",
          confirmText: "Unban Challenge",
          confirmVariant: "primary" as const,
        };
      case "suspend":
        return {
          title: title || "Suspend User",
          description:
            description ||
            "Are you sure you want to suspend this user? Once suspended, they will lose access to their account, including all challenges, communities, and rewards associated with it.",
          confirmText: "Suspend User",
          confirmVariant: "customDanger" as const,
        };
      case "reinstate":
        return {
          title: title || "Reinstate User",
          description:
            description ||
            "Are you sure you want to reinstate this user? Once reinstated, they will regain access to their account, including challenges, communities, and rewards.",
          confirmText: "Reinstate",
          confirmVariant: "primary" as const,
        };
      case "report":
      default:
        return {
          title: title || "Report User",
          description:
            description ||
            "Please confirm if you want to report this user for inappropriate behavior.",
          confirmText: "Report User",
          confirmVariant: "warning" as const,
        };
    }
  };

  const modalContent = getModalContent();

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      size="sm"
    >
      <ModalContent>
        <ModalBody className="py-6">
          <div className="space-y-4 text-center">
            <h3 className="text-lg font-semibold">{modalContent.title}</h3>
            <p className="text-sm text-gray-600">{modalContent.description}</p>

            <div className="flex flex-col gap-3 pt-4">
              <CustomButton
                variant={modalContent.confirmVariant}
                onClick={onConfirm}
                fullWidth
              >
                {modalContent.confirmText}
              </CustomButton>
              <CustomButton variant="outline" onClick={onClose} fullWidth>
                Cancel
              </CustomButton>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
