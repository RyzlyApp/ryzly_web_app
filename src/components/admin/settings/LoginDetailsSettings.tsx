"use client";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import CustomButton from "@/components/custom/customButton";
import ChangeEmailModal from "./modals/ChangeEmailModal";
import ChangePasswordModal from "./modals/ChangePasswordModal";
import VerificationModal from "./modals/VerificationModal";

export default function LoginDetailsSettings() {
  const [isChangeEmailModalOpen, setIsChangeEmailModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);

  const handleChangeEmail = () => {
    setIsChangeEmailModalOpen(true);
  };

  const handleChangePassword = () => {
    setIsChangePasswordModalOpen(true);
  };

  const handleDeactivateAccount = () => {
    console.log("Deactivate account");
  };

  const handleCloseModals = () => {
    setIsChangeEmailModalOpen(false);
    setIsChangePasswordModalOpen(false);
    setIsVerificationModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Login Details</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <div className="flex items-center justify-between">
          <span className="text-gray-900">oluwaseunobioma@mail.com</span>
          <button
            onClick={handleChangeEmail}
            className="text-sm text-[#5160E7]"
          >
            Change
          </button>
        </div>
      </div>

      <div className="mb-6 text-sm">
        <button
          onClick={handleChangePassword}
          className="flex items-center justify-between w-full py-3"
        >
          <span className="text-gray-900">Change your password</span>
          <FaArrowRight size={16} className="text-gray-400" />
        </button>
      </div>

      <div className="mb-6 text-sm">
        <button
          onClick={handleDeactivateAccount}
          className="flex items-center justify-between w-full py-3"
        >
          <span className="text-gray-900">Deactivate your account</span>
          <FaArrowRight size={16} className="text-gray-400" />
        </button>
      </div>

      <ChangeEmailModal
        open={isChangeEmailModalOpen}
        onClose={handleCloseModals}
      />

      <ChangePasswordModal
        open={isChangePasswordModalOpen}
        onClose={handleCloseModals}
      />

      <VerificationModal
        email="oluwaseunobioma@mail.com"
        open={isVerificationModalOpen}
        onClose={handleCloseModals}
      />
    </div>
  );
}
