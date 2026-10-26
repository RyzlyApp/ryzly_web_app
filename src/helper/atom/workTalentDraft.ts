import { atomWithStorage } from "jotai/utils";
import { IProjectFile } from "@/types/talentTask";

export interface IWorkTalentDraft {
    isRejectedReassignment?: boolean;
    originalTaskId?: string;
    challengeId?: string;
    organizationId?: string;
    talentId?: string;
    talentName?: string;
    title: string;
    description: string;
    deliverables: string[];
    projectFiles?: IProjectFile[];
    startDate: string;
    dueDate: string;
    amount: number | string;
    currency?: string;
}

export const workTalentDraftAtom = atomWithStorage<IWorkTalentDraft | null>(
    "ryzly_work_talent_draft",
    null
);
