import { CustomButton } from "../custom"
import { RiCodeLine, RiColorFilterLine, RiSmartphoneLine } from "@remixicon/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ProjectTrack() {

    const [selected, setSelected] = useState("1")
    const router = useRouter()

    return (
        <div className=" w-full flex flex-col items-center justify-center gap-10 " >
            <div className=" w-full flex flex-col gap-4 items-center " >
                <div className=" w-10 h-10 " >
                    <img className=" w-full h-full " src={"/images/bluesmile.png"} alt="blue" />
                </div>
                <p className=" text-4xl font-bold " >Project Track</p>
            </div>
            <div className=" w-full max-w-[500px] flex gap-2 " >
                <button onClick={() => setSelected("1")} className={` ${selected === "1" ? " bg-primary text-white " : " bg-[#E8E7ED66] "} w-full h-[156px] flex flex-col justify-center items-center gap-2 rounded-3xl `} >
                    <RiColorFilterLine size={"36px"} />
                    <p className=" font-medium " >Design</p>
                </button>
                <button onClick={() => setSelected("2")} className={` ${selected === "2" ? " bg-primary text-white" : " bg-[#E8E7ED66] "} w-full h-[156px] flex flex-col justify-center items-center gap-2 rounded-3xl `} >
                    <RiCodeLine size={"36px"} />
                    <p className=" font-medium " >Software Dev</p>
                </button>
                <button onClick={() => setSelected("3")} className={` ${selected === "3" ? " bg-primary text-white" : " bg-[#E8E7ED66] "} w-full h-[156px] flex flex-col justify-center items-center gap-2 rounded-3xl `} >
                    <RiSmartphoneLine size={"36px"} />
                    <p className=" font-medium " >Marketing</p>
                </button>
            </div>
            <div className=" w-full flex justify-between items-center " >
                <CustomButton variant="flat" onClick={() => router.push("/auth/onboarding?type=interested")} >
                    {`Skip`}
                </CustomButton>
                <CustomButton onClick={() => router.push("/auth/onboarding?type=interested")}>
                    {`Continue`}
                </CustomButton>
            </div>
        </div>
    )
}