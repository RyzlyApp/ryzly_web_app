"use client"
import { ICompetition } from "@/helper/model/application"
import { FormikProps, FormikProvider } from "formik"
import { ImagePicker } from "../shared"
import { CustomButton, CustomInput, CustomSelect } from "../custom"
import CustomMultiSelect from "../custom/customMultipleSelect"
import { category, level, skills } from "@/helper/utils/databank"
import CustomDateTimePicker from "../custom/customDatePicker"
import { URLS } from "@/helper/services/urls"
import { convertDataForSelect } from "@/helper/utils/convertDataForSelect"
import { useFetchData } from "@/hook/useFetchData"
import { ITrack } from "@/helper/model/interest"

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

    const { data = [] } = useFetchData<ITrack[]>({ name: "interest", endpoint: URLS.TRACK });

    const options = convertDataForSelect(data, ["name", "name"]);

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
                    placeholder="Select a category"
                    options={category}
                />
                <CustomInput
                    name="winnerPrice"
                    label="Winning prize"
                    placeholder="$0.00"
                    type="number"
                    startContent={
                        <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">$</span>
                        </div>
                    }
                />
                <CustomInput
                    name="participationFee"
                    label="Participation prize"
                    placeholder="$0.00"
                    type="number"
                    startContent={
                        <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">$</span>
                        </div>
                    }
                />
                <CustomDateTimePicker name="startDate" withTime={false} label="Start Date" />
                <CustomDateTimePicker name="endDate" withTime={false} label="End Date" />
                <CustomSelect
                    name="level"
                    label="Level"
                    options={level}
                    placeholder="Select a level"
                />
                <CustomSelect
                    name="industry"
                    label="industry"
                    placeholder="Select a industry"
                    options={category}
                />
                <CustomMultiSelect
                    name="tags"
                    label="Tags (8 max)"
                    placeholder="Search for a tag"
                    options={skills}
                />
                <CustomMultiSelect
                    name="track"
                    label="Tracks"
                    placeholder="Select a track"
                    options={options}
                />
                <div className=" mt-4 w-full flex justify-end " >
                    <CustomButton type="submit" isLoading={isLoading} >Create Challenge</CustomButton>
                </div>
            </form>
        </FormikProvider>
    )
}