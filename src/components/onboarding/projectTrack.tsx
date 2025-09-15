"use client"

import { useFetchData } from "@/hook/useFetchData"
import { CustomButton, CustomImage } from "../custom" 
import { useRouter } from "next/navigation" 
import { URLS } from "@/helper/services/urls"
import { ITrack } from "@/helper/model/interest"
import { FormikProps } from "formik"
import { IUserForm } from "@/helper/model/auth" 
import { Loader } from "../shared"

export default function ProjectTrack(
  {
    formik
  }: {
    formik: FormikProps<IUserForm>
  }) { 


  const router = useRouter() 

  const { data = [], isLoading } = useFetchData<Array<ITrack>>({ name: "track", endpoint: URLS.TRACK, });

  const handleContinue = () => {
    // router.push(`/auth/onboarding?type=signup`)
    formik.handleSubmit()
  }
 
  return (
    <div className="w-full flex flex-col items-center justify-center gap-10">
      {/* Header */}
      <div className="w-full flex flex-col gap-4 items-center">
        <CustomImage src="/images/bluesmile.png" alt="blue smile" width={40} height={40} />
        <p className="text-2xl lg:text-4xl font-bold">Project Track</p>
      </div>

      <Loader loading={isLoading} > 
        <div className="w-full max-w-[500px] max-h-[200px] overflow-y-auto flex flex-wrap gap-2">
          {data.map((item, index) => (
            <button
              key={index}
              onClick={() => formik.setFieldValue("track", item?.name)}
              className={`w-fit px-2 text-xs cursor-pointer py-1 flex flex-col justify-center items-center gap-2 rounded-3xl border transition
              ${formik?.values?.track === item?.name ? "bg-primary text-white" : "bg-[#E8E7ED66] text-black"}
            `}
            >
              <p className="font-medium">{item?.name}</p>
            </button>
          ))} 
        </div>
      </Loader>

      {/* Footer */}
      <div className="w-full flex justify-between items-center">
        <CustomButton variant="flat" onClick={() => router.back()}>
          Back
        </CustomButton>
        <CustomButton onClick={handleContinue}>
          Continue
        </CustomButton>
      </div>
    </div>
  )
}
