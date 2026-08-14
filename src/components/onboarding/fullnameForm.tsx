"use client";

import { IUserForm } from "@/helper/model/auth";
import {
    CustomButton,
    CustomInput,
    CustomImage,
    CustomPhoneInput,
} from "../custom";
import { Form, FormikProps } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { IUser } from "@/helper/model/user";

export default function FullNameForm({
    formik,
}: {
    formik: FormikProps<IUserForm>;
    user: IUser;
}) {
    const router = useRouter();
    const query = useSearchParams();
    const challenge = query?.get("challenge") as string;

    const clickHandler = () => {
        if (
            (formik?.values?.firstName && formik?.values?.lastName && formik.values.phone) ||
            (formik?.values?.companyName && formik.values.phone)
        ) {
            router.push(
                `/auth/onboarding?type=project${challenge ? `&challenge=${challenge}` : ""}`,
            );
        } else {
            formik?.handleSubmit();
        }
    };

    return (
        <Form className="w-full flex flex-col items-center justify-center gap-10">
            <div className="w-full flex flex-col gap-3 items-center">
                <div className="w-10 h-10">
                    <CustomImage
                        src="/images/blue.png"
                        alt="blue"
                        fillContainer
                        className="rounded-full"
                    />
                </div>
                <h2 className="text-violet-300 lg:text-base text-xs ">Hey!</h2>
                <h1 className="text-2xl lg:text-4xl font-bold">{`Let's get to know you.`}</h1>
            </div>

            <div className="w-full max-w-[500px] flex flex-col gap-4">
                {formik?.values?.userType !== "organization" && (
                    <div className=" flex flex-col gap-4 ">
                        <CustomInput
                            placeholder="Enter your First name"
                            label="First name?"
                            name="firstName"
                        />
                        <CustomInput
                            placeholder="Enter your Last name"
                            label="Last Name"
                            name="lastName"
                        />
                    </div>
                )}
                {formik?.values?.userType === "organization" && (
                    <div className=" flex flex-col gap-4 ">
                        <CustomInput
                            placeholder="Enter your Company name"
                            label="Company name?"
                            name="companyName"
                        />
                        <CustomInput
                            name="website"
                            label="Website"
                            type="url"
                        />
                    </div>
                )}
                <CustomPhoneInput name="phone" label="Phone Number" />
            </div>

            <div className="w-full flex justify-between items-center">
                <CustomButton
                    variant="secondary"
                    type="button"
                    onClick={() => router.back()}
                >
                    Back
                </CustomButton>
                <CustomButton
                    variant="primary"
                    onClick={() => clickHandler()}
                    // isLoading={formik.isSubmitting}
                >
                    Continue
                </CustomButton>
            </div>
        </Form>
    );
}
