"use client";

import { CustomButton, CustomImage } from "../custom"; 
import { FormikProps } from "formik";
import { useRouter } from "next/navigation";
import CustomMultiSelect from "../custom/customMultipleSelect";
import { IUserForm } from "@/helper/model/auth";
import { URLS } from "@/helper/services/urls";
import { useFetchData } from "@/hook/useFetchData"; 
import { IInterest } from "@/helper/model/interest";
import { Loader } from "../shared";
import { convertDataForSelect } from "@/helper/utils/convertDataForSelect";

export default function InterestedForm(
  {
    formik
  } : {
    formik: FormikProps<IUserForm>
  }
) {

  const router = useRouter();

  const { data = [], isLoading } = useFetchData<IInterest[]>({ name: "interest", endpoint: URLS.INTEREST });

  const options = convertDataForSelect(data, ["name", "name"]);

  const clickHandler = () => { 
      formik?.handleSubmit() 
  }


  return (
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
        <p className="text-violet-300 lg:text-xs text-base ">{`${formik.values?.fullName}! That's a nice name`}</p>
        <p className="text-2xl lg:text-4xl font-bold">What are you interested in?</p>
      </div>

      {/* Input */}
      <Loader loading={isLoading} >
        <div className="w-full max-w-[500px] flex gap-4">
          <CustomMultiSelect placeholder="your interests" label="Interests" name="interests" options={options} />
        </div>

      </Loader>
      {/* Actions */}
      <div className="w-full flex justify-between items-center">
        <CustomButton
          variant="secondary"
          onClick={() => router.back()}
        >
          {`Back`}
        </CustomButton>
        <CustomButton
        variant="primary"
          onClick={() => clickHandler()}
        >
          {`Submit`}
        </CustomButton>
      </div>
    </div>
  );
}

