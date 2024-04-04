import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from 'dayjs'
import { customAlphabet } from "nanoid"
import { ColumnSort } from '@tanstack/react-table'

export const defaultDateTimeFormat = "YYYY-MM-DD HH:mm:ss";
export const defaultDateFormat = "YYYY-MM-DD";

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

// export function formatDate(
//   date: Date | string | number,
//   options: Intl.DateTimeFormatOptions = {}
// ) {
//   return new Intl.DateTimeFormat("en-US", {
//     month: options.month ?? "long",
//     day: options.day ?? "numeric",
//     year: options.year ?? "numeric",
//     ...options,
//   }).format(new Date(date))
// }

export function generateId({ length = 8, prefix = "" } = {}) {
  return `${prefix}${customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    length
  )()}`
}

export function parseSorts(sorting: Array<ColumnSort>): Array<string> | undefined {
  var sorts;
  if(sorting && sorting.length > 0) {
    sorts = []
    sorting.forEach(sort => {
      sorts.push(`${sort.id},${sort.desc ? 'desc' : 'asc'}`)
    })
  }
  return sorts;
}
