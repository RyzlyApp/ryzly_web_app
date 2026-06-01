"use client";

import { FormikProvider } from "formik";

import React from "react";
import { ImagePicker } from "../shared";
import { CustomEditor, CustomInput } from "../custom";
import { addToast, Button, Input } from "@heroui/react";
import useCommunity from "@/hook/useCommunities";
import CustomMultiSelectTag from "../shared/tagInput";
import { COMMUNITY_TABS } from "../communities/communityContent";

const SELECT_OPTIONS = COMMUNITY_TABS
    .filter(tab => tab.tag !== '')
    .map(tab => ({
        label: tab.label,
        value: tab.tag
    }));

const CreateCommunityForm = ({ onClose }: { onClose: () => void }) => {
    const { formikCommunity: formik, image, setImage, isCreating } = useCommunity();

    const handleCreate = async () => {
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
                description: "Community created successfully",
                color: "success",
            });
            onClose(); // ✅ close modal after successful submission
        } catch {
            addToast({
                title: "Error",
                description: "Error creating community",
                color: "danger",
            });
            // errors handled inside the hook via addToast
        }
    };

    return (
        <FormikProvider value={formik}>
            <div className="space-y-5 py-4">
                <ImagePicker
                    image={image}
                    setImage={(file) => {
                        setImage(file);
                        formik.setFieldValue("thumbnail", file);
                    }}
                    preview={image ? URL.createObjectURL(image) : formik.values.thumbnail}
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
                {/* <TagsInput {...formik.getFieldProps("tags")} /> */}
                <CustomMultiSelectTag name="tags" options={SELECT_OPTIONS} />
                {/* SUBMIT */}
                <div className="flex justify-end">
                    <Button
                        isLoading={isCreating || formik.isSubmitting}
                        onPress={handleCreate}
                        className="bg-[#5160E7] text-white rounded-full px-6"
                    >
                        {isCreating ? "Creating Community" : "Create Community"}
                    </Button>
                </div>
            </div>
        </FormikProvider >
    );
};

export default CreateCommunityForm;