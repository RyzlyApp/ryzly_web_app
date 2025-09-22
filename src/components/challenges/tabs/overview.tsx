"use client"
import { OverviewForm } from "@/components/forms";
import { coachAtom } from "@/helper/atom/coach";
import { IChallenge } from "@/helper/model/challenge";
import useOverview from "@/hook/useOverview";
import { FormikProvider } from "formik";
import { useAtom } from "jotai";
import { RiCheckFill, RiCloseLine, RiEditLine } from "react-icons/ri";

export default function Overview(
    { item }: { item: IChallenge }
) {

    const { formik, overviewMutate, tab, setTab } = useOverview()
    const [isCoach] = useAtom(coachAtom);

    const OverviewCard = ({ item }: { item: string }) => {
        return (
            <div className=" w-full justify-between gap-4 items-center flex " >
                <div className=" flex gap-2 items-center " >
                    <div className=" w-fit " >
                        <RiCheckFill size={"20px"} />
                    </div>
                    <p className=" text-violet-300 text-xs font-medium " >{item}</p>
                </div>
                {isCoach && (
                    <button>
                        <RiCloseLine size={"20px"} />
                    </button>
                )}
            </div>
        )
    }

    return (
        <FormikProvider value={formik}>
            <div className=" w-full flex flex-col p-4 gap-4 " >
                <div className=" w-full flex flex-col p-4 gap-3 bg-gray-100 rounded-2xl " >
                    <p className=" font-semibold text-sm " >About host</p>
                    <div className=" flex items-center gap-2 " >
                        <div className=" w-10 h-10 rounded-full bg-neonblue-600 " >

                        </div>
                        <div className=" flex flex-col " >
                            <p className=" font-semibold " >{item?.creator?.fullName}</p>
                            <p className=" font-medium text-xs text-violet-300 " >0 challenges hosted</p>
                        </div>
                    </div>
                    <p className=" text-xs font-medium text-violet-300 " >{`Finlytics is a fast-growing fintech startup on a mission to make personal finance simple and actionable for everyone. Our team blends design, data, and human insight to create tools that help users take control of their money. We believe in the power of fresh perspectives, and that’s why we’re excited to host challenges on Rhyzly giving rising talent the opportunity to work on real-world problems that matter. If you're tackling this brief, you're already thinking like a product innovator. We can't wait to see your take!`}</p>
                </div>
                <div className=" w-full flex flex-col py-2 gap-2 " >
                    <div className=" flex justify-between items-center w-full"  >
                        <p className=" font-semibold text-sm " >This challenge includes</p>
                        {isCoach && (
                            <button onClick={() => setTab("about")} className=" cursor-pointer " >
                                <RiEditLine className=" text-neonblue-600 " size={"16px"} />
                            </button>
                        )}
                    </div>
                    <div className=" w-full flex flex-col gap-3 pt-3 " >
                        <OverviewCard item="Step-by-step challenge guide and learning resources" />
                        <OverviewCard item="Step-by-step challenge guide and learning resources" />
                        <OverviewCard item="Step-by-step challenge guide and learning resources" />
                    </div>
                    {tab === "about" && (
                        <OverviewForm isLoading={overviewMutate?.isPending} name={"includes"} formik={formik} setIsOpen={setTab} index={item?.overview?.includes?.length} />
                    )}
                </div>
                <div className=" w-full flex flex-col py-2 gap-2 " >
                    <div className=" flex justify-between items-center w-full "  >
                        <p className=" font-semibold text-sm " >Requirements</p>
                        {isCoach && (
                            <button onClick={() => setTab("requirements")} className=" cursor-pointer " >
                                <RiEditLine className=" text-neonblue-600 " size={"16px"} />
                            </button>
                        )}
                    </div>
                    <div className=" w-full flex flex-col gap-3 pt-3 " >
                        <OverviewCard item="Step-by-step challenge guide and learning resources" />
                        <OverviewCard item="Step-by-step challenge guide and learning resources" />
                        <OverviewCard item="Step-by-step challenge guide and learning resources" />
                    </div>
                    {tab === "requirements" && (
                        <OverviewForm isLoading={overviewMutate?.isPending} name={"requirements"} formik={formik} setIsOpen={setTab} index={item?.overview?.includes?.length} />
                    )}
                </div>
                <div className=" w-full flex flex-col py-2 gap-2 " >
                    <div className=" flex justify-between items-center w-full "  >
                        <p className=" font-semibold text-sm " >Who is this challenge</p>
                        {isCoach && (
                            <button onClick={() => setTab("who")} className=" cursor-pointer " >
                                <RiEditLine className=" text-neonblue-600 " size={"16px"} />
                            </button>
                        )}
                    </div>
                    <div className=" w-full flex flex-col gap-3 pt-3 " >
                        <OverviewCard item="Step-by-step challenge guide and learning resources" />
                        <OverviewCard item="Step-by-step challenge guide and learning resources" />
                        <OverviewCard item="Step-by-step challenge guide and learning resources" />
                    </div>
                    {tab === "who" && (
                        <OverviewForm isLoading={overviewMutate?.isPending} name={"whoIs"} formik={formik} setIsOpen={setTab} index={item?.overview?.includes?.length} />
                    )}
                </div>
            </div>
        </FormikProvider>

    )
}   