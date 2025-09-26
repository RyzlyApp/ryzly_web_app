"use client";

import { CustomButton } from "@/components/custom";
import { Loader } from "@/components/shared";
import useAuth from "@/hook/useAuth";
import { InputOtp } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import React, { FormEvent } from "react";

export default function VerifyPage() {
  const [value, setValue] = React.useState("");
  const query = useSearchParams();
  const email = query?.get('email') as string;
  const userid = query?.get('userId') as string;

  const { verifyMutation, userDetails } = useAuth()


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    verifyMutation.mutate({
      userId: userid,
      token: value
    })
  }

  return (
    <Loader loading={verifyMutation?.isPending || userDetails?.isPending} >
      <form onSubmit={(e) => handleSubmit(e)} className="w-full max-w-[450px] gap-4 bg-white text-violet-300 rounded-3xl p-4 flex flex-col">
        <div className="w-full flex flex-col items-center text-center justify-center gap-4">

          {/* Header */}
          <div className="w-full flex flex-col gap-2 items-center">
            <p className="text-2xl font-bold">Verify your email</p>
            <p className="text-violet-300 max-w-[266px]">
              Enter the verification code that was sent to {email}
            </p>
          </div>

          {/* OTP Input */}
          <InputOtp
            length={6}
            value={value}
            size="lg"
            allowedKeys="^[a-zA-Z0-9]*$" // restricts to letters
            onValueChange={setValue}
          />

          {/* Actions */}
          <div className="w-full flex lg:flex-row lg:gap-0 gap-4 flex-col-reverse justify-between items-center">
            <button type="button" className="font-semibold">Resend OTP</button>
            <div className=" lg:flex hidden " > 
            <CustomButton isDisabled={value?.length === 6 ? false : true} type="submit" >{`Verify`}</CustomButton>
            </div>
            <div className=" lg:hidden flex w-full " > 
            <CustomButton fullWidth={true} isDisabled={value?.length === 6 ? false : true} type="submit" >{`Verify`}</CustomButton>
            </div>
          </div>
        </div>
      </form>
    </Loader>
  );
}
