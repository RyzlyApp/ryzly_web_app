"use client"
import useAuth from "@/hook/useAuth"
import { FormikProvider } from "formik"
import { CustomButton, CustomInput } from "../custom"
import { Loader } from "../shared"

export default function LoginForm() {

  const { formik, loginMutation } = useAuth()

  return (
    <Loader loading={loginMutation.isPending || loginMutation.isSuccess} >
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
        </form>
      </FormikProvider>
    </Loader>
  )
}
