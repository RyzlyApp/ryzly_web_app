"use client"
import { FormikProvider } from "formik";
import { ImagePicker } from "../shared";
import useSubmitChallenge from "@/hook/useSubmitChallenge";
import { CustomButton, CustomInput } from "../custom";

export default function SubmitChallenge() {

    const { formikSubmit, isLoading, image, setImage } = useSubmitChallenge()

    return (
        <FormikProvider value={formikSubmit}>
            <form onSubmit={formikSubmit.handleSubmit} className=" w-full flex flex-col h-full lg:h-[680px] gap-4 " >
                <div className=" w-full lg:h-full h-[300px] " >
                    <ImagePicker type="image" image={image as File} setImage={setImage} />
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
                        label="Attach a link"
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
    )
}