"use client"
import { ChallengeForm } from "@/components/forms";
import { LoadingLayout } from "@/components/shared";
import { IChallenge } from "@/helper/model/challenge";
import useChallenge from "@/hook/useChallenge";
import { useFetchData } from "@/hook/useFetchData";
import { useParams } from "next/navigation"; 
import { useEffect } from "react";


export default function CreateChallenge() {

    const param = useParams();
    const id = param.id;
    const { formikChallenge, editChallenge, uploadImage, image, setImage } = useChallenge(id as string, true, true)

    // Fetch challenge or task data depending on type
    const { data, isLoading } = useFetchData<IChallenge>({
        endpoint: `/challenge/single/${id}`,
        name: "challengedetails",
        enable: id ? true : false,
    }); 

    useEffect(() => {
        if (data && !formikChallenge.values.title) {
            const tracks = data.tracks?.map((t) => t._id) || [];
            formikChallenge.setValues({
                ...formikChallenge.values,
                isPublic: data.isPublic,
                title: data.title,
                description: data.description,
                winnerPrice: data.winnerPrice,
                participationFee: data.participationFee,
                tags: data.tags,
                level: data.level?._id,
                category: data.category,
                startDate: data.startDate,
                endDate: data.endDate,
                industry: data.industry?._id,
                tracks,
            });
        }
    }, [data, id]);

    console.log(data);
    

    return (
        <div className=" w-full flex flex-col gap-5 items-center rounded-2xl p-4 bg-white " >
            <LoadingLayout loading={isLoading} >
                <ChallengeForm image={image} user={data?.totalParticipants} setImage={setImage} preview={data?.url} challenge={data} formik={formikChallenge} isLoading={editChallenge?.isPending || uploadImage?.isPending} />
            </LoadingLayout>
        </div>
    )
}