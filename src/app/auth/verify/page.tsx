"use client";

import { CustomButton } from "@/components/custom";
import { InputOtp } from "@heroui/react";
import React from "react";

export default function VerifyPage() {
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full max-w-[450px] gap-4 bg-white text-violet-300 rounded-3xl p-4 flex flex-col">
      <div className="w-full flex flex-col items-center text-center justify-center gap-4">

        {/* Header */}
        <div className="w-full flex flex-col gap-2 items-center">
          <p className="text-2xl font-bold">Verify your email</p>
          <p className="text-violet-300 max-w-[266px]">
            Enter the verification code that was sent to ********ais@mail.com
          </p>
        </div>

        {/* OTP Input */}
        <InputOtp
          length={6}
          value={value}
          size="lg"
          onValueChange={setValue} 
        />

        {/* Actions */}
        <div className="w-full flex justify-between items-center">
          <button className="font-semibold">Resend OTP</button>
          <CustomButton>{`Verify`}</CustomButton>
        </div>
      </div>
    </div>
  );
}
