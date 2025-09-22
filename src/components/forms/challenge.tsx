"use client"
import { ICompetition } from "@/helper/model/application"
import { FormikProps, FormikProvider } from "formik"
import { ImagePicker } from "../shared"
import { CustomButton, CustomInput, CustomSelect } from "../custom"
import CustomMultiSelect from "../custom/customMultipleSelect"
import { category, skills } from "@/helper/utils/databank"
import CustomDateTimePicker from "../custom/customDatePicker"

interface IProp {
    formik: FormikProps<ICompetition>,
    isLoading: boolean,
}

export default function ChallengeForm(
    {
        formik,
        isLoading
    }: IProp
) {
    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className=" w-full flex flex-col gap-4 " >
                <ImagePicker />
                <CustomInput
                    name="title"
                    label="Title"
                    placeholder="What's the title of the challenge?"
                />
                <CustomInput
                    name="description"
                    label="Description"
                    placeholder="Briefly describe the challenge"
                    textarea={true}
                />
                <CustomSelect
                    name="category"
                    label="Category"
                    placeholder="Enter a category"
                    options={category}
                />
                <CustomInput
                    name="winnerPrice"
                    label="Winning prize"
                    placeholder="$0.00"
                    type="number"
                />
                <CustomInput
                    name="participationFee"
                    label="Participation prize"
                    placeholder="$0.00"
                    type="number"
                />
                <CustomDateTimePicker name="startDate" label="Start Date" />
                <CustomDateTimePicker name="endDate" label="End Date" />
                <CustomInput
                    name="level"
                    label="Level"
                    // placeholder="$0.00"
                />
                <CustomInput
                    name="industry"
                    label="industry"
                    // placeholder="$0.00"
                />
                <CustomMultiSelect
                    name="tags"
                    label="Tags (8 max)"
                    placeholder="Search for a tag"
                    options={skills}
                />
                <div className=" mt-4 w-full flex justify-end " >
                    <CustomButton type="submit" isLoading={isLoading} >Create Challenge</CustomButton>
                </div>
            </form>
        </FormikProvider>
    )
}