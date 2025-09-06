/**
 * Validates that a string is not empty
 * @param value The string to validate
 * @param fieldName The name of the field (for error message)
 * @returns An error message if invalid, empty string if valid
 */
export const validateRequired = (value: string, fieldName: string): string => {
  return value.trim() ? "" : `${fieldName} is required`;
};

/**
 * Validates minimum length of a string
 * @param value The string to validate
 * @param minLength The minimum length required
 * @param fieldName The name of the field (for error message)
 * @returns An error message if invalid, empty string if valid
 */
export const validateMinLength = (
  value: string,
  minLength: number,
  fieldName: string
): string => {
  return value.length >= minLength
    ? ""
    : `${fieldName} must be at least ${minLength} characters`;
};

/**
 * Validates maximum length of a string
 * @param value The string to validate
 * @param maxLength The maximum length allowed
 * @param fieldName The name of the field (for error message)
 * @returns An error message if invalid, empty string if valid
 */
export const validateMaxLength = (
  value: string,
  maxLength: number,
  fieldName: string
): string => {
  return value.length <= maxLength
    ? ""
    : `${fieldName} must be less than ${maxLength} characters`;
};

/**
 * Validates that a value is a number
 * @param value The value to validate
 * @param fieldName The name of the field (for error message)
 * @returns An error message if invalid, empty string if valid
 */
export const validateNumber = (value: string, fieldName: string): string => {
  return !isNaN(Number(value)) ? "" : `${fieldName} must be a number`;
};

/**
 * Validates that a number is within a range
 * @param value The number to validate
 * @param min The minimum allowed value
 * @param max The maximum allowed value
 * @param fieldName The name of the field (for error message)
 * @returns An error message if invalid, empty string if valid
 */
export const validateRange = (
  value: number,
  min: number,
  max: number,
  fieldName: string
): string => {
  return value >= min && value <= max
    ? ""
    : `${fieldName} must be between ${min} and ${max}`;
};
