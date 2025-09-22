import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useModal } from "@/contexts/ModalContext";
import ChangeEmail from "./ChangeEmail";
import DeactivationReasons from "./DeactivationReasons";
import ConfirmDeactivation from "./ConfirmDeactivation";

const LoginDetails: React.FC = () => {
  const { openModal, closeModal } = useModal();

  const handleChangeEmail = () => {
    openModal(<ChangeEmail onClose={closeModal} />, "Change your email", true);
  };

  //   const handleChangePassword = () => {
  //     console.log("Change password clicked");
  //   };

  const handleDeactivateAccount = () => {
    openModal(
      <DeactivationReasons
        onClose={closeModal}
        onContinue={() => {
          closeModal();
          openModal(
            <ConfirmDeactivation
              onClose={closeModal}
              onConfirm={() => {
                closeModal();
                console.log("Account deactivated successfully");
              }}
            />,
            "Confirm Deactivation"
          );
        }}
      />,
      "Deactivate Account",
      true
    );
  };

  return (
    <div className="p-3 bg-white rounded-t-xl h-full">
      <h3 className="text-sm font-bold">Login Details</h3>
      <div className="flex items-center mt-10">
        <div>
          <p className="text-xs">Email</p>
          <p className="text-sm mt-1">viktoh@gmail.com</p>
        </div>
        <button
          onClick={handleChangeEmail}
          className="text-[#5160E7] text-xs ms-auto px-2 py-1"
        >
          Change
        </button>
      </div>

      {/* <div className="mt-10 flex justify-between">
        <button onClick={handleChangePassword} className="text-sm">
          Change Your Password
        </button>
        <FaArrowRight color="#686184" size={14} />
      </div> */}

      <div className="mt-10 flex justify-between">
        <button
          onClick={handleDeactivateAccount}
          className="text-sm text-red-600 flex justify-between w-full items-center py-1"
        >
          Deactivate your account
          <FaArrowRight color="#686184" size={14} />
        </button>
      </div>
    </div>
  );
};

export default LoginDetails;
