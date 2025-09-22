import { RiDownloadLine } from "react-icons/ri";


export default function Leaderboard() {
    return(
        <div className=" w-full flex flex-col gap-4 p-4 " >
            <div className=" flex w-full justify-between items-center " >
                <p className=" font-bold " >Leaderboard</p>
                <button>
                    <RiDownloadLine size={"24px"} className=" text-neonblue-600 " />
                </button>
            </div>
            <div className=" w-full flex flex-col gap-3 " >
                <div className=" flex items-center h-[74px] justify-between w-full " >
                    <div className=" flex items-center gap-4 " >
                        <p className=" text-violet-300 font-medium " >1</p>
                        <div className=" flex gap-2 items-center " >
                            <div className=" w-9 h-9 rounded-full bg-neonblue-600 " >

                            </div>
                            <div className=" flex flex-col " >
                                <p className=" text-sm font-semibold " >Oluwaseun Obioma</p>
                                <p className=" text-xs text-violet-300 font-medium " >65% total score</p>
                            </div>
                        </div>
                    </div>
                    <div className=" flex flex-col text-right " >
                        <p className=" font-medium " >4</p>
                        <p className=" text-xs text-violet-300 " >Task done</p>
                    </div>
                </div>
            </div>
        </div>
    )
}