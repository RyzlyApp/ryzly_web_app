import React, { useState } from "react";
import { useModal } from "@/contexts/ModalContext";
import VerificationCode from "./CodeVerification";
import { userAtom } from "@/helper/atom/user";
import { useAtom } from "jotai";

interface ChangeEmailProps {
  onClose: () => void;
}

const ChangeEmail: React.FC<ChangeEmailProps> = ({  }) => {
  const { openModal, closeModal } = useModal();
  const [newEmail, setNewEmail] = useState("");
  const [ userState ] = useAtom(userAtom)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openModal(
      <VerificationCode
        onClose={closeModal}
        email={newEmail || "your email"}
      />,
      "Enter verification code"
    );
  };

  return (
    <div className="pt-5">
      <h4 className="text-lg font-bold text-center lg:text-start mb-4">
        Change your email
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <p className="text-xs font-semibold mb-1">Current Email</p>
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg p-2 w-full text-xs"
            defaultValue={userState?.data?.email}
            disabled
          />
        </div>
        <div className="mb-6">
          <p className="text-xs font-semibold mb-1">New Email</p>
          <input
            type="email"
            placeholder="Enter Your New Email"
            className="border border-gray-300 rounded-lg p-2 w-full text-xs"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 w-full cursor-pointer bg-[#5160E7] text-white rounded-full hover:bg-[#4451c9]"
          >
            Change Email
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeEmail;
