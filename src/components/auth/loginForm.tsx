"use client"
import useAuth from "@/hook/useAuth"
import { FormikProvider } from "formik"
import { CustomButton, CustomInput } from "../custom"

export default function LoginForm() {

  const { formik, loginMutation } = useAuth()

  return (
    <FormikProvider value={formik} >
      <form onSubmit={formik.handleSubmit} className="w-full max-w-[450px] shadow-2xs bg-white rounded-3xl p-[40px] flex flex-col gap-6 items-center">
        <p className="text-3xl font-bold">Login to your account</p>

        {/* Email + password fields */}
        <div className="w-full flex flex-col gap-4">
          <CustomInput
            name="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
          /> 
        </div>

        {/* Submit button */}
        <CustomButton isLoading={loginMutation.isPending} variant="primary" fullWidth size="lg" type="submit">
          Log In
        </CustomButton>

        {/* Divider */}
        {/* <div className="flex w-full justify-center">
          <p className="text-sm text-gray-500">Or</p>
        </div> */}

        {/* Social login buttons */}
        {/* <div className="w-full flex flex-col gap-4">
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
        </div> */}
      </form>
    </FormikProvider>
  )
}
