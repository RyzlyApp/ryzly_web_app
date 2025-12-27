"use client"
import * as Yup from 'yup';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import httpService from '@/helper/services/httpService';
import { addToast } from "@heroui/toast";
import { AxiosError } from 'axios';
import { IGrade, IPortfolio, ISubmission } from '@/helper/model/challenge';
import { useState } from 'react';
import { handleError } from '@/helper/utils/hanlderAxoisError';
// import { IProfile } from '@/helper/model/user';


const useSubmitChallenge = (submissionID?: string, userID?: string, editId?: string, portfolio?: boolean, next?: boolean) => {

    // const queryClient = useQueryClient()


    const router = useRouter()
    const param = useParams();
    const id = param.id as string;
    const [isOpen, setIsOpen] = useState(false)
    const queryClient = useQueryClient()

    const [portID, setPortID] = useState("")
    // const searchParams = useSearchParams();
    // const last = searchParams.get("last"); 
    const slug = param.slug as string;

    // const [image] = useAtom(imageAtom);
    const [image, setImage] = useState<File | null>(null);


    // Upload Image
    const uploadImage = useMutation({
        mutationFn: (data: FormData) => httpService.post("/upload/file", data,
            {
                headers: {
                    'Content-Type': "multipart/form-data",
                }
            }),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {

            const payload: ISubmission = { ...formikSubmit.values, file: data?.data?.data?.url }
            const payloadPro: IPortfolio = {
                links: formikPortifolio?.values?.links,
                tools: formikPortifolio?.values.tools,
                title: formikPortifolio?.values.title,
                file: data?.data?.data?.url,
                description: formikPortifolio?.values.description,
                challengeID: formikPortifolio?.values.challengeID, 
            }

            if (editId && portfolio) {
                editPortfolio.mutate(payloadPro)
                return
            } else if (portfolio) {
                createPortfolio.mutate(payloadPro)
                return
            } else if(submissionID && !portfolio) {
                submitChallengeEdit.mutate({
                    id: submissionID,
                    payload: payload
                })
            } else {
                submitChallenge.mutate(payload)
            }


        }
    });

    const submitChallenge = useMutation({
        mutationFn: (data: ISubmission) => httpService.post(`/submission`, data),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
            router.push(`/dashboard/challenges/${id}/tasks/${slug}`)
        },
    });


    const submitChallengeEdit = useMutation({
        mutationFn: (data: {
            id: string, 
            payload: ISubmission
        }) => httpService.patch(`/submission/${data?.id}`, data?.payload),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
            router.push(`/dashboard/challenges/${id}/tasks/${slug}`)
        },
    });

    const helpfulComment = useMutation({
        mutationFn: (data: string) => httpService.post(`/portfolio/helpful/comment/${data}`, {}),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
            queryClient.invalidateQueries({ queryKey: ["portfolio/comments"] })
        },
    });

    // /portfolio/{id}
    const createPortfolio = useMutation({
        mutationFn: (data: IPortfolio) => httpService.post(`/portfolio`, data),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
            setIsOpen(false)
            if (next) {
                router.back()
            }
        }
    });

    const likePortfolio = useMutation({
        mutationFn: (item: string) => httpService.post(`/portfolio/like/${item}`),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            // addToast({
            //     title: "Success",
            //     description: data?.data?.message,
            //     color: "success",
            // })
            queryClient.invalidateQueries({ queryKey: ["portfolio/comments"] })
            queryClient.invalidateQueries({ queryKey: ["portfolio"] })
        }
    });

    const editPortfolio = useMutation({
        mutationFn: (data: IPortfolio) => httpService.patch(`/portfolio/${editId}`, data),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: () => {
            setIsOpen(false)
            if (next) {
                router.back()
            }
        }
    });

    const gradeChallenge = useMutation({
        mutationFn: (data: IGrade) => httpService.post(`/grade`, data),
        onError: (error: AxiosError) => handleError(error),
        onSettled(error) {
            console.error(error);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["gradeuser"]})
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
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["gradeuser"]})
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
            router.push(`/dashboard/challenges/${id}/tasks/${slug}`)
        },
    });

    const addComment = useMutation({
        mutationFn: (data: {
            comment: string
        }) => httpService.post(`/portfolio/comment/${portID}`, data),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            formikComment.resetForm()
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
            queryClient.invalidateQueries({ queryKey: ["portfolio/comments"] })
            queryClient.invalidateQueries({ queryKey: ["portfolio"] })
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
            score: Yup.number()
                .typeError("Score must be a number")
                .integer("Score must be an integer")
                .max(100, "Score cannot be greater than 100")
                .required("Score is required"),
            feedBack: Yup.string().min(10, "At least 10 characters").required("FeedBack is required"),
            challengeID: Yup.string().required("ChallengeID is required"),
            submissionID: Yup.string().required("SubmissionID is required"),
            taskID: Yup.string().required("TaskID is required"),
            owner: Yup.string().required("Owner is required"),
        }),
        onSubmit: (data) => {
            if (editId) {
                gradeChallengeEdit.mutate({
                    ...data,
                    score: data?.score + ""
                })
            } else {
                gradeChallenge.mutate({
                    ...data,
                    score: data?.score + ""
                })
            }
        },
    });

    const formikComment = useFormik<{
        comment: string
    }>({
        initialValues: {
            "comment": ""
        },
        validationSchema: Yup.object({
            comment: Yup.string().required("Comment is required"),
        }),
        onSubmit: (data) => {
            addComment.mutate(data)
        },
    });

    const formikSubmit = useFormik<ISubmission>({
        initialValues: { 
            "title": "",
            "description": "",
            "link": "",
            "link2": "",
            "challengeID": id,
            "taskID": slug ?? "",
            "tools": ""
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .trim()
                .required("Title is required"),

            description: Yup.string()
                .trim()
                .min(10, "Description must be at least 10 characters")
                .required("Description is required"),

            link: Yup.string()
                .trim()
                .url("Enter a valid URL")
                .required("Link is required"),

            tools: Yup.string()
                .trim()
                .required("Tools field is required"),
        }),
        onSubmit: (data) => {
            if (image) {
                const formdata = new FormData()

                formdata.append("file", image)

                uploadImage.mutate(formdata)

                return
            }  else if (submissionID && !portfolio) {

                submitChallengeEdit.mutate({
                    id: submissionID,
                    payload: data
                })

            } else if (editId && portfolio) {
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
                }
                editPortfolio.mutate(payload)
                return
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

    const formikPortifolio = useFormik<IPortfolio>({
        initialValues: {
            "file": "",
            "title": "",
            "description": "",
            "challengeID": id, 
            links: [{
                name: "",
                link: ""
            }],
            tools: [""]
        },
        validationSchema: Yup.object({
            file: Yup.string().optional(),
            title: Yup.string().required("Title is required"),
            description: Yup.string().required("Description is required"),

            links: Yup
                .array()
                .of(
                    Yup.object({
                        name: Yup.string().required("Link name is required"),
                        link: Yup
                            .string()
                            .url("Invalid URL")
                            .required("Link URL is required"),
                    })
                )
                .min(1, "At least one link is required")
                .required(),

            challengeID: Yup.string().optional(), 

            tools: Yup
                .array()
                .of(Yup.string().required())
                .min(1, "Select at least one tool")
                .required("Tools are required"),
        }),
        onSubmit: (data) => {
            if (image) {
                const formdata = new FormData()

                formdata.append("file", image)

                uploadImage.mutate(formdata)

                return
            } else if (editId && portfolio) {
                const payload: IPortfolio = {
                    links: data.links,
                    tools: data.tools,
                    title: data.title,
                    description: data.description,
                    challengeID: formikSubmit?.values.challengeID,
                    taskID: formikSubmit?.values.taskID,
                }
                editPortfolio.mutate(payload)
                return
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


    const isLoading = (uploadImage.isPending || gradeChallenge.isPending || submitChallenge.isPending || createPortfolio?.isPending || editPortfolio?.isPending || addComment?.isPending || submitChallengeEdit?.isPending)

    return {
        formikSubmit,
        formikGrade,
        isLoading,
        createPortfolio,
        submitChallengeEdit,
        formikComment,
        addComment,
        isOpen,
        setIsOpen,
        setPortID,
        portID,
        likePortfolio,
        formikPortifolio,
        image,
        helpfulComment,
        setImage
    }
}

export default useSubmitChallenge