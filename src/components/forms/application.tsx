"use client"
import { skills } from "@/helper/utils/databank";
import { FormikProps, FormikProvider } from "formik";
import { CustomInput, CustomSelect, CustomButton } from "../custom";
import { IApplication } from "@/helper/model/application";

interface IProp {
    formik: FormikProps<IApplication>,
    isLoading: boolean
}

export default function Application(
    {
        formik,
        isLoading
    } : IProp
) {


    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className=" w-full flex flex-col gap-4 " >
                <CustomInput
                    name="expertise"
                    label="What's your area of expertise? *"
                    placeholder="Eg: Product design"
                />
                <CustomInput
                    name="yearsOfExperience"
                    label="Years of experience *"
                    type="number"
                    placeholder="Enter years of experience"
                />
                <CustomInput
                    name="linkedInUrl"
                    label="LinkedIn URL *"
                    placeholder="Enter your LinkedIn url"
                />
                <CustomInput
                    name="portfolioUrl"
                    label="Portfolio"
                    placeholder="Enter link to your portfolio"
                />
                <CustomSelect placeholder="Eg: Graphic Design" label="Select your coaching focus areas *" name="focusArea" options={skills} />
                <div className=" mt-4 w-full " >
                    <CustomButton type="submit" isLoading={isLoading} fullWidth >Submit Coach Application</CustomButton>
                </div>
            </form>
        </FormikProvider>
    )
}