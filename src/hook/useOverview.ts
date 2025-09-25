"use client"
import * as Yup from 'yup';
import { useFormik } from "formik";
import { addToast } from "@heroui/toast";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import httpService from '@/helper/services/httpService';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { IOverview, IResource } from '@/helper/model/application';
import { useState } from 'react';
import { IChallenge } from "@/helper/model/challenge";
import { imageAtom } from '@/helper/atom/image';
import { useAtom } from 'jotai';

const useOverview = (data?: IChallenge) => {

    const param = useParams();
    const id = param.id;
    const [isOpen, setIsOpen] = useState(false)
    const [tab, setTab] = useState("")
    const queryClient = useQueryClient()
    const [ indexData, setIndexData ] = useState(-1)

    const [image] = useAtom(imageAtom);

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
            queryClient.invalidateQueries({queryKey: ["challengedetails"]})
            setTab("")
            setIndexData(-1)
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


    // Upload Image
    const uploadImage = useMutation({
        mutationFn: (data: FormData) => httpService.post("/upload/file", data,
            {
                headers: {
                    'Content-Type': "multipart/form-data",
                }
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

            const payload: IResource = { ...formikResource.values, file: data?.data?.data?.url}

            addResourceMutate.mutate(payload)

        }
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


    const addResourceMutate = useMutation({
        mutationFn: (data: IResource) => httpService.post(`/resource`, data),
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

            setIsOpen(false)
        },
    });

    const formik = useFormik<IOverview>({
        initialValues: {
            title: "",
            subTittle: "",
            about: "testtesttesttesttesttesttesttesttesttesttesttest",
            includes: data?.overview?.includes ?? [],
            requirements: data?.overview?.requirements ?? [],
            whoIs: data?.overview?.whoIs ?? [],
            challengeID: id + ""
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"), 
            challengeID: Yup.string().required("challengeID is required"),
        }),
        onSubmit: (data) => {
            overviewMutate.mutate(data)
        },
    });


    const formikResource = useFormik<IResource>({
        initialValues: {
            file: "",
            description: "", 
            challengeID: id + ""
        },
        validationSchema: Yup.object({
            file: Yup.string().required("File is required"), 
            description: Yup.string().required("Description is required"),
            challengeID: Yup.string().required("challengeID is required"),
        }),
        onSubmit: (data) => {
            
            if (image) {

                const formdata = new FormData()

                formdata.append("file", image)

                uploadImage.mutate(formdata)
            } else {
                addToast({
                    title: "Error",
                    description: "Image is required",
                    color: "danger",
                    timeout: 3000
                })
            }
        },
    });

    return {
        formik,
        formikResource,
        addResourceMutate,
        overviewMutate,
        isOpen,
        setIsOpen,
        addParticipantMutate,
        addCoachMutate,
        tab,
        setTab,
        id,
        indexData, 
        setIndexData
    }
}

export default useOverview
