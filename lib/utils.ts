import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type LatLngString = {
  lat: number;
  lng: number;
};

export function parseLatLngString(value: string): LatLngString | null {
  const match = value
    .trim()
    .match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
  if (!match) return null;
  const [, lat, lng] = match;
  return { lat: Number(lat), lng: Number(lng) };
}
