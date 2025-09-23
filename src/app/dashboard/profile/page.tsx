"use client";

import Badges from "@/components/dashboard/profile/Badges";
import Certificates from "@/components/dashboard/profile/Certificates";
import Challenges from "@/components/dashboard/profile/Challenges";
import Work from "@/components/dashboard/profile/Work";
import EditProfileModal, {
  ProfileData,
} from "@/components/dashboard/profile/EditProfileModal";
import React, { useState } from "react";
import { BiPencil } from "react-icons/bi";
import { BsDot } from "react-icons/bs";

const ProfilePage = () => {
  const [currentTab, setCurrentTab] = useState("Work");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "Oluwaseun Obioma",
    username: "@oluwa",
    work: "UI/UX Designer",
    country: "Nigeria",
    city: "Lekki, Lagos",
    about:
      "Passionate UI/UX designer crafting intuitive and visually engaging digital experiences. Blending creativity with usability to turn ideas into seamless interfaces that delight and inspire.",
  });

  const tabs = ["Work", "Certificates", "Badges", "Challenges"];

  const handleSaveProfile = (newData: ProfileData) => {
    setProfileData(newData);
  };

  const initials = profileData.fullName.charAt(0);

  return (
    <div>
      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <EditProfileModal
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProfile}
          initialData={profileData}
        />
      )}

      <div className="bg-white rounded-lg p-4 flex flex-col lg:flex-row gap-3 relative">
        <div>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="border rounded-full px-4 py-2 text-xs absolute top-3 right-3 cursor-pointer hover:bg-gray-50"
          >
            Edit Profile
          </button>
        </div>
        <div>
          <p className="uppercase text-3xl font-bold text-white bg-[#596AFE] w-[5rem] h-[5rem] grid place-content-center rounded-full">
            {initials}
          </p>
        </div>
        <div className="w-4/5">
          <div className="flex gap-2 items-center">
            <h2 className="font-semibold text-lg">{profileData.fullName}</h2>
            <p className="text-xs text-gray-600">Rookie Rhyzler</p>
          </div>
          <div className="flex text-sm items-center mt-2">
            <p className="font-semibold">{profileData.username}</p>
            <BsDot />
            <p>{profileData.work}</p>
          </div>
          <h4 className="mt-2 text-sm">
            {profileData.city}, {profileData.country}
          </h4>
          <p className="text-sm text-[#686184] mt-2">{profileData.about}</p>
          <div className="mt-2">LinkedIn, X</div>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-white mt-5 flex justify-between">
        <div>
          <h4 className="text-sm font-semibold">Skills</h4>
          <div className="mt-2">
            <span className="px-3 py-1 bg-[#E9EAEB] text-xs rounded-full">
              Website Development
            </span>
          </div>
        </div>
        <button>
          <BiPencil color="#5160E7" />
        </button>
      </div>

      <div className="bg-white rounded-lg p-4 mt-5">
        <div className="flex gap-1">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setCurrentTab(tab)}
              className={`${
                tab === currentTab ? "border-b-2 border-[#596AFE]" : ""
              } text-sm px-3 py-1 cursor-pointer`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-5">
          {currentTab === "Work" && <Work />}
          {currentTab === "Certificates" && <Certificates />}
          {currentTab === "Badges" && <Badges />}
          {currentTab === "Challenges" && <Challenges />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
