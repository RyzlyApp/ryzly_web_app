"use client"
import * as Yup from 'yup';
import { useFormik } from "formik";
import { addToast } from "@heroui/toast";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';  
import { useState } from 'react';
import httpService from '@/helper/services/httpService';
import { useParams, useRouter } from 'next/navigation';
import { handleError } from '@/helper/utils/hanlderAxoisError';
import { IOrganisation } from '@/helper/model/user';

const useOrganisation = (challengeID?: string, edit?: boolean, back?: boolean) => {
 
    const [image, setImage] = useState<File | null>(null); 

    const queryClient = useQueryClient()
    const param = useParams();
    const id = param.id; 

    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false) 

    const addOrganisation = useMutation({
        mutationFn: (data: IOrganisation) => httpService.post(`/organization`, data),
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
            queryClient.invalidateQueries({ queryKey: ["organisation"] })
            formik.resetForm();
        },
    });

    const editOrganisation = useMutation({
        mutationFn: (data: IOrganisation) => httpService.patch(`/organization`, data),
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
            queryClient.invalidateQueries({ queryKey: ["organisation"] })
            formik.resetForm();
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


            const payload: IOrganisation = { ...formik.values, profilePicture: data?.data?.data?.url }

            if (edit) {
                editOrganisation.mutate(payload)
            } else {
                addOrganisation.mutate(payload)
            }

        }
    });


    const formik = useFormik<IOrganisation>({
        initialValues: {
            "name": "",
            "industry": "",
            "website": "",
            "email": "",
            "slug": "",
            "profilePicture": ""
        },

        validationSchema: Yup.object({
            name: Yup.string()
                .trim()
                .min(2, "Name must be at least 2 characters")
                .required("Name is required"),

            industry: Yup.string()
                .trim()
                .required("Industry is required"),

            website: Yup.string()
                .trim()
                .url("Enter a valid website URL")
                .required("Website is required"),

            email: Yup.string()
                .trim()
                .email("Enter a valid email address")
                .required("Email is required"),

            slug: Yup.string()
                .trim()
                .matches(
                    /^[a-z0-9-]+$/,
                    "Slug can only contain lowercase letters, numbers, and hyphens"
                )
                .required("Slug is required"),
        }),
        onSubmit: (data) => {

            if (edit && !image) {
                editOrganisation.mutate(data)
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

    const isLoading = uploadImage.isPending || editOrganisation.isPending || addOrganisation.isPending

    return {
        formik,
        isOpen,
        setIsOpen, 
        uploadImage,
        image,
        isLoading,
        setImage,
    }
}

export default useOrganisation