/**
 * Example: Using DAL with Authentication Hook
 * 
 * This file demonstrates how to refactor the existing useAuth hook
 * to use the new DAL instead of direct httpService calls.
 * 
 * This is an EXAMPLE file - the actual useAuth hook remains unchanged
 * to maintain backward compatibility.
 */

"use client";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IAuth, ILogin } from "@/helper/model/auth";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import { dal } from "@/dal"; // Import DAL

const useAuthWithDAL = () => {
  const router = useRouter();
  const token = Cookies.get("accesstoken") as string;

  // ✅ Using DAL instead of direct httpService call
  const loginMutation = useMutation({
    mutationFn: (data: { email: string }) => dal.auth.login(data),
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
      console.log(data);

      router.push(
        `/auth/verify?userId=${data?.data?.data?.userId}&email=${formik?.values?.email}`
      );

      Cookies.set("userid", data?.data?.data?.userId);
      Cookies.set("email", formik?.values?.email);
      addToast({
        title: "Success",
        description: data?.data?.message,
        color: "success",
      });
    },
  });

  // ✅ Using DAL for signup
  const signupMutation = useMutation({
    mutationFn: (data: { email: string }) => dal.auth.signup(data),
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
      addToast({
        title: "Success",
        description: data?.data?.message,
        color: "success",
      });
      router.push(
        `/auth/verify?userId=${data?.data?.data?.userId}&email=${formikSignup?.values?.email}`
      );
      Cookies.set("userid", data?.data?.data?.userId);
      Cookies.set("email", formikSignup?.values?.email);
    },
  });

  // ✅ Using DAL for user details
  const userDetails = useMutation({
    mutationFn: (data?: string) => dal.auth.getUserDetails<{ fullName?: string }>(data ?? token),
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
    onSuccess: (data: { fullName?: string }) => {
      if (data?.fullName) {
        router.push("/dashboard");
      } else {
        router.push("/auth/onboarding");
      }
    },
  });

  // ✅ Using DAL for token verification
  const verifyMutation = useMutation({
    mutationFn: (data: { userId: string; token: string }) =>
      dal.auth.verifyToken(data.userId, data.token),
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
      Cookies.set("accesstoken", data?.data?.data?.token);
      addToast({
        title: "Success",
        description: data?.data?.message,
        color: "success",
      });
      userDetails.mutate(data?.data?.data?.token);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required"),
    }),
    onSubmit: (data: ILogin) => {
      loginMutation.mutate(data);
    },
  });

  const formikSignup = useFormik({
    initialValues: {
      email: "",
      confirmemail: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required"),
      confirmemail: Yup.string()
        .oneOf([Yup.ref("email")], "Emails must match")
        .required("Required"),
    }),
    onSubmit: (data: IAuth) => {
      signupMutation.mutate({ email: data.email });
    },
  });

  return {
    formik,
    formikSignup,
    loginMutation,
    signupMutation,
    verifyMutation,
    userDetails,
  };
};

export default useAuthWithDAL;
