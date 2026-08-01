export interface ILogin {
    email: string;
}

export interface ITpLogin {
    email: string;
    firstName: string;
    lastName: string;
}

export interface IAuth {
    email: string;
    confirmemail: string;
    userType?: string;
    companyName?: string
}

export interface IUserForm {
    firstName?: string;
    lastName?: string;
    companyName?: string
    about?: string;
    profilePicture?: string;
    phone: string;
    track?: string; 
    Interests: string[];
    userType?: "learner" | "organization" | string
}
