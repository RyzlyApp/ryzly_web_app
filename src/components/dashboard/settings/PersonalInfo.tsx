"use client";

import React from "react";
import useProfile from "@/hook/useProfile";
import { OrganisationForm, UpdateUserInfo } from "@/components/forms";
import { useParams } from "next/navigation";
import useOrganisation from "@/hook/useOrganisation";
import { useAtom } from "jotai";
import { organisationAtom } from "@/helper/atom/organization";

const PersonalInfo = () => {
    const { formik, isLoading: loading, image, setImage } = useProfile();

    const {
        formik: formikOrgnisation,
        image: organisationImage,
        setImage: setOrganisationImage,
        isLoading,
    } = useOrganisation(true);

    const param = useParams();
    const organisationId = param.organisationId;

    const AWS_BUCKET_NAME = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string;
    const AWS_REGION = process.env.NEXT_PUBLIC_AWS_REGION as string;
    const [data] = useAtom(organisationAtom);

    console.log(formikOrgnisation);
    

    return (
        <div className="bg-white rounded-lg shadow p-5 flex flex-col gap-6 ">
            <h4 className="lg:block hidden text-sm font-bold mb-6">
                {organisationId ? "Organisation" : "Personal"} Info
            </h4>
            {organisationId && (
                <OrganisationForm
                    preview={`https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${data?.profilePicture}`}
                    formik={formikOrgnisation}
                    isLoading={isLoading}
                    image={organisationImage}
                    setImage={setOrganisationImage}
                />
            )}
            {!organisationId && (
                <UpdateUserInfo
                    image={image}
                    setImage={setImage}
                    formik={formik}
                    isLoading={loading}
                />
            )}
        </div>
    );
};

export default PersonalInfo;
