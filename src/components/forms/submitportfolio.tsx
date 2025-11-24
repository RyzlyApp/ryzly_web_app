"use client"
import { FormikProvider } from "formik";
import { ImagePicker, LoadingLayout, ModalLayout } from "../shared";
import useSubmitChallenge from "@/hook/useSubmitChallenge";
import { CustomButton, CustomInput } from "../custom";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";
import { useFetchData } from "@/hook/useFetchData";
import { useParams, useRouter } from "next/navigation";
import { IChallenge, IPortfolioDetails } from "@/helper/model/challenge";
import { useEffect, useState } from "react";

export default function SubmitPortifoilo(
    { allGraded, item }: { allGraded: boolean, item: IChallenge }
) {

    const [user] = useAtom(userAtom)
    const param = useParams();

    const router = useRouter()

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


    const { formikSubmit, isLoading, setIsOpen, isOpen } = useSubmitChallenge("", user?.data?._id, editId, true)

    useEffect(() => {
        if (data && data.length > 0) {
            formikSubmit.setValues({
                ...formikSubmit?.values,
                title: item?.title || challenge?.title as string,
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
        <>
            <LoadingLayout loading={loading || loadingChallenge} >
                {allGraded && (
                    <>
                        <div className=" w-full lg:flex hidden justify-end pt-4 " >
                            <CustomButton onClick={() => setIsOpen(true)} >{data?.length > 0 ? "Edit" : "Create"} Portifoilo</CustomButton>
                        </div>
                        <div className=" w-full lg:hidden justify-end pt-4 " >
                            <CustomButton onClick={() => router.push(`/dashboard/challenges/${id}/portfolio`)} >{data?.length > 0 ? "Edit" : "Create"} Portifoilo</CustomButton>
                        </div>
                    </>
                )}
                <ModalLayout isOpen={isOpen} onClose={() => setIsOpen(false)} title="Create Portfoilo" >
                    <FormikProvider value={formikSubmit}>
                        <form onSubmit={formikSubmit.handleSubmit} className=" w-full flex flex-col h-full lg:h-[680px] gap-4 " >
                            <div className=" w-full lg:h-full h-[300px] " >
                                <ImagePicker preview={data?.length > 0 ? data[0]?.url : ""} type="image" />
                            </div>
                            <div className=" w-full flex flex-col gap-3 " >
                                <CustomInput
                                    name="title"
                                    label="Title"
                                    disabled={true}
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
                </ModalLayout>
            </LoadingLayout>
        </>
    )
}