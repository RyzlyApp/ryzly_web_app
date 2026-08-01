import httpService from "@/helper/services/httpService";
import { ICommunityMessage, ICommunityMessageResponse } from "../models/community-chat.model";

export class TimelineRepository {

  // POST /community/{communityId}/messages
  async sendTimelineMessage(
    content: string,
    image?: string,
    type?: string
  ): Promise<ICommunityMessage> {
    const response = await httpService.post<ICommunityMessageResponse>(
      `/time-line/messages`,
      {
        content,
        ...(image ? { image } : {}),
        ...(type  ? { type  } : {}),
      }
    );
    return response.data.data as ICommunityMessage;
  }

  // GET /community/message/{communityId}
  async getTimelineMessages() {
    const response = await httpService.get<ICommunityMessageResponse>(
      `/time-line/message`
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
      `/time-line/messages/${messageId}/replies`,
      {
        content,
        ...(image ? { image } : {}),
        ...(type  ? { type  } : {}),
      }
    );
    return response.data.data as ICommunityMessage;
  }

  // GET /community/replies/{messageId}
  async getTimelineReplies(messageId: string): Promise<{ data: ICommunityMessage[]; total: number }> {
    const response = await httpService.get<ICommunityMessageResponse>(
      `/time-line/replies/${messageId}`
    );
    return {
      data: response.data.data as ICommunityMessage[],
      total: response.data.total ?? 0,
    };
  }

  // POST /community/messages/{messageId}/like
  async likeAndUnlike(messageId: string): Promise<ICommunityMessage> {
    const response = await httpService.post<ICommunityMessageResponse>(
      `/time-line/messages/${messageId}/like`,
    );
    return response.data.data as ICommunityMessage;
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

export default new TimelineRepository();