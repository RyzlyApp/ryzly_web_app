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
import { useParams } from "next/navigation";
import { useFetchData } from "@/hook/useFetchData";
import { IUser } from "@/helper/model/user";
import { LoadingLayout } from "@/components/shared";

const ProfilePage = () => {
  const [currentTab, setCurrentTab] = useState("Work");

  const param = useParams();
  const id = param.id;

  const [userState] = useAtom(userAtom)

  const { data } = userState

  const { data: user, isLoading } = useFetchData<IUser>({
    endpoint: `/user/${id}`, name: "challengedetails"
  })

  const tabs = ["Work", "Certificates", "Badges", "Challenges"];

  return (
    <LoadingLayout loading={isLoading} >

      <div>
        {/* Edit Profile Modal */}

        <div className="bg-white rounded-lg p-4 flex flex-col gap-3 relative">

          <div className=" w-full flex justify-between " >
            <Avatar size="lg" src={user?.profilePicture} name={user?.fullName} />
            {data?._id === user?._id && (
              <EditUserBtn />
            )}
          </div>
          <div className=" w-full ">
            <div className="flex gap-2 items-center">
              <h2 className="font-semibold text-lg">{user?.fullName}</h2>
              <p className="text-xs text-gray-600">Rookie Rhyzler</p>
              {user?.isCoach && (
                <div className=" px-2 rounded-full bg-neonblue-600 text-white font-semibold h-[18px] flex justify-center items-center text-xs " >
                  Coach
                </div>
              )}
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
            {tabs?.filter((item) => !user?.isCoach ? item !== "Challenges" : item).map((tab, index) => (
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
            {currentTab === "Challenges" && <Challenges user={user as IUser} />}
          </div>
        </div>
      </div>
    </LoadingLayout>
  );
};

export default ProfilePage;
