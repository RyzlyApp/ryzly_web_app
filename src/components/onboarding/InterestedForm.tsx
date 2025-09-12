"use client";

import { CustomButton, CustomInput, CustomImage } from "../custom";
import useAuth from "@/hook/useAuth";
import { FormikProvider } from "formik";
import { useRouter } from "next/navigation";

export default function InterestedForm() {
  const { formik } = useAuth();
  const router = useRouter();

  return (
    <FormikProvider value={formik}>
      <div className="w-full flex flex-col items-center justify-center gap-10">
        
        {/* Header Section */}
        <div className="w-full flex flex-col gap-4 items-center">
          <div className="w-10 h-10">
            {/* ✅ Replaced <img /> with CustomImage */}
            <CustomImage
              src="/images/bluesmile.png"
              alt="blue smile logo"
              className="w-full h-full"
              width={40}
              height={40}
            />
          </div>
          <p className="text-violet-300">{`Chidi! That's a nice name`}</p>
          <p className="text-4xl font-bold">What are you interested in?</p>
        </div>

        {/* Input */}
        <div className="w-full max-w-[500px] flex gap-4">
          <CustomInput placeholder="your interests" label="Work" name="email" />
        </div>

        {/* Actions */}
        <div className="w-full flex justify-between items-center">
          <CustomButton
            variant="flat"
            onClick={() => router.push("/auth/onboarding?type=signup")}
          >
            {`Skip`}
          </CustomButton>
          <CustomButton
            onClick={() => router.push("/auth/onboarding?type=signup")}
          >
            {`Continue`}
          </CustomButton>
        </div>
      </div>
    </FormikProvider>
  );
}
