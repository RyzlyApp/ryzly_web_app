"use client";

import { FormikProvider } from "formik";

import React from "react";
import { ImagePicker } from "../shared";
import { CustomEditor, CustomInput } from "../custom";
import { addToast, Button } from "@heroui/react";
import { useParams } from "next/navigation";
import { useCommunityGroup } from "@/hook/useCommunitiesGroup";

const EditGroupCommunityForm = ({ onClose }: { onClose: () => void }) => {
    const params = useParams<{ id: string }>();
    const { formikGroup: formik, image, setImage, isEditing } = useCommunityGroup(true, params.id);

    const handleCreate = async () => {
        // Validate first — don't    submit if invalid
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
                description: "Group community edited successfully",
                color: "success",
            });
            onClose(); // ✅ close modal after successful submission
        } catch {
            // errors handled inside the hook via addToast
            addToast({
                title: "Error",
                description: "Error editing community",
                color: "danger",
            });
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
                    label="Group Name"
                    type="text"
                    {...formik.getFieldProps("title")}
                />
                <div>
                    <label className="text-sm font-medium">
                        Description
                    </label>
                    {/* If you have a rich editor */}
                    <CustomEditor
                        // name="description"
                        {...formik.getFieldProps("description")}
                    />
                </div>
                {/* SUBMIT */}
                <div className="flex justify-end">
                    <Button
                        isLoading={isEditing || formik.isSubmitting}
                        onPress={handleCreate}
                        className="bg-[#5160E7] text-white rounded-full px-6"
                    >
                        {isEditing ? "Editing Group" : "Edit Group"}
                    </Button>
                </div>
            </div>
        </FormikProvider >

    );
};

export default EditGroupCommunityForm;