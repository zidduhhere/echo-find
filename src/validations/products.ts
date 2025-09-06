import { Category, CATEGORIES } from "../types";

export interface ProductValidationErrors {
  title?: string;
  description?: string;
  price?: string;
  category?: string;
  image?: string;
  general?: string;
}

/**
 * Validates product data
 * @param title Product title
 * @param description Product description
 * @param price Product price
 * @param category Product category
 * @param imageUrl Product image URL (optional)
 * @returns An object containing validation errors (empty if no errors)
 */
export const validateProduct = (
  title: string,
  description: string,
  price: string | number,
  category: string,
  imageUrl?: string
): ProductValidationErrors => {
  const errors: ProductValidationErrors = {};
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  // Title validation
  if (!title.trim()) {
    errors.title = "Product title is required";
  } else if (title.length < 3) {
    errors.title = "Product title must be at least 3 characters";
  } else if (title.length > 100) {
    errors.title = "Product title must be less than 100 characters";
  }

  // Description validation
  if (!description.trim()) {
    errors.description = "Product description is required";
  } else if (description.length < 10) {
    errors.description = "Product description must be at least 10 characters";
  } else if (description.length > 1000) {
    errors.description =
      "Product description must be less than 1000 characters";
  }

  // Price validation
  if (isNaN(numericPrice)) {
    errors.price = "Price must be a valid number";
  } else if (numericPrice <= 0) {
    errors.price = "Price must be greater than 0";
  } else if (numericPrice > 10000) {
    errors.price = "Price must be less than 10,000";
  }

  // Category validation
  if (!category) {
    errors.category = "Product category is required";
  } else if (!CATEGORIES.includes(category as Category)) {
    errors.category = "Invalid product category";
  }

  // Image validation (if provided)
  if (imageUrl && !isValidImageUrl(imageUrl)) {
    errors.image = "Invalid image URL";
  }

  return errors;
};

/**
 * Basic validation to check if a string looks like a valid image URL
 * @param url The URL to validate
 * @returns True if the URL appears to be a valid image URL, false otherwise
 */
export const isValidImageUrl = (url: string): boolean => {
  // Simple check for common image extensions
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
  const lowerCaseUrl = url.toLowerCase();

  return (
    // Check if it's a URL
    (url.startsWith("http://") || url.startsWith("https://")) &&
    // Check if it has an image extension
    imageExtensions.some((ext) => lowerCaseUrl.endsWith(ext))
  );
};
