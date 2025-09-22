"use client"
// import * as Yup from 'yup';
import { useFormik } from "formik";
import { addToast } from "@heroui/toast";
import { useMutation } from '@tanstack/react-query';
import httpService from '@/helper/services/httpService';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { IOverview } from '@/helper/model/application';
import { useState } from 'react';

const useOverview = () => {

    const param = useParams();
    const id = param.id;
    const [isOpen, setIsOpen] = useState(false)
    const [tab, setTab] = useState("")

    const overviewMutate = useMutation({
        mutationFn: (data: IOverview) => httpService.post(`/overview`, data),
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
        },
    });

    const addCoachMutate = useMutation({
        mutationFn: (data: {
            "challengeID": string,
            "user": string
        }) => httpService.post(`/coach`, data),
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
        },
    });

    const addParticipantMutate = useMutation({
        mutationFn: (data: {
            "challengeID": string,
            "user": string
        }) => httpService.post(`/participant`, data),
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
        },
    });

    const formik = useFormik<IOverview>({
        initialValues: {
            title: "",
            subTittle: "",
            about: "testtin this testing this testintg this",
            includes: [],
            requirements: [],
            whoIs: [],
            challengeID: id + ""
        },
        // validationSchema: Yup.object({
        //     title: Yup.string().required("Title is required"), 
        //     challengeID: Yup.string().required("challengeID is required"),
        // }),
        onSubmit: (data) => {
            overviewMutate.mutate(data)
        },
    });

    return {
        formik,
        overviewMutate,
        isOpen,
        setIsOpen,
        addParticipantMutate,
        addCoachMutate,
        tab,
        setTab,
        id
    }
}

export default useOverview
