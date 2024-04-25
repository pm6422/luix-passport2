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


export function formatDateTime(value: string | Date): string {
  if (!value) {
    return '';
  }
  return dayjs(value).format(defaultDateTimeFormat);
}

export function formatDate(value: string | Date): string {
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
  return sorting?.length
    ? sorting.map(({ id, desc }) => `${id},${desc ? 'desc' : 'asc'}`)
    : undefined;
}

export function merge(source: any, target: any): any {
  return Object.entries(source).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, { ...target });
}

export function toBase64(file: File) {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		
		fileReader.readAsDataURL(file);
		
		fileReader.onload = () => {
			resolve(fileReader.result);
		};
		
		fileReader.onerror = (error) => {
			reject(error);
		};
	});
}
