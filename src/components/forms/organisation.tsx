import { FormikProps, FormikProvider } from "formik";
import { CustomButton, CustomInput, CustomSelect } from "../custom"; 
import { ImagePicker, LoadingLayout } from "../shared";
import { IOrganisation } from "@/helper/model/user"; 
import { useFetchData } from "@/hook/useFetchData";
import { IIndustry } from "@/helper/model/interest";
import { URLS } from "@/helper/services/urls";
import { convertDataForSelect } from "@/helper/utils/convertDataForSelect";

interface IProps {
    formik: FormikProps<IOrganisation>;
    isLoading: boolean;
    image: File | null;
    setImage: (by: File | null) => void;
}

export default function UpdateUserInfo(
    { formik, isLoading: loading, image, setImage }: IProps
) {


    const { data: industry = [], isLoading: loadingindustry } = useFetchData<IIndustry[]>({ name: "industry", endpoint: URLS.INDUSTRY });

    const industryoptions = convertDataForSelect(industry, ["name", "_id"]); 

    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className=" w-full flex flex-col gap-4 " >
                <ImagePicker image={image} setImage={setImage} type="organisation" />
                <CustomInput name="name" label="Name" />
                <LoadingLayout loading={loadingindustry} >
                    <CustomSelect
                        name="industry"
                        label="Industry"
                        placeholder="Select a industry"
                        options={industryoptions}
                    />
                </LoadingLayout>
                <CustomInput name="email" type="email" label="email" />
                <CustomInput name="website" label="Website" /> 
                <div className=" flex w-full justify-end " >
                    <CustomButton type="submit" isLoading={loading} >Create</CustomButton>
                </div>
            </form>
        </FormikProvider>
    )
}