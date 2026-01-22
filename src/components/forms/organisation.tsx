import { FormikProps, FormikProvider } from "formik";
import { CustomButton, CustomInput } from "../custom"; 
import { ImagePicker } from "../shared";
import { IOrganisation } from "@/helper/model/user"; 

interface IProps {
    formik: FormikProps<IOrganisation>;
    isLoading: boolean;
    image: File | null;
    setImage: (by: File | null) => void;
}

export default function UpdateUserInfo(
    { formik, isLoading: loading, image, setImage }: IProps
) {

    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className=" w-full flex flex-col gap-4 " >
                <ImagePicker image={image} setImage={setImage} type="organisation" />
                <CustomInput name="name" label="Name" />
                <CustomInput name="industry" label="Industry" />
                <CustomInput name="email" type="email" label="email" />
                <CustomInput name="website" label="Website" />
                <CustomInput name="slug" label="Slug" />
                <div className=" flex w-full justify-end " >
                    <CustomButton type="submit" isLoading={loading} >Create</CustomButton>
                </div>
            </form>
        </FormikProvider>
    )
}