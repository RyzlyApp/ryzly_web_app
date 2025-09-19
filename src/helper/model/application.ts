

export interface IApplication {
    "expertise": string,
    "yearsOfExperience": number | string,
    "linkedInUrl": string,
    "portfolioUrl": string,
    "focusArea": string
}

export interface ICompetition {
    thumbnail: string;
    isPublic: boolean;
    title: string;
    description: string;
    winnerPrice: number | string;
    participationFee: number | string;
    category: string;
    tags: string[];
    level: string;
    startDate: string;
    endDate: string;
    industry: string;
}
