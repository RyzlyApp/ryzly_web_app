"use client";

import { CustomButton, CustomInput, CustomImage } from "../custom"; // 👈 make sure CustomImage is exported
import useAuth from "@/hook/useAuth";
import { FormikProvider } from "formik";

export default function SignupForm() {
  const { formikSignup, signupMutation } = useAuth();

  return (
    <FormikProvider value={formikSignup}>
      <form
        onSubmit={formikSignup.handleSubmit}
        className="w-full max-w-[580px] shadow-2xs bg-white rounded-3xl p-[40px] flex flex-col gap-6 items-center"
      >
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
            type="email"
          />
          <CustomInput
            placeholder="Confirm your email address"
            label="Confirm your email address"
            name="confirmemail"
            type="email"
          />

          {/* <div className="flex w-full justify-center">
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

            <CustomButton type="submit" variant="outline" fullWidth size="lg">
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
          </div> */}
        </div>

        <CustomButton
          isLoading={signupMutation.isPending}
          variant="primary"
          fullWidth
          size="lg"
          type="submit"
        >
          Signup
        </CustomButton>
        <div className=" text-sm font-semibold pt-2 ">
          By Continue{" "} you agree to
          <span className=" cursor-pointer text-primary ">Terms of use</span>{" "}
          and{" "}
          <span className=" cursor-pointer text-primary ">Privacy Policy</span>{" "}
        </div>
      </form>
    </FormikProvider>
  );
}
