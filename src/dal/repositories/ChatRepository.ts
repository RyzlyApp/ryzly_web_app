import { BaseRepository } from "../../modules/base/BaseRepository";
import { AxiosResponse } from "axios";

/**
 * Chat Repository
 * Handles all chat and messaging-related API calls
 */
export class ChatRepository extends BaseRepository {
  /**
   * Get chat messages
   */
  async getMessages<T>(params?: Record<string, unknown>): Promise<T> {
    return await this.get("/chat/messages", { params });
  }

  /**
   * Send message
   */
  async sendMessage<T>(
    data: unknown
  ): Promise<AxiosResponse<{ data: T; message: string }>> {
    return await this.post("/chat/message", data);
  }

  /**
   * Get conversations
   */
  async getConversations<T>(params?: Record<string, unknown>): Promise<T> {
    return await this.get("/chat/conversations", { params });
  }

  /**
   * Get conversation by ID
   */
  async getConversationById<T>(conversationId: string): Promise<T> {
    return await this.get(`/chat/conversation/${conversationId}`);
  }

  /**
   * Create conversation
   */
  async createConversation<T>(
    data: unknown
  ): Promise<AxiosResponse<{ data: T; message: string }>> {
    return await this.post("/chat/conversation", data);
  }

  /**
   * Mark messages as read
   */
  async markAsRead<T>(
    conversationId: string
  ): Promise<AxiosResponse<{ data: T; message: string }>> {
    return await this.patch(`/chat/conversation/${conversationId}/read`);
  }
}

// Export singleton instance
export const chatRepository = new ChatRepository();
