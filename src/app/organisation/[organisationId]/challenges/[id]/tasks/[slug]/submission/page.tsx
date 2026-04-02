"use client"
import { SubmitChallengeForm } from "@/components/forms";
import useSubmitChallenge from "@/hook/useSubmitChallenge";


export default function Submission () {

    const { formikSubmit, isLoading, image, setImage } = useSubmitChallenge()

    return(
        <div className=" w-full flex p-4 h-full bg-white justify-center items-center rounded-2xl " >
            <SubmitChallengeForm formik={formikSubmit} image={image as File} setImage={setImage} isLoading={isLoading} />
        </div>
    )
}