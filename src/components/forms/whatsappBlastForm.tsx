"use client"
import { IEmailBlast, IWhatsAppBlast } from "@/helper/model/application"
import { FormikProps, FormikProvider } from "formik" 
import { CustomButton, CustomInput } from "../custom" 

interface IProp {
    formik: FormikProps<IWhatsAppBlast>,
    isLoading: boolean, 
}

export default function EmailBlastForm(
    {
        formik,
        isLoading, 
    }: IProp
) {  

    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className=" w-full flex flex-col gap-4 " > 
                <CustomInput
                    name="message"
                    label="Description"
                    textarea
                    placeholder=""
                />  
                <div className=" mt-4 w-full flex justify-end " >
                    <CustomButton type="submit" isLoading={isLoading} >{"Submit"}</CustomButton>
                </div>
            </form>
        </FormikProvider>
    )
}