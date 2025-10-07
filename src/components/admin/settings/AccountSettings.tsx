"use client";
import { useState } from "react";
import { Avatar } from "@heroui/react";
import { RiEditLine } from "react-icons/ri";
import CustomButton from "@/components/custom/customButton";
import EditProfileModal from "./modals/EditProfileModal";

export default function AccountSettings() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Account</h2>
        <button
          onClick={handleEditProfile}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <RiEditLine size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Profile Section */}
      <div className="text-center">
        <Avatar className="w-24 h-24 mx-auto mb-4" name="N" color="primary" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Ngozi Nnamani</h3>
        <p className="text-gray-600 mb-6">Community Support</p>
        <CustomButton variant="primary" onClick={handleEditProfile}>
          Edit Profile
        </CustomButton>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal open={isEditModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
