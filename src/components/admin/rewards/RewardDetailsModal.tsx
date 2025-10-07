"use client";
import CustomButton from "@/components/custom/customButton";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { RiEditLine, RiDeleteBinLine } from "react-icons/ri";

interface RewardDetailsModalProps {
  open: boolean;
  onClose: () => void;
  reward: {
    id: string;
    title: string;
    type: string;
    imageUrl: string;
    description: string;
    pointsRequired: number;
    quantity: number;
    addedAt: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

export default function RewardDetailsModal({
  open,
  onClose,
  reward,
  onEdit,
  onDelete,
}: RewardDetailsModalProps) {
  return (
    <Modal
      isOpen={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
      size="4xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-lg font-semibold">Reward Details</h3>
            <div className="flex items-center gap-2">
              <CustomButton
                variant="outline"
                size="sm"
                startIcon={<RiEditLine size={16} />}
                onClick={onEdit}
              >
                Edit Reward
              </CustomButton>
              <CustomButton
                variant="customDanger"
                size="sm"
                startIcon={<RiDeleteBinLine size={16} />}
                onClick={onDelete}
              >
                Remove Reward
              </CustomButton>
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Reward Image */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-gray-900">
                Reward Image
              </h4>
              <div className="w-full h-80 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={reward.imageUrl}
                  alt={reward.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Reward Title</label>
                  <p className="text-sm font-medium text-gray-900">
                    {reward.title}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Reward Type</label>
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {reward.type}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Description</label>
                  <p className="text-sm text-gray-700 mt-1">
                    {reward.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">
                      Points Required
                    </label>
                    <p className="text-sm font-medium text-gray-900">
                      {reward.pointsRequired}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Quantity</label>
                    <p className="text-sm font-medium text-gray-900">
                      {reward.quantity}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Added At</label>
                  <p className="text-sm font-medium text-gray-900">
                    {reward.addedAt}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex items-center justify-end gap-3 w-full">
            <CustomButton variant="outline" onClick={onClose}>
              Close
            </CustomButton>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
