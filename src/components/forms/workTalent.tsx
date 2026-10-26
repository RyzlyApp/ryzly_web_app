"use client";

import React, { use, useRef, useState } from "react";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import {
  CustomInput,
  CustomEditor,
  CustomStringArrayInput,
  CustomButton,
  CustomDatePicker,
} from "@/components/custom";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { ModalLayout } from "../shared";
import { RiUploadCloudLine, RiDeleteBin5Line, RiFileTextLine, RiCheckLine } from "react-icons/ri";
import { IChallenge } from "@/helper/model/application";
import { useFetchData } from "@/hook/useFetchData";
import { useMutation } from "@tanstack/react-query";
import httpService from "@/helper/services/httpService";
import { addToast } from "@heroui/toast";
import { AxiosError } from "axios";
import { handleError } from "@/helper/utils/hanlderAxoisError";
import { IProfile, IUser } from "@/helper/model/user";
import { Avatar } from "@heroui/react";

interface IWorkTalentForm {
  title: string;
  description: string;
  deliverables: string[];
  files: File[];
  startDate: string;
  dueDate: string;
  amount: string;
}

export default function WorkTalentForm() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const challengeId = params.id

  // In a real implementation, you'd fetch the talent details using this ID
  const talentId = searchParams.get("talentId");
  const [successModal, setSuccessModal] = useState(false);
  const [createdTaskId, setCreatedTaskId] = useState<string>("");

  // // Fetch the challenge to get the organisationId (creator)
  // const { data: challengeData } = useFetchData<any>({
  //   endpoint: `/challenge/single/${challengeId}`,
  //   params: {},
  // });

  const { data: challengeData, isLoading, isRefetching } = useFetchData<IChallenge>({
    endpoint: `/challenge/single/${challengeId}`, name: "challengedetails"
  })

  const { data: user } = useFetchData<IUser>({
    endpoint: `/user/${talentId}`, name: "work_talent"
  })

  const createTalentTask = useMutation({
    mutationFn: (payload: any) => httpService.post("/talent-tasks", payload),
    onError: (error: AxiosError) => {
      handleError(error);
    },
    onSuccess: (data: any) => {
      addToast({
        title: "Success",
        description: "Task posted successfully!",
        color: "success"
      });
      const responseData = data?.data?.data || data?.data;
      const newId =
        responseData?._id ||
        responseData?.task?._id ||
        responseData?.id ||
        data?._id ||
        "";
      if (newId) {
        setCreatedTaskId(newId);
      }
      setSuccessModal(true);
    },
  });

  const [isUploading, setIsUploading] = useState(false);

  const formik = useFormik<IWorkTalentForm>({
    initialValues: {
      title: "",
      description: "",
      deliverables: [],
      files: [],
      startDate: "",
      dueDate: "",
      amount: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      deliverables: Yup.array().of(Yup.string()),
      startDate: Yup.date().required("Start date is required"),
      dueDate: Yup.date()
        .min(Yup.ref("startDate"), "Due date must be after start date")
        .required("Due date is required"),
      amount: Yup.string().required("Amount is required"),
    }),
    onSubmit: async (values) => {
      setIsUploading(true);
      let uploadedFiles: { name: string; url: string; key: string; size: number; mimeType: string }[] = [];

      try {
        if (values.files && values.files.length > 0) {
          const formData = new FormData();
          values.files.forEach((file: File) => {
            formData.append("files", file);
          });

          const response = await httpService.post("/upload/files", formData);

          const rawData = response.data?.data || response.data;
          const uploadedUrls: string[] = Array.isArray(rawData)
            ? rawData.map((item: any) => (typeof item === "string" ? item : item?.url || ""))
            : [];

          uploadedFiles = values.files.map((file: File, index: number) => {
            const fileUrl = uploadedUrls[index] || "";
            let key = file.name;
            if (fileUrl) {
              try {
                const urlObj = new URL(fileUrl);
                key = urlObj.pathname.substring(urlObj.pathname.lastIndexOf("/") + 1) || file.name;
              } catch {
                key = fileUrl.substring(fileUrl.lastIndexOf("/") + 1) || file.name;
              }
            }

            return {
              name: file.name,
              url: fileUrl,
              key: key,
              size: file.size,
              mimeType: file.type || "application/octet-stream",
            };
          });

          if (uploadedFiles.some((f) => !f.url)) {
            setIsUploading(false);
            addToast({
              title: "Upload Failed",
              description: "One or more files failed to upload. Please try again.",
              color: "danger",
            });
            return;
          }
        }
      } catch (error) {
        setIsUploading(false);
        handleError(error as AxiosError);
        return; // stop execution if upload fails
      }

      setIsUploading(false);

      const talentId = searchParams.get("userId") || searchParams.get("talentId");
      const organizationId =
        (challengeData?.creator as any)?._id ||
        (challengeData?.creator as any) ||
        (challengeData as any)?.data?.creator?._id ||
        (challengeData as any)?.data?.creator ||
        "";

      // const resolvedChallengeId = (params.id as string) || searchParams.get("id") || challengeId || "";

      const formatToISO = (dateStr: string) => {
        if (!dateStr) return "";
        try {
          return new Date(dateStr).toISOString();
        } catch {
          return dateStr;
        }
      };

      const payload = {
        organizationId: organizationId,
        challengeId: challengeId,
        talentId: talentId,
        title: values.title,
        description: values.description,
        deliverables: values.deliverables,
        projectFiles: uploadedFiles,
        startDate: formatToISO(values.startDate),
        dueDate: formatToISO(values.dueDate),
        amount: Number(values.amount.replace(/[^0-9.]/g, "")),
        currency: "NGN",
      };

      console.log("Work Talent form payload: ", payload);
      createTalentTask.mutate(payload);
    },
  });

  const handleCloseModal = () => {
    setSuccessModal(false);
    if (createdTaskId) {
      router.push(`/dashboard/tasks_manager/${createdTaskId}/status`);
    } else {
      router.push("/dashboard/tasks_manager");
    }
  };

  const { values, setFieldValue } = formik;

  // File Upload Logic
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFieldValue("files", [...values.files, ...newFiles]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFieldValue("files", [...values.files, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    const updated = [...values.files];
    updated.splice(index, 1);
    setFieldValue("files", updated);
  };

  // Math for Escrow
  const parseAmount = (val: string) => {
    // Remove non-numeric except dot
    const clean = val.replace(/[^0-9.]/g, "");
    return parseFloat(clean) || 0;
  };

  const numericAmount = parseAmount(values.amount);
  const platformFee = numericAmount * 0.1;
  const totalEscrow = numericAmount + platformFee;

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num).replace("NGN", "₦");
  };

  let durationInDays = 0;
  if (values.startDate && values.dueDate) {
    const start = new Date(values.startDate);
    const end = new Date(values.dueDate);
    if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end >= start) {
      durationInDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    }
  }

  const StepHeader = ({ num, title }: { num: number; title: string }) => (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-full border border-[#596AFE] text-[#596AFE] flex items-center justify-center font-semibold text-sm">
        {num}
      </div>
      <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
    </div>
  );

  return (
    <div className="w-full mx-auto py-10">
      {user &&
        <h1 className="text-[28px] font-bold text-gray-900 mb-8">
          Continue working with {user?.firstName}
        </h1>
      }

      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} className="flex flex-col lg:flex-row gap-6 items-start">

          {/* Left Column - Form Sections */}
          <div className="flex-1 flex flex-col gap-6 w-full">

            {/* 1. Project Details */}
            <div className="border border-gray-100 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] rounded-2xl bg-white p-6">
              <StepHeader num={1} title="Project Details" />
              <div className="flex flex-col gap-4">
                <CustomInput
                  name="title"
                  label="Title"
                  placeholder="e.g. Test Project"
                />
                <div className="w-full">
                  <CustomEditor
                    name="description"
                    label="Description"
                    placeholder="Enter project description..."
                    height="200px"
                  />
                </div>
              </div>
            </div>

            {/* 2. Deliverables */}
            <div className="border border-gray-100 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] rounded-2xl p-6 bg-white">
              <StepHeader num={2} title="Deliverables" />
              <CustomStringArrayInput
                name="deliverables"
                label="Deliverables"
                placeholder="Type deliverable and press Enter"
              />
            </div>

            {/* 3. Project Files */}
            <div className="border border-gray-100 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] rounded-2xl p-6 bg-white">
              <StepHeader num={3} title="Project Files" />

              <div
                className={`w-full border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-colors ${isDragging ? "border-[#596AFE] bg-[#EEF0FF]" : "border-[#B0B7FF] bg-white hover:bg-gray-50"
                  }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.doc,image/*"
                />
                <div className="w-14 h-14 bg-[#EEF0FF] text-[#596AFE] rounded-full flex items-center justify-center mb-4">
                  <RiUploadCloudLine size={28} />
                </div>
                <p className="font-semibold text-gray-800 text-[15px] mb-1">Click to upload or drag and drop</p>
                <p className="text-gray-500 text-xs">PDF, DOCX (max 50MB)</p>
              </div>

              {/* File List */}
              {values.files.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {values.files.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-[#F8F9FE] rounded-lg">
                      <div className="flex items-center gap-3">
                        <RiFileTextLine size={20} className="text-[#1C1C36]" />
                        <span className="text-[13px] font-bold text-[#1C1C36]">{file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="text-red-500 hover:text-red-600 transition-colors ml-2"
                      >
                        <RiDeleteBin5Line size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Timeline and Compensation */}
            <div className="border border-gray-100 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] rounded-2xl p-6 bg-white">
              <StepHeader num={4} title="Timeline and Compensation" />
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <CustomDatePicker
                      name="startDate"
                      label="Start Date"
                      withTime={false}
                    />
                  </div>
                  <div className="flex-1">
                    <CustomDatePicker
                      name="dueDate"
                      label="Due Date"
                      withTime={false}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <CustomInput
                    name="amount"
                    label="Amount"
                    placeholder="e.g. 200000"
                  />
                </div>
              </div>
            </div>

            {/* Send Invitation Button */}
            <div className="flex justify-end mt-2">
              <CustomButton isLoading={createTalentTask.isPending || isUploading} type="submit" height="48px" className="px-10 bg-[#596AFE] text-white font-medium rounded-full">
                Send Invitation
              </CustomButton>
            </div>

          </div>

          {/* Right Column - Summary & About Talent */}
          <div className="w-full lg:w-[350px]">
            <div className="sticky top-6 flex flex-col gap-6">

              <div className="border border-gray-100 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] rounded-2xl p-6 bg-white">
                <h3 className="font-bold text-gray-900 text-[18px] mb-8">Summary</h3>

                {durationInDays > 0 && (
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-[13px] font-bold text-gray-800">Timeline</p>
                    <p className="text-[13px] font-bold text-gray-900">{durationInDays} Day{durationInDays !== 1 ? 's' : ''}</p>
                  </div>
                )}

                <div className="flex justify-between items-center mb-6">
                  <p className="text-[13px] font-bold text-gray-800">Amount</p>
                  <p className="text-[13px] font-bold text-gray-900">{formatCurrency(numericAmount)}</p>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <p className="text-[13px] font-bold text-gray-800">Platform fee (10%)</p>
                  <p className="text-[13px] font-bold text-gray-900">{formatCurrency(platformFee)}</p>
                </div>

                <div className="flex justify-between items-center mb-8 pt-6 border-t border-gray-100">
                  <p className="text-[13px] font-bold text-gray-800">Total To Escrow</p>
                  <p className="text-2xl font-bold text-[#596AFE]">{formatCurrency(totalEscrow)}</p>
                </div>

                <div className="bg-[#EEF0FF] p-5 rounded-xl mb-6 flex flex-col gap-2">
                  <p className="text-[13px] font-bold text-[#1C1C36]">What Happens Next?</p>
                  <p className="text-[13px] text-[#1C1C36] leading-[1.5]">
                    {user?.firstName} will receive this invitation and can choose to accept, request changes or decline. You will be notified once they respond.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-[#596AFE] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <RiCheckLine size={14} />
                    </div>
                    <p className="text-[13px] text-gray-700 leading-snug">Payment is not made yet.</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-[#596AFE] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <RiCheckLine size={14} />
                    </div>
                    <p className="text-[13px] text-gray-700 leading-snug">You can withdraw this invitation if they haven't accepted</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-[#596AFE] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <RiCheckLine size={14} />
                    </div>
                    <p className="text-[13px] text-gray-700 leading-snug">Once they accept, you will be able to fund escrow.</p>
                  </div>
                </div>
              </div>

              {/* About Talent */}
              <div className="flex flex-col gap-3">
                <h3 className="font-bold text-gray-900 text-[16px]">About Talent</h3>
                <div className="border border-gray-200 rounded-2xl p-4 bg-[#F8F9FE] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                      {/* <img src={user?.profilePicture} alt="Talent Avatar" className="w-full h-full object-cover" /> */}
                      <Avatar showFallback name={user?.fullName} src={user?.profilePicture}>
                      </Avatar>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[14px] font-bold text-gray-900">{`${user?.lastName} ${user?.firstName}`}</p>
                      <p className="text-[12px] text-gray-600">{user?.Interests[0]}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => router.push(`/dashboard/profile/${talentId}`)}
                  type="button" className="text-[13px] font-medium text-[#596AFE] border border-[#596AFE] rounded-full px-4 py-1.5 hover:bg-white transition-colors">
                    View Profile
                  </button>
                </div>
              </div>

            </div>
          </div>

        </form>
      </FormikProvider>

      {/* Success Modal */}
      <ModalLayout isOpen={successModal} onClose={handleCloseModal} size="sm">
        <div className="flex flex-col items-center justify-center p-6 text-center gap-4">
          <div className="w-16 h-16 bg-[#EEF0FF] rounded-full flex items-center justify-center text-[#596AFE] mb-2">
            <RiCheckLine size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Invitation Sent</h2>
          <p className="text-gray-500 text-sm mb-4">
            Your invitation to {user?.fullName} has been successfully sent. You will be notified once they review it.
          </p>
          <CustomButton fullWidth onClick={handleCloseModal}>
            Continue
          </CustomButton>
        </div>
      </ModalLayout>
    </div>
  );
}
