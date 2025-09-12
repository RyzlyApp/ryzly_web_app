"use client"
import { CustomButton } from "@/components/custom";
import { InputOtp } from "@heroui/react";
import React from "react";

export default function VerifyPage() {
    const [value, setValue] = React.useState("");


    return (
        <div className=" w-full max-w-[450px] gap-4 bg-white text-violet-300 rounded-3xl p-4 flex flex-col " >

            <div className=" w-full flex flex-col items-center text-center justify-center gap-4 " >
                <div className=" w-full flex flex-col gap-2 items-center " >
                    <p className=" text-2xl font-bold " >Verify your email</p>
                    <p className=" text-violet-300 max-w-[266px] " >Enter the verification code that was sent to ********ais@mail.com</p>
                </div> {/* ✅ Make each OTP input expand */}
                <InputOtp
                    length={6}
                    value={value}
                    size="lg" 
                    className="otp-wrapper input"
                    onValueChange={setValue}
                />
                <div className=" w-full flex justify-between items-center " >
                    <button className=" font-semibold " >
                        Resend OTP
                    </button>
                    <CustomButton >
                        {`Verify`}
                    </CustomButton>
                </div>
            </div>
            {/* global CSS override for the OTP inputs */}
            <style jsx global>{`
        /* make the otp-wrapper a flex row and make each internal input expand */
        .otp-wrapper {
          display: flex;
          gap: 1rem;
        }

        /* target any input inside the wrapper */
        .otp-wrapper input {
          flex: 1;
          min-width: 0;            /* allow flex shrinking */
          height: 48px;
          padding: 0.25rem 0;
          text-align: center;
          font-size: 1.125rem;
          border-radius: 0.5rem;
          border: 1px solid #e6e6e6;
          background: #fff;
        }

        /* optional: responsive tweak for very narrow screens */
        @media (max-width: 420px) {
          .otp-wrapper input {
            height: 44px;
            font-size: 1rem;
          }
        }
      `}</style>
        </div>
    )
}