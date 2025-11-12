import { category } from "@/helper/utils/databank";
import { CustomSearch, CustomSelect } from "../custom";
import useFilter from "@/hook/useFilter";
import { FormikProvider } from "formik";
import { FilterDrawer, TrackFilter } from "../shared";
import { useAtom } from "jotai";
import { searchAtom } from "@/helper/atom/search";

export default function ExploreFilter() {

    const { formik } = useFilter()
    const [search, setSearch] = useAtom(searchAtom); 

    return (
        <FormikProvider value={formik}>
            <div className=" w-full flex flex-col items-center justify-center gap-4 " >
                <p className=" text-violet-500 font-bold text-[48px] " >Latest Challenges</p>
                <div className=" gap-2 flex items-center justify-center w-full " >
                    {/* <div className=" w-[140px] " >
                    <CustomSelect
                        name="industry" 
                        placeholder="Select a industry"
                        options={category}
                        height="40px"
                    />
                    </div> */}
                    <div className=" w-[350px] " >
                    <CustomSearch value={search} onClear={() => setSearch("")} onChange={(e) => setSearch(e.target.value)} placeholder="Search for a challenge" />
                    </div>
                    <FilterDrawer />
                </div>
                <TrackFilter />
            </div>
        </FormikProvider>
    )
}