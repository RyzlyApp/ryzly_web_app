"use client"
import { CustomInput, CustomButton } from "@/components/custom";
import { ImagePicker, LoadingLayout } from "@/components/shared";
import { userAtom } from "@/helper/atom/user";
import { IChallenge, IPortfolioDetails } from "@/helper/model/challenge";
import { useFetchData } from "@/hook/useFetchData";
import useSubmitChallenge from "@/hook/useSubmitChallenge";
import { FormikProvider } from "formik";
import { useAtom } from "jotai";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Portfoilo() {

    const [user] = useAtom(userAtom)
    const param = useParams();

    const [editId, setEditID] = useState("")
    const id = param.id as string;

    const { data = [], isLoading: loading } = useFetchData<IPortfolioDetails[]>({
        name: "portfolio", endpoint: "/portfolio", params: {
            challengeID: id
        }
    }); 

    const { data: challenge, isLoading: loadingChallenge } = useFetchData<IChallenge>({
        endpoint: `/challenge/single/${id}`, name: "challengedetails", params: {
            userId: user?.data?._id
        }
    })

    const { formikSubmit, isLoading } = useSubmitChallenge("", user?.data?._id, editId, true)

    useEffect(() => {
        if (data && data.length > 0) {
            formikSubmit.setValues({
                ...formikSubmit?.values,
                title: challenge?.title as string,
                description: data[0].description || "",
                link: data[0].links[0]?.link || "",
                tools: data[0].tools[0] || "", 
            });

            setEditID(data[0]?._id)
        }
    }, [data]);

    useEffect(()=>{ 
        formikSubmit.setFieldValue("title", challenge?.title)
        formikSubmit.setFieldValue("taskID", challenge?.tasks[0]?._id as string)
    },[challenge?.title, loadingChallenge]) 

    console.log(formikSubmit?.values);

    return (
        <LoadingLayout loading={loading} > 
            <FormikProvider value={formikSubmit}>
                <form onSubmit={formikSubmit.handleSubmit} className=" w-full flex flex-col h-full bg-white p-4 rounded-2xl lg:h-[680px] gap-4 " >
                    <div className=" w-full lg:h-full h-[300px] " >
                        <ImagePicker preview={data?.length > 0 ? data[0]?.url : ""} type="image" />
                    </div>
                    <div className=" w-full flex flex-col gap-3 " >
                        <CustomInput
                            name="title"
                            label="Title"
                            placeholder="Draft three quick layout concepts for your landing page."
                        />
                        <CustomInput
                            name="description"
                            label="Description"
                            placeholder="Write a short description about your work"
                            textarea={true}
                        />
                        <CustomInput
                            name="link"
                            label="Attach a link (Optional)"
                            placeholder="Add link"
                        />
                        <CustomInput
                            name="tools"
                            label="Tools used"
                            placeholder="Search tools"
                        />
                        <div className=" w-full flex justify-end mt-auto " >
                            <CustomButton isLoading={isLoading} type="submit" >Submit</CustomButton>
                        </div>
                    </div>
                </form>
            </FormikProvider>
        </LoadingLayout>
    )
}