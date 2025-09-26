"use client";

import React from "react"; 
import useProfile from "@/hook/useProfile";
import { UpdateUserInfo } from "@/components/forms";

const PersonalInfo = () => {

  const { formik, isLoading: loading } = useProfile()

  return (
    <div className="bg-white rounded-lg shadow p-5 flex flex-col gap-6 ">
      <h4 className="lg:block hidden text-sm font-bold mb-6">Personal Info</h4>
      <UpdateUserInfo formik={formik} isLoading={loading} />
    </div>
  );
};

export default PersonalInfo;
