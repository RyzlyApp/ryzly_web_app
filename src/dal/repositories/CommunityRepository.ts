import { BaseRepository } from "../../modules/base/BaseRepository";
import { AxiosResponse } from "axios";

/**
 * Community Repository
 * Handles all community-related API calls (communities, community members, etc.)
 */
export class CommunityRepository extends BaseRepository {
  /**
   * Get communities
   */
  async getCommunities<T>(params?: Record<string, unknown>): Promise<T> {
    return await this.get("/community", { params });
  }

//   /**
//    * Get community by ID
//    */
//   async getCommunityById<T>(communityId: string): Promise<T> {
//     return await this.get(`/community/${communityId}`);
//   }

//   /**
//    * Create community
//    */
//   async createCommunity<T>(
//     data: unknown
//   ): Promise<AxiosResponse<{ data: T; message: string }>> {
//     return await this.post("/community", data);
//   }

//   /**
//    * Update community
//    */
//   async updateCommunity<T>(
//     communityId: string,
//     data: unknown
//   ): Promise<AxiosResponse<{ data: T; message: string }>> {
//     return await this.patch(`/community/${communityId}`, data);
//   }

//   /**
//    * Delete resource
//    */
//   async deleteResource<T>(
//     resourceId: string
//   ): Promise<AxiosResponse<{ data: T; message: string }>> {
//     return await this.delete(`/resource/${resourceId}`);
//   }
}

// Export singleton instance
export const communityRepository = new CommunityRepository();
