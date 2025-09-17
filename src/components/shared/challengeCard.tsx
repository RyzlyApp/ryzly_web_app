import { RiAccountCircleFill, RiHeart3Line, RiTimeFill } from "react-icons/ri";
import { CustomButton } from "../custom";

interface IProp {
    scrollable?: boolean
}

export default function ChallengeCard({
    scrollable
} : IProp) {
    return (
        <div style={{ width: scrollable ? "350px" : "100%" }} className=" h-fit bg-white rounded-3xl p-4 shadow flex flex-col gap-5 " >
            <div className=" w-full h-[140px] rounded-lg relative bg-red-500 text-white " >
                <div className=" w-full p-3 flex justify-between items-center " >
                    <div className=" rounded-full border w-[30px] h-[30px] border-white flex justify-center items-center " >
                        <RiHeart3Line size={"16px"} color="#FDFDFF" />
                    </div>

                    <div className=" rounded-full border px-2 w-fit gap-2 h-[30px] border-white flex justify-center items-center " >
                        <RiTimeFill size={"16px"} color="#FDFDFF" />
                        <p className=" text-xs font-semibold "  >2-3 Weeks</p>
                    </div>
                </div>
            </div>
            <div className=" w-full flex flex-wrap gap-3 " >
                <div className=" w-fit px-2 text-xs font-medium text-coral-900 rounded-3xl flex justify-center items-center h-[22px] bg-coral-100 " >
                    React
                </div>
                <div className=" w-fit px-2 text-xs font-medium text-neonblue-900 rounded-3xl flex justify-center items-center h-[22px] bg-neonblue-100 " >
                    Node.js
                </div>
                <div className=" w-fit px-2 text-xs font-medium text-pear-900 rounded-3xl flex justify-center items-center h-[22px] bg-pear-100 " >
                    PostgreSQL
                </div>
            </div>
            <div className=" w-full flex flex-col gap-2 " >
                <p className=" text-lg font-bold " >Mobile Banking App UI</p>
                <p className=" text-xs text-violet-300 " >Design and prototype a modern mobile banking application with intuitive UX and accessibility features.</p>
            </div>
            <div className=" w-full grid grid-cols-2 gap-4 " > 
                 <div className=" flex flex-col " >
                    <p className=" text-xs text-violet-300 font-medium " >Winning Price</p>
                    <p className=" font-semibold " >$200</p>
                 </div>
                 <div className=" flex flex-col " >
                    <p className=" text-xs text-violet-300 font-medium " >Participation Fee</p>
                    <p className=" font-semibold " >$10</p>
                 </div>
                 <div className=" flex flex-col " >
                    <p className=" text-xs text-violet-300 font-medium " >Participants</p>
                    {/* <p className=" font-semibold " >$200</p> */}
                 </div>
                 <div className=" flex flex-col " >
                    <p className=" text-xs text-violet-300 font-medium " >Hosted By</p>
                    <div className=" flex gap-2 items-center " > 
                        <RiAccountCircleFill />
                        <p className=" font-semibold " >Finlytics</p>
                    </div>
                 </div>
            </div>  
            <CustomButton>
                Join Challenge
            </CustomButton>
        </div>
    )
}