import { IUser } from "./user"

export interface IChallenge {
    "_id": string,
    "thumbnail": string,
    "isPublic": boolean,
    "title": string,
    "description": string,
    "winnerPrice": number,
    "participationFee": number,
    "category": string,
    "tags": string[],
    "isPublish": boolean,
    "tasks": Array<string>,
    "resources": Array<string>,
    "leaderboards": Array<string>,
    "level": string,
    "endDate": string,
    "startDate": string,
    "industry": string,
    "participants": Array<string>,
    "creator": IUser,
    "coaches": Array<string>,
    "createdAt": string,
    "updatedAt": string,
    "overview": {
        "_id": string,
        "includes": Array<any>,
        "requirements": Array<any>,
        "whoIs": Array<any>,
        "challengeID": string,
        "createdAt": string,
        "updatedAt": string
    },
    "duration": {
        "fromNowToStart": {
            "weeks": number,
            "days": number,
            "totalDays": number
        },
        "fromNowToEnd": {
            "weeks": number,
            "days": number,
            "totalDays": number
        },
        "startToEnd": {
            "weeks": number,
            "days": number,
            "totalDays": number
        }
    },
    "url": string
}