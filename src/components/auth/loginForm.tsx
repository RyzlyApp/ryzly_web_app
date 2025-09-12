"use client"
import useAuth from "@/hook/useAuth"
import { FormikProvider } from "formik"
import { CustomButton, CustomInput } from "../custom"

export default function LoginForm() {

    const { formik } = useAuth()

    return (
        <FormikProvider value={formik}>
            <div className=" w-full max-w-[580px] shadow-2xs bg-white items-center rounded-3xl p-[40px] flex flex-col gap-6 " >
                <p className=" text-3xl font-bold " >Login to your account</p>
                <div className=" w-full flex flex-col gap-4 " >
                    <CustomInput name="email" label="Email" placeholder="Enter your mail" />
                    <CustomInput name="email" label="Email address" placeholder="Confirm email address" />
                </div>
                <CustomButton variant="primary" fullWidth={true} size="lg" >
                    Log In
                </CustomButton>
                <div className=" flex w-full justify-center " >
                    <p className=" text-sm " >Or</p>
                </div>
                <div className=" w-full flex flex-col gap-4 " >
                    <CustomButton variant="outline" size="lg" >
                        <div className=" flex gap-2 items-center " >
                            <div className=" w-6 h-6 " >
                                <img className=" w-full h-full " src={"/images/google.png"} alt="blue" />
                            </div>
                            Continue with Google
                        </div>
                    </CustomButton>
                    <CustomButton variant="outline" size="lg" >
                        <div className=" flex gap-2 items-center " >
                            <div className=" w-6 h-6 " >
                                <img className=" w-full h-full " src={"/images/linkedin.png"} alt="blue" />
                            </div>
                            Continue with LinkedIn
                        </div>
                    </CustomButton>
                </div>
            </div>
        </FormikProvider>
    )
}