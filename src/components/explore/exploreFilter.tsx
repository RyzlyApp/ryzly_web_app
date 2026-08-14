import { category } from "@/helper/utils/databank";
import { CustomSearch, CustomSelect } from "../custom";
import useFilter from "@/hook/useFilter";
import { FormikProvider } from "formik";
import { FilterDrawer, TrackFilter } from "../shared";
import { useAtom } from "jotai";
import { searchAtom } from "@/helper/atom/search";
import OpportunityCards from "./oppoturnityCard";

export default function ExploreFilter() {

    const { formik } = useFilter()
    const [search, setSearch] = useAtom(searchAtom);

    return (
        <FormikProvider value={formik}>
            <div className=" w-full flex flex-col items-center pt-3 justify-center gap-6" >
                <div className=" max-w-[90%] lg:max-w-[80%] mx-auto w-full flex flex-col text-center mb-4" >
                    {/* #TODO: add the filter for Opporturnity Challenge and Work Challenge */}
                    <p className=" text-violet-500 font-bold text-[48px] " >Latest Challenges</p>
                    <p>Take on real-world practice and opportunity challenges, and, win cash prizes. gain proof of skills employers actually value. Join hundreds of talents growing through hands-on learning experiences.</p>
                    {/* <OpportunityCards /> */}
                </div>
                <TrackFilter />
            </div>
        </FormikProvider>
    )
}