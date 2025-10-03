import { imageAtom } from "@/helper/atom/image";
import { userAtom } from "@/helper/atom/user"; 
import httpService from "@/helper/services/httpService";
import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useAtom } from "jotai";
import { useState } from "react";
import { IChatDetail, IChatMessage, ICreateChat } from "@/helper/model/chat";

const useChat = () => {

    const [userState] = useAtom(userAtom);

    const { data: user } = userState
    const [chatId, setChatId] = useState<IChatDetail>({} as IChatDetail)
    const queryClient = useQueryClient()
 

    const [image, setImage ] = useAtom(imageAtom);

    // Upload Image
    const createChatRoom = useMutation({
        mutationFn: (data: ICreateChat) => httpService.post("/chat", data),
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
            console.log(data?.data?.data);
            setChatId(data?.data?.data)
        }
    });

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

            const payload: IChatMessage = { ...formik.values, files: [data?.data?.data?.url] }

            sendMessage.mutate(payload)

        }
    });

    const sendMessage = useMutation({
        mutationFn: (data: IChatMessage) => httpService.post(`/chat/message`, data),
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
            // addToast({
            //     title: "Success",
            //     description: data?.data?.message,
            //     color: "success",
            // }) 
            setImage(null)
            queryClient.invalidateQueries({ queryKey: [ "chat"+user?._id ] })
            formik.setFieldValue("message", "")
        },
    });

    const formik = useFormik<IChatMessage>({
        initialValues: {
            chatId: chatId?._id,
            "message": "",
            "messageType": "TEXT",
            // "files": []
        },
        onSubmit: (data) => {

            if (image) {

                const formdata = new FormData()

                formdata.append("file", image)

                uploadImage.mutate(formdata)
            } else {
                sendMessage.mutate(data as IChatMessage)
            }
        },
    });


    const isLoading = (createChatRoom.isPending || sendMessage.isPending)

    return {
        formik,
        createChatRoom,
        sendMessage,
        isLoading,
        chatId,
        setChatId,
        user
    }
}

export default useChat