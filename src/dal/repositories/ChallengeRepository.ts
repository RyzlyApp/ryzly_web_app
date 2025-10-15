import { BaseRepository } from "../base/BaseRepository";
import { IApplication, ICompetition, ITask } from "@/helper/model/application";
import { AxiosResponse } from "axios";

/**
 * Challenge Repository
 * Handles all challenge-related API calls
 */
export class ChallengeRepository extends BaseRepository {
  /**
   * Get all challenges
   */
  async getChallenges<T>(params?: Record<string, unknown>): Promise<T> {
    return await this.get("/challenge", { params });
  }

  /**
   * Get challenge by ID
   */
  async getChallengeById<T>(challengeId: string): Promise<T> {
    return await this.get(`/challenge/${challengeId}`);
  }

  /**
   * Create new challenge
   */
  async createChallenge(
    data: ICompetition
  ): Promise<AxiosResponse<{ data: unknown; message: string }>> {
    return await this.post("/challenge", data);
  }

  /**
   * Update challenge
   */
  async updateChallenge(
    challengeId: string,
    data: ICompetition
  ): Promise<AxiosResponse<{ data: unknown; message: string }>> {
    return await this.patch(`/challenge/${challengeId}`, data);
  }

  /**
   * Delete challenge
   */
  async deleteChallenge(
    challengeId: string
  ): Promise<AxiosResponse<{ data: unknown; message: string }>> {
    return await this.delete(`/challenge/${challengeId}`);
  }

  /**
   * Join challenge
   */
  async joinChallenge(
    challengeId: string
  ): Promise<AxiosResponse<{ data: unknown; message: string }>> {
    return await this.post(`/challenge/join/${challengeId}`);
  }

  /**
   * Apply for coach
   */
  async applyForCoach(
    userId: string,
    data: IApplication
  ): Promise<AxiosResponse<{ data: unknown; message: string }>> {
    return await this.post(`/application/${userId}`, data);
  }

  /**
   * Create task
   */
  async createTask(
    data: ITask
  ): Promise<AxiosResponse<{ data: unknown; message: string }>> {
    return await this.post("/task", data);
  }

  /**
   * Update task
   */
  async updateTask(
    taskId: string,
    data: ITask
  ): Promise<AxiosResponse<{ data: unknown; message: string }>> {
    return await this.patch(`/task/${taskId}`, data);
  }

  /**
   * Delete task
   */
  async deleteTask(
    taskId: string
  ): Promise<AxiosResponse<{ data: unknown; message: string }>> {
    return await this.delete(`/task/${taskId}`);
  }

  /**
   * Get tasks
   */
  async getTasks<T>(params?: Record<string, unknown>): Promise<T> {
    return await this.get("/task", { params });
  }

  /**
   * Submit challenge
   */
  async submitChallenge(
    data: unknown
  ): Promise<AxiosResponse<{ data: unknown; message: string }>> {
    return await this.post("/submission", data);
  }

  /**
   * Get submissions
   */
  async getSubmissions<T>(params?: Record<string, unknown>): Promise<T> {
    return await this.get("/submission", { params });
  }
}

// Export singleton instance
export const challengeRepository = new ChallengeRepository();
