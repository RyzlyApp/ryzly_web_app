"use client"
import * as Yup from 'yup';
import { useFormik } from "formik";
import { addToast } from "@heroui/toast";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApplication, ICompetition, ITask } from '@/helper/model/application';
import { userAtom } from '@/helper/atom/user';
import { useAtom } from 'jotai';
import { useState } from 'react';
import httpService from '@/helper/services/httpService'; 
import { imageAtom } from '@/helper/atom/image';
import { useParams, useRouter } from 'next/navigation';

const useChallenge = (challengeID?: string)  => {

    const [userState] = useAtom(userAtom);

    const queryClient = useQueryClient()
    const param = useParams();
    const id = param.id;

    const { data: user } = userState;

    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)
    const [tab, setTab] = useState(0)


    const [image] = useAtom(imageAtom);

    const applyForCoach = useMutation({
        mutationFn: (data: IApplication) => httpService.post(`/application/${user?._id}`, data),
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

    const joinChallenge = useMutation({
        mutationFn: ( { data }: {data: string}) => httpService.post(`/challenge/join/${data}`),
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
            router.push(`/dashboard/challenges/${challengeID}`)
        },
    });

    const createChallenge = useMutation({
        mutationFn: (data: ICompetition) => httpService.post(`/challenge`, data),
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
            queryClient.invalidateQueries({ queryKey: ["challenge"] })
        },
    });

    const createTask = useMutation({
        mutationFn: (data: ITask) => httpService.post(`/task`, data),
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
            queryClient.invalidateQueries({ queryKey: ["challenge"] })
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

            const payload: ICompetition = { ...formikChallenge.values, thumbnail: data?.data?.data?.url}

            createChallenge.mutate(payload)

        }
    });



    const formik = useFormik({
        initialValues: {
            "expertise": "",
            "yearsOfExperience": "",
            "linkedInUrl": "",
            "portfolioUrl": "",
            "focusArea": ""
        },
        validationSchema: Yup.object({
            expertise: Yup.string().required("Expertise is required"),
            yearsOfExperience: Yup.number()
                .nullable()
                .min(0, "Must be at least 0")
                .required("Years of experience is required"),
            linkedInUrl: Yup.string()
                .url("Enter a valid LinkedIn URL")
                .required("LinkedIn URL is required"),
            portfolioUrl: Yup.string()
                .url("Enter a valid portfolio URL")
                .nullable(),
            focusArea: Yup.string().required("Focus area is required"),
        }),
        onSubmit: (data: IApplication) => {
            applyForCoach.mutate(data)
        },
    });

    const formikChallenge = useFormik<ICompetition>({
        initialValues: {
            thumbnail: "",
            isPublic: true,
            title: "",
            description: "",
            winnerPrice: "",
            participationFee: "",
            category: "",
            tags: [],
            level: "",
            startDate: "",
            endDate: "",
            industry: "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            description: Yup.string().min(10, "At least 10 characters").required("Description is required"),
            // thumbnail: Yup.string().url("Invalid URL").required("Thumbnail is required"),
            winnerPrice: Yup.number().min(0).required("Winner price is required"),
            participationFee: Yup.number().min(0).required("Participation fee is required"),
            category: Yup.string().required("Category is required"),
            tags: Yup.array().of(Yup.string()).min(1, "At least one tag required"),
            level: Yup.string().required("Level is required"),
            startDate: Yup.date().required("Start date is required"),
            endDate: Yup.date()
                .min(Yup.ref("startDate"), "End date cannot be before start date")
                .required("End date is required"),
            industry: Yup.string().required("Industry is required"),
        }),
        onSubmit: () => {

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

    const formikTask = useFormik<ITask>({
        initialValues: {
            "title": "",
            "description": "",
            "startDate": "",
            "endDate": "",
            "challengeID": id+""
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            description: Yup.string().min(10, "At least 10 characters").required("Description is required"),
            startDate: Yup.date().required("Start date is required"),
            endDate: Yup.date()
                .min(Yup.ref("startDate"), "End date cannot be before start date")
                .required("End date is required"),
            challengeID: Yup.string().required("challengeID is required"),
        }),
        onSubmit: (data) => {
            createTask.mutate(data)
        },
    });

    return {
        formik,
        formikChallenge,
        applyForCoach,
        createChallenge,
        isOpen,
        setIsOpen,
        tab,
        setTab,
        uploadImage,
        formikTask,
        createTask,
        joinChallenge
    }
}

export default useChallenge