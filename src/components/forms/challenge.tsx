"use client"
import { ICompetition } from "@/helper/model/application"
import { FormikProps, FormikProvider } from "formik"
import { ImagePicker, LoadingLayout } from "../shared"
import { CustomButton, CustomInput, CustomSelect, CustomStringArrayInput } from "../custom"
import CustomMultiSelect from "../custom/customMultipleSelect"
import CustomDateTimePicker from "../custom/customDatePicker"
import { URLS } from "@/helper/services/urls"
import { convertDataForSelect } from "@/helper/utils/convertDataForSelect"
import { useFetchData } from "@/hook/useFetchData"
import { IIndustry, ILevel, ITrack } from "@/helper/model/interest"

interface IProp {
    formik: FormikProps<ICompetition>,
    isLoading: boolean,
    preview?: string
}

export default function ChallengeForm(
    {
        formik,
        isLoading,
        preview
    }: IProp
) {

    const { data = [], isLoading: loading } = useFetchData<ITrack[]>({ name: "interest", endpoint: URLS.TRACK });

    const { data: level = [], isLoading: loadinglevel } = useFetchData<ILevel[]>({ name: "level", endpoint: URLS.LEVEL });

    const { data: industry = [], isLoading: loadingindustry } = useFetchData<IIndustry[]>({ name: "industry", endpoint: URLS.INDUSTRY });

    const options = convertDataForSelect(data, ["name", "_id"]);
    const leveloptions = convertDataForSelect(level, ["name", "_id"]);
    const industryoptions = convertDataForSelect(industry, ["name", "_id"]);

    console.log(formik.values);


    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className=" w-full flex flex-col gap-4 " >
                <ImagePicker preview={preview} />
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
                <LoadingLayout loading={loadinglevel} >
                    <CustomSelect
                        name="level"
                        label="Level"
                        options={leveloptions}
                        placeholder="Select a level"
                    />
                </LoadingLayout>

                <LoadingLayout loading={loadingindustry} >
                    <CustomSelect
                        name="industry"
                        label="industry"
                        placeholder="Select a industry"
                        options={industryoptions}
                    />
                </LoadingLayout>
                <CustomStringArrayInput name="tags" label="Tags (8 max)" placeholder="Tags (5 max)" />
                <LoadingLayout loading={loading} >
                    <CustomMultiSelect
                        name="tracks"
                        label="Tracks"
                        placeholder="Select a track"
                        options={options}
                    />
                </LoadingLayout>
                <div className=" mt-4 w-full flex justify-end " >
                    <CustomButton type="submit" isLoading={isLoading} >{preview ? "Edit Challenge" : "Create Challenge"}</CustomButton>
                </div>
            </form>
        </FormikProvider>
    )
}