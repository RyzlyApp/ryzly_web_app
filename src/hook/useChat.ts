import { imageAtom } from "@/helper/atom/image";
import { userAtom } from "@/helper/atom/user";
import httpService from "@/helper/services/httpService";
import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { IChatDetail, IChatMessage, ICreateChat } from "@/helper/model/chat";
import { CHAT_MESSAGE } from "@/components/challenges/chats/chatLayout";
import { uniqBy } from "lodash"; 
import { Socket } from "@/lib/socket-io";

const useChat = () => {
  const [userState] = useAtom(userAtom);
  const setDataChat = useSetAtom(CHAT_MESSAGE);

  const { data: user } = userState;
  const [chatId, setChatId] = useState<IChatDetail>({} as IChatDetail);
  const queryClient = useQueryClient();

  const [image, setImage] = useAtom(imageAtom);

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
        timeout: 3000,
      });
    },
    onSuccess: (data) => {
      console.log(data?.data?.data);
      setDataChat((prev) => uniqBy([...prev, data?.data?.data], "_id"));
      setChatId(data?.data?.data);
    },
  });

  // Upload Image
  const uploadImage = useMutation({
    mutationFn: (data: FormData) =>
      httpService.post("/upload/file", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onError: (error: AxiosError) => {
      const message =
        (error?.response?.data as { message?: string })?.message ||
        "Something went wrong";

      addToast({
        title: "Error",
        description: message,
        color: "danger",
        timeout: 3000,
      });
    },
    onSuccess: (data) => {
      const payload: IChatMessage = {
        ...formik.values,
        files: [data?.data?.data?.url],
      };
      Socket.emit("chat", { ...payload, user });
      //   sendMessage.mutate(payload);
    },
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
        timeout: 3000,
      });
    },
    onSuccess: (data) => {
      // addToast({
      //     title: "Success",
      //     description: data?.data?.message,
      //     color: "success",
      // })
      setImage(null);
      queryClient.invalidateQueries({ queryKey: ["chat" + user?._id] });
      setDataChat((prev) => uniqBy([data?.data?.data, ...prev], "_id"));
      formik.setFieldValue("message", "");
    },
  });

  const formik = useFormik<IChatMessage>({
    initialValues: {
      chatId: chatId?._id,
      message: "",
      messageType: "TEXT",
      // "files": []
    },
    onSubmit: (data) => {
      if (image) {
        const formdata = new FormData();

        formdata.append("file", image);

        uploadImage.mutate(formdata);
      } else {
        Socket.emit("chat", { ...data, user });
        formik.setFieldValue("message", "");
        // sendMessage.mutate(data as IChatMessage);
      }
    },
  });


  useEffect(()=> {
    formik?.setFieldValue("chatId", chatId?._id)
  }, [chatId?._id])

  const isLoading = createChatRoom.isPending || sendMessage.isPending;

  return {
    formik,
    createChatRoom,
    sendMessage,
    isLoading,
    chatId,
    setChatId,
    user,
  };
};

export default useChat;
