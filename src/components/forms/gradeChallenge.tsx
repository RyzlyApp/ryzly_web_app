"use client"
import { FormikProvider } from "formik"; 
import useSubmitChallenge from "@/hook/useSubmitChallenge";
import { CustomButton, CustomInput } from "../custom";
import { ISubmissionPreview } from "@/helper/model/application";

export default function GradingChallenge(
    { item } : { item: ISubmissionPreview }
) {

    const { formikGrade, isLoading } = useSubmitChallenge(item?._id, item?.userId?._id)

    return (
        <FormikProvider value={formikGrade}>
            <form onSubmit={formikGrade.handleSubmit} className="  w-full lg:w-[400px] bg-white flex-col rounded-2xl p-4 flex h-fit gap-4 " > 
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
                        label="Score (/80%)"
                        placeholder="Enter score" 
                    /> 
                    <div className=" w-full flex justify-end mt-auto " >
                        <CustomButton isLoading={isLoading} type="submit" >Post</CustomButton>
                    </div>
                </div>
            </form>
        </FormikProvider>
    )
}