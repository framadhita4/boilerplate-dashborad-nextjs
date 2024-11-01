/* eslint-disable no-bitwise */
import { type ClassValue, clsx } from 'clsx';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

// import type { ResponseError } from '../react-query/service/types';

// export const isResponseError = (error: unknown): error is ResponseError => {
//   if (error && typeof error === 'object' && ('code' in error || 'error' in error)) {
//     return true;
//   }
//   return false;
// };

export const hexToRgb = (hex: string) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createPaginate = <T>(data: T[] | undefined, currentPage: number, pageSize: number) => {
  if (!data) return [];
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, data.length);
  return data.slice(startIndex, endIndex);
};

/**
 * Paginate an array
 * @param {Array} items - The array of items to paginate.
 * @param {number} currentPage - The current page number (1-indexed).
 * @param {number} pageSize - The number of items per page.
 * @returns {Array} The items on the current page.
 */
export const paginateArray = <T>(items: T[], currentPage: number, pageSize = 10): T[] => {
  const offset = (currentPage - 1) * pageSize;
  return items.slice(offset, offset + pageSize);
};
