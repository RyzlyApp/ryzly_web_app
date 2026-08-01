import httpService from "@/helper/services/httpService";
import { ICommunityMessage, ICommunityMessageResponse } from "../models/community-chat.model";

export class CommunityChatRepository {

  // POST /community/{communityId}/messages
  async sendCommunityMessage(
    communityId: string,
    content: string,
    image?: string,
    type?: string
  ): Promise<ICommunityMessage> {
    const response = await httpService.post<ICommunityMessageResponse>(
      `/community/${communityId}/messages`,
      {
        content,
        ...(image ? { image } : {}),
        ...(type  ? { type  } : {}),
      }
    );
    return response.data.data as ICommunityMessage;
  }

  // GET /community/message/{communityId}
  async getCommunityMessages(communityId: string): Promise<{ data: ICommunityMessage[]; total: number }> {
    const response = await httpService.get<ICommunityMessageResponse>(
      `/community/message/${communityId}`
    );
    return {
      data: response.data.data as ICommunityMessage[],
      total: response.data.total ?? 0,
    };
  }

  // POST /community/messages/{messageId}/replies
  async replyCommunityMessage(
    messageId: string,
    content: string,
    image?: string,
    type?: string
  ): Promise<ICommunityMessage> {
    const response = await httpService.post<ICommunityMessageResponse>(
      `/community/messages/${messageId}/replies`,
      {
        content,
        ...(image ? { image } : {}),
        ...(type  ? { type  } : {}),
      }
    );
    return response.data.data as ICommunityMessage;
  }

  // GET /community/replies/{messageId}
  async getCommunityReplies(messageId: string): Promise<{ data: ICommunityMessage[]; total: number }> {
    const response = await httpService.get<ICommunityMessageResponse>(
      `/community/replies/${messageId}`
    );
    return {
      data: response.data.data as ICommunityMessage[],
      total: response.data.total ?? 0,
    };
  }

  // POST /community/messages/{messageId}/like
  async likeAndUnlike(messageId: string): Promise<ICommunityMessage> {
    const response = await httpService.post<ICommunityMessageResponse>(
      `/community/messages/${messageId}/like`,
    );
    return response.data.data as ICommunityMessage;
  }

  // POST /group/{groupId}/messages
  async sendGroupMessage(
    groupId: string,
    content: string,
    image?: string,
    type?: string
  ): Promise<ICommunityMessage> {
    const response = await httpService.post<ICommunityMessageResponse>(
      `/group/${groupId}/messages`,
      {
        content,
        ...(image ? { image } : {}),
        ...(type  ? { type  } : {}),
      }
    );
    return response.data.data as ICommunityMessage;
  }

  // GET /group/message/{groupId}
  async getGroupMessages(groupId: string): Promise<{ data: ICommunityMessage[]; total: number }> {
    const response = await httpService.get<ICommunityMessageResponse>(
      `/group/message/${groupId}`
    );
    return {
      data: response.data.data as ICommunityMessage[],
      total: response.data.total ?? 0,
    };
  }

  // POST /group/messages/{messageId}/replies
  async replyGroupMessage(
    messageId: string,
    content: string,
    image?: string,
    type?: string
  ): Promise<ICommunityMessage> {
    const response = await httpService.post<ICommunityMessageResponse>(
      `/group/messages/${messageId}/replies`,
      {
        content,
        ...(image ? { image } : {}),
        ...(type  ? { type  } : {}),
      }
    );
    return response.data.data as ICommunityMessage;
  }

  // GET /group/replies/{messageId}
  async getGroupReplies(messageId: string): Promise<{ data: ICommunityMessage[]; total: number }> {
    const response = await httpService.get<ICommunityMessageResponse>(
      `/group/replies/${messageId}`
    );
    return {
      data: response.data.data as ICommunityMessage[],
      total: response.data.total ?? 0,
    };
  }

  // Upload file — returns URL string
  async uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    const response = await httpService.post(
      "/upload/file",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response?.data?.url ?? response?.data?.data?.url ?? "";
  }
}

export default new CommunityChatRepository();