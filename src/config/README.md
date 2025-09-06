# Route Configuration System

This directory contains the centralized routing configuration for the EcoFinds application.

## Files Overview

### `routes.tsx`

Central configuration file that defines all application routes with metadata:

- **Public Routes**: Accessible to all users
- **Auth Routes**: Only for non-authenticated users (login, register)
- **Protected Routes**: Require authentication
- **Route Metadata**: Titles, descriptions, navigation info

### `RouteGuard.tsx`

Authentication guard component that:

- Redirects unauthenticated users from protected routes
- Redirects authenticated users from auth-only routes
- Shows loading state during auth checks

### `AppRoutes.tsx`

Route renderer that applies guards to all routes automatically.

## Usage Examples

### Adding a New Route

```tsx
// In routes.tsx
export const protectedRoutes: RouteConfig[] = [
  // ... existing routes
  {
    path: "/new-feature",
    element: <NewFeature />,
    requiresAuth: true,
    title: "New Feature - EcoFinds",
    description: "Description of the new feature",
    showInNav: true,
    navLabel: "New Feature",
    icon: "feature",
  },
];
```

### Using Route Information in Components

```tsx
import { useRouteInfo } from "../hooks/useRouteInfo";

const MyComponent = () => {
  const { currentRoute, navigationRoutes, isAuthenticated } = useRouteInfo();

  return (
    <div>
      <h1>{currentRoute?.title}</h1>
      {/* Component content */}
    </div>
  );
};
```

### Automatic Page Metadata

```tsx
import { usePageMeta } from "../hooks/useRouteInfo";

const MyPage = () => {
  // Automatically sets document title and meta description
  usePageMeta();

  return <div>Page content</div>;
};
```

## Route Configuration Properties

```tsx
interface RouteConfig {
  path: string; // Route path (React Router)
  element: ReactElement; // Component to render
  requiresAuth?: boolean; // Requires authentication
  requiresGuest?: boolean; // Only for non-authenticated users
  title?: string; // Page title
  description?: string; // Meta description
  showInNav?: boolean; // Show in navigation
  navLabel?: string; // Navigation label
  icon?: string; // Icon identifier
}
```

## Benefits

1. **Centralized Configuration**: All routes defined in one place
2. **Type Safety**: Full TypeScript support
3. **Automatic Guards**: Authentication handled automatically
4. **SEO Ready**: Automatic meta tags
5. **Navigation Ready**: Routes can be used for dynamic navigation
6. **Maintainable**: Easy to add, modify, or remove routes

## Helper Functions

- `getRouteByPath(path)`: Find route configuration by path
- `getNavigationRoutes(isAuthenticated)`: Get routes for navigation
- `getProtectedRoutes()`: Get all protected routes
- `getPublicRoutes()`: Get all public routes
