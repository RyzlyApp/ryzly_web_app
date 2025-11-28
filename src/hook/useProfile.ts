import { imageAtom } from "@/helper/atom/image";
import { userActionsAtom, userAtom } from "@/helper/atom/user";
import { IUpdateProfile, IUser } from "@/helper/model/user";
import httpService from "@/helper/services/httpService";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";
import { handleError } from "@/helper/utils/hanlderAxoisError";

const useProfile = () => {

    const [userState] = useAtom(userAtom);
    const [image, setImage] = useState<File | null>(null);

    const { data: user } = userState
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useSetAtom(userActionsAtom);

    const [ links, setLinks ] = useState("")

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
                    facebookUsername: formik.values.facebookUsername,
                    twitterUsername: formik.values.twitterUsername,
                    instagramUsername: formik.values.instagramUsername,
                    LinkedinUsername: formik.values.LinkedinUsername,
                    tiktokUsername: formik.values.tiktokUsername,
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
                    facebookUsername: formik.values.facebookUsername,
                    twitterUsername: formik.values.twitterUsername,
                    instagramUsername: formik.values.instagramUsername,
                    LinkedinUsername: formik.values.LinkedinUsername,
                    tiktokUsername: formik.values.tiktokUsername,
                }
            }

            updateProfile.mutate(payload)

        }
    });

    const updateProfile = useMutation({
        mutationFn: (data: IUpdateProfile) => httpService.put(`/user/${user?._id}`, data),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
            dispatch({ type: "fetch" });
            setIsOpen(false)
            setLinks("")

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
            "facebookUsername": userDetail?.facebookUsername ?? "",
            "twitterUsername": userDetail?.twitterUsername ?? "",
            "instagramUsername": userDetail?.fullName ?? "",
            "LinkedinUsername": userDetail?.fullName ?? "",
            "tiktokUsername": userDetail?.fullName ?? "",
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
                        facebookUsername: data.facebookUsername,
                        twitterUsername: data.twitterUsername,
                        instagramUsername: data.instagramUsername,
                        LinkedinUsername: data.LinkedinUsername,
                        tiktokUsername: data.tiktokUsername,
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
                        facebookUsername: data.facebookUsername,
                        twitterUsername: data.twitterUsername,
                        instagramUsername: data.instagramUsername,
                        LinkedinUsername: data.LinkedinUsername,
                        tiktokUsername: data.tiktokUsername,
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
            formik.setFieldValue("facebookUsername", user?.facebookUsername)
            formik.setFieldValue("tiktokUsername", user?.tiktokUsername)
            formik.setFieldValue("instagramUsername", user?.instagramUsername)
            formik.setFieldValue("twitterUsername", user?.twitterUsername)
            formik.setFieldValue("LinkedinUsername", user?.LinkedinUsername)
        }
    }, [user])


    const isLoading = (uploadImage.isPending || updateProfile.isPending)

    return {
        formik,
        isOpen,
        setIsOpen,
        isLoading,
        links,
        setLinks,
        image,
        setImage
    }
}

export default useProfile