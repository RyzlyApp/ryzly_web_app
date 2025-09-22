import React, { useState } from "react";

interface DeactivationReasonsProps {
  onClose: () => void;
  onContinue: () => void;
}

const DeactivationReasons: React.FC<DeactivationReasonsProps> = ({
  onClose,
  onContinue,
}) => {
  const reasons = [
    "I'm not getting any value",
    "I found a better alternative",
    "It's too expensive",
    "I'm concerned about my data",
    "I have a privacy concern",
    "I'm receiving too many emails",
    "Other (please specify)",
  ];

  const [selectedReason, setSelectedReason] = useState<string>("");
  const [otherDescription, setOtherDescription] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedReason) {
      onContinue();
    }
  };

  return (
    <div className="">
      <h4 className="text-lg pt-5 lg:pt-0 font-bold mb-4">
        Why are you leaving?
      </h4>
      <p className="text-xs text-gray-600 mb-6">
        Your feedback helps us improve our service.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-6 max-h-64 overflow-y-auto">
          {reasons.map((reason, index) => (
            <div key={index} className="flex items-center mb-3">
              <input
                type="radio"
                id={`reason-${index}`}
                name="deactivation-reason"
                checked={selectedReason === reason}
                onChange={() => setSelectedReason(reason)}
                className="h-4 w-4 text-[#5160E7] focus:ring-[#5160E7] border-gray-300"
              />
              <label
                htmlFor={`reason-${index}`}
                className="ml-3 block text-sm text-gray-700"
              >
                {reason}
              </label>
            </div>
          ))}
        </div>

        {selectedReason === "Other (please specify)" && (
          <div className="mb-6">
            <textarea
              placeholder="Please describe the problem"
              value={otherDescription}
              onChange={(e) => setOtherDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm h-24 resize-none"
            />
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={
              !selectedReason ||
              (selectedReason === "Other (please specify)" && !otherDescription)
            }
            className="px-4 py-2 w-full mt-auto cursor-pointer bg-[#5160E7] text-white rounded-full hover:bg-[#4451c9] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeactivationReasons;
