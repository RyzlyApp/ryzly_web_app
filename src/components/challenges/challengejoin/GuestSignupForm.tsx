/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikProvider } from "formik";
import { CustomButton, CustomInput } from "@/components/custom";

interface GuestSignupFormProps {
    formik: any;
    isLoading: boolean;
}

export default function GuestSignupForm({
    formik,
    isLoading,
}: GuestSignupFormProps) {
    return (
        <FormikProvider value={formik}>
            <form
                onSubmit={formik.handleSubmit}
                className=" w-full gap-4 pb-5 flex flex-col "
            >
                <p className=" text-success-900 text-2xl font-bold ">
                    Enter Your Email
                </p>

                <div className="w-full flex flex-col gap-4">
                    <CustomInput
                        name="firstName"
                        label="FirstName"
                        placeholder="Enter your FirstName"
                        type="text"
                    />
                    <CustomInput
                        name="lastName"
                        label="LastName"
                        placeholder="Enter your LastName"
                        type="text"
                    />
                    <CustomInput
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                    />
                </div>

                <CustomButton
                    isLoading={isLoading}
                    variant="primary"
                    fullWidth
                    size="lg"
                    type="submit"
                >
                    Continue
                </CustomButton>
            </form>
        </FormikProvider>
    );
}
