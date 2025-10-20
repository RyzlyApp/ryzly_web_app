"use client"
import * as Yup from 'yup';
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useAtom } from "jotai";
import { useParams, useRouter } from "next/navigation";
import { imageAtom } from '@/helper/atom/image';
import httpService from '@/helper/services/httpService';
import { addToast } from '@heroui/react';
import { AxiosError } from 'axios';
import { IGrade, IPortfolio, ISubmission } from '@/helper/model/challenge';
import { useState } from 'react';
// import { IProfile } from '@/helper/model/user';


const useSubmitChallenge = (submissionID?: string, userID?: string, editId?: string, portfolio?: boolean) => {

    // const queryClient = useQueryClient()

    const router = useRouter()
    const param = useParams();
    const id = param.id as string;
    const [isOpen, setIsOpen] = useState(false)
    // const searchParams = useSearchParams();
    // const last = searchParams.get("last"); 
    const slug = param.slug as string;

    const [image] = useAtom(imageAtom);


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

            const payload: ISubmission = { ...formikSubmit.values, file: data?.data?.data?.url }
            const payloadPro: IPortfolio = {
                links: [
                    {
                        name: formikSubmit?.values.link,
                        link: formikSubmit?.values.link
                    }
                ],
                tools: [formikSubmit?.values.tools],
                title: formikSubmit?.values.title,
                file: data?.data?.data?.url,
                description: formikSubmit?.values.description,
                challengeID: formikSubmit?.values.challengeID,
                taskID: formikSubmit?.values.taskID,
                user: userID + ""
            }

            if(editId && portfolio) { 
                editPortfolio.mutate(payloadPro)
                return
            } else if (portfolio) {
                createPortfolio.mutate(payloadPro)
                return
            } else {
                submitChallenge.mutate(payload)
            }


        }
    });

    const submitChallenge = useMutation({
        mutationFn: (data: ISubmission) => httpService.post(`/submission`, data),
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
            router.push(`/dashboard/challenges/${id}/tasks/${slug}`)
        },
    });
    // /portfolio/{id}
    const createPortfolio = useMutation({
        mutationFn: (data: IPortfolio) => httpService.post(`/portfolio`, data),
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
        onSuccess: () => {
            setIsOpen(false)
        }
    });

    const editPortfolio = useMutation({
        mutationFn: (data: IPortfolio) => httpService.patch(`/portfolio/${editId}`, data),
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
        onSuccess: () => {
            setIsOpen(false)
        }
    });

    const gradeChallenge = useMutation({
        mutationFn: (data: IGrade) => httpService.post(`/grade`, data),
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
            router.push(`/dashboard/challenges/${id}/tasks/${slug}`)
        },
    });



    const gradeChallengeEdit = useMutation({
        mutationFn: (data: IGrade) => httpService.patch(`/grade/${editId}`, data),
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
            router.push(`/dashboard/challenges/${id}/tasks/${slug}`)
        },
    });


    const formikGrade = useFormik<IGrade>({
        initialValues: {
            "score": "",
            "feedBack": "",
            "challengeID": id,
            "submissionID": submissionID as string,
            "taskID": slug,
            "owner": userID as string
        },
        validationSchema: Yup.object({
            score: Yup.string().required("Score is required"),
            feedBack: Yup.string().min(10, "At least 10 characters").required("FeedBack is required"),
            challengeID: Yup.string().required("ChallengeID is required"),
            submissionID: Yup.string().required("SubmissionID is required"),
            taskID: Yup.string().required("TaskID is required"),
            owner: Yup.string().required("Owner is required"),
        }),
        onSubmit: (data) => {
            if (editId) {
                gradeChallengeEdit.mutate(data)
            } else {
                gradeChallenge.mutate(data)
            }
        },
    });

    const formikSubmit = useFormik<ISubmission>({
        initialValues: {
            "file": "",
            "title": "",
            "description": "",
            "link": "",
            "link2": "",
            "challengeID": id,
            "taskID": slug,
            "tools": ""
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            description: Yup.string().min(10, "At least 10 characters").required("Description is required"),
            // challengeID: Yup.string().required("challengeID is required"),
            link: Yup.string().required("Link is required"),
            // link2: Yup.string().required("link2 is required"),
            tools: Yup.string().required("Tools is required"),
        }),
        onSubmit: (data) => {
            if (image) {
                const formdata = new FormData()

                formdata.append("file", image)

                uploadImage.mutate(formdata)
            } if (editId && portfolio) {
                const payload: IPortfolio = {
                    links: [
                        {
                            name: data.link,
                            link: data.link
                        }
                    ],
                    tools: [data.tools],
                    title: data.title, 
                    description: data.description, 
                    challengeID: formikSubmit?.values.challengeID,
                    taskID: formikSubmit?.values.taskID,
                    user: userID + ""
                }
                editPortfolio.mutate(payload)
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


    const isLoading = (uploadImage.isPending || gradeChallenge.isPending || submitChallenge.isPending || createPortfolio?.isPending || editPortfolio?.isPending)

    return {
        formikSubmit,
        formikGrade,
        isLoading,
        createPortfolio,
        isOpen,
        setIsOpen
    }
}

export default useSubmitChallenge