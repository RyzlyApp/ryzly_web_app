import { BaseRepository } from "../base/BaseRepository";
import { IAuth, ILogin } from "@/helper/model/auth";
import { AxiosResponse } from "axios";

/**
 * Authentication Repository
 * Handles all authentication-related API calls
 */
export class AuthRepository extends BaseRepository {
  /**
   * Login user
   */
  async login(data: ILogin): Promise<AxiosResponse<{ data: { userId: string }; message: string }>> {
    return await this.postUnsecure("/user-auth/login", data);
  }

  /**
   * Create new account
   */
  async signup(data: { email: string }): Promise<AxiosResponse<{ data: { userId: string }; message: string }>> {
    return await this.postUnsecure("/user-auth/create-account", data);
  }

  /**
   * Verify token
   */
  async verifyToken(
    userId: string,
    token: string
  ): Promise<AxiosResponse<{ data: { token: string }; message: string }>> {
    return await this.postUnsecure(
      `/user-auth/verify-token/${userId}/${token}`,
      { userId, token }
    );
  }

  /**
   * Get user details
   */
  async getUserDetails<T>(token?: string): Promise<T> {
    return await this.getUnsecure("/user", {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  }
}

// Export singleton instance
export const authRepository = new AuthRepository();
