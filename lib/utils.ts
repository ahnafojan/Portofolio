import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)

  if (parts.length <= 1) {
    return { first: "", last: parts[0] || "" }
  }

  const last = parts[parts.length - 1]
  const first = parts.slice(0, -1).join(" ")

  return { first, last }
}
