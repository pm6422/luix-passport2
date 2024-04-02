import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from 'dayjs'

export const defaultTimeZone = "Asia/Shanghai";
export const defaultDateTimeFormat = "YYYY-MM-DD HH:mm:ss";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * @description format date time with the specified format
 */
export function formatDateTime(value: string): string {
  if (!value) {
    return '';
  }
  return dayjs(value).format(defaultDateTimeFormat);
}

/**
 * @description format date 
 */
export function formatDate(value: string, format: string): string {
  if (!value) {
    return '';
  }
  return dayjs(value).format(format);
}
