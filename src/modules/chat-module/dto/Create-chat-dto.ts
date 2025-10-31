export interface CreateChatDto {
  chatType: "ONE_TO_ONE" | "CHALLENGE";
  typeId: string;
  participantIds: string[];
  challengeId: string;
}
