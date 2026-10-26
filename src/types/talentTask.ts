export interface IProjectFile {
    name: string;
    url: string;
    key?: string;
    size?: number;
    mimeType?: string;
}

export interface ISubmissionItem {
    _id?: string;
    note?: string;
    description?: string;
    link?: string;
    links?: string[];
    files?: IProjectFile[];
    createdAt?: string;
    updatedAt?: string;
}

export interface ITaskHistoryItem {
    to: string;
    by: string;
    at: string;
    reason?: string;
    feedback?: string;
    note?: string;
}

export interface ITalentTaskDetail {
    _id: string;
    organization?: string | {
        _id: string;
        name?: string;
        logo?: string;
    };
    createdBy?: string | {
        _id: string;
        firstName?: string;
        lastName?: string;
        email?: string;
    };
    talent?: {
        _id: string;
        firstName?: string;
        lastName?: string;
        email?: string;
        profilePicture?: string;
    };
    challenge?: {
        _id: string;
        thumbnail?: string;
        title?: string;
    };
    title: string;
    description: string;
    deliverables?: string[];
    projectFiles?: IProjectFile[];
    startDate: string;
    dueDate: string;
    compensation?: {
        amount: number;
        currency: string;
    };
    organizationFee?: number;
    totalCharged?: number;
    status: string;
    paymentStatus?: string;
    paymentReference?: string;
    history?: ITaskHistoryItem[];
    declineReason?: string;
    feedback?: string;
    changeRequestNote?: string;
    requestChangeNote?: string;
    submissions?: ISubmissionItem[];
    createdAt: string;
    updatedAt: string;
}

export interface ITalentTaskItem {
    _id: string;
    organization?: string | {
        _id: string;
        name?: string;
    };
    createdBy?: string | {
        _id: string;
        firstName?: string;
        lastName?: string;
    };
    talent?: string | {
        _id: string;
        firstName?: string;
        lastName?: string;
    };
    challenge?: {
        _id: string;
        thumbnail?: string;
        title?: string;
    };
    title: string;
    description: string;
    deliverables?: string[];
    projectFiles?: IProjectFile[];
    startDate: string;
    dueDate: string;
    compensation?: {
        amount: number;
        currency: string;
    };
    organizationFee?: number;
    totalCharged?: number;
    status: string;
    paymentStatus?: string;
    paymentReference?: string;
    declineReason?: string;
    feedback?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ITalentTasksData {
    items: ITalentTaskItem[];
    counts: Record<string, number>;
    pagination: {
        page: number;
        limit: number;
        total: number;
    };
}

export interface ISubmitWorkPayload {
    note: string;
    links: string[];
    files: IProjectFile[];
}

export interface IRequestChangesHostPayload {
    feedback: string;
}

export interface IRequestChangesTalentPayload {
    reason?: string;
    note?: string;
}

export interface IDeclineTaskPayload {
    reason: string;
}

export interface IFundTask {
    source: string
}

export interface IChallengeStatWinner {
    _id: string;
    tasksCompleted?: number;
    normalizedScore?: number;
    submittedAt?: string;
    ryzlyPoints?: number;
    badgeLevel?: string | null;
    profilePicture?: string;
    firstName: string;
    lastName: string;
}

export interface IReassignTaskPayload {
    title: string;
    description: string;
    deliverables: string[];
    projectFiles: IProjectFile[];
    startDate: string;
    dueDate: string;
    amount: number;
    talentId: string;
}
