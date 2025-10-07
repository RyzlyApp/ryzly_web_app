"use client";
import { useState } from "react";
import StatCard, { StatCardProps } from "@/components/admin/users/StatCard";
import UsersTableHeader from "@/components/admin/users/UsersTableHeader";
import UsersTable from "@/components/admin/users/UsersTable";
import UsersTablePagination from "@/components/admin/users/UsersTablePagination";
import UserProfile from "@/components/admin/users/profile/UserProfile";
import { TbUsers } from "react-icons/tb";
import { RiOrganizationChart } from "react-icons/ri";
import { BsFileText } from "react-icons/bs";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";

interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  location: string;
  joinedOn: string;
  status: "Active" | "Banned";
  avatar: string;
  isCoach?: boolean;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Ngozi Nnamani",
    role: "Product Designer",
    email: "ngozi@mail.com",
    location: "Lagos, Nigeria",
    joinedOn: "01 Sep, 2025",
    status: "Active",
    avatar: "NN",
    isCoach: true,
  },
  {
    id: "2",
    name: "Obinna Afolayan",
    role: "Product Designer",
    email: "obinna@mail.com",
    location: "Lagos, Nigeria",
    joinedOn: "01 Sep, 2025",
    status: "Active",
    avatar: "OA",
  },
  {
    id: "3",
    name: "Oluwaseyi Okoli",
    role: "Product Designer",
    email: "oluwaseyi@mail.com",
    location: "Lagos, Nigeria",
    joinedOn: "01 Sep, 2025",
    status: "Active",
    avatar: "OO",
    isCoach: true,
  },
  {
    id: "4",
    name: "Obinna Adeyemi",
    role: "Product Designer",
    email: "obinna.adeyemi@mail.com",
    location: "Lagos, Nigeria",
    joinedOn: "01 Sep, 2025",
    status: "Active",
    avatar: "OA",
  },
  {
    id: "5",
    name: "Olumide Afolayan",
    role: "Product Designer",
    email: "olumide@mail.com",
    location: "Lagos, Nigeria",
    joinedOn: "01 Sep, 2025",
    status: "Banned",
    avatar: "OA",
  },
];

const stats: StatCardProps[] = [
  {
    icon: <TbUsers />,
    iconBgColor: "bg-[#EEF0FF]",
    iconTextColor: "text-[#596AFE]",
    value: "10,000",
    label: "Total Users",
    trend: "2.5%",
    trendDirection: "down",
    trendColor: "text-red-600",
    footerText: "From last month",
  },
  {
    icon: <RiOrganizationChart />,
    iconBgColor: "bg-[#ECF5CA99]",
    iconTextColor: "text-[#8A9E3C]",
    value: "500",
    label: "Organizations",
    trend: "3.5%",
    trendDirection: "up",
    trendColor: "text-green-600",
    footerText: "From last month",
  },
  {
    icon: <LiaChalkboardTeacherSolid />,
    iconBgColor: "bg-[#EEF0FF]",
    iconTextColor: "text-[#596AFE]",
    value: "7,000",
    label: "Coaches",
    trend: "3.5%",
    trendDirection: "up",
    trendColor: "text-green-600",
    footerText: "From last month",
  },
  {
    icon: <BsFileText />,
    iconBgColor: "bg-[#FFF1EE]",
    iconTextColor: "text-[#FC7753]",
    value: "300",
    label: "Pending Coach Applications",
    trend: "100 approved this month",
    trendDirection: "up",
    trendColor: "text-green-600",
    footerText: "",
  },
];

export default function AdminUsers() {
  const [sortBy, setSortBy] = useState("Recent");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleBackToList = () => {
    setSelectedUser(null);
  };

  if (selectedUser) {
    return <UserProfile user={selectedUser} onBack={handleBackToList} />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      <div className="bg-white rounded-lg shadow-sm">
        <UsersTableHeader sortBy={sortBy} setSortBy={setSortBy} />
        <UsersTable users={mockUsers} onUserClick={handleUserClick} />
        <UsersTablePagination />
      </div>
    </div>
  );
}
