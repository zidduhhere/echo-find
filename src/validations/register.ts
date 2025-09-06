/**
 * Validation functions specific to the registration form
 */
import { isValidEmail } from "./auth";
import { ValidationErrors } from "../types/auth";

/**
 * Validates the email input for the register form
 * @param email The email to validate
 * @returns Error message or empty string if valid
 */
export const validateRegisterEmail = (email: string): string => {
  if (!email.trim()) {
    return "Email is required";
  } else if (!isValidEmail(email)) {
    return "Email is invalid";
  }
  return "";
};

/**
 * Validates the username input for the register form
 * @param username The username to validate
 * @returns Error message or empty string if valid
 */
export const validateRegisterUsername = (username: string): string => {
  if (!username.trim()) {
    return "Username is required";
  } else if (username.length < 2) {
    return "Username must be at least 2 characters";
  }
  return "";
};

/**
 * Validates the password input for the register form
 * @param password The password to validate
 * @returns Error message or empty string if valid
 */
export const validateRegisterPassword = (password: string): string => {
  if (!password) {
    return "Password is required";
  } else if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
  return "";
};

/**
 * Validates that the confirm password matches the password
 * @param password The original password
 * @param confirmPassword The confirmation password
 * @returns Error message or empty string if valid
 */
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string => {
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return "";
};

/**
 * Validates the entire register form data
 * @param formData The form data to validate
 * @returns An object containing validation errors (empty if no errors)
 */
export const validateRegisterForm = (formData: {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}): ValidationErrors => {
  const errors: ValidationErrors = {};

  const emailError = validateRegisterEmail(formData.email);
  if (emailError) errors.email = emailError;

  const usernameError = validateRegisterUsername(formData.username);
  if (usernameError) errors.username = usernameError;

  const passwordError = validateRegisterPassword(formData.password);
  if (passwordError) errors.password = passwordError;

  const confirmPasswordError = validateConfirmPassword(
    formData.password,
    formData.confirmPassword
  );
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

  return errors;
};
