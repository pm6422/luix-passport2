import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from 'dayjs'

export const defaultDateTimeFormat = "YYYY-MM-DD HH:mm:ss";
export const defaultDateFormat = "YYYY-MM-DD HH:mm:ss";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDateTime(value: string): string {
  if (!value) {
    return '';
  }
  return dayjs(value).format(defaultDateTimeFormat);
}

export function formatDate(value: string): string {
  if (!value) {
    return '';
  }
  return dayjs(value).format(defaultDateFormat);
}
