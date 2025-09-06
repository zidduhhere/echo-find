/**
 * Generic validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Combines multiple validation rules into a single validation result
 * @param validations Object with field names as keys and validation results (string errors) as values
 * @returns A ValidationResult object with combined results
 */
export const combineValidations = (
  validations: Record<string, string>
): ValidationResult => {
  const errors: Record<string, string> = {};

  // Add all non-empty validation error messages
  Object.entries(validations).forEach(([field, errorMessage]) => {
    if (errorMessage) {
      errors[field] = errorMessage;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Creates a validation pipeline for a form field
 * @param value The value to validate
 * @param validations Array of validation functions to apply
 * @returns The first error message found, or empty string if valid
 */
export const validateField = (
  value: any,
  validations: Array<(val: any) => string>
): string => {
  for (const validate of validations) {
    const error = validate(value);
    if (error) {
      return error;
    }
  }
  return "";
};

/**
 * Returns a debounced version of a function
 * @param func The function to debounce
 * @param delay The delay in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
