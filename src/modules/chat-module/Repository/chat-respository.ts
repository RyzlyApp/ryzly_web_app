import { BaseRepository } from "@/dal";
import { RepositoryPayload } from "@/modules/general/Repository-payload";
import { CreateChatDto } from "../dto/Create-chat-dto";
import { ENDPOINTS } from "@/modules/general/endpoints";
import { CreateChatMessageDto } from "../dto/create-message-dto";
import { GeneralResponse } from "@/modules/general/General-response";
import { ChatModel } from "../models/Chat-model";
import { MessageModel } from "../models/Message-model";

export class ChatRepository extends BaseRepository {
  private baseEndpoint = ENDPOINTS.chats;
  private fileUploadEndpoint = ENDPOINTS.fileUploads;

  // export all http methods from the swagger documentation

  public async createChat(
    payload: RepositoryPayload<CreateChatDto, {}>
  ): Promise<GeneralResponse<any>> {
    const response = await this.httpClient.post(
      this.baseEndpoint.chat,
      payload.body
    );
    return response.data as GeneralResponse<any>;
  }

  public async getUserChats(): Promise<GeneralResponse<any>> {
    const response = await this.httpClient.get(this.baseEndpoint.chat);
    return response.data as GeneralResponse<any>;
  }

  public async getChatById(
    payload: RepositoryPayload<null, { id: string }>
  ): Promise<GeneralResponse<any>> {
    const response = await this.httpClient.get(
      this.baseEndpoint.get_chat_by_id(payload.params.id)
    );
    return response.data as GeneralResponse<ChatModel>;
  }

  public async getChatMessages(
    payload: RepositoryPayload<null, { chatId: string }>
  ): Promise<GeneralResponse<any>> {
    const response = await this.httpClient.get(
      this.baseEndpoint.get_chat_messages(payload.params.chatId)
    );
    return response.data as GeneralResponse<MessageModel[]>;
  }

  public async getChatByChallengeId(
    payload: RepositoryPayload<null, { challengeId: string }>
  ): Promise<GeneralResponse<any>> {
    const response = await this.httpClient.get(
      this.baseEndpoint.get_chat_by_challenge_id(payload.params.challengeId)
    );
    return response.data as GeneralResponse<ChatModel>;
  }

  public async sendMessage(
    payload: RepositoryPayload<CreateChatMessageDto, { chatId: string }>
  ) {
    return this.httpClient.post(
      this.baseEndpoint.get_chat_messages(payload.params.chatId),
      payload.body
    );
  }

  public async deleteMessage(
    payload: RepositoryPayload<null, { messageId: string }>
  ): Promise<GeneralResponse<any>> {
    const response = await this.httpClient.delete(
      this.baseEndpoint.delete_chat_message(payload.params.messageId)
    );
    return response.data as GeneralResponse<any>;
  }

  public async deleteChat(
    payload: RepositoryPayload<null, { messageId: string }>
  ): Promise<GeneralResponse<any>> {
    const response = await this.httpClient.delete(
      this.baseEndpoint.delete_chat_message(payload.params.messageId)
    );
    return response.data as GeneralResponse<any>;
  }

  public async uploadImage(payload: RepositoryPayload<FormData, {}>) {
    const response = await this.httpClient.post(
      this.fileUploadEndpoint.upload_file,
      payload.body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data as GeneralResponse<{ url: string }>;
  }
}

// export as a singleton
export default new ChatRepository();
