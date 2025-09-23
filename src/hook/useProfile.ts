import { imageAtom } from "@/helper/atom/image";
import { userAtom } from "@/helper/atom/user";
import { IProfile, IUser } from "@/helper/model/user";
import httpService from "@/helper/services/httpService";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";



const useProfile = () => {

    const [userState] = useAtom(userAtom);

    const { data: user } = userState

    const [userDetail, setUserDetail] = useState<IUser>()

    useEffect(() => {
        setUserDetail(user ?? {} as IUser)
    },[user])


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

            const payload: IProfile = { ...formik.values, profilePicture: data?.data?.data?.url }

            updateProfile.mutate(payload)

        }
    });

    const updateProfile = useMutation({
        mutationFn: (data: IProfile) => httpService.post(`/user/${user?._id}`, data),
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

    const formik = useFormik({
        initialValues: {
            "isCoach": userDetail?.isCoach ?? false,
            "skills": userDetail?.skills ?? [],
            "interets": userDetail?.interets ?? [],
            "about": userDetail?.about ?? "",
            "fullName": userDetail?.fullName ?? "",
            "profilePicture": userDetail?.profilePicture ?? "",
            "track": userDetail?.track ?? "",
        },
        onSubmit: (data: IProfile) => {
            if (image) {

                const formdata = new FormData()

                formdata.append("file", image)

                uploadImage.mutate(formdata)
            } else {
                updateProfile.mutate(data)
            }
        },
    });

    return {
        formik
    }
}

export default useProfile