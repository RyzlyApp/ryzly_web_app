# DAL Usage Examples

This directory contains example files showing how to use the new Data Access Layer (DAL) in your application.

## Quick Start

### 1. Import the DAL

```typescript
import { dal } from '@/dal';
```

### 2. Use in Components

```typescript
// Simple component example
import { dal } from '@/dal';
import { useState } from 'react';

export default function ChallengesList() {
  const [challenges, setChallenges] = useState([]);

  const loadChallenges = async () => {
    try {
      const data = await dal.challenge.getChallenges();
      setChallenges(data);
    } catch (error) {
      console.error('Failed to load challenges:', error);
    }
  };

  return (
    <div>
      <button onClick={loadChallenges}>Load Challenges</button>
      {/* Render challenges */}
    </div>
  );
}
```

### 3. Use with React Query

```typescript
import { dal } from '@/dal';
import { useQuery, useMutation } from '@tanstack/react-query';

export default function UserProfile() {
  // Query example
  const { data: profile, isLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => dal.user.getProfile(),
  });

  // Mutation example
  const updateMutation = useMutation({
    mutationFn: (data) => dal.user.updateProfile(data),
    onSuccess: () => {
      console.log('Profile updated!');
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{profile?.name}</h1>
      <button onClick={() => updateMutation.mutate({ name: 'New Name' })}>
        Update Name
      </button>
    </div>
  );
}
```

### 4. Use in Custom Hooks

```typescript
import { dal } from '@/dal';
import { useMutation } from '@tanstack/react-query';
import { addToast } from '@heroui/toast';

export const useLogin = () => {
  const loginMutation = useMutation({
    mutationFn: (email: string) => dal.auth.login({ email }),
    onSuccess: (response) => {
      addToast({
        title: 'Success',
        description: 'Login successful!',
        color: 'success',
      });
      // Handle success (e.g., redirect, store token)
    },
    onError: (error) => {
      addToast({
        title: 'Error',
        description: 'Login failed',
        color: 'danger',
      });
    },
  });

  return { login: loginMutation.mutate, isLoading: loginMutation.isPending };
};
```

## Common Patterns

### Fetching Data

```typescript
// Get all challenges
const challenges = await dal.challenge.getChallenges<Challenge[]>();

// Get single challenge
const challenge = await dal.challenge.getChallengeById<Challenge>('123');

// Get with query parameters
const filteredChallenges = await dal.challenge.getChallenges<Challenge[]>({
  level: 'beginner',
  industry: 'tech',
});
```

### Creating Data

```typescript
// Create challenge
const response = await dal.challenge.createChallenge({
  title: 'New Challenge',
  description: 'Description here',
  // ... other fields
});

console.log(response.data.message); // Success message
```

### Updating Data

```typescript
// Update challenge
const response = await dal.challenge.updateChallenge('challenge-id', {
  title: 'Updated Title',
  // ... other fields
});
```

### Deleting Data

```typescript
// Delete challenge
const response = await dal.challenge.deleteChallenge('challenge-id');
```

### File Upload

```typescript
// Upload file
const formData = new FormData();
formData.append('file', file);

const response = await dal.resource.uploadFile(formData);
const fileUrl = response.data.data.url;
```

## Migration Examples

### Before: Direct httpService

```typescript
import httpService from '@/helper/services/httpService';

// Old way
const response = await httpService.post('/challenge', data);
const challenges = await httpService.get('/challenge');
```

### After: Using DAL

```typescript
import { dal } from '@/dal';

// New way
const response = await dal.challenge.createChallenge(data);
const challenges = await dal.challenge.getChallenges();
```

### Before: fetchSecureData

```typescript
import { fetchSecureData } from '@/helper/services/api';

// Old way
const challenges = await fetchSecureData<Challenge[]>('/challenge');
```

### After: Using DAL

```typescript
import { dal } from '@/dal';

// New way
const challenges = await dal.challenge.getChallenges<Challenge[]>();
```

## Available Repositories

- **dal.auth** - Authentication operations
- **dal.challenge** - Challenge CRUD operations
- **dal.user** - User profile operations
- **dal.resource** - File uploads and resources
- **dal.track** - Tracks and interests
- **dal.chat** - Chat and messaging

## Example Files

- `useAuthWithDAL.example.ts` - Complete auth hook refactored with DAL
- `useChallengeWithDAL.example.ts` - Complete challenge hook refactored with DAL

These files show how to refactor existing hooks to use the DAL while maintaining the same functionality.

## Tips

1. **Type Safety**: Always use TypeScript generics for type-safe responses
2. **Error Handling**: Handle errors at the component/hook level
3. **React Query**: Use React Query for automatic caching and refetching
4. **Backward Compatibility**: The DAL works alongside existing code
5. **Gradual Migration**: Migrate one feature at a time

## Need Help?

Refer to the main `README.md` in the `dal/` directory for complete documentation.
