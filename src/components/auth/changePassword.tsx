"use client"
import useAuth from "@/hook/useAuth";
import { FormikProvider } from "formik";
import { CustomInput, CustomButton } from "../custom";

export default function ChangePassword() {

    const { formik } = useAuth()

    return (

        <FormikProvider value={formik}>
            <div className=" w-full max-w-[580px] shadow-2xs bg-white items-center rounded-3xl p-[40px] flex flex-col gap-6 " >
                <p className=" text-3xl font-bold " >Create a new password</p>
                <div className=" w-full flex flex-col gap-4 " >
                    <CustomInput name="email" label="Create new password" placeholder="Enter password" />
                    <CustomInput name="email" label="Confirm password" placeholder="Confirm password" />
                </div>
                <CustomButton variant="primary" fullWidth={true} size="lg" >
                    Log In
                </CustomButton>
            </div>
        </FormikProvider>
    )
}