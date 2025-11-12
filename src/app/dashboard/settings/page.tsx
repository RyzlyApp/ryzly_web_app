// app/dashboard/settings/page.tsx
"use client";

import LoginDetails from "@/components/dashboard/settings/LoginDetails";
import PaymentsAndPayouts from "@/components/dashboard/settings/PaymentsAndPayouts";
import PersonalInfo from "@/components/dashboard/settings/PersonalInfo";
import React, { useState } from "react";
import {
  BiLogInCircle,
  BiUser,
  BiWalletAlt,
  BiArrowBack,
} from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa6";

interface Tab {
  name: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

const SettingsPage: React.FC = () => {
  const [displayTab, setDisplayTab] = useState<string | null>("Personal Info");
  const [showMobileView, setShowMobileView] = useState(false);

  const Tabs: Tab[] = [
    {
      name: "Personal Info",
      icon: <BiUser />,
      component: <PersonalInfo />,
    },
    {
      name: "Login Details",
      icon: <BiLogInCircle />,
      component: <LoginDetails />,
    },
    {
      name: "Finance",
      icon: <BiWalletAlt />,
      component: <PaymentsAndPayouts />,
    },
  ];

  const handleTabClick = (tabName: string) => {
    setDisplayTab(tabName);
    setShowMobileView(true);
  };

  const handleBackClick = () => {
    setDisplayTab(null);
    setShowMobileView(false);
  };

  const MobileHeader = () => (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-white shadow-sm h-[70px] p-4 flex items-center">
      <button onClick={handleBackClick} className="mr-3 p-1">
        <BiArrowBack size={20} />
      </button>
      <h1 className="text-lg font-semibold">{displayTab}</h1>
    </div>
  );

  const SettingsMenu = () => (
    <div className="bg-white rounded-lg p-4 lg:p-5">
      <h1 className="text-lg font-semibold mb-6 lg:hidden">Settings</h1>

      <div className="flex flex-col gap-3">
        {Tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(tab.name)}
            className={`${
              tab.name === displayTab ? "bg-[#EEF0FF]" : ""
            } rounded flex p-4 items-center text-sm cursor-pointer`}
          >
            {tab.icon}
            <p className="ms-2 flex-1 text-left">{tab.name}</p>
            <div className="ms-auto">
              <FaArrowRight />
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // Content for the selected tab
  const TabContent = () => {
    const selectedTab = Tabs.find((tab) => tab.name === displayTab);
    return (
      <div className="lg:hidden pt-5 pb-20"> {selectedTab?.component}</div>
    );
  };

  return (
    <div className="relative">
      <div className="hidden lg:flex gap-5">
        <div className="rounded-lg w-2/5 bg-white p-5 flex flex-col gap-3 h-fit">
          {Tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setDisplayTab(tab.name)}
              className={`${
                tab.name === displayTab ? "bg-[#EEF0FF]" : ""
              } rounded flex p-4 items-center text-sm cursor-pointer`}
            >
              {tab.icon}
              <p className="ms-2">{tab.name}</p>
              <div className="ms-auto">
                <FaArrowRight />
              </div>
            </button>
          ))}
        </div>
        <div className="w-3/5">
          {displayTab === "Personal Info" ? (
            <PersonalInfo />
          ) : displayTab === "Login Details" ? (
            <LoginDetails />
          ) : displayTab === "Finance" ? (
            <PaymentsAndPayouts />
          ) : (
            <div className="bg-white rounded-lg p-5 h-64 flex items-center justify-center">
              <p className="text-gray-500">Select a setting category</p>
            </div>
          )}
        </div>
      </div>

      <div className="lg:hidden">
        {showMobileView ? (
          <>
            <MobileHeader />
            <TabContent />
          </>
        ) : (
          <SettingsMenu />
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
