"use client";

import React, { useState } from "react";
import { BiCamera, BiPencil } from "react-icons/bi";
import { useModal } from "@/contexts/ModalContext";
import SkillsModal from "./SkillModal";
import { userAtom } from "@/helper/atom/user";
import { useAtom } from "jotai";

const PersonalInfo = () => {


  const [userState] = useAtom(userAtom);

  const { data } = userState

  const { openModal, closeModal } = useModal();
  const [userInfo, setUserInfo] = useState({
    name: "Victor Jack",
    about: "",
    work: "",
    skills: ["Website Prototyping", "User Experience", "UX Wireframe"],
    isEditing: {
      name: false,
      about: false,
      work: false,
    },
  });

  const handleSaveSkills = (newSkills: string[]) => {
    setUserInfo((prev) => ({
      ...prev,
      skills: newSkills,
    }));
  };

  const handleEditSkills = () => {
    openModal(
      <SkillsModal
        onClose={closeModal}
        onSave={handleSaveSkills}
        initialSkills={userInfo.skills}
      />,
      "Edit Skills",
      true
    );
  };

  const toggleEdit = (field: keyof typeof userInfo.isEditing) => {
    setUserInfo((prev) => ({
      ...prev,
      isEditing: {
        ...prev.isEditing,
        [field]: !prev.isEditing[field],
      },
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = (field: keyof typeof userInfo.isEditing) => {
    setUserInfo((prev) => ({
      ...prev,
      isEditing: {
        ...prev.isEditing,
        [field]: false,
      },
    }));
    // Here you would typically save to your backend
  };

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h4 className="lg:block hidden text-sm font-bold mb-6">Personal Info</h4>

      <div className="h-[6rem] w-[6rem] rounded-full relative bg-[#596AFE] grid place-content-center mx-auto">
        <p className="font-bold text-xl text-white">
          {userInfo.name.slice(0, 1)}
        </p>
        <div className="p-2 rounded-full bg-white grid place-content-center absolute right-0 bottom-0 cursor-pointer">
          <BiCamera color="gray" />
        </div>
      </div>

      <div className="mt-6">
        <div className="mt-5 flex items-start">
          <div className="w-4/5">
            <p className="text-xs text-gray-600 mb-1">Name</p>
            {userInfo.isEditing.name ? (
              <input
                type="text"
                value={data?.fullName}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="p-2 border border-gray-300 w-full rounded text-sm"
                autoFocus
                onBlur={() => handleSave("name")}
                onKeyDown={(e) => e.key === "Enter" && handleSave("name")}
              />
            ) : (
              <p className="p-2 text-sm border border-gray-300 rounded mt-2">
                {data?.fullName}
              </p>
            )}
          </div>
          <button
            onClick={() =>
              userInfo.isEditing.name ? handleSave("name") : toggleEdit("name")
            }
            className="ms-auto cursor-pointer"
          >
            <BiPencil color="#5160E7" />
          </button>
        </div>

        <div className="mt-5 flex items-start">
          <div className="w-4/5">
            <p className="text-xs text-gray-600 mb-1">About</p>
            {userInfo.isEditing.about ? (
              <textarea
                value={data?.about}
                onChange={(e) => handleInputChange("about", e.target.value)}
                className="p-2 border border-gray-300 w-full rounded text-sm h-20 resize-none"
                autoFocus
                onBlur={() => handleSave("about")}
              />
            ) : (
              <p className="p-2 text-sm border border-gray-300 rounded mt-2">
                {data?.about || "Add something about yourself..."}
              </p>
            )}
          </div>
          <button
            onClick={() =>
              userInfo.isEditing.about
                ? handleSave("about")
                : toggleEdit("about")
            }
            className="ms-auto mt-6 cursor-pointer"
          >
            <BiPencil color="#5160E7" />
          </button>
        </div>

        <div className="mt-5 flex items-start">
          <div className="w-4/5">
            <p className="text-xs text-gray-600 mb-1">Work</p>
            {userInfo.isEditing.work ? (
              <input
                type="text"
                value={data?.track}
                onChange={(e) => handleInputChange("work", e.target.value)}
                className="p-2 border border-gray-300 w-full rounded text-sm"
                autoFocus
                onBlur={() => handleSave("work")}
                onKeyDown={(e) => e.key === "Enter" && handleSave("work")}
              />
            ) : (
              <p className="p-2 text-sm border border-gray-300 rounded mt-2">
                {data?.track || "Add your profession..."}
              </p>
            )}
          </div>
          <button
            onClick={() =>
              userInfo.isEditing.work ? handleSave("work") : toggleEdit("work")
            }
            className="ms-auto mt-6 cursor-pointer"
          >
            <BiPencil color="#5160E7" />
          </button>
        </div>

        <div className="mt-5 flex items-start">
          <div className="w-4/5">
            <p className="text-xs text-gray-600 mb-1">Skills</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {data?.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#E9EAEB] text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={handleEditSkills}
            className="ms-auto mt-1 cursor-pointer"
          >
            <BiPencil color="#5160E7" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
