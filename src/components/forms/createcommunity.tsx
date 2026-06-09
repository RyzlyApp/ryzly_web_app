"use client";

import { FormikProvider } from "formik";
import React, { useState } from "react";
import { ImagePicker } from "../shared";
import { CustomEditor, CustomInput } from "../custom";
import { addToast, Button, Input } from "@heroui/react";
import useCommunity from "@/hook/useCommunities";
import { Select, SelectItem } from "@heroui/select";
import { COMMUNITY_TABS } from "../communities/communityContent";
import CustomTagInput from "../shared/tagInput";
import { useQuery } from "@tanstack/react-query";
import httpService from "@/helper/services/httpService";

const CreateCommunityForm = ({ onClose }: { onClose: () => void }) => {
    const [category, setCategory] = useState("")
    const { formikCommunity: formik, image, setImage, isCreating } = useCommunity();

    const { data: categories = [] } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await httpService.get('/community/Categories')
            return res.data?.data ?? []
        }
    })

    // ✅ Fix: categories is an array of strings
    const SELECT_OPTIONS = categories
        .filter((cat: string) => cat && cat.trim() !== '')
        .map((cat: string) => ({
            label: cat,
            value: cat
        }));

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
                description: "Community created successfully",
                color: "success",
            });
            onClose();
        } catch {
            addToast({
                title: "Error",
                description: "Error creating community",
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
                        setImage={(file) => {
                            setImage(file);
                            formik.setFieldValue("thumbnail", file);
                        }}
                        preview={image ? URL.createObjectURL(image) : formik.values.thumbnail}
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
                    <label className="text-sm font-medium">Description</label>
                    <CustomEditor {...formik.getFieldProps("description")} />
                    <span className="text-xs text-red-500">{formik.errors.description}</span>
                </div>
                <div>
                    <CustomInput
                        label="Meeting Link"
                        type="text"
                        {...formik.getFieldProps("meetingLink")}
                    />
                    <span className="text-xs text-red-500">{formik.errors.meetingLink}</span>
                </div>
                <div>
                    <CustomTagInput label="Tags" {...formik.getFieldProps("tags")} />
                    <span className="text-xs text-red-500">{formik.errors.tags}</span>
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
                        {SELECT_OPTIONS.map((option: any) => (
                            <SelectItem key={option.value} textValue={option.label}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </Select>
                    {formik.touched.category && formik.errors.category && (
                        <span className="text-xs text-red-500">{formik.errors.category as string}</span>
                    )}
                </div>
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
        </FormikProvider>
    );
};

export default CreateCommunityForm;