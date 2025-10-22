"use client"
import Work from "@/components/dashboard/profile/Work";

export default function PortfolioPage() {
  return (
    <div className=" w-full h-full p-4 rounded-2xl bg-white flex flex-col gap-4 " >
      <p className=" text-2xl font-bold " >My Portfolio</p>
      <Work />
    </div>
  )
}