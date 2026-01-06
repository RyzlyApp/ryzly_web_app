import { useMutation } from "@tanstack/react-query";
import httpService from "@/helper/services/httpService";
import { AxiosError } from "axios";
import { handleError } from "@/helper/utils/hanlderAxoisError";

export const useImageUpload = (
    onSuccess: (url: string) => void,
    onProgress: (p: number) => void
) =>
    useMutation({
        mutationFn: (data: FormData) =>
            httpService.post("/upload/file", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (e) =>
                    e.total && onProgress(Math.round((e.loaded * 100) / e.total)),
            }),
        onError: (err: AxiosError) => handleError(err),
        onSuccess: (res) => onSuccess(res?.data?.data?.url as string),
    });
