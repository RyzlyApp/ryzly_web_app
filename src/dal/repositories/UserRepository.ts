import { BaseRepository } from "../base/BaseRepository";
import { AxiosResponse } from "axios";

/**
 * User Repository
 * Handles all user-related API calls
 */
export class UserRepository extends BaseRepository {
  /**
   * Get current user profile
   */
  async getProfile<T>(): Promise<T> {
    return await this.get("/user");
  }

  /**
   * Update user profile
   */
  async updateProfile<T>(
    data: unknown
  ): Promise<AxiosResponse<{ data: T; message: string }>> {
    return await this.patch("/user", data);
  }

  /**
   * Get user by ID
   */
  async getUserById<T>(userId: string): Promise<T> {
    return await this.get(`/user/${userId}`);
  }

  /**
   * Complete onboarding
   */
  async completeOnboarding<T>(
    data: unknown
  ): Promise<AxiosResponse<{ data: T; message: string }>> {
    return await this.post("/user/onboarding", data);
  }

  /**
   * Get user statistics
   */
  async getUserStats<T>(): Promise<T> {
    return await this.get("/user/stats");
  }

  /**
   * Get user achievements
   */
  async getUserAchievements<T>(): Promise<T> {
    return await this.get("/user/achievements");
  }
}

// Export singleton instance
export const userRepository = new UserRepository();
