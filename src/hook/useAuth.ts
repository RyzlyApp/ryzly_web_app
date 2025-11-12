"use client"
import * as Yup from 'yup';
import { useFormik } from "formik";
import { addToast } from "@heroui/toast";
import { unsecureHttpService } from '@/helper/services/httpService';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { IAuth, ILogin } from '@/helper/model/auth';
import Cookies from "js-cookie";
import { AxiosError } from 'axios';
import { useState } from 'react';

const useAuth = () => {

    const router = useRouter()
    const token = Cookies.get("accesstoken") as string;

    const [ isOpen, setIsOpen ] = useState(false)

    const loginMutation = useMutation({
        mutationFn: (data: {
            email: string
        }) => unsecureHttpService.post(`/user-auth/login`, data),
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

            console.log(data);

            router.push(`/auth/verify?userId=${data?.data?.data?.userId}&email=${formik?.values?.email}`)


            Cookies.set("userid", data?.data?.data?.userId);
            localStorage.setItem("userid", data?.data?.data?.userId);
            Cookies.set("email", formik?.values?.email);
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
        },
    });

    const signupMutation = useMutation({
        mutationFn: (data: {
            email: string
        }) => unsecureHttpService.post(`/user-auth/create-account`, data),
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
            })
            router.push(`/auth/verify?userId=${data?.data?.data?.userId}&email=${formikSignup?.values?.email}`)
            Cookies.set("userid", data?.data?.data?.userId);
            localStorage.setItem("userid", data?.data?.data?.userId);
            Cookies.set("email", formikSignup?.values?.email);
        },
    });

    const waitListMutation = useMutation({
        mutationFn: (data: {
            email: string,
            name: string
        }) => unsecureHttpService.post(`/waitlist`, data),
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

            formikWaitList.resetForm()
            // setIsOpen(false)
        },
    });

    const userDetails = useMutation({
        mutationFn: (data?: string) => unsecureHttpService.get("/user", {
            headers: {
                Authorization: `Bearer ${data ?? token}`,
            },
        }),
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

            if (data?.data?.data?.fullName) {
                router.push("/dashboard")
            } else {
                router.push("/auth/onboarding")
            }
        },
    });

    const verifyMutation = useMutation({
        mutationFn: (data: {
            userId: string,
            token: string
        }) => unsecureHttpService.post(`/user-auth/verify-token/${data?.userId}/${data?.token}`, data),
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

            localStorage.setItem("accesstoken", data?.data?.data?.token);
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
            userDetails.mutate(data?.data?.data?.token)

        },
    });


    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Required"),
        }),
        onSubmit: (data: ILogin) => {
            loginMutation.mutate(data)
        },
    });

    const formikSignup = useFormik({
        initialValues: {
            email: "",
            confirmemail: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Required"),
            confirmemail: Yup.string()
                .oneOf([Yup.ref("email")], "Emails must match")
                .required("Required"),
        }),
        onSubmit: (data: IAuth) => {
            signupMutation.mutate({ email: data.email })
        },
    });



    const formikWaitList = useFormik({
        initialValues: {
            name: "",
            email: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Required"),
            name: Yup.string()
                .required("Required"),
        }),
        onSubmit: (data) => {
            waitListMutation.mutate(data)
        },
    });

    return {
        formik,
        formikSignup,
        loginMutation,
        signupMutation,
        verifyMutation,
        waitListMutation,
        userDetails,
        formikWaitList,
        isOpen
    }
}

export default useAuth