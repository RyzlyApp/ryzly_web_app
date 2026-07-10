import { FormikProps, FormikProvider } from "formik";
import {
    CustomButton,
    CustomInput,
    CustomPhoneInput,
    CustomSelect,
    CustomStringArrayInput,
} from "../custom";
import CustomMultiSelect from "../custom/customMultipleSelect";
import { IInterest, ITrack } from "@/helper/model/interest";
import { URLS } from "@/helper/services/urls";
import { convertDataForSelect } from "@/helper/utils/convertDataForSelect";
import { useFetchData } from "@/hook/useFetchData";
import { ImagePicker, LoadingLayout } from "../shared";
import { IProfile, IUpdateProfile } from "@/helper/model/user";
import { Country } from "country-state-city";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";

interface IProps {
    formik: FormikProps<IUpdateProfile>;
    isLoading: boolean;
    image: File | null;
    setImage: (by: File | null) => void;
}

export default function UpdateUserInfo({
    formik,
    isLoading: loading,
    image,
    setImage,
}: IProps) {
    const { data = [], isLoading } = useFetchData<IInterest[]>({
        name: "interest",
        endpoint: URLS.INTEREST,
    });

    const { data: track = [], isLoading: loadingTrack } = useFetchData<
        ITrack[]
    >({ name: "track", endpoint: URLS.TRACK });
    const [userState] = useAtom(userAtom);

    const { data: user } = userState;

    const countries = Country.getAllCountries();
    const options = convertDataForSelect(data, ["name", "name"]);
    const trackOptions = convertDataForSelect(track, ["name", "name"]);
    const countryOptions = convertDataForSelect(countries, ["name", "name"]);

    return (
        <FormikProvider value={formik}>
            <LoadingLayout loading={isLoading || loadingTrack}>
                <form
                    onSubmit={formik.handleSubmit}
                    className=" w-full flex flex-col gap-4 "
                >
                    <ImagePicker
                        image={image}
                        setImage={setImage}
                        type="user"
                    />
                    {user?.userType !== "organization" && (
                        <div className=" w-full flex flex-col gap-4 ">
                            <CustomInput name="firstName" label="Firstname" />
                            <CustomInput name="lastName" label="Lastname" />
                            <CustomInput name="username" label="Username" />
                        </div>
                    )}
                    {user?.userType === "organization" && (
                        <div className=" w-full flex flex-col gap-4 ">
                            <CustomInput
                                name="companyName"
                                label="Company Name"
                            />
                        </div>
                    )}
                    {user?.userType === "organization" && (
                        <div className=" w-full flex flex-col gap-4 ">
                            <CustomInput
                                name="website"
                                label="Website"
                                type="url"
                            />
                        </div>
                    )}
                    {user?.userType !== "organization" && (
                        <CustomSelect
                            name="track"
                            label="Tracks"
                            options={trackOptions}
                        />
                    )}
                    
                    <CustomPhoneInput name="phone" label="Phone Number" />
                    {formik?.values.country && (
                        <CustomSelect
                            isDisabled={true}
                            name="country"
                            placeholder="Select Country"
                            label="Country"
                            options={countryOptions}
                        />
                    )}
                    {/* <CustomSelect isDisabled={true} name="country" placeholder="Select Country" label="Country" options={countryOptions} /> */}
                    <CustomMultiSelect
                        name="Interests"
                        label="Categories"
                        options={options}
                    />
                    <CustomStringArrayInput name="skills" label="Skills" />
                    <CustomInput textarea={true} name="about" label="About" />
                    <div className=" flex w-full justify-end ">
                        <CustomButton type="submit" isLoading={loading}>
                            Update
                        </CustomButton>
                    </div>
                </form>
            </LoadingLayout>
        </FormikProvider>
    );
}
