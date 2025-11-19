import { IChallenge } from "./challenge"

export interface IUser {
    "ryzlyPoints": number,
    "achievements": string[],
    badgeLevel: string,
    "_id": string,
    "isDeleted": false,
    "createdAt": string,
    "updatedAt": string,
    "email": string,
    "isCoach": true,
    "skills": string[],
    "interets": string[], 
    "about": string,
    "fullName": string,
    "profilePicture": string,
    "track": string,
    "country": string,
    "phone": string,
    "username": string,
    "challenges": IChallenge[]
} 

export interface IProfile { 
    "email"?: string,  
    "phone": string,
    "country": string, 
    "username": string,
    "skills": Array<string>,
    "interets": Array<string>, 
    "about": string,
    "fullName": string,
    "profilePicture"?: string,
    "track": string
}


export interface IUpdateProfile { 
    "email"?: string,  
    "phone": string,
    "country": string, 
    "username"?: string,
    "skills": Array<string>,
    "interets": Array<string>, 
    "about": string,
    "fullName": string,
    "profilePicture"?: string,
    "track": string
}