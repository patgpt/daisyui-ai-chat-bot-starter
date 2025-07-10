// cn.ts;

/**
 * @description Utility function to merge class names with tailwind merge and clsx
 * @param inputs - The class names to merge
 * @returns The merged class names
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
