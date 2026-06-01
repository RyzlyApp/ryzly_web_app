import { CustomRadio } from '@/components/custom/customRadio';
import CustomModal from '@/components/shared/modalLayout'
import useCommunities from '@/hook/useCommunities';
import { useCommunityGroup } from '@/hook/useCommunitiesGroup';
import { RadioGroup, Radio } from "@heroui/radio";
import { Button, Textarea } from '@heroui/react';
import { FormikProvider } from 'formik';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'


export const reportOptions = [
  "Plagiarized or copied material",
  "Unclear or misleading brief",
  "Broken links or missing assets",
  "Spam or promotional-only content",
  "Other",
]

const ReportCommunityModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams()

  const communityId = params.id;
  const groupId = searchParams.get('group')


  const { formikCommunityReport } = useCommunities();
  const { formikGroupReport } = useCommunityGroup(true, communityId);

  const formik = groupId ? formikGroupReport : formikCommunityReport;

  const handleSubmit = async () => {
    // Validate first — don't submit if invalid
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      formik.setTouched(
        Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {})
      );
      return;
    }

    try {
      await formik.submitForm(); // triggers onSubmit in formik → createCommunity
      onClose(); // ✅ close modal after successful submission
    } catch {
      // errors handled inside the hook via addToast
    }
  };



  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title='Report Community' size='lg' className='p-0'>
      <FormikProvider value={formik}>
        <div className='flex flex-col items-center mt-0'>
          <p className='text-center text-base font-semibold w-[50%]'>Why are you reporting this community?.</p>

          <div className='mt-6 w-full'>
            <RadioGroup
              value={formik.values.content}
              onValueChange={(val) => formik.setFieldValue("content", val)}
              onBlur={() => formik.setFieldTouched('content', true)}
            >
              {reportOptions.map((option, index) => (
                <CustomRadio key={index} value={option}>{option}</CustomRadio>
              ))}
            </RadioGroup>
            {formik.touched.content && formik.errors.content && (
              <p className="text-danger text-xs mt-2 ml-4">{formik.errors.content}</p >
            )}

            {formik.values.content === "Other" && (
              <div className='px-4 mt-2'>
                <Textarea
                  name="content"
                  labelPlacement="outside"
                  placeholder="Please describe the issue"
                  variant="flat"
                  value={formik.values.customDescription}
                  onChange={(e) => formik.setFieldValue("customDescription", e.target.value)}
                  onBlur={() => formik.setFieldTouched("customDescription", true)}
                  isInvalid={
                    formik.touched.customDescription &&
                    Boolean(formik.errors.customDescription)
                  }
                  errorMessage={
                    formik.touched.customDescription
                      ? String(formik.errors.customDescription)
                      : undefined
                  }
                  className='focus:outline-none focus-within:outline-none rounded-2xl border-0 bg-[#F5F5F5]'
                  classNames={{
                    inputWrapper: 'h-[500px]'
                  }}
                />
              </div>
            )}
            <div className='flex px-4'>
              <Button
                type="button"
                onPress={handleSubmit}
                isLoading={formik.isSubmitting}
                isDisabled={formik.isSubmitting || !formik.isValid}
                className="flex ml-auto bg-[#5160E7] text-sm text-white px-8 py-2 my-6 rounded-full hover:bg-[#4552C4] transition-colors"
              >
                {formik.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      </FormikProvider>
    </CustomModal>
  )
}

export default ReportCommunityModal