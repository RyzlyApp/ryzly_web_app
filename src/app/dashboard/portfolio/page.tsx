"use client"
import { CustomButton } from "@/components/custom";
import Work from "@/components/dashboard/profile/Work";
import { useState } from "react";

export default function PortfolioPage() {

  const [ selected, setSelected ] = useState("true")

  return (
    <div className=" w-full h-auto p-4 rounded-2xl bg-white flex flex-col gap-6 " >
      <div className=" w-full flex lg:flex-row flex-col gap-4 justify-between " >
        <p className=" text-2xl font-bold " >My Portfolio</p>
        <div className=" flex items-center gap-4 " >
          <CustomButton onClick={()=> setSelected("true")} variant={!selected ? "outline" : "primary"} >All PortFolio</CustomButton>
          <CustomButton onClick={()=> setSelected("")} variant={selected ? "outline" : "primary"} >My PortFolio</CustomButton>
        </div>
      </div>
      <Work selected={selected} />
    </div>
  )
}