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
import { imageAtom } from '@/helper/atom/image';
import { useAtom } from 'jotai';
import { handleError } from '@/helper/utils/hanlderAxoisError';

const useOverview = (data?: IOverview, index?: string, edit?: boolean) => {

    const param = useParams();
    const id = param.id;
    const [isOpen, setIsOpen] = useState(false) 
    const [tab, setTab] = useState("")
    const queryClient = useQueryClient()
    const [ indexData, setIndexData ] = useState(-1)
    const [image, setImage] = useState<File | null>(null); 

    const overviewMutate = useMutation({
        mutationFn: (data: IOverview) => httpService.post(`/overview`, data),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
            queryClient.invalidateQueries({queryKey: ["overview"]})
            setTab("")
            setIndexData(-1)
        },
    });

    const addCoachMutate = useMutation({
        mutationFn: (data: {
            "challengeID": string,
            "user": string
        }) => httpService.post(`/coach`, data),
        onError: (error: AxiosError) => handleError(error),
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
        onError: (error: AxiosError) => handleError(error),
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
        onError: (error: AxiosError) => handleError(error),
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
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            }) 
            setIsOpen(false)
            formikResource.setFieldValue("description", "")
            queryClient.invalidateQueries({queryKey: ["resource"]})
        },
    });



    const editResourceMutate = useMutation({
        mutationFn: (payload: IResource) => httpService.patch(`/resource/${index}`, payload),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            }) 
            setIsOpen(false)
            formikResource.setFieldValue("description", "")
            queryClient.invalidateQueries({queryKey: ["resource"]})
        },
    });

    const formik = useFormik<IOverview>({
        initialValues: {
            title: "Test",
            subTittle: "",
            about: "testtesttesttesttesttesttesttesttesttesttesttest",
            rules: [],
            outcomes: [],
            includes: [],
            requirements: [],
            whoIs: [],
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
            description: Yup.string().required("Description is required"),
            challengeID: Yup.string().required("challengeID is required"),
        }),
        onSubmit: (data) => {
            
            if (image) {

                const formdata = new FormData()

                formdata.append("file", image)

                uploadImage.mutate(formdata)
            } else {
                if(edit) {
                    editResourceMutate.mutate(data) 
                } else {
                    addResourceMutate.mutate(data) 
                }
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
        uploadImage,
        addParticipantMutate,
        addCoachMutate,
        tab,
        setTab,
        id,
        indexData, 
        setIndexData,
        editResourceMutate,
        image,
        setImage
        // deleteCoachMutate
    }
}

export default useOverview
