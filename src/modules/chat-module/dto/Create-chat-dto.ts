export enum CHAT_TYPE {
  ONE_TO_ONE = 'ONE_TO_ONE',
  CHALLENGE = 'CHALLENGE',
  GROUP = 'GROUP',
  COMMUNITY = 'COMMUNITY',
}

export interface CreateChatDto {
  chatType: CHAT_TYPE;
  typeId: string;
  participantIds: string[];
  challengeId: string;
}
