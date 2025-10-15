/**
 * Data Access Layer (DAL) - Main Entry Point
 * 
 * This module provides a centralized data access layer for the application.
 * All API calls should ideally go through these repositories to maintain
 * consistency and make it easier to manage data operations.
 * 
 * Usage:
 * ```typescript
 * import { dal } from '@/dal';
 * 
 * // Use in components or hooks
 * const response = await dal.auth.login({ email: 'user@example.com' });
 * const challenges = await dal.challenge.getChallenges();
 * ```
 */

// Export all repositories
export { authRepository } from "./repositories/AuthRepository";
export { challengeRepository } from "./repositories/ChallengeRepository";
export { userRepository } from "./repositories/UserRepository";
export { resourceRepository } from "./repositories/ResourceRepository";
export { trackRepository } from "./repositories/TrackRepository";
export { chatRepository } from "./repositories/ChatRepository";

// Export base repository for custom extensions
export { BaseRepository } from "./base/BaseRepository";

// Export repository classes for testing or custom instantiation
export { AuthRepository } from "./repositories/AuthRepository";
export { ChallengeRepository } from "./repositories/ChallengeRepository";
export { UserRepository } from "./repositories/UserRepository";
export { ResourceRepository } from "./repositories/ResourceRepository";
export { TrackRepository } from "./repositories/TrackRepository";
export { ChatRepository } from "./repositories/ChatRepository";

// Convenient default export with all repositories
import { authRepository } from "./repositories/AuthRepository";
import { challengeRepository } from "./repositories/ChallengeRepository";
import { userRepository } from "./repositories/UserRepository";
import { resourceRepository } from "./repositories/ResourceRepository";
import { trackRepository } from "./repositories/TrackRepository";
import { chatRepository } from "./repositories/ChatRepository";

/**
 * Main DAL object containing all repository instances
 */
export const dal = {
  auth: authRepository,
  challenge: challengeRepository,
  user: userRepository,
  resource: resourceRepository,
  track: trackRepository,
  chat: chatRepository,
};

export default dal;
