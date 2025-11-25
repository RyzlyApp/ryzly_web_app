"use client"
import { OverviewForm } from "@/components/forms";
import { LoadingLayout } from "@/components/shared";
import UserCard from "@/components/shared/userCard";
import { coachAtom } from "@/helper/atom/coach";
import { IChallenge, IOverview } from "@/helper/model/challenge";
import { useFetchData } from "@/hook/useFetchData";
import useOverview from "@/hook/useOverview";
import { FormikProvider } from "formik";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { RiAddLine, RiCheckFill, RiCloseLine, RiEditLine } from "react-icons/ri";

export default function Overview(
    { item }: { item: IChallenge }
) { 

    const { data, isLoading } = useFetchData<IOverview>({
        endpoint: `/overview/${item?.overview}`, name: "overview"
    });
 
    const { formik, overviewMutate, tab, setTab, indexData, setIndexData } = useOverview();

    useEffect(() => {
        if (data?._id) {
            formik.setValues({
                ...formik?.values,
                whoIs: data?.whoIs,
                requirements: data?.requirements,
                includes: data?.includes,
                rules: data?.rules,
                outcomes: data?.outcomes
            })
        }
    }, [data?._id])

    const [isCoach] = useAtom(coachAtom);

    const clickHandler = (item: string, index: number) => {
        setTab(item);
        setIndexData(index)
    }

    const deleteHandler = (index: number, name: "includes" | "requirements" | "whoIs" | "rules" | "outcomes") => {

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
        } else if (name === "rules") {
            clone = formik.values.rules
            clone?.splice(index, 1);

            formik.setFieldValue("rules", clone)
        } else if (name === "outcomes") {
            clone = formik.values.outcomes
            clone?.splice(index, 1);

            formik.setFieldValue("outcomes", clone)
        }

        formik.handleSubmit()
    }

    const OverviewCard = ({ item, name, index }: { item: string, name: "includes" | "requirements" | "whoIs" | "rules" | "outcomes", index: number }) => {

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
                        <button type="button" onClick={() => clickHandler(name, index)} className=" w-8 h-8 rounded-full flex text-neonblue-600 justify-center items-center bg-neonblue-50 " >
                            <RiEditLine className=" text-neonblue-600 " size={"16px"} />
                        </button>
                        <button type="button" onClick={() => deleteHandler(index, name)} className=" w-8 h-8 rounded-full flex text-neonblue-600 justify-center items-center bg-neonblue-50 " >
                            <RiCloseLine size={"20px"} />
                        </button>
                    </div>
                )}
            </div>
        )
    }

    return (
        <LoadingLayout loading={isLoading} >

            <FormikProvider value={formik}>
                <div className=" w-full flex flex-col p-4 gap-4 " >
                    <div className=" w-full flex flex-col p-4 gap-3 bg-gray-100 rounded-2xl " >
                        <p className=" font-semibold text-sm " >About host</p>
                        <UserCard item={item?.creator} />
                    </div>
                    <div className=" w-full flex flex-col py-2 gap-2 " >
                        <div className=" flex justify-between items-center w-full"  >
                            <p className=" font-semibold text-sm " >Challenge rules</p>
                            {isCoach && ( 
                                <button onClick={() => setTab("rules")} className=" w-8 h-8 rounded-full flex text-neonblue-600 justify-center items-center bg-neonblue-50 " >
                                    <RiAddLine size={"18px"} />
                                </button>
                            )}
                        </div>
                        <div className=" w-full flex flex-col gap-3 pt-3 " >
                            {data?.rules?.map((item, index) => (
                                <OverviewCard key={index} item={item} name="rules" index={index} />
                            ))}
                        </div>
                        {tab === "rules" && (
                            <OverviewForm isLoading={overviewMutate?.isPending} name={"rules"} formik={formik} setIsOpen={setTab} index={indexData > -1 ? indexData : Number(data?.rules?.length)} />
                        )}
                    </div>
                    <div className=" w-full flex flex-col py-2 gap-2 " >
                        <div className=" flex justify-between items-center w-full"  >
                            <p className=" font-semibold text-sm " >Curriculum</p>
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
                            {data?.includes?.map((item, index) => (
                                <OverviewCard key={index} item={item} name="includes" index={index} />
                            ))}
                        </div>
                        {tab === "includes" && (
                            <OverviewForm isLoading={overviewMutate?.isPending} name={"includes"} formik={formik} setIsOpen={setTab} index={indexData > -1 ? indexData : Number(data?.includes?.length)} />
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
                            {data?.requirements?.map((item, index) => (
                                <OverviewCard key={index} item={item} name="requirements" index={index} />
                            ))}
                        </div>
                        {tab === "requirements" && (
                            <OverviewForm isLoading={overviewMutate?.isPending} name={"requirements"} formik={formik} setIsOpen={setTab} index={indexData > -1 ? indexData : Number(data?.requirements?.length)} />
                        )}
                    </div>
                    <div className=" w-full flex flex-col py-2 gap-2 " >
                        <div className=" flex justify-between items-center w-full "  >
                            <p className=" font-semibold text-sm " >Who is this challenge for</p>
                            {isCoach && (
                                <button onClick={() => setTab("whoIs")} className=" w-8 h-8 rounded-full flex text-neonblue-600 justify-center items-center bg-neonblue-50 " >
                                    <RiAddLine size={"18px"} />
                                </button>
                            )}
                        </div>
                        <div className=" w-full flex flex-col gap-3 pt-3 " >
                            {data?.whoIs?.map((item, index) => (
                                <OverviewCard key={index} item={item} name="whoIs" index={index} />
                            ))}
                        </div>
                        {tab === "whoIs" && (
                            <OverviewForm isLoading={overviewMutate?.isPending} name={"whoIs"} formik={formik} setIsOpen={setTab} index={indexData > -1 ? indexData : Number(data?.whoIs?.length)} />
                        )}
                    </div>
                    <div className=" w-full flex flex-col py-2 gap-2 " >
                        <div className=" flex justify-between items-center w-full"  >
                            <p className=" font-semibold text-sm " >Outcomes</p>
                            {isCoach && (
                                // <button onClick={() => setTab("includes")} className=" cursor-pointer " >
                                //     <RiEditLine className=" text-neonblue-600 " size={"16px"} />
                                // </button>
                                <button onClick={() => setTab("outcomes")} className=" w-8 h-8 rounded-full flex text-neonblue-600 justify-center items-center bg-neonblue-50 " >
                                    <RiAddLine size={"18px"} />
                                </button>
                            )}
                        </div>
                        <div className=" w-full flex flex-col gap-3 pt-3 " >
                            {data?.outcomes?.map((item, index) => (
                                <OverviewCard key={index} item={item} name="outcomes" index={index} />
                            ))}
                        </div>
                        {tab === "outcomes" && (
                            <OverviewForm isLoading={overviewMutate?.isPending} name={"outcomes"} formik={formik} setIsOpen={setTab} index={indexData > -1 ? indexData : Number(data?.outcomes?.length)} />
                        )}
                    </div>
                </div>
            </FormikProvider>
        </LoadingLayout>

    )
}   