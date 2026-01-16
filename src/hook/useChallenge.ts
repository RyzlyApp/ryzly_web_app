"use client"
import * as Yup from 'yup';
import { useFormik } from "formik";
import { addToast } from "@heroui/toast";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IApplication, ICompetition, ICoupon, IRating, ITask } from '@/helper/model/application';
import { userAtom } from '@/helper/atom/user';
import { useAtom } from 'jotai';
import { useState } from 'react';
import httpService from '@/helper/services/httpService';
import { imageAtom } from '@/helper/atom/image';
import { useParams, useRouter } from 'next/navigation';
import { handleError } from '@/helper/utils/hanlderAxoisError';

const useChallenge = (challengeID?: string, edit?: boolean, back?: boolean, disable?: boolean) => {

    const [userState] = useAtom(userAtom);
    const [image, setImage] = useState<File | null>(null);

    const queryClient = useQueryClient()
    const param = useParams();
    const id = param.id;

    const { data: user } = userState;

    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)
    const [tab, setTab] = useState(0)

    const applyForCoach = useMutation({
        mutationFn: (data: IApplication) => httpService.post(`/application/${user?._id}`, data),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
            setIsOpen(false)
        },
    });


    const addRating = useMutation({
        mutationFn: (data: IRating) => httpService.post(`/challenge/rate/${id}`, data),
        onError: (error: AxiosError) => handleError(error),
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
        mutationFn: ({ data }: { data: string }) => httpService.post(`/challenge/join/${data}`),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
            router.push(`/dashboard/challenges/${challengeID}`)
            queryClient.invalidateQueries({ queryKey: ["challenge"] })
            queryClient.invalidateQueries({ queryKey: ["challengedetails"] })
            setIsOpen(false)
        },
    });


    const endChallenge = useMutation({
        mutationFn: () => httpService.post(`/challenge/certificate/${id}`),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
            queryClient.invalidateQueries({ queryKey: ["challenge"] })
            queryClient.invalidateQueries({ queryKey: ["challengedetails"] })
        },
    });

    const createChallenge = useMutation({
        mutationFn: (data: ICompetition) => httpService.post(`/challenge`, data),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
            if (back) {
                router.back()
            }
            setIsOpen(false)
            queryClient.invalidateQueries({ queryKey: ["challenge"] })
            queryClient.invalidateQueries({ queryKey: ["challengedetails"] })
            formikChallenge.resetForm();
        },
    });

    const editChallenge = useMutation({
        mutationFn: (data: ICompetition) => httpService.patch(`/challenge/${challengeID}`, data),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
            if (back) {
                router.back()
            }
            setIsOpen(false)
            queryClient.invalidateQueries({ queryKey: ["challenge"] })
            queryClient.invalidateQueries({ queryKey: ["challengedetails"] })
            formikChallenge.resetForm();
        },
    });

    const createTask = useMutation({
        mutationFn: (data: ITask) => httpService.post(`/task`, data),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
            if (back) {
                router.back()
            }
            setIsOpen(false)
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
            queryClient.invalidateQueries({ queryKey: ["challenge"] })
            queryClient.invalidateQueries({ queryKey: ["challengedetails"] })
            formikTask.resetForm();
        },
    });

    const createCoupon = useMutation({
        mutationFn: (data: ICoupon) => httpService.post(`/coupon/coach`, data),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            }) 

            queryClient.invalidateQueries({ queryKey: ["coupon"] })
            setIsOpen(false)
            
        },
    });

    const editTask = useMutation({
        mutationFn: (data: ITask) => httpService.patch(`/task/${challengeID}`, data),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
            setIsOpen(false)
            if (back) {
                router.back()
            }
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
            queryClient.invalidateQueries({ queryKey: ["challenge"] })
            queryClient.invalidateQueries({ queryKey: ["challengedetails"] })
            formikTask.resetForm();
        },
    });

    const deleteChallengeMutate = useMutation({
        mutationFn: (data: string) => httpService.delete(`/challenge/${data}`),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
            setIsOpen(false)
            router.push("/dashboard/challenges")
        },
    });


    const reportChallengeMutate = useMutation({
        mutationFn: (data: {
                "others": string,
                "reasons": string[]
            }) => httpService.post(`/challenge/report/${id}`, data),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
            setIsOpen(false) 
        },
    });


    const leaveChallengeMutate = useMutation({
        mutationFn: (data: string) => httpService.delete(`/challenge/${data}`),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
            setIsOpen(false)
            router.push("/dashboard/challenges")
        },
    });

    const bookmarkChallengeMutate = useMutation({
        mutationFn: (data: string) => httpService.post(`/challenge/bookmark/${data}`),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
            queryClient.invalidateQueries({ queryKey: ["challenge"] })
            queryClient.invalidateQueries({ queryKey: ["challengedetails"] })
            setIsOpen(false)
        },
    });


    const deleteResourceMutate = useMutation({
        mutationFn: (data: string) => httpService.delete(`/resource/${data}`),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })

            queryClient.invalidateQueries({ queryKey: ["resource"] })

            setIsOpen(false)
        },
    });


    const deleteTaskMutate = useMutation({
        mutationFn: (data: string) => httpService.delete(`/task/${data}`),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
            setIsOpen(false)
            queryClient.invalidateQueries({ queryKey: ["tasks"] })

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
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {


            const payload: ICompetition = { ...formikChallenge.values, thumbnail: data?.data?.data?.url }

            if (edit) {
                editChallenge.mutate(payload)
            } else {
                createChallenge.mutate(payload)
            }

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

    const formikCoupon = useFormik<ICoupon>({
      initialValues: {
        userId: user?._id as string,
        challengeId: id as string,
        code: "",
        discount: 0,
        discountType: "PERCENT",
        validFrom: "",
        validTo: "",
        maxUseCount: 0,
      },
    
      validationSchema: Yup.object({
        userId: Yup.string().required("User ID is required"),
    
        challengeId: Yup.string().required("Challenge ID is required"),
    
        code: Yup.string()
          .required("Coupon code is required")
          .min(4, "Code must be at least 4 characters"),
    
        discount: Yup.number()
          .required("Discount is required")
          .min(1, "Discount must be greater than 0"),
    
        discountType: Yup.mixed<"PERCENT" | "FLAT">()
          .oneOf(["PERCENT", "FLAT"], "Invalid discount type")
          .required("Discount type is required"),
    
        validFrom: Yup.string().required("Valid from date is required"),
    
        validTo: Yup.string()
          .required("Valid to date is required")
          .test(
            "is-after",
            "Valid to date must be after valid from date",
            function (value) {
              const { validFrom } = this.parent;
              return !validFrom || !value || new Date(value) > new Date(validFrom);
            }
          ),
    
        maxUseCount: Yup.number()
          .min(0, "Max use count cannot be negative")
          .required("Max use count is required"),
      }),
    
      onSubmit: (data) => {
        createCoupon.mutate(data);
      },
    });

    const formikRating = useFormik({
        initialValues: {
            rating: 0,
            comment: "",
        },
        validationSchema: Yup.object({
            rating: Yup.number()
                .min(1, "Please give at least 1 star")
                .max(5, "Maximum is 5 stars")
                .required("Rating is required"),
            comment: Yup.string()
                .trim()
                .required("Comment is required"),
        }),
        onSubmit: (data: IRating) => {
            addRating.mutate(data);
        },
    });

    const formikChallenge = useFormik<ICompetition>({
        initialValues: {
            // thumbnail: "",
            isPublic: true,
            title: "",
            description: "",
            winnerPrice: "",
            participationFee: "",
            tags: [],
            level: "",
            startDate: "",
            category: "HealthTech",
            endDate: "",
            industry: "",
            tracks: []
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            description: Yup.string().min(10, "At least 10 characters").required("Description is required"),
            // thumbnail: Yup.string().url("Invalid URL").required("Thumbnail is required"),
            winnerPrice: Yup.number().min(0).required("Winner price is required"),
            participationFee: Yup.number().min(0).required("Participation fee is required"),
            // category: Yup.string().required("Category is required"),
            tags: Yup.array().of(Yup.string()).min(1, "At least one tag required"),
            tracks: Yup.array().of(Yup.string()).min(1, "At least one tag required"),
            level: Yup.string().required("Level is required"),
            startDate: Yup.date().required("Start date is required"),
            endDate: Yup.date()
                .min(Yup.ref("startDate"), "End date cannot be before start date")
                .required("End date is required"),
            industry: Yup.string().required("Industry is required"),
        }),
        onSubmit: (data) => {

            if (edit && !image) {
                editChallenge.mutate(data)
                return
            } else if (image) {

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
            "challengeID": id + ""
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
            if (edit) {
                editTask.mutate(data)
            } else {
                createTask.mutate(data)
            }
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
        joinChallenge,
        deleteChallengeMutate,
        deleteTaskMutate,
        deleteResourceMutate,
        editChallenge,
        editTask,
        formikRating,
        addRating,
        endChallenge,
        bookmarkChallengeMutate,
        leaveChallengeMutate,
        reportChallengeMutate,
        image,
        setImage,
        createCoupon,
        formikCoupon
    }
}

export default useChallenge