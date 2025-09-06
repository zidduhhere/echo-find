# Register Module

This module handles user registration functionality for EcoFinds.

## Components

- `Register.tsx`: Main component that orchestrates the registration flow
- `DesktopRegisterForm.tsx`: Form component for desktop view
- `DesktopWelcomeSection.tsx`: Welcome message and branding for desktop view
- `MobileRegister.tsx`: Combined form and branding for mobile view

## Structure

The register module follows a responsive design pattern with different layouts for mobile and desktop:

- On desktop: Split screen with form on left, welcome content on right
- On mobile: Stacked layout with logo at top and form below

## State Management

Registration form state is managed in the main `Register.tsx` component and passed down to child components, including:

- Form field values
- Validation errors
- Loading state
- Password visibility toggles
