import React, { useState } from "react";

interface EditProfileModalProps {
  onClose: () => void;
  onSave: (profileData: ProfileData) => void;
  initialData: ProfileData;
}

export interface ProfileData {
  fullName: string;
  username: string;
  work: string;
  country: string;
  city: string;
  about: string;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState<ProfileData>(initialData);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Edit profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Work
            </label>
            <input
              type="text"
              value={formData.work}
              onChange={(e) => handleInputChange("work", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
              placeholder="Enter your profession"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Country
            </label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
              placeholder="Enter your country"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
              placeholder="Enter your city"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              About
            </label>
            <textarea
              value={formData.about}
              onChange={(e) => handleInputChange("about", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm h-24 resize-none"
              placeholder="Tell us about yourself"
            />
          </div>

          <div className="flex gap-3 pt-4 justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-xs rounded-full cursor-pointer bg-[#5160E7] text-white hover:bg-[#4451c9]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
