// Input sanitization and validation utilities

/** Strip HTML tags to prevent XSS in stored content */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

/** Trim and limit string length */
export function sanitizeString(input: unknown, maxLength: number = 5000): string | null {
  if (input === null || input === undefined) return null;
  if (typeof input !== "string") return null;
  return stripHtml(input).trim().slice(0, maxLength);
}

/** Validate URL format */
export function isValidUrl(input: string): boolean {
  try {
    const url = new URL(input);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/** Validate root-relative URL path (e.g. /uploads/image.png?v=123) */
export function isValidRelativeUrl(input: string): boolean {
  if (!input.startsWith("/")) return false;
  if (input.startsWith("//")) return false;
  if (input.includes("..")) return false;
  return !/\s/.test(input);
}

/** Validate and sanitize a URL field — returns null if invalid */
export function sanitizeUrl(
  input: unknown,
  options?: { allowRelative?: boolean }
): string | null {
  if (!input || typeof input !== "string") return null;
  const trimmed = input.trim();
  if (!trimmed) return null;
  if (isValidUrl(trimmed)) return trimmed;
  if (options?.allowRelative && isValidRelativeUrl(trimmed)) return trimmed;
  return null;
}

/** Max lengths for different field types */
export const MAX_LENGTHS = {
  TITLE: 200,
  DESCRIPTION: 500,
  CONTENT: 50_000,
  EXCERPT: 500,
  CATEGORY: 100,
  SLUG: 300,
  URL: 2048,
  PRICE: 20,
  ICON: 50,
  EMAIL: 254,
  PASSWORD: 128,
  DISTRICT: 100,
  NEIGHBORHOOD: 100,
} as const;
