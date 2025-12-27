import { IIndustry, ILevel, ITrack } from "./interest"
import { IUser } from "./user"

export interface IChallenge {
    _id: string,
    thumbnail: string,
    isApproved: boolean,
    IsEnded: boolean,
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
    joined: boolean
    startDate: string,
    industry: IIndustry,
    participants: IUser[],
    creator: IUser,
    coaches: Array<IUser>,
    createdAt: string,
    updatedAt: string,
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
    url: string
}

export interface IOverview {
    "_id": string,
    "includes": string[],
    "requirements": string[],
    outcomes: string[],
    rules: string[],
    "whoIs": string[],
    "challengeID": IChallenge,
    "createdAt": string,
    "updatedAt": string,
    "about": string,
    "subTittle": string,
    
    "title": string
}

export interface IRatingDetail {
    "_id": string,
    "user": IUser,
    "challenge": IChallenge
    "__v": number,
    "comment": string,
    "createdAt": string,
    "deletedAt": string,
    "rating": number,
    "updatedAt": string
}

export interface ICertificate {
    "_id": string,
    "__v": number,
    "challengeId": string,
    "challengeName": string,
    "coachNames": string[],
    "createdAt": string,
    "endDate": string,
    "level": string,
    "score": number,
    "startDate": string,
    "tracks": string[],
    hasPaid: boolean,
    "updatedAt": string,
    "userFullname": string,
    "userId": IUser,
    creator: string
}

export interface ILeadboard {
    "userFullname": string,
    fullName: string
    "tasksCompleted": number,
    "normalizedScore": number,
    "submittedAt": string,
    "_id": string
    profilePicture: string,
    ryzlyPoints: string, 
    "firstName": "Egileonisofien",
    "lastName": "Ekada"
} 

export interface IResource {
    "_id": string,
    "file": string,
    "likes": number,
    "description": string,
    "challengeID": string,
    "writer": string,
    "createdAt": string,
    "updatedAt": string,
    url: string
}


export interface IResourceNew { 
    "$isNew": boolean,
    "_doc": {
        "_id": string,
        "file": string,
        "likes": number,
        "description": string,
        "challengeID": IChallenge,
        "deletedAt": string,
        "writer": IUser,
        "createdAt": string,
        "updatedAt": string, 
    },
    "url": string
}

export interface ITask {
    _id: string,
    title: string,
    status: string,
    endDate: string,
    startDate: string,
    description: string,
    descriptionSanitizeHtml: string,
    challengeID: IChallenge,
    creator: IUser,
    createdAt: string,
    updatedAt: string,
    grade: number
}

export interface ITaskDetail {
    "_id": string,
    "title": string,
    "status": string,
    "endDate": string,
    "startDate": string,
    "description": string,
    "descriptionSanitizeHtml": string,
    "challengeID": IChallenge,
    "creator": IUser,
    "createdAt": string,
    "updatedAt": string
}

export interface ISubmission {
    file?: string,
    title: string,
    description: string,
    link: string,
    link2: string,
    challengeID: string,
    taskID: string,
    tools: string
}

export interface IPortfolio {
    file?: string,
    title: string,
    description: string,
    links: {
        name: string,
        link: string
    }[],
    challengeID?: string, 
    tools: string[], 
}

export interface IPortfolioDetails {
    "_id": string,
    "title": string,
    "file": string,
    "tools": string[],
    "links": {
        "name": string,
        "link": string,
        "_id": string
    }[],
    "description": string,
    "challengeID": IChallenge,
    "user": IUser
    "comments": string[],
    "createdAt": string,
    "updatedAt": string,
    "url":string,
    "liked": boolean,
    likes: number
}

export interface IPortfolioComment {
    "_id": string,
    "portfolio": string,
    "user": IUser,
    "comment": string,
    "helpful": boolean,
    "createdAt": string,
    "updatedAt": string
}

export interface IGrade {
    score: string,
    feedBack: string,
    challengeID: string,
    submissionID: string,
    taskID: string,
    owner: string
}

export interface IUsergrade {
    "_id": string,
    "feedBack": string,
    "score": number,
    "challengeID": IChallenge,
    "submissionID": ISubmission,
    "taskID": ITaskDetail,
    "owner": IUser,
    "markedBy": IUser,
    "createdAt": string,
    "updatedAt": string
}

export interface IGradeDetail {
    "_id": string,
    "feedBack": string,
    "score": number,
    "challengeID": IChallenge,
    "submissionID": ISubmission,
    "taskID": ITaskDetail,
    "owner": IUser,
    "markedBy": IUser,
    "createdAt": string,
    "updatedAt": string
}

export interface IResourceDetail {
    "_id": string,
    "file": string,
    "likes": number,
    "description": string,
    "challengeID": IChallenge,
    "writer": IUser,
    "createdAt": string,
    "updatedAt": string,
    "url": string
}
