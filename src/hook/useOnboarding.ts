"use client";

import { useMemo } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { IUserForm } from "@/helper/model/auth";
import { useRouter, useSearchParams } from "next/navigation";
import httpService from "@/helper/services/httpService";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { handleError } from "@/helper/utils/hanlderAxoisError";
import { STORAGE_KEYS } from "@/dal/storage/StorageKeys";
import StorageClass from "@/dal/storage/StorageClass";
import { userAtom } from "@/helper/atom/user";
import { useAtom } from "jotai";
import { removeEmptyValues } from "@/helper/services/removeEmptyValues";

const useOnboarding = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [userState] = useAtom(userAtom);

    const userId = StorageClass.getValue<string>(STORAGE_KEYS.USERID, {
        isJSON: false,
    }) as string;

    const challenge = searchParams.get("challenge");

    const userSchema = useMemo(() => {
        // const isIndividual =
        //     userState.data?.userType === "coach" ||
        //     userState.data?.userType === "learner";

        // const isOrganization = userState.data?.userType === "organization";

        return Yup.object({
            userType: Yup.string()
                .oneOf(["organization", "coach", "learner"])
                .required("User type is required"),

            firstName: Yup.string().when("userType", {
                is: (item: string) =>
                    item === "coach" ||
                    item === "learner",
                then: (schema) => schema.required("First name is required"),
                otherwise: (schema) => schema.notRequired(),
            }),

            lastName: Yup.string().when("userType", {
                is: (item: string) =>
                    item === "coach" ||
                    item === "learner",
                then: (schema) => schema.required("Last name is required"),
                otherwise: (schema) => schema.notRequired(),
            }),

            companyName: Yup.string().when("userType", {
                is: "organization",
                then: (schema) => schema.required("Company name is required"),
                otherwise: (schema) => schema.notRequired(),
            }),
            phone: Yup.string().required("Phone number is required"),

            about: Yup.string().optional(),

            profilePicture: Yup.string().optional(),

            track: Yup.string().optional(),

            Interests: Yup.array()
                .of(Yup.string())
                .min(1, "Select at least one interest")
                .required("Select at least one interest"),
        });
    }, [userState.data?.userType]);

    const updateUserInfo = useMutation({
        mutationFn: (data: any) => httpService.put(`/user/${userId}`, data),

        onSuccess: ({ data }) => {
            addToast({
                title: "Success",
                description: data.message,
                color: "success",
                timeout: 3000,
            });

            router.push(
                challenge ? `/dashboard/challenges/${challenge}` : "/dashboard",
            );
        },

        onError: (error: AxiosError) => {
            handleError(error);
        },
    });

    const formik = useFormik<IUserForm>({
        enableReinitialize: true,
        initialValues: {
            firstName: "",
            lastName: "",
            companyName: "",
            about: "",
            profilePicture: "",
            phone: "",
            track: "",
            Interests: [],
            userType: "",
        } as IUserForm,

        validationSchema: userSchema,

        onSubmit: (values: any) => {
            const obj = removeEmptyValues(values);
            updateUserInfo.mutate(obj);
        },
    });

    return {
        formik,
        updateUserInfo,
    };
};

export default useOnboarding;
