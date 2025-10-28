"use client"
import { ChallengeForm } from "@/components/forms";
import useChallenge from "@/hook/useChallenge";


export default function CreateChallenge() {

    const { formikChallenge, createChallenge } = useChallenge("", false, true)

    return (
        <div className=" w-full flex flex-col gap-5 items-center rounded-2xl p-4 bg-white " > 
            <ChallengeForm formik={formikChallenge} isLoading={createChallenge?.isPending} />
        </div>
    )
}