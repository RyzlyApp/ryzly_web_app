"use client";

import Badges from "@/components/dashboard/profile/Badges";
import Certificates from "@/components/dashboard/profile/Certificates";
import Challenges from "@/components/dashboard/profile/Challenges";
import Work from "@/components/dashboard/profile/Work";
import React, { useState } from "react"; 
import { BsDot } from "react-icons/bs"; 
import { userAtom } from "@/helper/atom/user";
import { useAtom } from "jotai";
import { Avatar } from "@heroui/react";
import { EditUserBtn } from "@/components/dashboard/settings";

const ProfilePage = () => {
  const [currentTab, setCurrentTab] = useState("Work");


  const [userState] = useAtom(userAtom);

  const { data: user } = userState

  const tabs = ["Work", "Certificates", "Badges", "Challenges"];

  // const handleSaveProfile = (newData: ProfileData) => {
  //   setProfileData(newData);
  // };


  return (
    <div>
      {/* Edit Profile Modal */} 

      <div className="bg-white rounded-lg p-4 flex flex-col gap-3 relative">

        <div className=" w-full flex justify-between " >
          <Avatar size="lg" src={user?.profilePicture} name={user?.fullName} />
          <EditUserBtn />
        </div>
        <div className=" w-full ">
          <div className="flex gap-2 items-center">
            <h2 className="font-semibold text-lg">{user?.fullName}</h2>
            <p className="text-xs text-gray-600">Rookie Rhyzler</p>
          </div>
          <div className=" w-full flex text-sm items-center mt-2">
            {/* <p className="font-semibold">{user?.username}</p> */}
            <div className=" w-full flex flex-wrap gap-3 " >
              {user?.interets?.map((item, index) => {
                return (
                  <div key={index} className=" flex gap-1 items-center " >
                    <BsDot />
                    <p>{item}</p>
                  </div>
                )
              })}
            </div>
          </div>
          {/* <h4 className="mt-2 text-sm">
            {profileData.city}, {profileData.country}
          </h4> */}
          <p className="text-sm text-[#686184] mt-2">{user?.about}</p>
          {/* <div className="mt-2">LinkedIn, X</div> */}
        </div>
      </div>

      <div className="p-4 w-full rounded-lg bg-white mt-5 flex justify-between">
        <div className=" w-full flex flex-col gap-2 " >
          <h4 className="text-sm font-semibold">Skills</h4>
          <div className=" w-full flex flex-wrap gap-2 " >
            {user?.skills?.map((item, index) => {
              return (
                <span key={index} className="px-3 py-1 bg-[#E9EAEB] text-xs rounded-full">
                  {item}
                </span>
              )
            })}
          </div>
        </div> 
      </div>

      <div className="bg-white rounded-lg p-4 mt-5">
        <div className="flex gap-1">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setCurrentTab(tab)}
              className={`${tab === currentTab ? "border-b-2 border-[#596AFE]" : ""
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
