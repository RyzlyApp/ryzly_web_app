"use client"

import { CustomButton, CustomImage } from "../custom"
import { RiCodeLine, RiColorFilterLine, RiSmartphoneLine } from "@remixicon/react"
import { useRouter } from "next/navigation"
import { useState } from "react" 

type TrackOption = {
  id: string
  label: string
  icon: React.ReactNode
}

export default function ProjectTrack() {
  const [selected, setSelected] = useState("1")
  const router = useRouter()

  const options: TrackOption[] = [
    { id: "1", label: "Design", icon: <RiColorFilterLine size="36px" /> },
    { id: "2", label: "Software Dev", icon: <RiCodeLine size="36px" /> },
    { id: "3", label: "Marketing", icon: <RiSmartphoneLine size="36px" /> },
  ]

  const handleContinue = () => {
    router.push(`/auth/onboarding?type=interested&track=${selected}`)
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-10">
      {/* Header */}
      <div className="w-full flex flex-col gap-4 items-center">
        <CustomImage src="/images/bluesmile.png" alt="blue smile" width={40} height={40} />
        <p className="text-4xl font-bold">Project Track</p>
      </div>

      {/* Options */}
      <div className="w-full max-w-[500px] flex gap-2">
        {options.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setSelected(id)}
            className={`w-full h-[156px] flex flex-col justify-center items-center gap-2 rounded-3xl transition
              ${selected === id ? "bg-primary text-white" : "bg-[#E8E7ED66] text-black"}
            `}
          >
            {icon}
            <p className="font-medium">{label}</p>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="w-full flex justify-between items-center">
        <CustomButton variant="flat" onClick={() => router.push("/auth/onboarding?type=interested")}>
          Skip
        </CustomButton>
        <CustomButton onClick={handleContinue}>
          Continue
        </CustomButton>
      </div>
    </div>
  )
}
