"use client" 
import Work from "@/components/dashboard/profile/Work"; 
import { UnauthorisedLayout } from "@/components/shared";

export default function PortfolioPage() { 

  return ( 
      <div className="  max-w-[90%] mx-auto lg:max-w-[80%] w-full h-full py-4 rounded-2xl flex flex-col gap-6 " >
        <Work unauth={true} portfolio={true} />
      </div> 
  )
}