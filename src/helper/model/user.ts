import { IChallenge } from "./challenge"

export interface IUser {
    "ryzlyPoints": number,
    "achievements": string[],
    badgeLevel: string[],
    "_id": string,
    "isDeleted": false,
    "createdAt": string,
    "updatedAt": string,
    "email": string,
    "isCoach": true,
    "skills": string[],
    "interests": string[],
    "about": string,
    "fullName": string,
    "firstName": string,
    "lastName": string,
    "profilePicture": string,
    "track": string,
    "country": string,
    "phone": string,
    "username": string,
    "challenges": IChallenge[],
    "facebookUsername": string,
    "twitterUsername": string,
    "instagramUsername": string,
    "LinkedinUsername": string,
    "tiktokUsername": string,
}

export interface IProfile {
    "email"?: string,
    "phone": string,
    "country": string,
    "username": string,
    "skills": Array<string>,
    "interests": Array<string>,
    "about": string,
    "fullName"?: string,
    "firstName": string,
    "lastName": string,
    "profilePicture"?: string,
    "track": string,
    "facebookUsername": string,
    "twitterUsername": string,
    "instagramUsername": string,
    "LinkedinUsername": string,
    "tiktokUsername": string,
}

export interface IOrganisation {
    "name": string,
    "industry": string,
    "website": string,
    "email": string, 
    "profilePicture": string
}

export interface IOrganisationDetails{
    "_id": string,
    "isDeleted": boolean,
    "userId": string,
    "name": string
    "industry": {
        "_id": string,
        "name": string,
        "type": string,
        "createdBy": string,
        "updatedBy": string,
        "createdAt": string,
        "updatedAt": string
    },
    "website": string,
    "email": string,
    "slug": string,
    "profilePicture": string,
    "status": string,
    "createdAt": string,
    "updatedAt": string, 
}

export interface IUpdateProfile {
    "email"?: string,
    "phone": string,
    "country": string,
    "username"?: string,
    "skills": Array<string>,
    "interests": Array<string>,
    "about": string,
    "fullName"?: string,
    "firstName": string,
    "lastName": string,
    "profilePicture"?: string,
    "track": string,
    "facebookUsername"?: string,
    "twitterUsername"?: string,
    "instagramUsername"?: string,
    "LinkedinUsername"?: string,
    "tiktokUsername"?: string,
}