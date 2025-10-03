"use client"
import { OverviewForm } from "@/components/forms";
import UserCard from "@/components/shared/userCard";
import { coachAtom } from "@/helper/atom/coach";
import { IChallenge } from "@/helper/model/challenge";
import useOverview from "@/hook/useOverview";
import { FormikProvider } from "formik";
import { useAtom } from "jotai";
import { RiAddLine, RiCheckFill, RiCloseLine, RiEditLine } from "react-icons/ri";

export default function Overview(
    { item }: { item: IChallenge }
) {

    const { formik, overviewMutate, tab, setTab, indexData, setIndexData } = useOverview(item)
    const [isCoach] = useAtom(coachAtom);

    const clickHandler = (item: string, index: number) => {
        setTab(item)
        setIndexData(index)
    }

    const deleteHandler = (index: number, name: "includes" | "requirements" | "whoIs") => {

        let clone: string[] | undefined

        console.log(index);


        if (name === "includes") {
            clone = formik.values.includes
            clone?.splice(index, 1);

            formik.setFieldValue("includes", clone)

        } else if (name === "requirements") {
            clone = formik.values.requirements
            clone?.splice(index, 1);

            formik.setFieldValue("requirements", clone)
        } else if (name === "whoIs") {
            clone = formik.values.whoIs
            clone?.splice(index, 1);

            formik.setFieldValue("whoIs", clone)
        }

        formik.handleSubmit()
    }

    const OverviewCard = ({ item, name, index }: { item: string, name: "includes" | "requirements" | "whoIs", index: number }) => {

        return (
            <div className=" w-full justify-between gap-4 items-center flex " >
                <div className=" flex gap-2 items-center " >
                    <div className=" w-fit " >
                        <RiCheckFill size={"20px"} />
                    </div>
                    <p className=" text-violet-300 text-xs font-medium " >{item}</p>
                </div>
                {isCoach && (
                    <div className=" flex gap-3 " >
                        <button onClick={() => clickHandler(name, index)} className=" w-8 h-8 rounded-full flex text-neonblue-600 justify-center items-center bg-neonblue-50 " >
                            <RiEditLine className=" text-neonblue-600 " size={"16px"} />
                        </button>
                        <button onClick={() => deleteHandler(index, name)} className=" w-8 h-8 rounded-full flex text-neonblue-600 justify-center items-center bg-neonblue-50 " >
                            <RiCloseLine size={"20px"} />
                        </button>
                    </div>
                )}
            </div>
        )
    }

    return (
        <FormikProvider value={formik}>
            <div className=" w-full flex flex-col p-4 gap-4 " >
                <div className=" w-full flex flex-col p-4 gap-3 bg-gray-100 rounded-2xl " >
                    <p className=" font-semibold text-sm " >About host</p>
                    <UserCard item={item?.creator} />
                </div>
                <div className=" w-full flex flex-col py-2 gap-2 " >
                    <div className=" flex justify-between items-center w-full"  >
                        <p className=" font-semibold text-sm " >This challenge includes</p>
                        {isCoach && (
                            // <button onClick={() => setTab("includes")} className=" cursor-pointer " >
                            //     <RiEditLine className=" text-neonblue-600 " size={"16px"} />
                            // </button>
                            <button onClick={() => setTab("includes")} className=" w-8 h-8 rounded-full flex text-neonblue-600 justify-center items-center bg-neonblue-50 " >
                                <RiAddLine size={"18px"} />
                            </button>
                        )}
                    </div>
                    <div className=" w-full flex flex-col gap-3 pt-3 " >
                        {item?.overview?.includes?.map((item, index) => (
                            <OverviewCard key={index} item={item} name="includes" index={index} />
                        ))}
                    </div>
                    {tab === "includes" && (
                        <OverviewForm isLoading={overviewMutate?.isPending} name={"includes"} formik={formik} setIsOpen={setTab} index={indexData > -1 ? indexData : item?.overview?.includes?.length} />
                    )}
                </div>
                <div className=" w-full flex flex-col py-2 gap-2 " >
                    <div className=" flex justify-between items-center w-full "  >
                        <p className=" font-semibold text-sm " >Requirements</p>
                        {isCoach && (
                            <button onClick={() => setTab("requirements")} className=" w-8 h-8 rounded-full flex text-neonblue-600 justify-center items-center bg-neonblue-50 " >
                                <RiAddLine size={"18px"} />
                            </button>
                        )}
                    </div>
                    <div className=" w-full flex flex-col gap-3 pt-3 " >
                        {item?.overview?.requirements?.map((item, index) => (
                            <OverviewCard key={index} item={item} name="requirements" index={index} />
                        ))}
                    </div>
                    {tab === "requirements" && (
                        <OverviewForm isLoading={overviewMutate?.isPending} name={"requirements"} formik={formik} setIsOpen={setTab} index={indexData > -1 ? indexData : item?.overview?.requirements?.length} />
                    )}
                </div>
                <div className=" w-full flex flex-col py-2 gap-2 " >
                    <div className=" flex justify-between items-center w-full "  >
                        <p className=" font-semibold text-sm " >Who is this challenge</p>
                        {isCoach && (
                            <button onClick={() => setTab("whoIs")} className=" w-8 h-8 rounded-full flex text-neonblue-600 justify-center items-center bg-neonblue-50 " >
                                <RiAddLine size={"18px"} />
                            </button>
                        )}
                    </div>
                    <div className=" w-full flex flex-col gap-3 pt-3 " >
                        {item?.overview?.whoIs?.map((item, index) => (
                            <OverviewCard key={index} item={item} name="whoIs" index={index} />
                        ))}
                    </div>
                    {tab === "whoIs" && (
                        <OverviewForm isLoading={overviewMutate?.isPending} name={"whoIs"} formik={formik} setIsOpen={setTab} index={indexData > -1 ? indexData : item?.overview?.whoIs?.length} />
                    )}
                </div>
            </div>
        </FormikProvider>

    )
}   