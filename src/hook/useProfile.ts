import { userActionsAtom, userAtom } from "@/helper/atom/user";
import { IUpdateProfile } from "@/helper/model/user";
import httpService from "@/helper/services/httpService";
import { handleError } from "@/helper/utils/hanlderAxoisError";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useAtom, useSetAtom } from "jotai";
import { useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";

const validationSchema = Yup.object({
    phone: Yup.string()
        .required("Required")
        .test(
            "is-valid-phone",
            "Enter a valid phone number for the selected country",
            (value) => !value || isValidPhoneNumber(value)
        ),
});

const useProfile = () => {
    const [userState] = useAtom(userAtom);
    const { data: user } = userState;

    const dispatch = useSetAtom(userActionsAtom);

    const [image, setImage] = useState<File | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [links, setLinks] = useState("");

    const formik = useFormik({
        enableReinitialize: true,

        initialValues: {
            skills: user?.skills ?? [],
            interests: user?.interests ?? [],
            about: user?.about ?? "",
            phone: user?.phone ?? "",
            country: user?.country ?? "",
            username: user?.username ?? "",
            firstName: user?.firstName ?? "",
            lastName: user?.lastName ?? "",
            companyName: user?.companyName ?? "",
            facebookUsername: user?.facebookUsername ?? "",
            twitterUsername: user?.twitterUsername ?? "",
            instagramUsername: user?.instagramUsername ?? "",
            LinkedinUsername: user?.LinkedinUsername ?? "",
            tiktokUsername: user?.tiktokUsername ?? "",
            track: user?.track ?? "",
        },

        validationSchema,

        onSubmit: (values) => {
            if (image) {
                const formData = new FormData();
                formData.append("file", image);
                uploadImage.mutate(formData);
            } else {
                updateProfile.mutate(buildPayload(values));
            }
        },
    });

    console.log(user);
    

    const buildPayload = (
        values: typeof formik.values,
        profilePicture?: string
    ): IUpdateProfile => {
        const payload: IUpdateProfile = {
            phone: values.phone,
            country: values.country,
            skills: values.skills,
            interests: values.interests,
            about: values.about,
            firstName: values.firstName,
            lastName: values.lastName,
            companyName: values.companyName,
            track: values.track,
            facebookUsername: values.facebookUsername,
            twitterUsername: values.twitterUsername,
            instagramUsername: values.instagramUsername,
            LinkedinUsername: values.LinkedinUsername,
            tiktokUsername: values.tiktokUsername,
        };

        if (values.username !== user?.username) {
            payload.username = values.username;
        }

        if (profilePicture) {
            payload.profilePicture = profilePicture;
        }

        return payload;
    };

    const updateProfile = useMutation({
        mutationFn: (data: IUpdateProfile) =>
            httpService.put(`/user/${user?._id}`, data),

        onSuccess: ({ data }) => {
            addToast({
                title: "Success",
                description: data.message,
                color: "success",
            });

            dispatch({ type: "fetch" });

            setIsOpen(false);
            setLinks("");
        },

        onError: (error: AxiosError) => handleError(error),
    });

    const uploadImage = useMutation({
        mutationFn: (formData: FormData) =>
            httpService.post("/upload/file", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),

        onSuccess: ({ data }) => {
            updateProfile.mutate(
                buildPayload(formik.values, data.data.url)
            );
        },

        onError: (error: AxiosError) => handleError(error),
    });

    return {
        formik,
        image,
        setImage,
        isOpen,
        setIsOpen,
        links,
        setLinks,
        isLoading:
            uploadImage.isPending ||
            updateProfile.isPending,
    };
};

export default useProfile;