"use client";
import { useState } from "react";
import { Tabs, Tab } from "@heroui/react";
import WorkTab from "./tabs/WorkTab";
import CertificatesTab from "./tabs/CertificatesTab";
import PayoutRequestTab from "./tabs/PayoutRequestTab";
import FinancialHistoryTab from "./tabs/FinancialHistoryTab";
import ReportsTab from "./tabs/ReportsTab";
import BadgesTab from "./tabs/BadgesTab";
import ChallengesTab from "./tabs/ChallengesTab";

interface ActivityTabsProps {
  userId: string;
}

export default function ActivityTabs({ userId }: ActivityTabsProps) {
  const [activeTab, setActiveTab] = useState("work");

  const tabs = [
    { key: "work", label: "Work" },
    { key: "certificates", label: "Certificates" },
    { key: "badges", label: "Badges" },
    { key: "challenges", label: "Challenges" },
    { key: "payout-request", label: "Payout request" },
    { key: "financial-history", label: "Financial history" },
    { key: "reports", label: "Reports" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "work":
        return <WorkTab userId={userId} />;
      case "certificates":
        return <CertificatesTab userId={userId} />;
      case "badges":
        return <BadgesTab userId={userId} />;
      case "challenges":
        return <ChallengesTab userId={userId} />;
      case "payout-request":
        return <PayoutRequestTab userId={userId} />;
      case "financial-history":
        return <FinancialHistoryTab userId={userId} />;
      case "reports":
        return <ReportsTab userId={userId} />;
      default:
        return <WorkTab userId={userId} />;
    }
  };

  return (
    <div className="bg-white rounded-lg">
      <div>
        {tabs.map((tab) => (
          <button
            onClick={() => setActiveTab(tab.key)}
            key={tab.key}
            className={`${
              tab.key === activeTab ? "border-b-2 border-[#596AFE]" : ""
            } py-4 px-4 text-sm`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4">{renderTabContent()}</div>
    </div>
  );
}
