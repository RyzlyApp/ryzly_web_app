import React from "react";

interface ConfirmDeactivationProps {
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeactivation: React.FC<ConfirmDeactivationProps> = ({
  onClose,
  onConfirm,
}) => {
  const handleDeactivate = () => {
    console.log("Account deactivation confirmed");
    onConfirm();
  };

  return (
    <div className="text-center">
      <h4 className="text-lg pt-10 lg:pt-0 font-bold mb-4">
        Confirm Deactivation
      </h4>
      <p className="text-sm text-gray-600 mb-8">
        Once you deactivate your account, your profile and activity will be
        hidden from others. You can reactivate anytime by logging back in. Are
        you sure you want to proceed?
      </p>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleDeactivate}
          className="px-4 py-3 w-full cursor-pointer bg-red-600 text-white rounded-full hover:bg-red-700"
        >
          Yes, Deactivate
        </button>
        <button
          onClick={onClose}
          className="px-4 py-3 w-full cursor-pointer bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
        >
          No, Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmDeactivation;
