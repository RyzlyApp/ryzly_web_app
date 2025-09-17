import { bottombarlink } from "@/helper/utils/databank";

export default function BottomBar() {
    return (
        <div className=" h-[56px] w-full flex justify-between items-center " >
            {bottombarlink?.map((item, index) => {
                return (
                    <div key={index} className=" w-full h-full flex justify-center items-center cursor-pointer " >
                        <item.icon size={"24px"} />
                    </div>
                )
            })}
        </div>
    )
}