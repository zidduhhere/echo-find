import { RegistrationFormData, ValidationErrors } from "../types/auth";

/**
 * Validates a user's registration data
 * @param data The registration form data to validate
 * @returns An object containing validation errors (empty if no errors)
 */
export const validateRegistrationData = (
  data: RegistrationFormData
): ValidationErrors => {
  const errors: ValidationErrors = {};

  // First name validation
  if (!data.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  // Last name validation
  if (!data.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  // Email validation
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Username validation
  if (!data.username.trim()) {
    errors.username = "Username is required";
  } else if (data.username.length < 3) {
    errors.username = "Username must be at least 3 characters";
  }

  // Password validation
  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  // Confirm password validation
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  // Terms agreement validation
  if (!data.agreeToTerms) {
    errors.agreeToTerms = "You must agree to the terms and conditions";
  }

  return errors;
};

/**
 * Validates if an email string is in a valid format
 * @param email The email string to validate
 * @returns True if the email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates login credentials
 * @param email The user's email
 * @param password The user's password
 * @returns An object containing validation errors (empty if no errors)
 */
export const validateLoginCredentials = (
  email: string,
  password: string
): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(email)) {
    errors.email = "Email is invalid";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  return errors;
};

/**
 * Validates password strength
 * @param password The password to validate
 * @returns True if the password meets strength requirements, false otherwise
 */
export const isStrongPassword = (password: string): boolean => {
  // Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
};
