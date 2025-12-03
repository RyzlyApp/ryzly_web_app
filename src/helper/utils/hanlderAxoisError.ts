// utils/handleAxiosError.ts
// import { AxiosError } from "axios";
import { extractAxiosMessage } from "./extractAxiosMessage";

// export const handleAxiosError = (
//   error: AxiosError,
//   toastFn?: (msg: string) => void
// ) => {
//   const message = extractAxiosMessage(error);

//   if (toastFn) toastFn(message);

//   return message;
// };


import { addToast } from "@heroui/toast"
import { AxiosError } from "axios"

/** 🔹 Shared error handler */
export const handleError = (error: AxiosError) => {

    console.log(error);
    
    const message = extractAxiosMessage(error);
 
    addToast({
        title: "Error",
        description: message,
        color: "danger",
        timeout: 3000,
    })
}