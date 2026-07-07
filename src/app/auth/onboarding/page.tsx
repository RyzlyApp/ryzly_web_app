"use client"
import { FullNameForm, Indicator, ProjectTrack, SelectPath } from "@/components/onboarding";
import InterestedForm from "@/components/onboarding/InterestedForm";
import { Loader } from "@/components/shared";
import { userActionsAtom, userAtom } from "@/helper/atom/user";
import { IUser } from "@/helper/model/user";
import useOnboarding from "@/hook/useOnboarding";
import { FormikProvider } from "formik";
import { useAtom, useSetAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Onboarding() {

    const query = useSearchParams(); 
    const type = query?.get('type') as string; 
    const challenge = query?.get('challenge') as string;
    const router = useRouter()
    const [userState] = useAtom(userAtom);
    const dispatch = useSetAtom(userActionsAtom);

    const { data: user } = userState;

    useEffect(() => {
        dispatch({ type: "fetch" });
    }, [dispatch]);


    const { formik, updateUserInfo } = useOnboarding()   

    useEffect(() => {
        formik.setFieldValue("companyName", user?.companyName)
    }, [user?.companyName])
    

    useEffect(()=> {
        if(!(formik?.values?.firstName || formik.values?.companyName) && (type === "fullname" || type === "project" || type === "interested")){
            router.push(`/auth/onboarding?type=fullname${challenge ? `&challenge=${challenge}` : ""}`)
        }
    }, [formik?.values?.firstName, formik?.values?.companyName, router, type])

    console.log(formik.values);
    console.log(formik.errors);
    

    return (
        <Loader loading={updateUserInfo?.isPending || updateUserInfo.isSuccess} >
            <FormikProvider value={formik}>
                <div className=" w-full h-fit max-w-[950px] gap-4 lg:gap-7 bg-white text-violet-300 rounded-3xl pt-4 p-4 lg:p-[60px] flex flex-col items-center " >
                    <Indicator type={type} />
                    {!type && (
                        <SelectPath formik={formik} />
                    )}
                    {type === "fullname" && (
                        <FullNameForm user={user as IUser} formik={formik} />
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