import { useState } from "react"
import { CustomButton } from "../custom"
import { useRouter } from "next/navigation"

export default function SelectPath() {

    const [selected, setSelected] = useState("1")
    const router = useRouter()

    return (
        <div className=" w-full flex flex-col items-center justify-center gap-10 " >
            <div className=" w-full flex flex-col gap-4 items-center " >
                <div className=" px-4 py-1 rounded-full bg-neonblue-100 text-neonblue-600 font-semibold " >
                    <p>Welcome To Rhyzly</p>
                </div>
                <p className=" text-4xl font-bold " >Select your path</p>
                <p className=" text-violet-300 " >Pick the path that feels most like you.</p>
            </div>
            <div className=" w-full flex gap-4 " >
                <button onClick={() => setSelected("1")} className={` w-full max-w-[240px] h-[180px] rounded-3xl ${selected === "1" ? " border-pear-600 bg-pear-50  " : " border-[#E8E7ED66] bg-[#E8E7ED66] "} border-3  items-center justify-center flex flex-col gap-4 `} >
                    <div className=" w-16 h-16 " >
                        <img className=" w-full h-full " src={"/images/green.png"} alt="green" />
                    </div>
                    <p className=" text-sm font-medium " >{`I'm here to gain experience`}</p>
                </button>
                <button onClick={() => setSelected("2")} className={` w-full max-w-[240px] h-[180px] rounded-3xl ${selected === "2" ? " border-pear-600 bg-pear-50  " : " border-[#E8E7ED66] bg-[#E8E7ED66] "} border-3  items-center justify-center flex flex-col gap-4 `} >
                    <div className=" w-16 h-16 " >
                        <img className=" w-full h-full " src={"/images/orange.png"} alt="orange" />
                    </div>
                    <p className=" text-sm font-medium " >{`I want to host challenges`}</p>
                </button>
                <button onClick={() => setSelected("3")} className={` w-full max-w-[240px] h-[180px] rounded-3xl ${selected === "3" ? " border-pear-600 bg-pear-50  " : " border-[#E8E7ED66] bg-[#E8E7ED66] "} border-3  items-center justify-center flex flex-col gap-4 `} >
                    <div className=" w-16 h-16 " >
                        <img className=" w-full h-full " src={"/images/blue.png"} alt="blue" />
                    </div>
                    <p className=" text-sm font-medium " >{`I'm here to find talents`}</p>
                </button>
            </div>
            <div className=" ml-auto " >
                <CustomButton onClick={() => router.push("/auth/onboarding?type=fullname")} >
                    {`Let's do this`}
                </CustomButton>
            </div>
        </div>
    )
}