import { BaseRepository } from "../base/BaseRepository";
import { AxiosResponse } from "axios";

/**
 * Resource Repository
 * Handles all resource-related API calls (file uploads, resources, etc.)
 */
export class ResourceRepository extends BaseRepository {
  /**
   * Upload file
   */
  async upload<T = unknown>(
    formData: FormData
  ): Promise<AxiosResponse<{ data: T; message: string }>> {
    return await this.uploadFile("/upload/file", formData);
  }

  /**
   * Get resources
   */
  async getResources<T>(params?: Record<string, unknown>): Promise<T> {
    return await this.get("/resource", { params });
  }

  /**
   * Get resource by ID
   */
  async getResourceById<T>(resourceId: string): Promise<T> {
    return await this.get(`/resource/${resourceId}`);
  }

  /**
   * Create resource
   */
  async createResource<T>(
    data: unknown
  ): Promise<AxiosResponse<{ data: T; message: string }>> {
    return await this.post("/resource", data);
  }

  /**
   * Update resource
   */
  async updateResource<T>(
    resourceId: string,
    data: unknown
  ): Promise<AxiosResponse<{ data: T; message: string }>> {
    return await this.patch(`/resource/${resourceId}`, data);
  }

  /**
   * Delete resource
   */
  async deleteResource<T>(
    resourceId: string
  ): Promise<AxiosResponse<{ data: T; message: string }>> {
    return await this.delete(`/resource/${resourceId}`);
  }
}

// Export singleton instance
export const resourceRepository = new ResourceRepository();
