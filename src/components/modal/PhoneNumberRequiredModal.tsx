"use client";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { CustomButton, CustomPhoneInput } from "@/components/custom";
import httpService from "@/helper/services/httpService";
import { addToast } from "@heroui/toast";
import { handleError } from "@/helper/utils/hanlderAxoisError";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IUser } from "@/helper/model/user";

interface PhoneNumberRequiredModalProps {
    isOpen: boolean;
    userId: string;
    onSuccess: (updatedUser?: IUser) => void;
}

const validationSchema = Yup.object({
    phone: Yup.string()
        .required("Phone number is required")
        .test(
            "is-valid-phone",
            "Please enter a valid phone number",
            (value) => !!value && isValidPhoneNumber(value)
        ),
});

export default function PhoneNumberRequiredModal({
    isOpen,
    userId,
    onSuccess,
}: PhoneNumberRequiredModalProps) {
    const updateMutation = useMutation({
        mutationFn: (data: { phone: string; country?: string }) =>
            httpService.put(`/user/${userId}`, data),
        onSuccess: ({ data }) => {
            addToast({
                title: "Success",
                description: data?.message || "Phone number updated successfully",
                color: "success",
            });
            onSuccess(data?.data);
        },
        onError: (error: AxiosError) => {
            handleError(error);
        },
    });

    const formik = useFormik({
        initialValues: {
            phone: "",
            country: "",
        },
        validationSchema,
        onSubmit: (values) => {
            if (!userId) return;
            const payload: { phone: string; country?: string } = {
                phone: values.phone,
            };
            if (values.country) {
                payload.country = values.country;
            }
            updateMutation.mutate(payload);
        },
    });

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {}}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            hideCloseButton={true}
            backdrop="blur"
            size="md"
        >
            <ModalContent>
                <ModalHeader className="flex flex-col text-center pt-6">
                    <h3 className="text-xl font-bold text-gray-900">
                        Phone Number Required
                    </h3>
                    <p className="text-sm font-normal text-gray-500 mt-1">
                        Please provide your phone number to continue.
                    </p>
                </ModalHeader>
                <ModalBody className="pb-6">
                    <FormikProvider value={formik}>
                        <form
                            onSubmit={formik.handleSubmit}
                            className="flex flex-col gap-4"
                        >
                            <CustomPhoneInput
                                name="phone"
                                label="Phone Number"
                                placeholder="Enter phone number"
                            />
                            <CustomButton
                                type="submit"
                                isLoading={updateMutation.isPending}
                                fullWidth={true}
                            >
                                Save & Continue
                            </CustomButton>
                        </form>
                    </FormikProvider>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
