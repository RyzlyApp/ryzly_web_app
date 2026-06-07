"use client";

import * as Yup from "yup";
import { useFormik } from "formik";
import { addToast } from "@heroui/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ICommunityCreate, ICommunity, ICommunityResponse, ICommunityMembers, IReportCommunityReport, IReportCommunityResponse } from "@/helper/model/community";
import { useEffect, useState } from "react";
import httpService from "@/helper/services/httpService";
import { useParams, useRouter } from "next/navigation";
import { handleError } from "@/helper/utils/hanlderAxoisError"; // ⚠️ Keep typo if project uses it
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";
import { reportOptions } from "@/components/communities/modals/reportCommunityModal";
import { isGoogleMeetUrl } from "@/helper/utils/validateMeetingLink";


export interface CommunityFilters {
    userId?: string;
    tags?: string[];
    category?: string;
    isAdmin?: boolean;
    filterByUser?: 'joined' | 'notJoined' | 'created';
    isApproved?: boolean;
    search?: string;
}

const useCommunity = (
    back?: boolean,
    edit?: boolean,
    filters?: CommunityFilters,
) => {
    // user
    const [userState] = useAtom(userAtom)
    const params = useParams()
    const communityId = params.id


    // ─── Local State ──────────────────────────────────────────────
    const [image, setImage] = useState<File | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    // const [loading, setLoading] = useState(false);

    // ─── React Query & Router ─────────────────────────────────────
    const queryClient = useQueryClient();
    const router = useRouter();

    // ─── Create Community Mutation ────────────────────────────────
    const createCommunity = useMutation({
        mutationFn: (data: ICommunityCreate) =>
            httpService.post<ICommunity>("/community", data),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            addToast({
                title: "Success",
                description: data.data.title || "Community created successfully",
                color: "success",
            });
            if (back) router.back();
            setIsOpen(false);
            queryClient.invalidateQueries({ queryKey: ["communities"] });
            formikCommunity.resetForm();
        },
    });


    // const getCommunities = useQuery({
    //     queryKey: ["communities", filters ?? {}],
    //     queryFn: async () => {
    //         const params = new URLSearchParams()

    //         if (filters) {
    //             Object.entries(filters).forEach(([key, value]) => {
    //                 if (value !== undefined && value !== null && value !== "") {
    //                     params.append(key, String(value));
    //                 }
    //             });
    //         }

    //         const queryString = params.toString();
    //         const url = `/community${queryString ? `?${queryString}` : ""}`;

    //         const response = await httpService.get<ICommunityResponse<ICommunity[]>>(url)
    //         return response.data
    //     },
    //     enabled: filters?.filterByUser ? !!filters.userId : true,
    // });

    // const getCommunities = useQuery({
    //     queryKey: ["communities", filters ?? {}],
    //     queryFn: async () => {
    //         const params = new URLSearchParams()
    //         if (filters) {
    //             Object.entries(filters).forEach(([key, value]) => {
    //                 if (value !== undefined && value !== null && value !== "") {
    //                     params.append(key, String(value))
    //                 }
    //             })
    //         }
    //         const queryString = params.toString()
    //         console.log("🔍 fetching:", queryString) // ← add this
    //         const url = `/community${queryString ? `?${queryString}` : ""}`
    //         const response = await httpService.get<ICommunityResponse<ICommunity[]>>(url)
    //         console.log("📦 response:", response.data) // ← and this
    //         return response.data
    //     },
    //     enabled: filters?.filterByUser ? !!filters.userId : true,
    // })

    // useCommunities.ts
    const getCommunities = useQuery({
        queryKey: ["communities", filters ?? {}],
        queryFn: async () => {
            const params = new URLSearchParams()

            if (filters) {
                Object.entries(filters).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        // ✅ handle arrays (like tags)
                        if (Array.isArray(value)) {
                            value.forEach(v => params.append(key, String(v)))
                        } else {
                            params.append(key, String(value))
                        }
                    }
                })
            }

            const queryString = params.toString()
            const url = `/community${queryString ? `?${queryString}` : ""}`
            // console.log("🔍 firing query:", url)
            const response = await httpService.get<ICommunityResponse<ICommunity[]>>(url)
            return await response.data
        },
        // ✅ if filter requires userId, wait for it — no exceptions
        enabled: filters?.filterByUser
            ? !!filters.userId && filters.userId !== "undefined"
            : true,
        staleTime: 1000 * 60 * 2,
        refetchOnWindowFocus: false,
    })

    const getCommunity = useQuery({
        queryKey: ['community', communityId], // Include ID in queryKey
        queryFn: async () => {
            if (!communityId) throw new Error('Community ID is required');

            const response = await httpService.get<ICommunityResponse<ICommunity>>(`community/single/${communityId}`);
            return response.data.data
        },
        enabled: !!communityId // Only run query if we have an ID
    });

    const getCommunityMembers = useQuery({
        queryKey: ['communityMembers', communityId],
        queryFn: async () => {
            const response = await httpService.get<ICommunityResponse<ICommunityMembers[]>>(`community/members?id=${communityId}`,);
            return response.data.data
        },
        enabled: !!communityId
    })

    // ─── Upload Image Mutation ────────────────────────────────────
    const uploadImage = useMutation({
        mutationFn: (data: FormData) =>
            httpService.post("/upload/file", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            console.log(data)
            const payload: ICommunityCreate = {
                ...formikCommunity.values,
                thumbnail: data.data.url
            }
            return data
        },
    });

    // const joinCommunity = useMutation({
    //     mutationFn: (id: string) => {
    //         if (!userState.data?._id) throw new Error("User not loaded");
    //         return httpService.post(`/community/join/${id}`, {
    //             userId: userState.data._id,
    //         });
    //     },
    //     onError: (error: AxiosError) => handleError(error),
    //     onSuccess: (response, id) => {
    //         addToast({
    //             title: "Success",
    //             description: response.data?.message || "Joined community successfully",
    //             color: "success",
    //         });
    //         setIsOpen(false);
    //         queryClient.invalidateQueries({ queryKey: ["communities"] });
    //         queryClient.invalidateQueries({ queryKey: ["community", id] });
    //         queryClient.invalidateQueries({ queryKey: ["communityMembers", id] });
    //     },
    // });

    const joinCommunity = useMutation({
        mutationFn: (id: string) => {
            if (!userState.data?._id) throw new Error("User not loaded");
            return httpService.post(`/community/join/${id}`, {
                userId: userState.data._id,
            });
        },
        onError: (error: AxiosError, id) => {
            // Even on error, refetch community data
            // — backend may have joined successfully before throwing
            queryClient.invalidateQueries({ queryKey: ["communities"] });
            queryClient.invalidateQueries({ queryKey: ["community", id] });
            queryClient.invalidateQueries({ queryKey: ["communityMembers", id] });

            // Only show error if it's NOT an "already a member" error
            const message = (error?.response?.data as any)?.message ?? "";
            const isAlreadyMember =
                message.toLowerCase().includes("already") ||
                message.toLowerCase().includes("member");

            if (!isAlreadyMember) {
                handleError(error);
            }
        },
        onSuccess: (response, id) => {
            addToast({
                title: "Success",
                description: response.data?.message || "Joined community successfully",
                color: "success",
            });
            setIsOpen(false);
            queryClient.invalidateQueries({ queryKey: ["communities"] });
            queryClient.invalidateQueries({ queryKey: ["community", id] });
            queryClient.invalidateQueries({ queryKey: ["communityMembers", id] });
        },
        onSettled: (_data, _error, id) => {
            // Always runs regardless of success or error
            // Forces UI to sync with latest server state
            queryClient.invalidateQueries({ queryKey: ["community", id] });
        },
    });

    // ─── Edit Community Mutation ──────────────────────────────────
    const editCommunity = useMutation({
        mutationFn: (data: ICommunityCreate) =>
            httpService.patch<ICommunity>(`/community/${communityId}`, data),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            addToast({
                title: "Success",
                description: data?.data?.title || "Community updated successfully",
                color: "success",
            });
            // if (back) router.back();
            setIsOpen(false);
            queryClient.invalidateQueries({ queryKey: ["communities"] });
            queryClient.invalidateQueries({ queryKey: ["community", communityId] });

            formikCommunity.resetForm();
        },
    });

    // ─── Report Community Mutation ────────────────────────────────────
    const reportCommunity = useMutation({
        mutationFn: (data: IReportCommunityReport) =>
            httpService.post<IReportCommunityResponse<IReportCommunityReport>>(`/community/report/${communityId}`, data),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: () => {
            if (back) router.back();
            setIsOpen(false);
            queryClient.invalidateQueries({ queryKey: ["communities"] });
        },
    });


    const leaveCommunity = useMutation({
        mutationFn: (communityId: string) =>
            httpService.post(`/community/leave/${communityId}`, {
                userId: userState.data?._id!
            }),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (response) => {
            // ✅ Show success feedback
            addToast({
                title: "Success",
                description: response.data?.message || "Left community successfully",
                color: "success",
            });

            // ✅ Redirect to communities dashboard
            router.push('/dashboard/communities');

            // ✅ Cleanup UI & cache
            setIsOpen(false);
            queryClient.invalidateQueries({ queryKey: ["communities"] });
        },
    });

    // ─── Delete Community Mutation ────────────────────────────────
    const deleteCommunity = useMutation({
        mutationFn: (id: string) => httpService.delete(`/community/${id}`),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: () => {
            addToast({
                title: "Success",
                description: "Community deleted successfully",
                color: "success",
            });
            setIsOpen(false);
            router.push("/dashboard/communities");
            queryClient.invalidateQueries({ queryKey: ["communities"] });
        },
    });

    const meetingLinkSchema = Yup.string()
        .trim()
        .optional()
        .test(
            "is-google-meet",
            "Must be a valid Google Meet link (e.g. https://meet.google.com/abc-defg-hij)",
            (value) => {
                if (!value) return true; // optional — empty is fine
                return isGoogleMeetUrl(value);
            }
        )

    // ─── Formik Setup ─────────────────────────────────────────────
    const formikCommunity = useFormik<ICommunityCreate>({
        initialValues: {
            title: getCommunity.data?.title || "",
            description: getCommunity.data?.description || "",
            thumbnail: getCommunity.data?.thumbnail || "",
            tags: getCommunity.data?.tags || [],
            category: getCommunity?.data?.category || "",
            meetingLink: getCommunity?.data?.meetingLink || ""
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            title: Yup.string()
                .trim()
                .min(2, "Community Name must be at least 2 characters")
                .required("Community Name is required"),
            description: Yup.string()
                .trim()
                .min(6, "Description must be at least 10 characters")
                .required("Description is required"),
            category: Yup.string().trim().optional(),
            tags: Yup.array()
                .of(Yup.string())
                .min(1, "At least one tag is required"),
            meetingLink: meetingLinkSchema
            // 👇 Add validation for other fields as needed
        }),
        onSubmit: async (data) => {
            try {
                let thumbnail = data.thumbnail;
                if (image) {
                    const formData = new FormData();
                    formData.append("file", image);
                    const res = await uploadImage.mutateAsync(formData);
                    // thumbnail = res?.data?.data?.url || res?.data?.url || "";

                    thumbnail =
                        res?.data?.data?.url ??
                        res?.data?.url ??
                        (res?.data as any)?.url ??
                        thumbnail;

                }

                if (edit && communityId) {
                    await editCommunity.mutateAsync({ ...data, thumbnail });
                } else {
                    await createCommunity.mutateAsync({ ...data, thumbnail });
                }

                formikCommunity.resetForm();
                setIsOpen(false);
                setImage(null);
            } catch (error) {
                formikCommunity.setSubmitting(false)
                console.log(error);
            }
        },
    });

    const formikCommunityReport = useFormik<IReportCommunityReport & { customDescription: string }>({
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

                await reportCommunity.mutateAsync(payload);

                // ✅ Success: reset & close
                formikCommunityReport.resetForm();
                addToast({
                    title: "Report submitted successfully",
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

    // ─── Return Object ────────────────────────────────────────────
    return {
        // Form & State
        formikCommunity,
        formikCommunityReport,
        image,
        setImage,
        isOpen,
        setIsOpen,

        // Mutations (expose full objects for .mutate(), .isPending, etc.)
        createCommunity,
        getCommunities,
        getCommunity,
        getCommunityMembers,
        joinCommunity,
        editCommunity,
        deleteCommunity,
        uploadImage,
        reportCommunity,
        leaveCommunity,

        // 
        isLoadingCommunity: getCommunity.isPending,
        // Convenience loading states
        isCreating: createCommunity.isPending,
        isEditing: editCommunity.isPending,
        isDeleting: deleteCommunity.isPending,
        isUploading: uploadImage.isPending,
        isJoining: joinCommunity.isPending,
    };
};

export default useCommunity;