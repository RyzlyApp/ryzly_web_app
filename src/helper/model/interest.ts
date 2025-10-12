
export interface IInterest {
    "_id": string,
    "isDeleted": boolean,
    "createdAt": string,
    "updatedAt": string,
    "name": string,
    "active": boolean,
    "isTrack": boolean,
    "__v": number
}

export interface ITrack {
    "_id": string,
    "isDeleted": boolean,
    "createdAt": string,
    "updatedAt": string,
    "name": string,
    "active": boolean,
    "isTrack": boolean,
    "__v": number
}

export interface ILevel {
    "_id": string,
    "name": string,
    "type": string,
    "createdBy": string,
    "updatedBy": string,
    "createdAt": string,
    "updatedAt": string
}

export interface IIndustry {
    "_id": string,
    "name": string,
    "type": string,
    "createdBy": string,
    "updatedBy": string,
    "createdAt": string,
    "updatedAt": string
}