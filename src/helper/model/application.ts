import { IIndustry, ILevel, ITrack } from "./interest"
import { IOrganisationDetails, IUser } from "./user"


export interface IApplication {
    expertise: string,
    yearsOfExperience: number | string,
    linkedInUrl: string,
    portfolioUrl: string,
    focusArea: string
}

export interface ICoupon {
    "userId": string,
    "challengeId": string,
    "code": string,
    "discount": number | string,
    "discountType": string,
    "validFrom": string,
    "validTo": string,
    "maxUseCount": number | string
}

export interface IApplicationData {
    "_id": string,
    "isDeleted": boolean,
    "userId": string,
    "expertise": string,
    "yearsOfExperience": number,
    "linkedInUrl": string,
    "portfolioUrl": string,
    "focusArea": string,
    "status": string,
    "createdAt": string,
    "updatedAt": string,
    "user": IUser
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
    organizationId?: string;
    creatorType?: "USER" | "ORGANIZATION";
    meetingLink?:  string;
    numberOfWinners?: string | number,
    type?: string
}

export interface IEmailBlast {
    "challengeId": string,
    "subject": string,
    "body": string
}

export interface IWhatsAppBlast {
    "challengeId": string,
    "message": string, 
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
    rules?: string[],
    outcomes?: string[],
    whoIs?: string[],
    challengeID: string
}

export interface IResource {
    file: string,
    description: string,
    challengeID: string
}


export interface IChallenge {
    _id: string,
    thumbnail: string,
    isApproved: boolean,
    IsEnded: boolean,
    isEnded: boolean,
    bookmarked: boolean,
    isPublic: boolean,
    title: string,
    description: string,
    winnerPrice: number,
    participationFee: number,
    category: string,
    tags: string[],
    isPublish: boolean,
    tracks: Array<ITrack>,
    tasks: Array<ITask>,
    resources: Array<IResource>,
    leaderboards: Array<string>,
    totalParticipants?: number,
    level: ILevel,
    endDate: string,
    type: string,
    joined: boolean
    startDate: string,
    industry: IIndustry,
    numberOfWinners: string,
    participants: IUser[],
    creator: string,
    coaches: Array<IUser>,
    createdAt: string,
    updatedAt: string,
    organization: IOrganisationDetails,
    overview: {
        _id: string,
        includes: Array<string>,
        requirements: Array<string>,
        whoIs: Array<string>,
        challengeID: string,
        createdAt: string,
        updatedAt: string
    } | string,
    duration: {
        fromNowToStart: {
            weeks: number,
            days: number,
            totalDays: number
        },
        fromNowToEnd: {
            weeks: number,
            days: number,
            totalDays: number
        },
        startToEnd: {
            weeks: number,
            days: number,
            totalDays: number
        }
    },
    url: string;
    meetingLink: string
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
