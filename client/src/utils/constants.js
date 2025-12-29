export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL || 'http://localhost:3000';

export const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,30}$/;
export const URL_REGEX = /^https?:\/\/.+/;

export const THEME_COLORS = [
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Green', value: '#10b981' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Cyan', value: '#06b6d4' },
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];