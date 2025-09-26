
export interface IUser {
    "_id"?: string,
    "isDeleted"?: boolean,
    "createdAt"?: string,
    "updatedAt"?: string,
    "email": string,
    "isCoach": boolean,
    "skills": Array<string>,
    "interets": Array<string>,
    "__v"?: number,
    "about": string,
    "fullName": string,
    "profilePicture": string,
    "track": string
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
    "profilePicture": string,
    "track": string
}