"use client"
import { FormikProvider } from "formik";
import useSubmitChallenge from "@/hook/useSubmitChallenge";
import { CustomButton, CustomInput } from "../custom";
import { ISubmissionPreview } from "@/helper/model/application";
import { useFetchData } from "@/hook/useFetchData";
import { RiEditLine } from "react-icons/ri";
import UserCard from "../shared/userCard";
import { IGradeDetail } from "@/helper/model/challenge";
import { CoachesReview, LoadingLayout } from "../shared";
import { useEffect, useState } from "react";

export default function GradingChallenge(
    { item }: { item: ISubmissionPreview }
) {

    const [tab, setTab] = useState(false)

    const { data = [], isPending } = useFetchData<IGradeDetail[]>({
        endpoint: `/grade`, params: {
            // challengeID: item?.challengeID?._id,
            taskID: item?.taskID?._id,
            userId: item?.userId?._id
        }
    })

    const { formikGrade, isLoading } = useSubmitChallenge(item?._id, item?.userId?._id, data.length > 0 ? data[0]?._id : "")

    useEffect(() => {
        if (data?.length > 0) {
            setTab(true)
            formikGrade.setFieldValue("feedBack", data[0]?.feedBack)
            formikGrade.setFieldValue("score", data[0]?.score)
        }
    }, [isPending])

    return (
        <div className=" w-full lg:w-[400px] bg-white p-4 " >
            <LoadingLayout loading={isPending} >
                <FormikProvider value={formikGrade}>
                    {!tab && (
                        <form onSubmit={formikGrade.handleSubmit} className=" w-full flex-col rounded-2xl flex h-fit gap-4 " >
                            <p className=" font-bold " >Review & score</p>
                            <div className=" w-full flex flex-col gap-3 " >
                                <CustomInput
                                    name="feedBack"
                                    label="Feedback"
                                    placeholder="Leave constructive feedback for this submission"
                                    textarea={true}
                                />
                                <CustomInput
                                    name="score"
                                    label="Score (/100%)"
                                    placeholder="Enter score"
                                />
                                <div className=" w-full flex justify-end gap-4 pt-3 mt-auto " >
                                    {data?.length > 0 && ( 
                                        <CustomButton variant="outline" onClick={()=> setTab(true)} >Cancel</CustomButton>
                                    )}
                                    <CustomButton isLoading={isLoading} type="submit" >Post</CustomButton>
                                </div>
                            </div>
                        </form>
                    )}
                    {tab && (
                        <div className=" w-full bg-white flex-col rounded-2xl p-4 flex h-fit gap-4 " >
                            <div className=" w-full flex justify-between items-center " >
                                <p className=" font-bold " >Review & score</p>
                                <button onClick={() => setTab(false)} type="button" className=" text-neonblue-600 " >
                                    <RiEditLine size={"16px"} />
                                </button>
                            </div>
                           <CoachesReview data={data[0]} />
                        </div>
                    )}
                </FormikProvider>
            </LoadingLayout>
        </div>
    )
}