"use client";
import { useState } from "react";
import MetricCard, {
  MetricCardProps,
} from "@/components/admin/communities/MetricCard";
import CommunitiesTableHeader from "@/components/admin/communities/CommunitiesTableHeader";
import CommunitiesTable from "@/components/admin/communities/CommunitiesTable";
import CommunitiesTablePagination from "@/components/admin/communities/CommunitiesTablePagination";
import { FaRegFlag } from "react-icons/fa";
import { RiCheckDoubleFill } from "react-icons/ri";
import { IoPeopleCircleOutline } from "react-icons/io5";

interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  createdBy: string;
  createdAt: string;
  status: "Active" | "Pending" | "Banned";
  thumbnail: string;
}

const mockCommunities: Community[] = [
  {
    id: "1",
    name: "UI/UX Designers",
    description:
      "A community for UI/UX designers to share ideas and collaborate",
    members: 1250,
    category: "Design",
    createdBy: "Ngozi Nnamani",
    createdAt: "01 Sep, 2025",
    status: "Active",
    thumbnail: "/images/community1.jpg",
  },
  {
    id: "2",
    name: "Frontend Developers",
    description:
      "Community for frontend developers using React, Vue, and Angular",
    members: 890,
    category: "Development",
    createdBy: "Obinna Afolayan",
    createdAt: "01 Sep, 2025",
    status: "Active",
    thumbnail: "/images/community2.jpg",
  },
  {
    id: "3",
    name: "Product Managers",
    description: "Network of product managers sharing best practices",
    members: 650,
    category: "Business",
    createdBy: "Oluwaseyi Okoli",
    createdAt: "01 Sep, 2025",
    status: "Pending",
    thumbnail: "/images/community3.jpg",
  },
  {
    id: "4",
    name: "Data Scientists",
    description: "Community for data science enthusiasts and professionals",
    members: 420,
    category: "Technology",
    createdBy: "Obinna Adeyemi",
    createdAt: "01 Sep, 2025",
    status: "Banned",
    thumbnail: "/images/community4.jpg",
  },
];

const metrics: MetricCardProps[] = [
  {
    icon: <IoPeopleCircleOutline />,
    iconBgColor: "bg-[#EEF0FF]",
    iconTextColor: "text-[#596AFE]",
    value: "150",
    label: "Total Communities",
  },
  {
    icon: <RiCheckDoubleFill />,
    iconBgColor: "bg-[#ECF5CA99]",
    iconTextColor: "text-[#8A9E3C]",
    value: "85",
    label: "Active Communities",
  },
  {
    icon: <FaRegFlag />,
    iconBgColor: "bg-[#FFF1EE]",
    iconTextColor: "text-[#FC7753]",
    value: "12",
    label: "Flagged Communities",
  },
];

export default function AdminCommunities() {
  const [sortBy, setSortBy] = useState("Recent");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <CommunitiesTableHeader
          sortBy={sortBy}
          setSortBy={setSortBy}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />
        <CommunitiesTable communities={mockCommunities} />
        <CommunitiesTablePagination />
      </div>
    </div>
  );
}
