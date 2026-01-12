"use client"
import { CustomButton, CustomImage } from "@/components/custom";
import { ApplicationForm, ChallengeForm } from "@/components/forms";
import { userAtom } from "@/helper/atom/user";
import { IApplicationData } from "@/helper/model/application";
import useChallenge from "@/hook/useChallenge";
import { useFetchData } from "@/hook/useFetchData";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RiCheckboxFill } from "react-icons/ri";


export default function CreateChallenge() {

    const { formikChallenge, createChallenge, tab, setTab, applyForCoach, formik, image, setImage } = useChallenge("", false, true)
    const [userState] = useAtom(userAtom);
    const { data: user } = userState;
    const router = useRouter()

    const { data = [], isLoading: loading } = useFetchData<IApplicationData[]>({ name: "application" + user?._id, endpoint: `/application/user/${user?._id}` });
  


    useEffect(() => {
        if (data?.length > 0 && !formik?.values?.expertise && !loading) {
            formik.setValues(
                {
                    focusArea: data[0]?.focusArea,
                    expertise: data[0]?.expertise,
                    yearsOfExperience: data[0]?.yearsOfExperience,
                    linkedInUrl: data[0]?.linkedInUrl,
                    portfolioUrl: data[0]?.portfolioUrl,
                }
            )
            setTab(1)
        }
    }, [data])

    return (
        <div className=" w-full flex flex-col gap-5 items-center rounded-2xl p-4 bg-white " >
            {!user?.isCoach && (
                <>
                    {tab === 0 && (
                        <div className=" w-full flex flex-col gap-3 " >
                        <div className=" w-[60%] h-full " >
                            <CustomImage src={"/images/forcoach.png"} fillContainer alt={"coach"} />
                        </div>
                            <p className=" text-2xl font-bold text-center " >Unlock Coach Mode</p>
                            <p className=" text-xs text-center " >{`You're about to access features reserved for coaches. As a coach, you can create challenges, build communities, and guide learners with your expertise. Step up, inspire others, and grow your own impact.`}</p>
                            <div className=" flex flex-col gap-2 " >
                                <div className=" flex items-center gap-1 " >
                                    <RiCheckboxFill className=" text-neonblue-500 " size={"16px"} />
                                    <p className=" text-sm font-medium " >Create and host your own challenges</p>
                                </div>
                                <div className=" flex items-center gap-1 " >
                                    <RiCheckboxFill className=" text-neonblue-500 " size={"16px"} />
                                    <p className=" text-sm font-medium " >Build communities and lead discussions</p>
                                </div>
                                <div className=" flex items-center gap-1 " >
                                    <RiCheckboxFill className=" text-neonblue-500 " size={"16px"} />
                                    <p className=" text-sm font-medium " >Share resources, feedback, and insights</p>
                                </div>
                                <div className=" flex items-center gap-1 " >
                                    <RiCheckboxFill className=" text-neonblue-500 " size={"16px"} />
                                    <p className=" text-sm font-medium " >Gain recognition for your mentorship</p>
                                </div>
                                <div className=" flex items-center gap-1 " >
                                    <RiCheckboxFill className=" text-neonblue-500 " size={"16px"} />
                                    <p className=" text-sm font-medium " >Inspire and support learners worldwide</p>
                                </div>
                            </div>
                            <CustomButton onClick={() => router.push("/dashboard/challenges/")} >Become a Coach</CustomButton>
                        </div>
                    )}
                    {tab === 1 && (
                        <ApplicationForm isLoading={applyForCoach.isPending} formik={formik} />
                    )}
                </>
            )}
            {user?.isCoach && (
                <ChallengeForm formik={formikChallenge} image={image} setImage={setImage} isLoading={createChallenge?.isPending} />
            )}
        </div>
    )
}