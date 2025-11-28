"use client"

import { useState } from "react"
import { CustomButton, CustomImage } from "../custom"
import { useRouter, useSearchParams } from "next/navigation"

export default function SelectPath() {
  const [selected, setSelected] = useState("1")
  const router = useRouter() 
  
  const query = useSearchParams();
  const challenge = query?.get('challenge') as string;

  const options = [
    {
      id: "1",
      img: "/images/green.png",
      alt: "green",
      text: "I'm here to gain experience and build my career Portfolio",
    },
    {
      id: "2",
      img: "/images/orange.png",
      alt: "orange",
      text: "I want to host challenges",
    },
    {
      id: "3",
      img: "/images/blue.png",
      alt: "blue",
      text: "I'm here to find talents",
    },
  ]

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 lg:gap-10">
      {/* Header */}
      <div className="w-full flex flex-col gap-4 items-center">
        <div className="px-4 py-1 rounded-full bg-neonblue-100 text-neonblue-600 font-semibold">
          <p className=" text-xs lg:text-base " >Welcome To Rhyzly</p>
        </div>
        <p className=" text-2xl lg:text-4xl font-bold">Select your path</p>
        <p className=" lg:text-base text-xs text-violet-300">Pick the path that feels most like you.</p>
      </div>

      {/* Options */}
      <div className="w-full flex gap-4 flex-wrap justify-center">
        {options.map(({ id, img, alt, text }) => (
          <button
            key={id}
            onClick={() => setSelected(id)}
            className={`w-full lg:max-w-[240px] h-[104px] lg:h-[180px] rounded-3xl border-3 flex lg:flex-col items-center lg:pl-0 pl-4 lg:justify-center gap-4 transition
              ${selected === id
                ? "border-pear-600 bg-pear-50"
                : "border-[#E8E7ED66] bg-[#E8E7ED66]"
              }
            `}
          >
            <div className=" w-fit " >
              <div className=" w-14 h-14 lg:w-16 lg:mt-3 lg:h-16 relative">
                <CustomImage src={img} alt={alt} fillContainer />
              </div>
            </div>
            <p className="text-sm lg:pl-4 pr-4  lg:h-12 font-medium text-left ">{text}</p>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="ml-auto">
        <CustomButton
          variant="primary"
          onClick={() => router.push(`/auth/onboarding?type=fullname${challenge ? `&challenge=${challenge}` : ""}`)}>
          {`Let's do this`}
        </CustomButton>
      </div>
    </div>
  )
}
