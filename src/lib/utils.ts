import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function valuesOf<T>(obj: Record<string, T>) {
  return Object.values(obj);
}

export function keysOf<T>(obj: Record<string, T>) {
  return Object.keys(obj);
}
