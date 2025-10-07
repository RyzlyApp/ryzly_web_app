"use client";
import { useState } from "react";
import { Select, SelectItem, Avatar } from "@heroui/react";
import { CustomImage, CustomInput, CustomSelect } from "@/components/custom";
import CustomButton from "@/components/custom/customButton";
import StandaloneSelect from "@/components/admin/StandaloneSelect";
import SearchInput from "@/components/admin/SearchInput";

interface Challenge {
  id: string;
  title: string;
  description: string;
  image: string;
  dateRange: string;
  technologies: string[];
  winningPrice: string;
  participationFee: string;
  participants: {
    avatars: string[];
    count: number;
  };
  host: {
    name: string;
    avatar: string;
  };
  status: "Ongoing" | "Pending" | "Completed";
}

interface ChallengesTabProps {
  userId: string;
}

const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "Weather Forecast Widget",
    description:
      "Create a beautiful, responsive weather widget with animations and location-based forecasts.",
    image: "/work.jpg",
    dateRange: "01 Aug - 25 Aug 2025",
    technologies: ["HTML", "CSS", "JavaScript"],
    winningPrice: "$200",
    participationFee: "$10",
    participants: {
      avatars: ["/work.jpg", "/work.jpg", "/work.jpg"],
      count: 114,
    },
    host: {
      name: "Ngozi Nnamani",
      avatar: "/work.jpg",
    },
    status: "Ongoing",
  },
  {
    id: "2",
    title: "E-commerce Dashboard",
    description:
      "Build a comprehensive admin dashboard for an online store with analytics, inventory management, and...",
    image: "/work.jpg",
    dateRange: "15 Aug - 30 Aug 2025",
    technologies: ["React", "Node.js", "PostgreSQL"],
    winningPrice: "$500",
    participationFee: "$25",
    participants: {
      avatars: ["/work.jpg", "/work.jpg", "/work.jpg"],
      count: 89,
    },
    host: {
      name: "Ngozi Nnamani",
      avatar: "/work.jpg",
    },
    status: "Pending",
  },
];

export default function ChallengesTab({ userId }: ChallengesTabProps) {
  const [roleFilter, setRoleFilter] = useState("participant");
  const [statusFilter, setStatusFilter] = useState("ongoing");
  const [searchValue, setSearchValue] = useState("");

  const roleOptions = [
    { value: "participant", label: "As Participant" },
    { value: "coach", label: "As Coach" },
    { value: "created", label: "Created by me" },
  ];

  const statusOptions = [
    { value: "ongoing", label: "Ongoing" },
    { value: "upcoming", label: "Upcoming" },
    { value: "completed", label: "Completed" },
  ];
  const role = ["participant", "coach", "created"];

  return (
    <div>
      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1">
          <StandaloneSelect
            placeholder="Select Role"
            options={roleOptions}
            value={roleFilter}
            onChange={setRoleFilter}
          />
        </div>

        <div className="flex-2">
          <SearchInput
            placeholder="Search challenges"
            value={searchValue}
            onChange={setSearchValue}
          />
        </div>

        <div className="flex-1">
          <StandaloneSelect
            placeholder="Select Status"
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockChallenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-white rounded-lg overflow-hidden"
          >
            <div className="relative">
              <CustomImage
                src={challenge.image}
                alt={challenge.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded-lg text-xs">
                {challenge.dateRange}
              </div>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {challenge.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {challenge.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {challenge.description}
              </p>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-xs text-gray-600">Winning Price</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {challenge.winningPrice}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Participation Fee</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {challenge.participationFee}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {challenge.participants.avatars.map((avatar, index) => (
                      <Avatar
                        key={index}
                        src={avatar}
                        alt="Participant"
                        className="w-6 h-6 border-2 border-white"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">
                    +{challenge.participants.count}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Avatar
                  src={challenge.host.avatar}
                  alt={challenge.host.name}
                  className="w-6 h-6"
                />
                <span className="text-xs text-gray-600">
                  Hosted by {challenge.host.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
