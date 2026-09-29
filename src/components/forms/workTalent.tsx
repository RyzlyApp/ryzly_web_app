"use client";

import React, { useRef, useState } from "react";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import {
  CustomInput,
  CustomEditor,
  CustomStringArrayInput,
  CustomButton,
} from "@/components/custom";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { ModalLayout } from "../shared";
import { RiUploadCloudLine, RiDeleteBin5Line, RiFileTextLine, RiCheckLine } from "react-icons/ri";

interface IWorkTalentForm {
  title: string;
  description: string;
  deliverables: string[];
  files: File[];
  timeline: string;
  amount: string;
}

export default function WorkTalentForm({ talentName = "Joy" }: { talentName?: string }) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  
  const [successModal, setSuccessModal] = useState(false);

  const formik = useFormik<IWorkTalentForm>({
    initialValues: {
      title: "",
      description: "",
      deliverables: [],
      files: [],
      timeline: "",
      amount: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      deliverables: Yup.array().of(Yup.string()),
      timeline: Yup.string().required("Timeline is required"),
      amount: Yup.string().required("Amount is required"),
    }),
    onSubmit: (values) => {
      console.log("Work Talent form submitted: ", values);
      setSuccessModal(true);
    },
  });

  const handleCloseModal = () => {
    setSuccessModal(false);
    // Redirect to the status/details page
    router.push(`/dashboard/challenges/${params.id}/tasks/${params.slug}/grading/work_talent/status?userId=${userId}`);
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
      <h1 className="text-[28px] font-bold text-gray-900 mb-8">
        Continue working with {talentName}
      </h1>

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
                className={`w-full border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  isDragging ? "border-[#596AFE] bg-[#EEF0FF]" : "border-[#B0B7FF] bg-white hover:bg-gray-50"
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
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <CustomInput 
                    name="timeline" 
                    label="Timeline" 
                    placeholder="e.g. 14 Days" 
                  />
                </div>
                <div className="flex-1">
                  <CustomInput 
                    name="amount" 
                    label="Amount" 
                    placeholder="e.g. 200000" 
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Summary */}
          <div className="w-full lg:w-[350px]">
            <div className="sticky top-6 flex flex-col gap-6">
              
              <div className="border border-gray-100 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] rounded-2xl p-6 bg-white">
                <h3 className="font-bold text-gray-900 text-[18px] mb-8">Summary</h3>
                
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

                <div className="bg-[#F8F9FE] p-5 rounded-xl mb-8 flex flex-col gap-3">
                  <p className="text-[13px] text-[#1C1C36] leading-[1.6]">
                    To activate this agreement, the total amount will be securely held in escrow until the deliverables are approved.
                  </p>
                  <p className="text-[13px] font-bold text-[#1C1C36] leading-[1.6]">
                    The user has to accept the Invitation before you can fund the escrow
                  </p>
                </div>

                <CustomButton type="submit" fullWidth height="48px">
                  Send Invitation
                </CustomButton>
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
            Your invitation to {talentName} has been successfully sent. You will be notified once they review it.
          </p>
          <CustomButton fullWidth onClick={handleCloseModal}>
            Continue
          </CustomButton>
        </div>
      </ModalLayout>
    </div>
  );
}
