"use client"
import * as Yup from 'yup';
import { useFormik } from "formik";
import { IUserForm } from '@/helper/model/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import httpService from '@/helper/services/httpService';
import { addToast } from "@heroui/toast";
import { useMutation } from '@tanstack/react-query'; 
import { AxiosError } from 'axios';
import { handleError } from '@/helper/utils/hanlderAxoisError';
import { STORAGE_KEYS } from '@/dal/storage/StorageKeys';
import StorageClass from '@/dal/storage/StorageClass';
import { isValidPhoneNumber } from 'react-phone-number-input';

const useOnboarding = () => {

    const router = useRouter()
    const userId = StorageClass.getValue<string>(STORAGE_KEYS.USERID, { isJSON: false }) as string;

    const query = useSearchParams();
    const challenge = query?.get('challenge') as string;
    // let email = Cookies.get("email") as string;

    const updateUserInfo = useMutation({
        mutationFn: (data: IUserForm) => httpService.put(`/user/${userId}`, data),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {

            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
                timeout: 3000
            })
            if (challenge) {
                router.push(`/dashboard/challenges/${challenge}`)
            } else {
                router.push("/dashboard")
            }
        },
    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            "phone":  "",
            // about: "",
            // profilePicture: "",
            // track: "",
            interests: [],
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("Required"),
            lastName: Yup.string().required("Required"),
            phone: Yup.string() 
            .required("Required")
            .test(
                "is-valid-phone",
                "Enter a valid phone number for the selected country",
                (value) => !value || isValidPhoneNumber(value) // ✅ only validate if user entered something
            ),
            // about: Yup.string().required("Required"),
            // track: Yup.string().required("Required"),
            interests: Yup.array().min(1, "Select at least one interest"),
        }),
        onSubmit: (values: IUserForm) => {
            updateUserInfo?.mutate(values)
        },
    });


    return {
        formik,
        updateUserInfo
    }
}

export default useOnboarding