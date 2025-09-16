# HTTP Service and API Integration

This directory contains the HTTP service implementation using Axios with interceptors and React Query integration.

## Files Overview

### `httpService.ts`
A comprehensive HTTP service class that provides:
- Axios instance with request/response interceptors
- Automatic authentication token handling
- Error handling and normalization
- Request/response logging in development
- File upload and download capabilities
- Retry logic and timeout configuration

### `apiServices.ts`
Service functions that use the HTTP service to interact with specific API endpoints:
- Authentication services (login, register, logout)
- File management services (upload, download, delete)
- Folder management services
- User management services
- Health check services

### `useApi.ts` (in hooks directory)
React Query hooks that provide:
- Caching and synchronization
- Loading and error states
- Optimistic updates
- Background refetching
- Mutation handling

## Usage Examples

### Basic HTTP Service Usage

```typescript
import httpService from '@/utils/httpService';

// GET request
const response = await httpService.get('/api/users');

// POST request
const newUser = await httpService.post('/api/users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// File upload
const file = new File(['content'], 'test.txt');
const uploadResponse = await httpService.uploadFile('/api/files/upload', file);
```

### Using API Services

```typescript
import { authService, fileService } from '@/utils/apiServices';

// Login
const loginResult = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});

// Upload file
const uploadResult = await fileService.uploadFile(
  file,
  'folder-id',
  (progress) => console.log(`Upload progress: ${progress}%`)
);
```

### Using React Query Hooks

```typescript
import { useAuth, useFiles, useFolders } from '@/hooks/useApi';

function MyComponent() {
  const { profile, login, logout } = useAuth();
  const { files, upload, delete: deleteFile } = useFiles('folder-id');
  const { folders, create: createFolder } = useFolders();

  const handleLogin = async () => {
    try {
      await login.mutateAsync({
        email: 'user@example.com',
        password: 'password123'
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      await upload.mutateAsync({
        file,
        folderId: 'current-folder-id',
        onProgress: (progress) => console.log(`${progress}%`)
      });
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  if (files.isLoading) return <div>Loading...</div>;
  if (files.error) return <div>Error: {files.error.message}</div>;

  return (
    <div>
      <h1>Files</h1>
      {files.data?.data.map(file => (
        <div key={file.id}>{file.name}</div>
      ))}
    </div>
  );
}
```

## Configuration

### Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### API Configuration

The API configuration is centralized in `@/config/api.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};
```

## Features

### Request/Response Interceptors

- **Request Interceptor**: Adds authentication tokens, request logging
- **Response Interceptor**: Handles errors, calculates request duration, manages token refresh

### Error Handling

- Automatic retry for failed requests
- Normalized error responses
- Specific handling for 401 (unauthorized) and 403 (forbidden) errors
- Network error detection

### Authentication

- Automatic token attachment to requests
- Token storage in localStorage/sessionStorage
- Automatic logout on 401 errors
- Token refresh handling

### File Operations

- File upload with progress tracking
- File download with blob handling
- Multipart form data support
- Large file handling

### React Query Integration

- Automatic caching and background updates
- Optimistic updates for mutations
- Loading and error states
- Query invalidation on mutations
- Stale-while-revalidate pattern

## Best Practices

1. **Use the service functions** instead of calling httpService directly
2. **Use React Query hooks** for data fetching in components
3. **Handle loading and error states** in your UI
4. **Use optimistic updates** for better UX
5. **Invalidate related queries** after mutations
6. **Set appropriate stale times** based on data volatility

## Error Handling in Components

```typescript
function FileList() {
  const { files, upload } = useFiles();

  const handleUpload = async (file: File) => {
    try {
      await upload.mutateAsync({ file });
      // Success handled automatically by React Query
    } catch (error) {
      // Handle specific errors
      if (error.status === 413) {
        alert('File too large');
      } else {
        alert('Upload failed: ' + error.message);
      }
    }
  };

  return (
    <div>
      {files.isError && (
        <div className="error">
          Failed to load files: {files.error?.message}
        </div>
      )}
      {/* Rest of component */}
    </div>
  );
}
```

## Testing

For testing, you can mock the HTTP service:

```typescript
// In your test file
jest.mock('@/utils/httpService', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));
```

Or use MSW (Mock Service Worker) for more realistic API mocking.