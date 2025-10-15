/**
 * Example: Using DAL with Challenge Hook
 * 
 * This file demonstrates how to refactor the existing useChallenge hook
 * to use the new DAL instead of direct httpService calls.
 * 
 * This is an EXAMPLE file - the actual useChallenge hook remains unchanged
 * to maintain backward compatibility.
 */

"use client";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addToast } from "@heroui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IApplication, ICompetition, ITask } from "@/helper/model/application";

// Type for file upload response
interface IFileUploadResponse {
  url: string;
  [key: string]: unknown;
}
import { userAtom } from "@/helper/atom/user";
import { useAtom } from "jotai";
import { useState } from "react";
import { imageAtom } from "@/helper/atom/image";
import { useParams, useRouter } from "next/navigation";
import { dal } from "@/dal"; // Import DAL

const useChallengeWithDAL = (challengeID?: string, edit?: boolean) => {
  const [userState] = useAtom(userAtom);
  const queryClient = useQueryClient();
  const param = useParams();
  const id = param.id;
  const { data: user } = userState;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [image] = useAtom(imageAtom);

  // ✅ Using DAL for applying as coach
  const applyForCoach = useMutation({
    mutationFn: (data: IApplication) =>
      dal.challenge.applyForCoach(user?._id as string, data),
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
      setIsOpen(false);
    },
  });

  // ✅ Using DAL for joining challenge
  const joinChallenge = useMutation({
    mutationFn: ({ data }: { data: string }) =>
      dal.challenge.joinChallenge(data),
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
      router.push(`/dashboard/challenges/${challengeID}`);
      queryClient.invalidateQueries({ queryKey: ["challenge"] });
      queryClient.invalidateQueries({ queryKey: ["challengedetails"] });
      setIsOpen(false);
    },
  });

  // ✅ Using DAL for creating challenge
  const createChallenge = useMutation({
    mutationFn: (data: ICompetition) => dal.challenge.createChallenge(data),
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
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["challenge"] });
      queryClient.invalidateQueries({ queryKey: ["challengedetails"] });
      formikChallenge.resetForm();
    },
  });

  // ✅ Using DAL for editing challenge
  const editChallenge = useMutation({
    mutationFn: (data: ICompetition) =>
      dal.challenge.updateChallenge(challengeID!, data),
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
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["challenge"] });
      queryClient.invalidateQueries({ queryKey: ["challengedetails"] });
      formikChallenge.resetForm();
    },
  });

  // ✅ Using DAL for creating task
  const createTask = useMutation({
    mutationFn: (data: ITask) => dal.challenge.createTask(data),
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
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      formikTask.resetForm();
    },
  });

  // ✅ Using DAL for editing task
  const editTask = useMutation({
    mutationFn: (data: ITask) => dal.challenge.updateTask(challengeID!, data),
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
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      formikTask.resetForm();
    },
  });

  // ✅ Using DAL for deleting challenge
  const deleteChallengeMutate = useMutation({
    mutationFn: (data: string) => dal.challenge.deleteChallenge(data),
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
      setIsOpen(false);
      router.push("/dashboard/challenges");
    },
  });

  // ✅ Using DAL for deleting resource
  const deleteResourceMutate = useMutation({
    mutationFn: (data: string) => dal.resource.deleteResource(data),
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
      queryClient.invalidateQueries({ queryKey: ["resource"] });
      setIsOpen(false);
    },
  });

  // ✅ Using DAL for deleting task
  const deleteTaskMutate = useMutation({
    mutationFn: (data: string) => dal.challenge.deleteTask(data),
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
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // ✅ Using DAL for uploading image
  const uploadImage = useMutation({
    mutationFn: (data: FormData) => dal.resource.upload<IFileUploadResponse>(data),
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
    onSuccess: (response) => {
      const payload: ICompetition = {
        ...formikChallenge.values,
        thumbnail: response?.data?.data?.url,
      };

      if (edit) {
        editChallenge.mutate(payload);
      } else {
        createChallenge.mutate(payload);
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      expertise: "",
      yearsOfExperience: "",
      linkedInUrl: "",
      portfolioUrl: "",
      focusArea: "",
    },
    validationSchema: Yup.object({
      expertise: Yup.string().required("Expertise is required"),
      yearsOfExperience: Yup.number()
        .nullable()
        .min(0, "Must be at least 0")
        .required("Years of experience is required"),
      linkedInUrl: Yup.string()
        .url("Enter a valid LinkedIn URL")
        .required("LinkedIn URL is required"),
      portfolioUrl: Yup.string().url("Enter a valid portfolio URL").nullable(),
      focusArea: Yup.string().required("Focus area is required"),
    }),
    onSubmit: (data: IApplication) => {
      applyForCoach.mutate(data);
    },
  });

  const formikChallenge = useFormik<ICompetition>({
    initialValues: {
      isPublic: true,
      title: "",
      description: "",
      winnerPrice: "",
      participationFee: "",
      tags: [],
      level: "",
      startDate: "",
      category: "HealthTech",
      endDate: "",
      industry: "",
      tracks: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string()
        .min(10, "At least 10 characters")
        .required("Description is required"),
      winnerPrice: Yup.number().min(0).required("Winner price is required"),
      participationFee: Yup.number()
        .min(0)
        .required("Participation fee is required"),
      tags: Yup.array().of(Yup.string()).min(1, "At least one tag required"),
      tracks: Yup.array().of(Yup.string()).min(1, "At least one tag required"),
      level: Yup.string().required("Level is required"),
      startDate: Yup.date().required("Start date is required"),
      endDate: Yup.date()
        .min(Yup.ref("startDate"), "End date cannot be before start date")
        .required("End date is required"),
      industry: Yup.string().required("Industry is required"),
    }),
    onSubmit: (data) => {
      if (edit && !image) {
        editChallenge.mutate(data);
        return;
      } else if (image) {
        const formdata = new FormData();
        formdata.append("file", image);
        uploadImage.mutate(formdata);
      } else {
        addToast({
          title: "Error",
          description: "Image is required",
          color: "danger",
          timeout: 3000,
        });
      }
    },
  });

  const formikTask = useFormik<ITask>({
    initialValues: {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      challengeID: id + "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string()
        .min(10, "At least 10 characters")
        .required("Description is required"),
      startDate: Yup.date().required("Start date is required"),
      endDate: Yup.date()
        .min(Yup.ref("startDate"), "End date cannot be before start date")
        .required("End date is required"),
      challengeID: Yup.string().required("challengeID is required"),
    }),
    onSubmit: (data) => {
      if (edit) {
        editTask.mutate(data);
      } else {
        createTask.mutate(data);
      }
    },
  });

  return {
    formik,
    formikChallenge,
    applyForCoach,
    createChallenge,
    isOpen,
    setIsOpen,
    tab,
    setTab,
    uploadImage,
    formikTask,
    createTask,
    joinChallenge,
    deleteChallengeMutate,
    deleteTaskMutate,
    deleteResourceMutate,
    editChallenge,
    editTask,
  };
};

export default useChallengeWithDAL;
