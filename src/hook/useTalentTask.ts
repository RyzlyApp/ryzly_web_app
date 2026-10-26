"use client";

import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";
import { AxiosError } from "axios";
import httpService from "@/helper/services/httpService";
import { handleError } from "@/helper/utils/hanlderAxoisError";
import { useFetchData } from "./useFetchData";
import {
    ITalentTaskDetail,
    ISubmitWorkPayload,
    IRequestChangesHostPayload,
    IRequestChangesTalentPayload,
    IDeclineTaskPayload,
    IProjectFile,
    IFundTask,
    IReassignTaskPayload,
} from "@/types/talentTask";

/**
 * Resilient request helper that tries primary endpoint/method and falls back
 * across plural/singular paths (/talent-tasks vs /talent-task) and methods (POST vs PATCH).
 */
async function sendResilientRequest(
    primaryUrl: string,
    primaryMethod: "post" | "patch",
    payload?: any
) {
    try {
        return await httpService[primaryMethod](primaryUrl, payload);
    } catch (err: any) {
        const status = err?.response?.status;
        if (status === 404 || status === 405) {
            const alternateMethod = primaryMethod === "patch" ? "post" : "patch";
            try {
                return await httpService[alternateMethod](primaryUrl, payload);
            } catch {
                throw err;
            }
        }
        throw err;
    }
}

