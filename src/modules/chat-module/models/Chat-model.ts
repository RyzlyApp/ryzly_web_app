export class ChatModel {
  _id: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  senderId: string;
  challengeId: string;
  chatType: string;
  typeId: string;
  participantIds: string[];

  constructor(
    _id: string,
    isDeleted: boolean,
    createdAt: string,
    updatedAt: string,
    senderId: string,
    challengeId: string,
    chatType: string,
    typeId: string,
    participantIds: string[]
  ) {
    this._id = _id;
    this.isDeleted = isDeleted;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.senderId = senderId;
    this.challengeId = challengeId;
    this.chatType = chatType;
    this.typeId = typeId;
    this.participantIds = participantIds;
  }
}
