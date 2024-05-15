import { type ClassValue, clsx } from 'clsx';
import { intervalToDuration } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const compareDates = (starDate: Date) => {
  const differValue =
    intervalToDuration({
      start: new Date(starDate),
      end: new Date(),
    })?.minutes ?? 1;

  return differValue;
};
