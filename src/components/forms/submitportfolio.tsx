"use client"
import { FormikProvider } from "formik";
import { ImagePicker, LoadingLayout, ModalLayout } from "../shared";
import useSubmitChallenge from "@/hook/useSubmitChallenge";
import { CustomButton, CustomInput } from "../custom";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";
import { useFetchData } from "@/hook/useFetchData";
import { ITrack } from "@/helper/model/interest";
import { useParams } from "next/navigation";
import { IPortfolioDetails } from "@/helper/model/challenge";
import { useEffect, useState } from "react";

export default function SubmitPortifoilo(
    { allGraded }: { allGraded: boolean }
) {

    const [user] = useAtom(userAtom)
    const param = useParams();

    const [editId, setEditID] = useState("")
    const id = param.id as string;

    const { data = [], isLoading: loading } = useFetchData<IPortfolioDetails[]>({
        name: "portfolio", endpoint: "/portfolio", params: {
            challengeID: id
        }
    });

    console.log(data);


    const { formikSubmit, isLoading, setIsOpen, isOpen } = useSubmitChallenge("", user?.data?._id, editId, true)

    useEffect(() => {
        if (data && data.length > 0) {
            formikSubmit.setValues({
                ...formikSubmit?.values,
                title: data[0].title || "",
                description: data[0].description || "",
                link: data[0].links[0]?.link || "",
                tools: data[0].tools[0] || "",
            });

            setEditID(data[0]?._id)
        }
    }, [data]);

    return (
        <>
            <LoadingLayout loading={loading} >
                {allGraded && (
                    <div className=" w-full flex justify-end pt-4 " >
                        <CustomButton onClick={() => setIsOpen(true)} >{data?.length > 0 ? "Edit" : "Create"} Portifoilo</CustomButton>
                    </div>
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