"use client";

import React, { useState } from "react";
import RewardsTabs from "@/components/admin/rewards/RewardsTabs";
import RewardCard, { RewardItem } from "@/components/admin/rewards/RewardCard";
// import AddRewardModal from "@/components/admin/rewards/AddRewardModal";
import RewardDetailsModal from "@/components/admin/rewards/RewardDetailsModal";
import CertificateDetails from "@/components/admin/rewards/CertificateDetails";

const mockCertificates: RewardItem[] = [
  {
    id: "1",
    title: "Design Thinking Certificate",
    imageUrl: "/images/certificate1.jpg",
    addedAt: "12 Aug 2023",
  },
  {
    id: "2",
    title: "Typography Challenge",
    imageUrl: "/images/certificate2.jpg",
    addedAt: "15 Aug 2023",
  },
  {
    id: "3",
    title: "Prototyping Power-Up",
    imageUrl: "/images/certificate3.jpg",
    addedAt: "18 Aug 2023",
  },
  {
    id: "4",
    title: "Dashboard Design Challenge",
    imageUrl: "/images/certificate4.jpg",
    addedAt: "22 Aug 2023",
  },
];

const mockBadges: RewardItem[] = [
  {
    id: "5",
    title: "Design Master",
    imageUrl: "/images/badge1.jpg",
    addedAt: "10 Aug 2023",
  },
  {
    id: "6",
    title: "Code Ninja",
    imageUrl: "/images/badge2.jpg",
    addedAt: "14 Aug 2023",
  },
];

const mockHolders = Array.from({ length: 25 }, (_, i) => ({
  id: `holder-${i + 1}`,
  name: `Ngozi Nnamani ${i + 1}`,
  role: "Product Designer",
  date: "29 Jul 2023",
  avatar: "https://randomuser.me/api/portraits/women/44.jpg",
}));

export default function RewardsPage() {
  const [activeTab, setActiveTab] = useState("certificates");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);

  const tabs = [
    { id: "certificates", label: "Certificates" },
    { id: "badges", label: "Badges" },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleAddReward = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
  };

  const handleSaveReward = (data: {
    title: string;
    type: string;
    image: File | null;
    description: string;
    pointsRequired: number;
    quantity: number;
  }) => {
    console.log("Saving reward:", data);
  };

  const handleRewardClick = (id: string) => {
    setSelectedReward(id);
    setIsDetailsModalOpen(true);
  };

  const handleBackToList = () => {
    setSelectedReward(null);
  };

  const handleEditReward = (id: string) => {
    console.log("Editing reward:", id);
  };

  const currentRewards =
    activeTab === "certificates" ? mockCertificates : mockBadges;

  const selectedRewardData = currentRewards.find(
    (item) => item.id === selectedReward
  );

  return (
    <div className="min-h-screen">
      <div className="">
        {!selectedReward ? (
          <>
            <RewardsTabs
              tabs={tabs}
              active={activeTab}
              onChange={handleTabChange}
              onAdd={handleAddReward}
            />

            <div className="mt-6 grid grid-cols-1 gap-4">
              {currentRewards.map((item) => (
                <RewardCard
                  key={item.id}
                  item={item}
                  onEdit={handleEditReward}
                  onClick={handleRewardClick}
                />
              ))}
            </div>
          </>
        ) : selectedRewardData ? (
          <CertificateDetails
            id={selectedRewardData.id}
            title={selectedRewardData.title}
            imageUrl={selectedRewardData.imageUrl}
            milestones={[
              "Submit 1 task to a challenge",
              "Give 2 peer helpful feedback",
            ]}
            holders={mockHolders}
            onBack={handleBackToList}
            onEdit={handleEditReward}
          />
        ) : null}
      </div>

      {/* <AddRewardModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onAdd={handleSaveReward}
      /> */}

      {/* {selectedRewardData && (
        <RewardDetailsModal
          open={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          reward={{
            id: selectedRewardData.id,
            title: selectedRewardData.title,
            type: activeTab === "certificates" ? "Certificate" : "Badge",
            imageUrl: selectedRewardData.imageUrl,
            description:
              "This certificate validates your expertise in designing user interfaces for dark mode, covering principles, best practices, and implementation techniques.",
            pointsRequired: 100,
            quantity: 50,
            addedAt: selectedRewardData.addedAt,
          }}
          onEdit={() => {
            setIsDetailsModalOpen(false);
            handleEditReward(selectedRewardData.id);
          }}
          onDelete={() => {
            setIsDetailsModalOpen(false);
            console.log("Delete reward:", selectedRewardData.id);
          }}
        />
      )} */}
    </div>
  );
}
