import { ITrack } from "@/helper/model/interest"
import { useFetchData } from "@/hook/useFetchData"
import { useState } from "react"
import { CustomButton } from "../custom"

export default function TrackFilter() {

    const { data: track } = useFetchData<ITrack[]>({ endpoint: "/track/tracks", name: "tracks" })

    const [selected, setSelected] = useState<string[]>([])

    return ( 
        <div className="relative flex justify-center max-w-[70%] overflow-x-auto scroll-smooth w-full ">
            <div
                className="flex gap-4 w-fit pb-2"
            >
                <CustomButton onClick={() => setSelected([])} variant={selected?.length > 0 ? "outline" : "primary"} height="35px" fontSize="12px">
                    All
                </CustomButton>
                {track?.map((item, index) => {
                    return (
                        <CustomButton key={index} onClick={() => setSelected([item._id])} variant={item?._id === selected[0] ? "primary" : "outline"} height="35px" fontSize="12px">
                            {item?.name}
                        </CustomButton>
                    )
                })}
            </div>
        </div>
    )
}