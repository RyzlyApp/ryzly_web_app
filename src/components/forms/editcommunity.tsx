"use client";

import { FormikProvider } from "formik";

import React from "react";
import { ImagePicker } from "../shared";
import { CustomEditor, CustomInput } from "../custom";
import { addToast, Button } from "@heroui/react";
import TagsInput from "../shared/tagInput";
import useCommunity from "@/hook/useCommunities";

const EditCommunityForm = ({ onClose }: { onClose: () => void }) => {
    const { formikCommunity: formik, image, setImage, isEditing } = useCommunity(undefined, true);

    const handleEdit = async () => {
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
            addToast({
                title: "Success",
                description: "Community edited successfully",
                color: "success",
            });
            onClose(); // ✅ close modal after successful submission
        } catch {
            addToast({
                title: "Error",
                description: "Error editing community",
                color: "danger",
            });
            // errors handled inside the hook via addToast
        }
    };
    const preview = image
        ? URL.createObjectURL(image)
        : formik.values.thumbnail;

    return (
        <FormikProvider value={formik}>
            <div className="space-y-5 py-4">
                <ImagePicker
                    image={image}
                    setImage={(file) => {
                        setImage(file);
                        formik.setFieldValue("thumbnail", file);
                    }}
                    preview={preview}
                />
                <CustomInput
                    label="Community Name"
                    type="text"
                    {...formik.getFieldProps("title")}
                />
                <div>
                    <label className="text-sm font-medium">
                        Description
                    </label>
                    {/* If you have a rich editor */}
                    <CustomEditor
                        {...formik.getFieldProps("description")}
                    />
                </div>
                <CustomInput
                    label="Meeting Link"
                    type="text"
                    {...formik.getFieldProps("meetingLink")}
                />
                <TagsInput {...formik.getFieldProps("tags")} />
                {/* SUBMIT */}
                <div className="flex justify-end">
                    <Button
                        isLoading={isEditing || formik.isSubmitting}
                        onPress={handleEdit}
                        className="bg-[#5160E7] text-white rounded-full px-6"
                    >
                        {isEditing ? "Editing Community" : "Edit Community"}
                    </Button>
                </div>
            </div>
        </FormikProvider >
    );
};

export default EditCommunityForm;