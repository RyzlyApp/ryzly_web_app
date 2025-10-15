# Data Access Layer (DAL)

## Overview

The Data Access Layer (DAL) provides a centralized, organized way to handle all API calls in the application. It follows the Repository pattern to separate data access logic from business logic.

## Architecture

```
dal/
├── base/
│   └── BaseRepository.ts       # Base class with common HTTP methods
├── repositories/
│   ├── AuthRepository.ts       # Authentication operations
│   ├── ChallengeRepository.ts  # Challenge CRUD operations
│   ├── UserRepository.ts       # User profile operations
│   ├── ResourceRepository.ts   # File uploads and resources
│   ├── TrackRepository.ts      # Tracks and interests
│   └── ChatRepository.ts       # Chat and messaging
├── index.ts                    # Main entry point
└── README.md                   # This file
```

## Benefits

1. **Centralized Data Access**: All API calls in one place
2. **Type Safety**: Full TypeScript support with generics
3. **Reusability**: Share logic across components
4. **Testability**: Easy to mock for unit tests
5. **Maintainability**: Changes to API structure in one place
6. **Consistency**: Standardized error handling and response format

## Usage

### Basic Usage

```typescript
import { dal } from '@/dal';

// In a component or hook
const handleLogin = async (email: string) => {
  try {
    const response = await dal.auth.login({ email });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
```

### With React Query

```typescript
import { dal } from '@/dal';
import { useMutation, useQuery } from '@tanstack/react-query';

// Query example
const { data, isLoading } = useQuery({
  queryKey: ['challenges'],
  queryFn: () => dal.challenge.getChallenges<Challenge[]>(),
});

// Mutation example
const loginMutation = useMutation({
  mutationFn: (data: { email: string }) => dal.auth.login(data),
  onSuccess: (response) => {
    console.log('Login successful:', response.data);
  },
});
```

### With Custom Hooks

```typescript
import { dal } from '@/dal';
import { useMutation } from '@tanstack/react-query';

const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: (data: { email: string }) => dal.auth.login(data),
    onSuccess: (response) => {
      // Handle success
    },
    onError: (error) => {
      // Handle error
    },
  });

  return { loginMutation };
};
```

## Repository Methods

### AuthRepository

- `login(data)` - User login
- `signup(data)` - Create new account
- `verifyToken(userId, token)` - Verify authentication token
- `getUserDetails(token?)` - Get user details

### ChallengeRepository

- `getChallenges(params?)` - Get all challenges
- `getChallengeById(id)` - Get single challenge
- `createChallenge(data)` - Create new challenge
- `updateChallenge(id, data)` - Update challenge
- `deleteChallenge(id)` - Delete challenge
- `joinChallenge(id)` - Join a challenge
- `applyForCoach(userId, data)` - Apply as coach
- `createTask(data)` - Create task
- `updateTask(id, data)` - Update task
- `deleteTask(id)` - Delete task
- `getTasks(params?)` - Get tasks
- `submitChallenge(data)` - Submit challenge
- `getSubmissions(params?)` - Get submissions

### UserRepository

- `getProfile()` - Get current user profile
- `updateProfile(data)` - Update profile
- `getUserById(id)` - Get user by ID
- `completeOnboarding(data)` - Complete onboarding
- `getUserStats()` - Get user statistics
- `getUserAchievements()` - Get achievements

### ResourceRepository

- `uploadFile(formData)` - Upload file
- `getResources(params?)` - Get resources
- `getResourceById(id)` - Get single resource
- `createResource(data)` - Create resource
- `updateResource(id, data)` - Update resource
- `deleteResource(id)` - Delete resource

### TrackRepository

- `getInterests()` - Get all interests
- `getTracks()` - Get all tracks
- `getLevels()` - Get challenge levels
- `getIndustries()` - Get industries

### ChatRepository

- `getMessages(params?)` - Get chat messages
- `sendMessage(data)` - Send message
- `getConversations(params?)` - Get conversations
- `getConversationById(id)` - Get conversation
- `createConversation(data)` - Create conversation
- `markAsRead(id)` - Mark messages as read

## Migration Guide

### Before (Direct HTTP calls)

```typescript
import httpService from '@/helper/services/httpService';

const response = await httpService.post('/challenge', data);
```

### After (Using DAL)

```typescript
import { dal } from '@/dal';

const response = await dal.challenge.createChallenge(data);
```

### Before (Custom fetch functions)

```typescript
import { fetchSecureData } from '@/helper/services/api';

const challenges = await fetchSecureData<Challenge[]>('/challenge');
```

### After (Using DAL)

```typescript
import { dal } from '@/dal';

const challenges = await dal.challenge.getChallenges<Challenge[]>();
```

## Extending the DAL

To add a new repository:

1. Create a new file in `repositories/` (e.g., `NotificationRepository.ts`)
2. Extend `BaseRepository`
3. Add your methods
4. Export singleton instance
5. Add to `dal/index.ts`

Example:

```typescript
// repositories/NotificationRepository.ts
import { BaseRepository } from "../base/BaseRepository";

export class NotificationRepository extends BaseRepository {
  async getNotifications<T>(): Promise<T> {
    return await this.get("/notifications");
  }
}

export const notificationRepository = new NotificationRepository();
```

Then add to `dal/index.ts`:

```typescript
export { notificationRepository } from "./repositories/NotificationRepository";

export const dal = {
  // ... existing repositories
  notification: notificationRepository,
};
```

## Backward Compatibility

The DAL is designed to work alongside existing code. You can:

1. Keep using existing `httpService` and `fetchSecureData` functions
2. Gradually migrate to DAL as you refactor
3. Use both approaches in the same codebase

The existing `httpService` is still used internally by the DAL, so there's no breaking change.

## Best Practices

1. **Use TypeScript generics** for type-safe responses
2. **Handle errors** at the component/hook level
3. **Use React Query** for caching and state management
4. **Keep repositories focused** on data access only
5. **Don't add business logic** to repositories
6. **Use the singleton instances** exported from each repository

## Testing

Mock the DAL in tests:

```typescript
import { dal } from '@/dal';

jest.mock('@/dal', () => ({
  dal: {
    auth: {
      login: jest.fn(),
    },
  },
}));

// In test
(dal.auth.login as jest.Mock).mockResolvedValue({
  data: { userId: '123' },
});
```

## Support

For questions or issues with the DAL, please refer to the main project documentation or contact the development team.
