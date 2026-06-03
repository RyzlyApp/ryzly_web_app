"use client";

import { useCallback, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation"; // ✅ App Router import
import { addToast } from "@heroui/react";

import httpService from "@/helper/services/httpService";
import { handleError } from "@/helper/utils/hanlderAxoisError";
import { ICommunityGroup, ICommunityGroupCreate, ICommunityGroupResponse, IGroupMember, IReportCommunityReport, IReportCommunityResponse } from "@/helper/model/community";
import { reportOptions } from "@/components/communities/modals/reportCommunityModal";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";

export interface GroupFilters {
    communityId?: string;
    approvedForMembers?: boolean;
    search?: string;
}

export const useCommunityGroup = (edit?: boolean, communityId?: string) => {
    const [userState] = useAtom(userAtom);
    const [isOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState<File | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();

    // ✅ Get current group from URL param (?group=xyz)
    const currentGroupId = searchParams?.get("group") || null;

    // ─── Fetch Groups Query ─────────────────────────────────────
    const getGroups = useQuery({
        queryKey: ["groups", communityId],
        queryFn: async () => {
            if (!communityId) return [];
            const response = await httpService.get<ICommunityGroupResponse<any[]>>(
                `/group?communityId=${communityId}`
            );

            return response.data.data || [];
        },
        enabled: !!communityId,
        staleTime: 1000 * 60 * 5,
    });

    // ─── Fetch Single Group (if selected via URL) ───────────────
    const getGroup = useQuery({
        queryKey: ["group", currentGroupId],
        queryFn: async () => {
            if (!currentGroupId) return null;
            const response = await httpService.get<ICommunityGroupResponse<ICommunityGroup>>(
                `/group/single/${currentGroupId}`
            );

            return response.data.data;
        },
        enabled: !!currentGroupId,
    });


    // ─── Create Group Mutation ──────────────────────────────────
    const createGroup = useMutation({
        mutationFn: (data: ICommunityGroupCreate) =>
            httpService.post<ICommunityGroupResponse<ICommunityGroup>>("/group", data),
        onError: (error: AxiosError) => {
            handleError(error);
        },
        onSuccess: (response) => {
            addToast({
                title: "Success",
                description: response.data?.message || "Group created successfully",
                color: "success",
            });
            queryClient.invalidateQueries({ queryKey: ["groups", communityId] });
            formikGroup.resetForm();
            setIsOpen(false);
            setImage(null);
            // ✅ Update URL with new group
            if (response.data?.data?._id) {
                updateGroupUrl(response.data.data._id);
            }
        },
    });

    // ─── Upload Image Mutation ──────────────────────────────────

    const uploadImage = useMutation({
        mutationFn: (data: FormData) =>
            httpService.post("/upload/file", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {

            const payload: ICommunityGroupCreate = {
                ...formikGroup.values,
                thumbnail: data.data.url
            }
        },
    });

    const joinGroup = useMutation({
        mutationFn: (groupId: string) => {
            if (!userState.data?._id) throw new Error("User not loaded");
            return httpService.post(`/group/join/${groupId}`, {
                userId: userState.data._id,
            });
        },
        onError: (error: AxiosError, groupId) => {
            // Even on error, refetch community data
            // — backend may have joined successfully before throwing

            queryClient.invalidateQueries({ queryKey: ["group", groupId] });
            queryClient.refetchQueries({ queryKey: ["group", groupId] });
            queryClient.invalidateQueries({ queryKey: ["groups"] });
            queryClient.invalidateQueries({ queryKey: ["groupMembers", groupId] });


            // Only show error if it's NOT an "already a member" error
            const message = (error?.response?.data as any)?.message ?? "";
            const isAlreadyMember =
                message.toLowerCase().includes("already") ||
                message.toLowerCase().includes("member");

            if (!isAlreadyMember) {
                handleError(error);
            }
        },
        onSuccess: (response, groupId) => {
            addToast({
                title: "Success",
                description: response.data?.message || "Joined group successfully",
                color: "success",
            });
            queryClient.invalidateQueries({ queryKey: ["group", groupId] });
            queryClient.refetchQueries({ queryKey: ["group", groupId] });
            queryClient.invalidateQueries({ queryKey: ["groups"] });
        },
        onSettled: (_data, _error, groupId) => {
            // Always runs regardless of success or error
            // Forces UI to sync with latest server state
            queryClient.invalidateQueries({ queryKey: ["groups", groupId] });
        },
    });

    const getGroupMembers = useQuery({
        queryKey: ['groupMembers'],
        queryFn: async () => {
            const response = await httpService.get<ICommunityGroupResponse<IGroupMember[]>>(`/group/members?id=${currentGroupId}`);

            return response.data.data
        },
        enabled: !!currentGroupId
    })

    // ─── Update Group Mutation ──────────────────────────────────
    const editGroup = useMutation({
        mutationFn: ({ groupId, data }: { groupId: string; data: ICommunityGroupCreate }) =>
            httpService.patch<ICommunityGroupResponse<any>>(`/group/${groupId}`, data),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (response) => {
            addToast({
                title: "Success",
                description: response.data?.message || "Group updated successfully",
                color: "success",
            });
            queryClient.invalidateQueries({ queryKey: ["groups", communityId] });
            queryClient.invalidateQueries({ queryKey: ["group", currentGroupId] });
            setIsOpen(false);
            setImage(null);
        },
    });

    const reportGroup = useMutation({
        mutationFn: (data: IReportCommunityReport) =>
            httpService.post<IReportCommunityResponse<any>>(`/community/report/${communityId}`, data),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: () => {
            setIsOpen(false);
            queryClient.invalidateQueries({ queryKey: ["communities"] });
        },
    });

    const leaveGroup = useMutation({
        mutationFn: (groupId: string) =>
            httpService.post(`/group/leave/${groupId}`, {
                userId: userState.data?._id!
            }),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (response) => {
            addToast({
                title: "Success",
                description: response.data?.message || "Left community group successfully",
                color: "success",
            });

            setIsOpen(false);
            queryClient.invalidateQueries({ queryKey: ["groups", communityId] });
            queryClient.invalidateQueries({ queryKey: ["communities"] });
            if (currentGroupId) {
                updateGroupUrl(null);
            }
        },
    });

    // ─── Delete Group Mutation ──────────────────────────────────
    const deleteGroup = useMutation({
        mutationFn: (groupId: string) => httpService.delete(`/group/${groupId}`),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: () => {
            addToast({
                title: "Success",
                description: "Group deleted successfully",
                color: "success",
            });


            queryClient.invalidateQueries({ queryKey: ["groups", communityId] });
            // ✅ Remove group param from URL if deleted group was active
            if (currentGroupId) {
                updateGroupUrl(null);
            }
        },
    });

    // ─── Update URL Helper ──────────────────────────────────────
    const updateGroupUrl = (groupId: string | null) => {
        const params = new URLSearchParams(searchParams?.toString() || "");
        if (groupId) {
            params.set("group", groupId);
        } else {
            params.delete("group");
        }
        const basePath = `/dashboard/communities/${communityId}`;
        // router.replace(`?${params.toString()}`, { scroll: false });

        router.replace(
            params.toString() ? `${basePath}?${params.toString()}` : basePath,
            { scroll: false }
        );
    };



    const formikGroupReport = useFormik<IReportCommunityReport & { customDescription: string }>({
        initialValues: {
            content: reportOptions[0],
            customDescription: "",
        },
        validationSchema: Yup.object({
            content: Yup.string()
                .trim()
                .min(2, "Content must be at least 2 characters")
                .required("Content is required"),
            customDescription: Yup.string().when("content", {
                is: "Other",
                then: (schema) =>
                    schema
                        .trim()
                        .min(6, "Must be at least 6 characters")
                        .required("Please describe the issue"),
                otherwise: () => Yup.string().notRequired(),
            }),
        }),
        onSubmit: async (data, { setSubmitting }) => {
            try {
                // ✅ Build payload based on selection
                const payload = {
                    content: data.content === "Other" ? data.customDescription : data.content,
                };

                await reportGroup.mutateAsync(payload);

                // ✅ Success: reset & close
                formikGroupReport.resetForm();
                addToast({
                    title: "Report for group submitted successfully",
                    description: "We will review your report as soon as possible.",
                    color: "success",
                })
                setIsOpen(false);
            } catch (error) {
                console.error("Report failed:", error);
            } finally {
                setSubmitting(false);
            }
        },
    });


    // ─── Formik Setup ───────────────────────────────────────────
    const formikGroup = useFormik<ICommunityGroupCreate>({
        initialValues: {
            title: getGroup.data?.title || "",
            description: getGroup.data?.description || "",
            thumbnail: getGroup.data?.thumbnail || "",
            communityId: communityId || "",
        },
        enableReinitialize: true, // ✅ Re-initialize when communityId changes
        validationSchema: Yup.object({
            title: Yup.string()
                .trim()
                .min(2, "Group Name must be at least 2 characters")
                .required("Group Name is required"),
            description: Yup.string()
                .trim()
                .min(10, "Description must be at least 10 characters")
                .required("Description is required"),
            communityId: Yup.string()
                .trim()
                .required("Community ID is required"),
        }),
        onSubmit: async (data) => {
            try {
                let thumbnail = data.thumbnail;
                if (image) {
                    const formData = new FormData();
                    formData.append("file", image);
                    const res = await uploadImage.mutateAsync(formData);
                    thumbnail = res?.data?.data?.url || "";
                    // fix the image update
                    console.log(res.data.data.url)

                }

                if (edit && currentGroupId) {
                    await editGroup.mutateAsync({ groupId: currentGroupId || "", data: { ...data, thumbnail } });
                } else {
                    await createGroup.mutateAsync({ ...data, thumbnail });
                }

                formikGroup.resetForm();
                setIsOpen(false);
                setImage(null);
            } catch (error) {
                formikGroup.setSubmitting(false)
            }
        },
    });


    const resetFormForCreate = useCallback(() => {
        formikGroup.resetForm({
            values: {
                title: "",
                description: "",
                thumbnail: "",
                communityId: communityId || "",
            }
        });
        setImage(null);
    }, [communityId, formikGroup]);

    // ─── Return Object ──────────────────────────────────────────
    return {
        // State
        isOpen,
        setIsOpen,
        image,
        setImage,
        currentGroupId,

        // Data
        groups: getGroups.data || [],
        currentGroup: getGroup.data || null,
        groupMembers: getGroupMembers.data,
        isLoadingGroups: getGroups.isLoading,
        isLoadingGroup: getGroup.isLoading,

        // Form
        formikGroup,
        formikGroupReport,

        // Mutations
        createGroup: createGroup.mutate,
        joinGroup: joinGroup.mutate,
        editGroup: editGroup.mutate,
        deleteGroup,
        uploadImage: uploadImage.mutate,
        leaveGroup,
        reportGroup,

        // Join group loading state
        isJoinGroup: joinGroup.isPending,

        // Loading states
        isCreating: createGroup.isPending,
        isEditing: editGroup.isPending,
        isDeleting: deleteGroup.isPending,
        isUploading: uploadImage.isPending,


        // Actions
        setActiveGroup: updateGroupUrl, // For tab switching
        isGeneralView: !currentGroupId, // Helper for UI logic

        // Reset for create
        resetFormForCreate
    };
};