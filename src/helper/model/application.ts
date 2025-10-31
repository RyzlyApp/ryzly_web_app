import { IChallenge } from "./challenge"
import { IUser } from "./user"


export interface IApplication {
    expertise: string,
    yearsOfExperience: number | string,
    linkedInUrl: string,
    portfolioUrl: string,
    focusArea: string
}

export interface IRating {
    "rating": number,
    "comment": string
}

export interface ICompetition {
    thumbnail?: string;
    isPublic: boolean;
    title: string;
    description: string;
    winnerPrice: number | string;
    participationFee: number | string;
    tags: string[];
    category: string;
    level: string;
    startDate: string;
    endDate: string;
    tracks: string[]
    industry: string;
}

export interface ITask {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    challengeID: string
}

export interface IOverview {
    title?: string,
    subTittle?: string,
    about?: string,
    includes?: string[],
    requirements?: string[],
    whoIs?: string[],
    challengeID: string
}

export interface IResource {
    file: string,
    description: string,
    challengeID: string
}

export interface ISubmissionPreview {
    _id: string,
    title: string,
    file: string,
    tools: string,
    link: string,
    link2: string,
    status: string,
    description: string,
    challengeID: IChallenge,
    taskID: {
        _id: string,
        title: string,
        status: string,
        endDate: string,
        startDate: string,
        description: string,
        descriptionSanitizeHtml: string,
        challengeID: string,
        creator: string,
        createdAt: string,
        updatedAt: string
    },
    userId: IUser,
    createdAt: string,
    updatedAt: string,
    url: string
}
