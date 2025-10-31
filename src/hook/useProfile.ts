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
import * as Yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";

const useProfile = () => {

    const [userState] = useAtom(userAtom);

    const { data: user } = userState
    const [isOpen, setIsOpen] = useState(false)

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

            const payload: IProfile = { ...formik.values, profilePicture: data?.data?.data?.url }

            updateProfile.mutate(payload)

        }
    });

    const updateProfile = useMutation({
        mutationFn: (data: IProfile) => httpService.put(`/user/${user?._id}`, data),
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
                updateProfile.mutate(data as IProfile)
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