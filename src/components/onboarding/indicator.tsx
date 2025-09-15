
interface IProps {
    type: string
}

export default function Indicator(
    {
        type
    } : IProps
) {
    return (
        <div className=" w-fit flex items-center text-xs font-medium " >
            <div className=" w-[150px] h-[84px] flex flex-col gap-1 justify-center items-center " >
                <div className=" w-full flex items-center " >
                    <div className=" flex-1 " />
                    <div className=" w-6 h-6 rounded-full bg-neonblue-500 text-white flex justify-center items-center font-semibold " >
                        1
                    </div>
                    <div className=" flex-1 h-1 bg-neonblue-500 " />
                </div>
                <p >Role</p>
            </div>
            <div className=" w-[150px] h-[84px] flex flex-col gap-1 justify-center items-center " >
                <div className=" w-full flex items-center " >
                    <div className=" flex-1 h-1 bg-neonblue-500 " />
                    <div className={` w-6 h-6 rounded-full ${(type === "fullname" || type === "project" || type === "interested" || type === "signup") ? "bg-neonblue-500 text-white" : " bg-white border border-neonblue-100 "} flex justify-center items-center font-semibold `} >
                        2
                    </div>
                    <div className={` flex-1 h-1 ${(type === "fullname" || type === "project" || type === "interested" || type === "signup") ? " bg-neonblue-500 " : "bg-neonblue-100"} `} />
                </div>
                <p>Personal Info</p>
            </div>
            <div className=" w-[150px] h-[84px] flex flex-col gap-1 justify-center items-center " >
                <div className=" w-full flex items-center " >
                    <div className={` flex-1 h-1 ${(type === "fullname" || type === "project" || type === "interested" || type === "signup") ? " bg-neonblue-500 " : "bg-neonblue-100"} `} />
                    <div className={` w-6 h-6 rounded-full ${(type === "project" || type === "interested" || type === "signup") ? "bg-neonblue-500 text-white" : " bg-white border border-neonblue-100 "} flex justify-center items-center font-semibold `} >
                        3
                    </div>
                    <div className={` flex-1 h-1 ${(type === "project" || type === "interested" || type === "signup") ? " bg-neonblue-500 " : "bg-neonblue-100"} `} />
                </div>
                <p>Work</p>
            </div>
            <div className=" w-[150px] h-[84px] flex flex-col gap-1 justify-center items-center " >
                <div className=" w-full flex items-center " >
                    <div className={` flex-1 h-1 ${(type === "project" || type === "interested" || type === "signup") ? " bg-neonblue-500 " : "bg-neonblue-100"} `} />
                    <div className={` w-6 h-6 rounded-full ${(type === "interested" || type === "signup") ? "bg-neonblue-500 text-white" : " bg-white border border-neonblue-100 "} flex justify-center items-center font-semibold `} >
                        4
                    </div>
                    <div className={` flex-1 h-1 ${(type === "interested"  || type === "signup")? " bg-neonblue-500 " : "bg-neonblue-100"} `} />
                </div>
                <p>Interest</p>
            </div>
            <div className=" w-[150px] h-[84px] flex flex-col gap-1 justify-center items-center " >
                <div className=" w-full flex items-center " >
                    <div className={` flex-1 h-1 ${(type === "interested"  || type === "signup") ? " bg-neonblue-500 " : "bg-neonblue-100"} `} />
                    <div className={` w-6 h-6 rounded-full ${type === "signup" ? "bg-neonblue-500 text-white" : " bg-white border border-neonblue-100 "} flex justify-center items-center font-semibold `} >
                        5
                    </div>
                    <div className=" flex-1 " />
                </div>
                <p>Account Details</p>
            </div>
        </div>
    )
}