import { ITrack } from "@/helper/model/interest"
import { useFetchData } from "@/hook/useFetchData" 
import { CustomButton } from "../custom"
import LoadingLayout from "./loadingLayout"
import { useAtom } from "jotai"
import { filtersAtom } from "@/helper/atom/filter"

export default function TrackFilter(
    {
        fullWidth = false
    } : { fullWidth?: boolean }
) {

    const { data: track, isLoading } = useFetchData<ITrack[]>({ endpoint: "/track/tracks", name: "tracks" })
 
    const [, updateFilters] = useAtom(filtersAtom);
    const [filters] = useAtom(filtersAtom);

    return (
        <LoadingLayout loading={isLoading} >
            <div className={`relative flex  lg:px-0 px-4 ${fullWidth ? "" : "lg:max-w-[70%]"} overflow-x-auto scroll-smooth w-full `}>
                <div
                    className="flex gap-4 w-fit pb-2"
                >
                    <CustomButton onClick={() => updateFilters({...filters, tracks: []})} variant={filters?.tracks?.length > 0 ? "outline" : "primary"} height="35px" fontSize="12px">
                        All
                    </CustomButton>
                    {track?.map((item, index) => {
                        return (
                            <CustomButton key={index} onClick={() => updateFilters({...filters, tracks: [item._id]})} variant={item?._id === filters?.tracks[0] as string ? "primary" : "outline"} height="35px" fontSize="12px">
                                {item?.name}
                            </CustomButton>
                        )
                    })}
                </div>
            </div>
        </LoadingLayout>
    )
}