import { imageAtom } from "@/helper/atom/image";
import { userActionsAtom, userAtom } from "@/helper/atom/user";
import { IProfile, IUpdateProfile, IUser } from "@/helper/model/user";
import httpService from "@/helper/services/httpService";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";

const useProfile = () => {

    const [userState] = useAtom(userAtom);

    const { data: user } = userState
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useSetAtom(userActionsAtom);

    const [userDetail, setUserDetail] = useState<IUser>()

    const validationSchema = Yup.object({
        phone: Yup.string()
            .nullable() // ✅ allow empty
            .notRequired()
            .test(
                "is-valid-phone",
                "Enter a valid phone number for the selected country",
                (value) => !value || isValidPhoneNumber(value) // ✅ only validate if user entered something
            ),
    });

    useEffect(() => {
        setUserDetail(user ?? {} as IUser)
    }, [user])

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

            let payload: IUpdateProfile

            if (formik.values.username === user?.username) {
                payload = {
                    profilePicture: data?.data?.data?.url,
                    phone: formik.values.phone,
                    country: formik.values.country,
                    skills: formik.values.skills,
                    interets: formik.values.interets,
                    about: formik.values.about,
                    fullName: formik.values.fullName,
                    track: formik.values.track,
                }
            } else {
                payload = {
                    profilePicture: data?.data?.data?.url,
                    phone: formik.values.phone,
                    country: formik.values.country,
                    skills: formik.values.skills,
                    interets: formik.values.interets,
                    about: formik.values.about,
                    fullName: formik.values.fullName,
                    track: formik.values.track,
                    username: formik.values.username,
                }
            }

            updateProfile.mutate(payload)

        }
    });

    const updateProfile = useMutation({
        mutationFn: (data: IUpdateProfile) => httpService.put(`/user/${user?._id}`, data),
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
            dispatch({ type: "fetch" });
            setIsOpen(false)

        },
    });

    const formik = useFormik({
        initialValues: {
            "skills": userDetail?.skills ?? [],
            "interets": userDetail?.interets ?? [],
            "about": userDetail?.about ?? "",
            "phone": userDetail?.phone ?? "",
            "country": userDetail?.country ?? "",
            "username": userDetail?.username ?? "",
            "fullName": userDetail?.fullName ?? "",
            // "profilePicture": userDetail?.profilePicture ?? "",
            "track": userDetail?.track ?? "",
        },
        validationSchema,
        onSubmit: (data) => {
            if (image) {

                const formdata = new FormData()

                formdata.append("file", image)

                uploadImage.mutate(formdata)
            } else {


                let payload: IUpdateProfile

                if (formik.values.username === user?.username) {
                    payload = { 
                        phone: data.phone,
                        country: data.country,
                        skills: data.skills,
                        interets: data.interets,
                        about: data.about,
                        fullName: data.fullName,
                        track: data.track,
                    }
                } else {
                    payload = { 
                        phone: data.phone,
                        country: data.country,
                        skills: data.skills,
                        interets: data.interets,
                        about: data.about,
                        fullName: data.fullName,
                        track: data.track,
                        username: data.username,
                    }
                }
                updateProfile.mutate(payload as IUpdateProfile)
            }
        },
    });


    useEffect(() => {
        if (!formik.values.fullName) {
            formik.setFieldValue("fullName", user?.fullName)
            formik.setFieldValue("skills", user?.skills)
            formik.setFieldValue("country", user?.country)
            formik.setFieldValue("phone", user?.phone)
            formik.setFieldValue("about", user?.about)
            formik.setFieldValue("username", user?.username)
            formik.setFieldValue("interets", user?.interets)
            // formik.setFieldValue("profilePicture", user?.profilePicture)
            formik.setFieldValue("track", user?.track)
        }
    }, [user])


    const isLoading = (uploadImage.isPending || updateProfile.isPending)

    return {
        formik,
        isOpen,
        setIsOpen,
        isLoading
    }
}

export default useProfile