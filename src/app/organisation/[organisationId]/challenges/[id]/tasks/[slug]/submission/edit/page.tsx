"use client"
import { SubmitChallengeForm } from "@/components/forms";
import { LoadingLayout } from "@/components/shared";
import { userAtom } from "@/helper/atom/user";
import { ISubmissionPreview } from "@/helper/model/application";
import { useFetchData } from "@/hook/useFetchData";
import useSubmitChallenge from "@/hook/useSubmitChallenge";
import { useAtom } from "jotai";
import { useParams } from "next/navigation";
import { useEffect } from "react";


export default function Submission() {

    const param = useParams();
    const slug = param.slug;
    const [userState] = useAtom(userAtom)

    const { data: user } = userState

    const { data = [], isLoading: loading } = useFetchData<Array<ISubmissionPreview>>({
        endpoint: `/submission`, params: {
            // challengeID: id,
            taskID: slug,
            userId: user?._id
        },
    })

    const { formikSubmit, isLoading, image, setImage } = useSubmitChallenge(data[0]?._id, user?._id, data[0]?._id,)

    useEffect(() => {
        if (data?.length > 0 && !formikSubmit.values.title) {
            formikSubmit.setFieldValue("title", data[0]?.title)
            formikSubmit.setFieldValue("description", data[0]?.description)
            formikSubmit.setFieldValue("link", data[0]?.link)
            formikSubmit.setFieldValue("tools", data[0]?.tools)
        }
    }, [data, isLoading])

    return (
        <LoadingLayout loading={loading} >
            <div className=" w-full flex p-4 h-full bg-white justify-center items-center rounded-2xl " >
                <SubmitChallengeForm preview={data[0]?.url} formik={formikSubmit} image={image as File} setImage={setImage} isLoading={isLoading} />
            </div>
        </LoadingLayout>
    )
}