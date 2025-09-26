"use client"
import useAuth from "@/hook/useAuth";
import { FormikProvider } from "formik";
import { CustomInput, CustomButton } from "../custom";

export default function ForgotPassword() {

    const { formik } = useAuth()

    return (

        <FormikProvider value={formik}>
            <div className=" w-full max-w-[580px] shadow-2xs bg-white items-center rounded-3xl p-[40px] flex flex-col gap-6 " >
                <p className=" text-3xl font-bold " >Forgot your password?</p>
                <CustomInput name="email" label="Email" placeholder="Enter your mail" />
                <CustomButton variant="primary" fullWidth={true} size="lg" >
                    Log In
                </CustomButton>
            </div>
        </FormikProvider>
    )
}