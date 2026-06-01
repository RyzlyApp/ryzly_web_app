import { IChallenge } from "./challenge"
import { IUser } from "./user"

export interface ICommunity {
    _id: string,
    thumbnail: string,
    title: string
    description: string
    tags: string[]
    approveForMembers: boolean
    Challenges: IChallenge[]
    isPaid: boolean
    members: IUser[]
    creator: IUser
    totalMembers: number

    meetingLink?: string

    createAt: string,
    updatedAt: string
}

export interface ICommunityResponse<T> {
    data: T,
    message?: string,
    success?: boolean,
    page?: number,
    total?: number,
    limit?: number
}

export interface ICommunityCreate {
    thumbnail?: string,
    title: string
    description: string
    meetingLink?: string
    tags: string[]
}

export interface ICommunityMembers {
    _id: string,
    community: string,
    member: IUser,
    ban?: boolean,
    approve?: boolean
    createdAt?: string,
    updatedAt?: string
}


// communties groups

export interface ICommunityGroup {
    _id: string;
    thumbnail: string;
    title: string;
    description: string;
    members: IUser[]; // Swagger shows this as an array of User objects
    creator: IUser;
    communityId: ICommunity; // Can be an ID or populated object
    totalMembers: number;
    meetingLink?: string;
    approveForMembers: boolean;
    tags: string[];
    joined: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ICommunityGroupCreate {
    thumbnail?: string,
    title: string
    description: string,
    meetingLink?: string
    communityId: string,
}

export interface ICommunityGroupResponse<T> {
    data: T,
    message?: string,
    success?: boolean,
    page?: number,
    total?: number,
    limit?: number
}

export interface IReportCommunityReport {
    content: string,
}
export interface IReportCommunityResponse<T> {
    data: T,
    message?: string,
    success?: boolean,
}

export interface IGroupMember {
    _id: string;              // Membership record ID
    group: string;            // Group ID reference
    member: IUser;            // Full user object populated
    ban: boolean;
    approve?: boolean;     // If group requires approval
    joinedAt?: string;        // When they joined this group
    createdAt: string;
    updatedAt: string;
}