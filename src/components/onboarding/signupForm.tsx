"use client"

import { CustomButton, CustomInput, CustomImage } from "../custom" // 👈 make sure CustomImage is exported
import useAuth from "@/hook/useAuth"
import { FormikProvider } from "formik"
import { useRouter } from "next/navigation"

export default function SignupForm() {
  const { formik } = useAuth()
  const router = useRouter()

  return (
    <FormikProvider value={formik}>
      <div className="w-full flex flex-col items-center justify-center gap-10">
        <div className="w-full flex flex-col gap-2 items-center">
          <div className="w-10 h-10 relative">
            <CustomImage
              src="/images/bluesmile.png"
              alt="blue smile"
              fillContainer
              className="rounded-full"
            />
          </div>
          <p className="text-4xl font-bold">{`Let's go`}</p>
        </div>

        <div className="w-full max-w-[500px] flex gap-4 flex-col">
          <CustomInput
            placeholder="Enter your mail"
            label="Email"
            name="email"
          />
          <CustomInput
            placeholder="Confirm your email address"
            label="Confirm your email address"
            name="confirmEmail"
          />

          <div className="flex w-full justify-center">
            <p className="text-sm">Or</p>
          </div>

          <div className="w-full max-w-[500px] flex gap-3">
            <CustomButton variant="outline" fullWidth size="lg">
              <div className="flex gap-2 items-center">
                <div className="w-6 h-6 relative">
                  <CustomImage
                    src="/images/google.png"
                    alt="google logo"
                    fillContainer
                  />
                </div>
                Continue with Google
              </div>
            </CustomButton>

            <CustomButton variant="outline" fullWidth size="lg">
              <div className="flex gap-2 items-center">
                <div className="w-6 h-6 relative">
                  <CustomImage
                    src="/images/linkedin.png"
                    alt="linkedin logo"
                    fillContainer
                  />
                </div>
                Continue with LinkedIn
              </div>
            </CustomButton>
          </div>
        </div>

        <div className="w-full flex justify-between items-center">
          <CustomButton variant="flat" onClick={() => router.back()}>
            {`Back`}
          </CustomButton>
          <CustomButton onClick={() => router.push("/auth/verify")}>
            {`Continue`}
          </CustomButton>
        </div>
      </div>
    </FormikProvider>
  )
}
