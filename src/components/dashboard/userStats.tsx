import { userstats } from "@/helper/utils/databank";

export default function UserStats() {

    return (
        <div className=" w-full flex lg:flex-row flex-col gap-4 " >
            {userstats?.map((item, index) => {
                return ( 
                    <div key={index} className=" w-full flex items-center gap-3 bg-white rounded-2xl px-4  h-[96px] " >
                        <div style={{ backgroundColor: item?.bgcolor }} className=" w-12 h-12 rounded-full flex justify-center items-center " >
                            <item.icon size={"24px"} color={item?.color} />
                        </div>
                        <div className=" flex flex-col " >
                            <p className=" font-semibold text-lg " >{item?.value}</p>
                            <p className=" text-xs text-violet-300 " >{item?.label}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}