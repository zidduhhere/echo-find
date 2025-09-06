# Login Module Structure

This folder contains the modular login components for the EcoFinds application.

## File Structure

```
src/pages/login/
├── index.tsx                    # Main login component that integrates all parts
├── MobileLogin.tsx             # Mobile-specific login layout
├── DesktopLoginForm.tsx        # Left side of desktop login (form)
├── DesktopWelcomeSection.tsx   # Right side of desktop login (welcome section)
└── README.md                   # This documentation file
```

## Components

### `index.tsx`

- **Purpose**: Main login component that manages state and logic
- **Responsibilities**:
  - Form state management
  - Authentication logic
  - Routing after successful login
  - Error handling
- **Exports**: `Login` component

### `MobileLogin.tsx`

- **Purpose**: Mobile-optimized login interface
- **Features**:
  - Centered layout with logo
  - Touch-friendly form inputs
  - Responsive design for mobile screens
- **Props**: Form data, handlers, and state from main component

### `DesktopLoginForm.tsx`

- **Purpose**: Left side form section for desktop layout
- **Features**:
  - Clean form design
  - Password visibility toggle
  - Focus states and transitions
  - Registration and password reset links
- **Props**: Form data, handlers, and state from main component

### `DesktopWelcomeSection.tsx`

- **Purpose**: Right side welcome section for desktop layout
- **Features**:
  - Brand presentation
  - Feature highlights
  - Gradient background
  - Company branding
- **Props**: None (static content)

## Usage

The login module is imported through the main `Login.tsx` file in the pages directory:

```tsx
import { Login } from "../pages/Login";
```

## Design System

All components use the custom Tailwind theme with:

- **Primary colors**: Forest green palette (`primary-*`)
- **Typography**: Consistent font weights and sizes
- **Spacing**: Standardized padding and margins
- **Animations**: Smooth transitions and hover effects

## Responsive Behavior

- **Mobile**: Single-column layout with stacked elements
- **Desktop**: Two-column layout with form on left, welcome on right
- **Tablet**: Uses desktop layout with adjusted spacing

## State Management

The main `index.tsx` component manages:

- Form data (email, password)
- Loading states
- Error messages
- Password visibility
- Authentication flow

## Authentication Flow

1. User enters credentials
2. Form validation
3. API call to login service
4. Success: Redirect to intended page
5. Error: Display error message
6. Loading states handled throughout

## Styling

Uses the custom EcoFinds theme with:

- Primary green colors for branding
- Clean, modern form inputs
- Consistent button styles
- Professional typography
