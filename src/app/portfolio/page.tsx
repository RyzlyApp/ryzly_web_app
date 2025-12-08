"use client" 
import Work from "@/components/dashboard/profile/Work"; 
import { UnauthorisedLayout } from "@/components/shared";

export default function PortfolioPage() { 

  return ( 
      <div className=" w-full h-full p-4 rounded-2xl flex flex-col gap-6 " >
        <Work unauth={true} portfolio={true} />
      </div> 
  )
}