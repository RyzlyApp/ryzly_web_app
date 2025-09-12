"use client"
import useAuth from "@/hook/useAuth"
import { FormikProvider } from "formik"
import { CustomButton, CustomInput, CustomImage } from "../custom"

export default function LoginForm() {
  const { formik } = useAuth()

  return (
    <FormikProvider value={formik}>
      <div className="w-full max-w-[580px] shadow-2xs bg-white rounded-3xl p-[40px] flex flex-col gap-6 items-center">
        <p className="text-3xl font-bold">Login to your account</p>

        {/* Email + password fields */}
        <div className="w-full flex flex-col gap-4">
          <CustomInput
            name="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
          />
          <CustomInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
          />
        </div>

        {/* Submit button */}
        <CustomButton variant="primary" fullWidth size="lg" type="submit">
          Log In
        </CustomButton>

        {/* Divider */}
        <div className="flex w-full justify-center">
          <p className="text-sm text-gray-500">Or</p>
        </div>

        {/* Social login buttons */}
        <div className="w-full flex flex-col gap-4">
          <CustomButton variant="outline" size="lg">
            <div className="flex gap-2 items-center">
              <CustomImage
                src="/images/google.png"
                alt="Google logo"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              Continue with Google
            </div>
          </CustomButton>

          <CustomButton variant="outline" size="lg">
            <div className="flex gap-2 items-center">
              <CustomImage
                src="/images/linkedin.png"
                alt="LinkedIn logo"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              Continue with LinkedIn
            </div>
          </CustomButton>
        </div>
      </div>
    </FormikProvider>
  )
}
