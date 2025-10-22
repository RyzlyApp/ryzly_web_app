import { BaseRepository } from "../../modules/base/BaseRepository";

/**
 * Track Repository
 * Handles all track and interest-related API calls
 */
export class TrackRepository extends BaseRepository {
  /**
   * Get all interests
   */
  async getInterests<T>(): Promise<T> {
    return await this.getUnsecure("/track/interests");
  }

  /**
   * Get all tracks
   */
  async getTracks<T>(): Promise<T> {
    return await this.getUnsecure("/track/tracks");
  }

  /**
   * Get levels
   */
  async getLevels<T>(): Promise<T> {
    return await this.getUnsecure("/challenge/level");
  }

  /**
   * Get industries
   */
  async getIndustries<T>(): Promise<T> {
    return await this.getUnsecure("/challenge/Industry");
  }
}

// Export singleton instance
export const trackRepository = new TrackRepository();