export function useTalentTask(taskId: string) {
    // 1. Fetch Task Details Query
    const {
        data: taskData,
        isLoading: isTaskLoading,
        isError: isTaskError,
        refetch: refetchTask,
    } = useFetchData<ITalentTaskDetail>({
        endpoint: `/talent-tasks/${taskId}`,
        name: `talentTask-${taskId}`,
        enable: Boolean(taskId),
    });

    const fundTask = useMutation({
        mutationFn: (payload?: IFundTask) =>
            sendResilientRequest(
                `/talent-tasks/${taskId}/fund`,
                "post",
                payload || { source: "WALLET" }
            ),
        onSuccess: (res: any, variables?: IFundTask) => {
            const redirectUrl =
                res?.data?.data?.authorization_url ||
                res?.data?.authorization_url ||
                res?.data?.data?.link ||
                res?.data?.link ||
                res?.data?.data?.url ||
                res?.data?.url;

            if (variables?.source === "PAYSTACK" && redirectUrl) {
                window.location.href = redirectUrl;
                return;
            }

            addToast({
                title: "Success",
                description: "Escrow funded successfully!",
                color: "success",
            });
            refetchTask();
        },
        onError: (error: AxiosError) => {
            handleError(error);
        },
    });
    // 2. Start Task Mutation
    const startMutation = useMutation({
        mutationFn: () =>
            sendResilientRequest(
                `/talent-tasks/${taskId}/start`,
                "patch"
            ),
        onSuccess: () => {
            addToast({
                title: "Success",
                description: "Task started successfully!",
                color: "success",
            });
            refetchTask();
        },
        onError: (error: AxiosError) => {
            handleError(error);
        },
    });

    // 3. Cancel Task Mutation (for Host when talent has not joined yet)
    const cancelMutation = useMutation({
        mutationFn: () =>
            sendResilientRequest(
                `/talent-tasks/${taskId}/cancel`,
                "patch"
            ),
        onSuccess: () => {
            addToast({
                title: "Success",
                description: "Invitation cancelled successfully",
                color: "success",
            });
            refetchTask();
        },
        onError: (error: AxiosError) => {
            handleError(error);
        },
    });

    // 4. Accept Invitation Mutation (for Talent)
    const acceptMutation = useMutation({
        mutationFn: () =>
            sendResilientRequest(
                `/talent-tasks/${taskId}/accept`,
                "patch"
            ),
        onSuccess: () => {
            addToast({
                title: "Success",
                description: "Invitation accepted successfully",
                color: "success",
            });
            refetchTask();
        },
        onError: (error: AxiosError) => {
            handleError(error);
        },
    });

    // 5. Decline Invitation Mutation (for Talent)
    const declineMutation = useMutation({
        mutationFn: (payload: IDeclineTaskPayload) =>
            sendResilientRequest(
                `/talent-tasks/${taskId}/decline`,
                "patch",
                payload
            ),
        onSuccess: () => {
            addToast({
                title: "Success",
                description: "Invitation declined",
                color: "success",
            });
            refetchTask();
        },
        onError: (error: AxiosError) => {
            handleError(error);
        },
    });

    // 6. Request Changes Mutation (for Talent on Invitation)
    const requestChangesTalentMutation = useMutation({
        mutationFn: (payload: IRequestChangesTalentPayload) =>
            sendResilientRequest(
                `/talent-tasks/${taskId}/request-changes`,
                "post",
                payload
            ),
        onSuccess: () => {
            addToast({
                title: "Success",
                description: "Change request sent successfully",
                color: "success",
            });
            refetchTask();
        },
        onError: (error: AxiosError) => {
            handleError(error);
        },
    });

    // 7. Request Changes Mutation (for Host on Submitted Work)
    const requestChangesHostMutation = useMutation({
        mutationFn: (payload: IRequestChangesHostPayload) =>
            sendResilientRequest(
                `/talent-tasks/${taskId}/request-changes`,
                "patch",
                payload
            ),
        onSuccess: () => {
            addToast({
                title: "Success",
                description: "Changes requested successfully!",
                color: "success",
            });
            refetchTask();
        },
        onError: (error: AxiosError) => {
            handleError(error);
        },
    });

    // 8. Approve Work Mutation (for Host)
    const approveMutation = useMutation({
        mutationFn: () =>
            sendResilientRequest(
                `/talent-tasks/${taskId}/approve`,
                "patch"
            ),
        onSuccess: () => {
            addToast({
                title: "Success",
                description: "Work approved successfully! Payment has been released.",
                color: "success",
            });
            refetchTask();
        },
        onError: (error: AxiosError) => {
            handleError(error);
        },
    });

    // 9. Submit Work Mutation (for Talent)
    const submitWorkMutation = useMutation({
        mutationFn: (payload: ISubmitWorkPayload) =>
            httpService.post(`/talent-tasks/${taskId}/submit`, payload),
        onSuccess: () => {
            addToast({
                title: "Success",
                description: "Work submitted successfully!",
                color: "success",
            });
            refetchTask();
        },
        onError: (error: AxiosError) => {
            handleError(error);
        },
    });

    // 10. Reassign Task Mutation (for Host when talent declines)
    const reassignMutation = useMutation({
        mutationFn: (payload: IReassignTaskPayload) =>
            httpService.patch(`/talent-tasks/${taskId}/reassign`, payload),
        onSuccess: () => {
            addToast({
                title: "Success",
                description: "Task reassigned successfully!",
                color: "success",
            });
            refetchTask();
        },
        onError: (error: AxiosError) => {
            handleError(error);
        },
    });

    // Helper: Upload local files to backend S3 storage
    const uploadFiles = async (files: File[]): Promise<IProjectFile[]> => {
        if (!files || files.length === 0) return [];

        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));

        const response = await httpService.post("/upload/files", formData);
        const rawData = response.data?.data || response.data;
        const urls: string[] = Array.isArray(rawData) ? rawData : [];

        return files.map((file, idx) => ({
            name: file.name,
            url: urls[idx] || "",
            key: urls[idx]?.split("/").pop() || file.name,
            size: file.size,
            mimeType: file.type || "application/octet-stream",
        }));
    };

    return {
        taskData,
        isTaskLoading,
        isTaskError,
        refetchTask,

        // Mutations
        startMutation,
        cancelMutation,
        acceptMutation,
        declineMutation,
        requestChangesTalentMutation,
        requestChangesHostMutation,
        approveMutation,
        submitWorkMutation,
        fundTask,
        reassignMutation,

        // Helper
        uploadFiles,
    };
}

export default useTalentTask;
