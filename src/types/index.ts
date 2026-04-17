export interface Challenge {
  id: string;
  duration: number;
  image: string;
  skills: string[];
  title: string;
  description: string;
  winningPrice: number;
  participatingPrice: number;
}

export interface IAnnouncement {
  _id: string;
  content: string;
  title: string;
  challengeId: string;
  createdAt: string;
  updatedAt: string;
  coachId: string;
  isDeleted: boolean;
}
