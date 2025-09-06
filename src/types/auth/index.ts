// Define the registration form data interface
export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  agreeToTerms: boolean;
}

// Define validation error interface
export interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  username?: string;
  agreeToTerms?: string;
  general?: string;
}
