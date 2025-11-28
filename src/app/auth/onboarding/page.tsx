"use client"
import { FullNameForm, Indicator, ProjectTrack, SelectPath } from "@/components/onboarding";
import InterestedForm from "@/components/onboarding/InterestedForm";
import { Loader } from "@/components/shared";
import useOnboarding from "@/hook/useOnboarding";
import { FormikProvider } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Onboarding() {

    const query = useSearchParams(); 
    const type = query?.get('type') as string; 
    const challenge = query?.get('challenge') as string;
    const router = useRouter()

    const { formik, updateUserInfo } = useOnboarding()  

    useEffect(()=> {
        if(!formik?.values?.fullName && (type === "fullname" || type === "project" || type === "interested")){
            router.push(`/auth/onboarding?type=fullname${challenge ? `&challenge=${challenge}` : ""}`)
        }
    }, [formik?.values?.fullName, router, type])


    return (
        <Loader loading={updateUserInfo?.isPending || updateUserInfo.isSuccess} >
            <FormikProvider value={formik}>
                <div className=" w-full h-fit max-w-[950px] gap-4 lg:gap-7 bg-white text-violet-300 rounded-3xl pt-4 p-4 lg:p-[60px] flex flex-col items-center " >
                    <Indicator type={type} />
                    {!type && (
                        <SelectPath />
                    )}
                    {type === "fullname" && (
                        <FullNameForm formik={formik} />
                    )}
                    {type === "project" && (
                        <InterestedForm formik={formik} />
                    )}
                    {type === "interested" && (
                        <ProjectTrack formik={formik} />
                    )}
                </div>
            </FormikProvider>
        </Loader>
    )
}