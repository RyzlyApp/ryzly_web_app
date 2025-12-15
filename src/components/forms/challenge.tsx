"use client"
import { ICompetition } from "@/helper/model/application"
import { FormikProps, FormikProvider } from "formik"
import { ImagePicker, LoadingLayout } from "../shared"
import { CustomButton, CustomEditor, CustomInput, CustomSelect, CustomStringArrayInput } from "../custom"
import CustomMultiSelect from "../custom/customMultipleSelect"
import CustomDateTimePicker from "../custom/customDatePicker"
import { URLS } from "@/helper/services/urls"
import { convertDataForSelect } from "@/helper/utils/convertDataForSelect"
import { useFetchData } from "@/hook/useFetchData"
import { IIndustry, ILevel, ITrack } from "@/helper/model/interest"
import { IChallenge } from "@/helper/model/challenge"

interface IProp {
    formik: FormikProps<ICompetition>,
    isLoading: boolean,
    preview?: string,
    challenge?: IChallenge
    user?: number,
    image: File | null;
    setImage: (by: File | null) => void;
}

export default function ChallengeForm(
    {
        formik,
        isLoading,
        preview,
        challenge,
        user,
        image,
        setImage
    }: IProp
) {

    const { data = [], isLoading: loading } = useFetchData<ITrack[]>({ name: "interest", endpoint: URLS.TRACK });

    const { data: level = [], isLoading: loadinglevel } = useFetchData<ILevel[]>({ name: "level", endpoint: URLS.LEVEL });

    const { data: industry = [], isLoading: loadingindustry } = useFetchData<IIndustry[]>({ name: "industry", endpoint: URLS.INDUSTRY });

    const options = convertDataForSelect(data, ["name", "_id"]);
    const leveloptions = convertDataForSelect(level, ["name", "_id"]);
    const industryoptions = convertDataForSelect(industry, ["name", "_id"]);

    console.log(user);
    

    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className=" w-full flex flex-col gap-4 " >
                <ImagePicker image={image} setImage={setImage} preview={preview} />
                <CustomInput
                    name="title"
                    label="Title"
                    placeholder="What's the title of the challenge?"
                /> 

                <CustomEditor
                    name="description"
                    label="Description"
                    placeholder="Briefly describe the challenge"
                />
                <CustomInput
                    name="winnerPrice"
                    label="Winning prize"
                    placeholder="0.00"
                    type="number"
                    disabled={(challenge?._id) ? true : Number(user) > 0 ? true : false}
                    startContent={
                        <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">₦</span>
                        </div>
                    }
                />
                <CustomInput
                    name="participationFee"
                    label="Participation fee"
                    placeholder="0.00"
                    type="number"
                    startContent={
                        <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">₦</span>
                        </div>
                    }
                />

                <CustomDateTimePicker name="startDate" disabled={Number(user) > 0 ? true : false } withTime={false} label="Start Date" />
                <CustomDateTimePicker name="endDate" disabled={Number(user) > 0 ? true : false } withTime={false} label="End Date" />
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
                <CustomStringArrayInput name="tags" label="Tags (5 max)" placeholder="Tags (5 max)" />
                <LoadingLayout loading={loading} >
                    <CustomMultiSelect
                        name="tracks"
                        single={true}
                        label="Tracks"
                        placeholder="Select a track"
                        options={options}
                    />
                </LoadingLayout>
                <div className=" mt-4 w-full flex justify-end " >
                    <CustomButton type="submit" isLoading={isLoading} >{preview ? "Update Challenge" : "Create Challenge"}</CustomButton>
                </div>
            </form>
        </FormikProvider>
    )
}