"use client" 
import Work from "@/components/dashboard/profile/Work"; 
import { UnauthorisedLayout } from "@/components/shared";

export default function PortfolioPage() { 

  return (
    <UnauthorisedLayout>
      <div className=" w-full h-auto p-4 rounded-2xl flex flex-col gap-6 " >
        <Work unauth={true} portfolio={true} />
      </div>
    </UnauthorisedLayout>
  )
}