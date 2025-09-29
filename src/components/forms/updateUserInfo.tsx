import { FormikProps, FormikProvider } from "formik";
import { CustomButton, CustomCountryPicker, CustomInput, CustomPhoneInput, CustomSelect, CustomStringArrayInput } from "../custom";
import CustomMultiSelect from "../custom/customMultipleSelect";
import { IInterest, ITrack } from "@/helper/model/interest";
import { URLS } from "@/helper/services/urls";
import { convertDataForSelect } from "@/helper/utils/convertDataForSelect";
import { useFetchData } from "@/hook/useFetchData";
import { ImagePicker, LoadingLayout } from "../shared";
import { IProfile } from "@/helper/model/user";
import { Country } from "country-state-city";

interface IProps {
    formik: FormikProps<IProfile>;
    isLoading: boolean
}

export default function UpdateUserInfo(
    { formik, isLoading: loading }: IProps
) {

    const { data = [], isLoading } = useFetchData<IInterest[]>({ name: "interest", endpoint: URLS.INTEREST });

    const { data: track = [], isLoading: loadingTrack } = useFetchData<ITrack[]>({ name: "track", endpoint: URLS.TRACK, });

    const countries = Country.getAllCountries();
    const options = convertDataForSelect(data, ["name", "name"]);
    const trackOptions = convertDataForSelect(track, ["name", "name"]);
    const countryOptions = convertDataForSelect(countries, ["name", "name"]);

    return (
        <FormikProvider value={formik}>
            <LoadingLayout loading={isLoading || loadingTrack} >
                <form onSubmit={formik.handleSubmit} className=" w-full flex flex-col gap-4 " >
                    <ImagePicker type="user" />
                    <CustomInput name="fullName" label="FullName" />
                    <CustomInput name="username" label="Username" />
                    <CustomSelect name="track" label="Tracks" options={trackOptions} />
                    <CustomPhoneInput name="phone" label="Phone Number" />
                    <CustomSelect name="country" placeholder="Select Country" label="Country" options={countryOptions} /> 
                    <CustomMultiSelect name="interets" label="Interets" options={options} /> 
                    <CustomStringArrayInput name="skills" label="Skills" />
                    <CustomInput textarea={true} name="about" label="About" />
                    <div className=" flex w-full justify-end " >
                        <CustomButton type="submit" isLoading={loading} >Update</CustomButton>
                    </div>
                </form>
            </LoadingLayout>
        </FormikProvider>
    )
}