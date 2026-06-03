"use client";

import { FormikProvider } from "formik";
import React, { useEffect } from "react";
import { ImagePicker } from "../shared";
import { CustomEditor, CustomInput } from "../custom";
import { addToast, Button } from "@heroui/react";
import { useParams } from "next/navigation";
import { useCommunityGroup } from "@/hook/useCommunitiesGroup";

const AddGroupCommunityForm = ({ onClose }: { onClose: () => void }) => {
    const params = useParams<{ id: string }>();
    const {
        formikGroup: formik,
        image,
        setImage,
        isCreating,
        resetFormForCreate,
    } = useCommunityGroup(false, params.id);

    useEffect(() => {
        resetFormForCreate?.();
    }, []);  // ← empty deps, only reset on mount

    const handleCreate = async () => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length > 0) {
            formik.setTouched(
                Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {})
            );
            return;
        }
        try {
            await formik.submitForm();
            addToast({
                title: "Success",
                description: "Group created successfully",
                color: "success",
            });
            onClose();
        } catch {
            addToast({
                title: "Error",
                description: "Error creating group",
                color: "danger",
            });
        }
    };

    return (
        <FormikProvider value={formik}>
            <div className="space-y-5 py-4">
                <div>
                    <ImagePicker
                        image={image}
                        setImage={(file) => setImage(file)}
                        preview={image ? URL.createObjectURL(image) : formik.values.thumbnail}
                    />
                    <span className="text-xs text-red-500">{formik.errors.thumbnail}</span>
                </div>

                {/* name only — CustomInput reads from FormikContext internally */}
                <div>

                    <CustomInput
                        name="title"
                        label="Group Name"
                        type="text"
                    />
                    <span className="text-xs text-red-500">{formik.errors.title}</span>
                </div>

                <div>
                    <label className="text-sm font-medium">Description</label>
                    <CustomEditor name="description" />
                    <span className="text-xs text-red-500">{formik.errors.description}</span>

                </div>

                <div className="flex justify-end">
                    <Button
                        isLoading={isCreating || formik.isSubmitting}
                        onPress={handleCreate}
                        className="bg-[#5160E7] text-white rounded-full px-6"
                    >
                        {isCreating ? "Creating Group..." : "Create Group"}
                    </Button>
                </div>
            </div>
        </FormikProvider>
    );
};

export default AddGroupCommunityForm;