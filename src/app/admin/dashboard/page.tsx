"use client";
import { RiCashLine, RiFocus2Line } from "react-icons/ri";
import MetricsCard from "@/components/adminlayout/MetricsCard";
import PayoutRequestTable from "@/components/adminlayout/PayoutRequestTable";
import RecentChallenges from "@/components/adminlayout/RecentChallenges";
import NewSignups from "@/components/adminlayout/NewSignups";
import PendingCoachApplications from "@/components/adminlayout/PendingCoachApplications";
import { TbLocation, TbUsers } from "react-icons/tb";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          icon={<RiCashLine />}
          value="$10,000"
          label="Total Prizes Won"
          change="3.5%"
          isPositive={true}
          iconColor="text-[#596AFE]"
          iconBg="bg-[#EEF0FF]"
        />
        <MetricsCard
          icon={<TbLocation />}
          value="10,000"
          label="Total Payouts"
          change="2.5%"
          isPositive={true}
          iconColor="text-[#8A9E3C]"
          iconBg="bg-[#ECF5CA99]"
        />
        <MetricsCard
          icon={<TbUsers />}
          value="1,280"
          label="Total Users"
          change="3.5%"
          isPositive={true}
          iconColor="text-[#596AFE]"
          iconBg="bg-[#EEF0FF]"
        />
        <MetricsCard
          icon={<RiFocus2Line />}
          value="1,280"
          label="Total Challenges"
          change="2.5%"
          isPositive={false}
          iconColor="text-red-600"
          iconBg="bg-red-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-2 gap-6">
        <PayoutRequestTable />
        <RecentChallenges />
        <NewSignups />
        <PendingCoachApplications />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"></div>
    </div>
  );
}
