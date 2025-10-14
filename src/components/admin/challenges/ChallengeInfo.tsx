"use client";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { navbarDetailsAtom, isSecondaryNavAtom } from "@/stores/atoms/navbar";
import { useAdminPage } from "@/contexts/AdminPageContext";
import CustomButton from "@/components/custom/customButton";
import { CustomImage } from "@/components/custom";
import ChallengeOverview from "./Tabs/ChallengeOverview";
import ChallengeTask from "./Tabs/ChallengeTask";
import ChallengeResources from "./Tabs/ChallengeResources";
import ChallengeReviews from "./Tabs/ChallengeReviews";
import ChallengeLeaderboard from "./Tabs/ChallengeLeaderboard";
import ChallengeParticipants from "./Tabs/ChallengeParticipants";
import ChallengeCoaches from "./Tabs/ChallengeCoaches";
import { Reports } from "./Reports";
import { BiError } from "react-icons/bi";
import ActionModal from "../modals/ActionModal";
import AdminNavbar from "../AdminNavbar";

interface Challenge {
  id: string;
  title: string;
  host: string;
  status: "Ongoing" | "Pending" | "Completed" | "Banned";
  date: string;
  participants: number;
  thumbnail: string;
}

interface ChallengeInfoProps {
  challenge: Challenge;
  onBack: () => void;
}

export default function ChallengeInfo({
  challenge,
  onBack,
}: ChallengeInfoProps) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [, setNavbarDetails] = useAtom(navbarDetailsAtom);
  const [, setIsSecondaryNav] = useAtom(isSecondaryNavAtom);
  const Tabs = [
    "Overview",
    "Task",
    "Resources",
    "Reviews",
    "Leaderboard",
    "Participants",
    "Coaches",
  ];

  useEffect(() => {
    setIsSecondaryNav(true);
    setNavbarDetails({
      title: "Challenge Details",
      subtitle: challenge.title,
      actions: (
        <div className="flex items-center gap-4">
          <CustomButton
            variant={challenge.status === "Banned" ? "primary" : "customDanger"}
            onClick={() => setIsModalOpen(true)}
          >
            {challenge.status === "Banned"
              ? "Unban Challenge"
              : "Ban Challenge"}
          </CustomButton>
        </div>
      ),
    });

    return () => {
      setIsSecondaryNav(false);
    };
  }, [challenge, setNavbarDetails, setIsSecondaryNav]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ongoing":
        return "success";
      case "Pending":
        return "warning";
      case "Completed":
        return "primary";
      case "Banned":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <div>
      <AdminNavbar showBackButton onBack={onBack}>
        <div className="flex items-center gap-4">
          <CustomButton
            variant={challenge.status === "Banned" ? "primary" : "customDanger"}
            onClick={() => setIsModalOpen(true)}
          >
            {challenge.status === "Banned"
              ? "Unban Challenge"
              : "Ban Challenge"}
          </CustomButton>
        </div>
      </AdminNavbar>

      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-3">
          <div>
            <CustomImage
              src={challenge.thumbnail}
              alt={challenge.title}
              width={1000}
              height={1000}
              className="w-full h-[13rem] border rounded-lg"
            />
          </div>
          <div className="p-3 bg-white">
            <div className="flex items-center gap-2 mt-2 text-xs">
              <span>Figma</span>
              <span>Framer</span>
              <span>UI/UX</span>
            </div>
            <h3 className="text-3xl font-bold mt-2">Mobile Banking App UI</h3>
            <p className="text-sm">Design And Protoype a modern Banking App</p>
          </div>

          <div className="grid grid-cols-2 gap-2 w-full mt-5">
            <div className="bg-[#5160E7] text-white rounded-lg p-3">
              <h2 className="text-xs">Winning Price</h2>
              <h1 className="font-semibold text-xl">$2000</h1>
            </div>
            <div className="bg-white rounded-lg py-3 px-5 flex justify-between">
              <div>
                <p className="text-xs">Participation Fee</p>
                <h3 className="font-semibold">$40</h3>
              </div>
              <div>
                <p className="text-xs">Total Generated</p>
                <h3 className="font-semibold">$10,000</h3>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white my-5">
            <div className="flex w-full">
              {Tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(tab)}
                  className={`border-b-2 text-xs py-4 px-5 ${
                    activeTab === tab ? "border-[#5160E7]" : "border-[#EEF0FF]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-4">
              {activeTab === "Overview" && <ChallengeOverview />}
              {activeTab === "Task" && <ChallengeTask />}
              {activeTab === "Resources" && <ChallengeResources />}
              {activeTab === "Reviews" && <ChallengeReviews />}
              {activeTab === "Leaderboard" && <ChallengeLeaderboard />}
              {activeTab === "Participants" && <ChallengeParticipants />}
              {activeTab === "Coaches" && <ChallengeCoaches />}
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <Reports />
        </div>
      </div>
      <ActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsModalOpen(false);
        }}
        type="ban"
        title="Ban Challenge"
        targetName="Mobile Banking App Challenge"
        targetImage="/images/challenge-thumbnail.jpg"
      />
    </div>
  );
}
