

export default function TopUser() {
    return (
        <div className=" w-full rounded-2xl bg-white flex flex-col gap-4 p-4 " >
            <div className=" w-full pb-4 " >
                <p className=" font-semibold " >Badges Earned</p>
            </div>
            <div className=" w-full h-[348px] bg-neonblue-50 rounded-3xl " >

            </div>
            <div className=" flex flex-col gap-2  " >
                {["1", "2", "3"].map((_, index) => {
                    return ( 
                        <div key={index} className=" w-full flex justify-between items-center h-[60px] " >
                            <div className=" flex items-center gap-5 " >
                                <p className=" font-medium text-violet-300 " >{index+4}</p>
                                <div className=" flex items-center gap-2 " >
                                    <div className=" w-9 h-9 bg-amber-300 rounded-full " />
                                    <div className=" flex flex-col " >
                                        <p className=" text-sm font-semibold " >Oluwaseun Obioma</p>
                                        <p className=" text-xs text-violet-300 " >Product Design</p>
                                    </div>
                                </div>
                            </div>
                            <p className=" font-medium " >65%</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}