"use client";

import { IChallenge, ITask } from "@/helper/model/challenge";
import { CustomButton } from "../../custom";
import { isDateExpired } from "@/helper/utils/isDateExpired";
import { useFetchData } from "@/hook/useFetchData";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";
import { tpuserAtom } from "@/helper/atom/tpuser";
import { STORAGE_KEYS } from "@/dal/storage/StorageKeys";
import StorageClass from "@/dal/storage/StorageClass";
import { useParams, useRouter } from "next/navigation";
import { addToast } from "@heroui/toast";

interface ChallengeCTAButtonProps {
    item: IChallenge;
    isCoach: boolean;
    /** true when the logged-in user's account type is "organization" */
    isOrganization: boolean;
    onJoinClick: () => void;
    onEndClick: () => void;
    isJoinLoading: boolean;
    isEndLoading: boolean;
}

export default function ChallengeCTAButton({
    item,
    isCoach,
    isOrganization,
    onJoinClick,
    onEndClick,
    isJoinLoading,
    isEndLoading,
}: ChallengeCTAButtonProps) {
    const expired = isDateExpired(item?.endDate);
    const isOrgCreated = item?.creator?.userType === "organization";

    const param = useParams();
    const router = useRouter();

    const [userState] = useAtom(userAtom);
    const [tpuserState] = useAtom(tpuserAtom);
    const storedUserId = StorageClass.getValue(STORAGE_KEYS.USERID, {
        isJSON: false,
    });
    const currentUserId =
        userState.data?._id ||
        tpuserState.data?._id ||
        (storedUserId as string);

    const challengeId = (param?.id as string) || item?._id;
    const organisationId = param?.organisationId as string | undefined;

    const { data: tasks = [], isLoading: isTasksLoading } = useFetchData<ITask[]>({
        endpoint: "/task",
        name: "tasks",
        params: {
            userId: currentUserId as string,
            challengeID: item?._id,
        },
        enable: !!item?._id && !!currentUserId && !!item?.joined,
    });

    const handleTaskNavigation = () => {
        const taskList = tasks?.length > 0 ? tasks : item?.tasks || [];

        if (!taskList || taskList.length === 0) {
            addToast({
                title: "Warning",
                description: "No tasks available yet",
                color: "warning",
            });
            return;
        }

        if (isCoach) {
            router.push(`/dashboard/challenges/${challengeId}/tasks/${taskList[0]?._id}`);
            return;
        }

        // Find the first task that is pending submission, or the last task if all submitted
        const currentTaskIndex = taskList.findIndex(
            (task) => task.status === "Pending"
        );
        const targetIndex =
            currentTaskIndex !== -1 ? currentTaskIndex : taskList.length - 1;
        const targetTask = taskList[targetIndex];

        if (!targetTask) return;

        const now = new Date();
        const start = targetTask?.startDate
            ? new Date(targetTask.startDate.split("T")[0])
            : new Date();

        const isActive = now >= start;
        const isFirst = targetIndex === 0;

        const isFirstLocked = isFirst && !isActive;
        const isOtherLocked =
            !isFirst &&
            (!isActive || taskList[targetIndex - 1]?.status === "Pending");

        const shouldLock = isFirst ? isFirstLocked : isOtherLocked;

        if (shouldLock) {
            if (isDateExpired(targetTask?.startDate) && targetIndex !== 0) {
                addToast({
                    title: "Warning",
                    description: "Previous Tasks Haven't been submitted",
                    color: "warning",
                });
                return;
            }
            addToast({
                title: "Warning",
                description: "Tasks Haven't started yet",
                color: "warning",
            });
            return;
        }

        router.push(`/dashboard/challenges/${challengeId}/tasks/${targetTask?._id}`);
    };

    if (!item?.joined && !isCoach && !isOrganization) {
        return (
            <div className=" w-full lg:w-fit px-4 ">
                <CustomButton
                    onClick={onJoinClick}
                    isLoading={isJoinLoading}
                    fullWidth
                >
                    Join Challenge
                </CustomButton>
            </div>
        );
    }

    if (item?.joined) {
        return (
            <div className=" w-full lg:w-fit px-4 ">
                <CustomButton
                    onClick={handleTaskNavigation}
                    isLoading={isTasksLoading}
                    fullWidth
                >
                    Submit
                </CustomButton>
            </div>
        );
    }

    if (expired && isCoach && !isOrgCreated) {
        return (
            <div className=" w-full lg:w-fit px-4 ">
                <CustomButton
                    onClick={onEndClick}
                    isLoading={isEndLoading}
                    fullWidth
                >
                    End Challenge
                </CustomButton>
            </div>
        );
    }

    return null;
}
