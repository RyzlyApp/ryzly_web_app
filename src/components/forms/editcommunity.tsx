"use client";

import { FormikProvider } from "formik";

import React from "react";
import { ImagePicker } from "../shared";
import { CustomEditor, CustomInput } from "../custom";
import { addToast, Button, Select, SelectItem } from "@heroui/react";
import TagsInput from "../shared/tagInput";
import useCommunity from "@/hook/useCommunities";
import { COMMUNITY_TABS } from "../communities/communityContent";

const SELECT_OPTIONS = COMMUNITY_TABS
    .filter(tab => tab.tag !== '')
    .map(tab => ({
        label: tab.label,
        value: tab.tag
    }));

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
                <div>

                    <ImagePicker
                        image={image}
                        setImage={(file) => {
                            setImage(file);
                            formik.setFieldValue("thumbnail", file);
                        }}
                        preview={preview}
                    />
                    <span className="text-xs text-red-500">{formik.errors.thumbnail}</span>
                </div>
                <div>
                    <CustomInput
                        label="Community Name"
                        type="text"
                        {...formik.getFieldProps("title")}
                    />
                    <span className="text-xs text-red-500">{formik.errors.title}</span>
                </div>
                <div>
                    <label className="text-sm font-medium">
                        Description
                    </label>
                    {/* If you have a rich editor */}
                    <CustomEditor
                        {...formik.getFieldProps("description")}
                    />
                    <span className="text-xs text-red-500">{formik.errors.description}</span>
                </div>
                <div>
                    <CustomInput
                        label="Meeting Link"
                        type="text"
                        {...formik.getFieldProps("meetingLink")}
                    />
                    <span className="text-xs text-red-500">{formik.errors.title}</span>
                </div>
                <div>
                    <TagsInput label="Tabs" {...formik.getFieldProps("tags")} />
                    <span className="text-xs text-red-500">{formik.errors.title}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Category</label>
                    <Select
                        placeholder="Select a category"
                        selectedKeys={formik.values.category ? [formik.values.category] : []}
                        onSelectionChange={(keys) => {
                            const val = Array.from(keys)[0] as string;
                            formik.setFieldValue("category", val ?? "");
                        }}
                        onBlur={() => formik.setFieldTouched("category", true)}
                        classNames={{
                            trigger: "bg-white border border-gray-300 rounded-xl h-[45px]",
                            value: "text-gray-900 text-sm",
                        }}
                    >
                        {SELECT_OPTIONS.map((option) => (
                            <SelectItem key={option.value} textValue={option.label}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </Select>
                    {formik.touched.category && formik.errors.category && (
                        <span className="text-xs text-red-500">{formik.errors.category as string}</span>
                    )}
                </div>
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