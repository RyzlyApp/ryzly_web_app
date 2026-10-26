"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, Tab, Spinner } from "@heroui/react";
import { useFetchData } from "@/hook/useFetchData";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";
import StorageClass from "@/dal/storage/StorageClass";
import { STORAGE_KEYS } from "@/dal/storage/StorageKeys";
import { ITalentTaskItem, ITalentTasksData } from "@/types/talentTask";

export default function TaskManagerPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [userState] = useAtom(userAtom);

    // Retrieve organizationId / userId from localStorage or userAtom
    const userId =
        StorageClass.getValue<string>(STORAGE_KEYS.USERID, { isJSON: false }) ||
        userState?.data?._id ||
        StorageClass.getValue<any>(STORAGE_KEYS.USER_DETAILS, { isJSON: true })?._id;

    const userType =
        userState?.data?.userType ||
        StorageClass.getValue<any>(STORAGE_KEYS.USER_DETAILS, { isJSON: true })?.userType;

    // Check if host (organization) with optional query param override for testing
    const roleOverride = searchParams.get("role");
    const isHost =
        roleOverride === "host"
            ? true
            : roleOverride === "talent"
            ? false
            : userType === "organization";

    // For host: /talent-tasks/organization/${organizationId}
    // For talent: /talent-tasks/me
    const endpoint = isHost && userId
        ? `/talent-tasks/organization/${userId}`
        : "/talent-tasks/me";

    const queryKey = isHost && userId
        ? `talentTasksOrg-${userId}`
        : "talentTasksMe";

    const tabs = ["New Invites", "Pending", "Ongoing", "Completed", "Declined"];

    const { data, isLoading } = useFetchData<ITalentTasksData>({
        endpoint,
        name: queryKey,
        enable: isHost ? Boolean(userId) : true,
    });

    const taskList: ITalentTaskItem[] = data?.items || [];

    const handleViewProject = (task: ITalentTaskItem) => {
        const createdById = typeof task.createdBy === "object" ? (task.createdBy as any)?._id : task.createdBy;
        const taskIsHost = isHost || Boolean(createdById && userId && String(createdById) === String(userId));
        if (taskIsHost) {
            router.push(`/dashboard/tasks_manager/${task._id}/status`);
        } else {
            router.push(`/dashboard/tasks_manager/${task._id}`);
        }
    };

    const formatCurrency = (num: number) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(num).replace("NGN", "₦");
    };

    const formatTimeline = (startDate: string, dueDate: string) => {
        if (!startDate || !dueDate) return "N/A";
        const start = new Date(startDate).getTime();
        const due = new Date(dueDate).getTime();
        const diffDays = Math.max(0, Math.round((due - start) / (1000 * 60 * 60 * 24)));
        if (diffDays >= 7 && diffDays % 7 === 0) {
            const weeks = diffDays / 7;
            return `${weeks} Week${weeks > 1 ? "s" : ""}`;
        }
        return `${diffDays} Day${diffDays !== 1 ? "s" : ""}`;
    };

    const filterTasksByTab = (tab: string, tasks: ITalentTaskItem[]) => {
        return tasks.filter((task) => {
            const status = task.status?.toUpperCase();
            switch (tab) {
                case "New Invites":
                    return status === "PENDING";
                case "Pending":
                    return status === "PENDING" || status === "AWAITING_PAYMENT";
                case "Ongoing":
                    return ["IN_PROGRESS", "TODO", "IN_REVIEW", "CHANGES_REQUESTED"].includes(status);
                case "Completed":
                    return status === "COMPLETED";
                case "Declined":
                    return ["DECLINED", "CANCELLED"].includes(status);
                default:
                    return false;
            }
        });
    };

    return (
        <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 flex flex-col">
            <h1 className="text-[28px] font-bold text-[#1C1C36] mb-8">
                All Tasks
            </h1>

            <div className="bg-white rounded-2xl border border-zinc-100 flex flex-col p-4 sm:p-6 shadow-sm">
                {/* Tabs & Task List */}
                <Tabs 
                    aria-label="Task Status Tabs" 
                    variant="underlined" 
                    classNames={{
                        base: "w-full mb-2",
                        tabList: "gap-6 w-full relative rounded-none p-0 border-b border-gray-100 px-2 sm:px-4",
                        cursor: "w-full bg-[#596AFE]",
                        tab: "max-w-fit px-0 h-10",
                        tabContent: "group-data-[selected=true]:text-[#1C1C36] group-data-[selected=true]:font-medium text-[14px] p-0 text-gray-500 hover:text-gray-800",
                        panel: "h-[500px] overflow-y-auto px-2 sm:px-4 w-full"
                    }}
                >
                    {tabs.map((tab) => {
                        const tabTasks = filterTasksByTab(tab, taskList);
                        return (
                            <Tab key={tab} title={tab}>
                                <div className="flex flex-col w-full h-full">
                                    {isLoading ? (
                                        <div className="flex items-center justify-center h-full w-full">
                                            <Spinner color="primary" label="Loading tasks..." />
                                        </div>
                                    ) : tabTasks.length > 0 ? (
                                        tabTasks.map((task) => {
                                            const amount = task.compensation?.amount ?? task.totalCharged ?? 0;
                                            const timeline = formatTimeline(task.startDate, task.dueDate);

                                            return (
                                                <div
                                                    key={task._id}
                                                    className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 sm:py-7 border-b border-gray-100 last:border-b-0 gap-4 sm:gap-0"
                                                >
                                                    <div className="flex flex-col gap-2.5">
                                                        <h3 className="text-[18px] font-bold text-[#1C1C36] tracking-tight">
                                                            {task.title}
                                                        </h3>

                                                        <div className="flex items-center gap-8">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[15px] font-medium text-gray-500">Amount</span>
                                                                <span className="text-[15px] font-bold text-[#596AFE]">
                                                                    {formatCurrency(amount)}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[15px] font-medium text-gray-500">Timeline</span>
                                                                <span className="text-[15px] font-bold text-[#596AFE]">
                                                                    {timeline}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={() => handleViewProject(task)}
                                                        className="border border-[#5160E7] text-[#5160E7] px-8 py-2 rounded-full font-medium text-[14px] hover:bg-[#5160E7]/5 transition-colors whitespace-nowrap"
                                                    >
                                                        View Project
                                                    </button>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="flex items-center justify-center h-full w-full text-gray-500 text-[15px]">
                                            No tasks found for {tab}.
                                        </div>
                                    )}
                                </div>
                            </Tab>
                        );
                    })}
                </Tabs>

            </div>
        </div>
    );
}
