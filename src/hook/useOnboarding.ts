"use client"
import * as Yup from 'yup';
import { useFormik } from "formik";
import { IUserForm } from '@/helper/model/auth';
import { useRouter } from 'next/navigation';
import httpService from '@/helper/services/httpService';
import { addToast } from '@heroui/react';
import { useMutation } from '@tanstack/react-query';
import Cookies from "js-cookie";
import { AxiosError } from 'axios';

const useOnboarding = () => {

    const router = useRouter()
    const userId = Cookies.get("userid") as string;
    // let email = Cookies.get("email") as string;

    const updateUserInfo = useMutation({
        mutationFn: (data: IUserForm) => httpService.put(`/user/${userId}`, data),
        onError: (error: AxiosError) => {
            const message =
            (error?.response?.data as { message?: string })?.message ||
            "Something went wrong";
    
            addToast({
                title: "Error",
                description: message,
                color: "danger",
                timeout: 3000
            })
        },
        onSuccess: (data) => {

            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
                timeout: 3000
            }) 
            router.push("/dashboard")
        },
    });

    const formik = useFormik({
        initialValues: {
            fullName: "",
            about: "",
            profilePicture: "",
            track: "",
            interests: [],
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required("Required"),
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