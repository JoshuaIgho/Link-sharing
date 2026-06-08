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
  { name: 'Slate', value: '#334155' },
];

export const THEME_PRESETS = [
  { id: 'minimal', name: 'Minimal', description: 'Clean and simple white background' },
  { id: 'glass', name: 'Glassmorphism', description: 'Modern frosted glass effect' },
  { id: 'gradient', name: 'Soft Gradient', description: 'Elegant color transitions' },
  { id: 'dark', name: 'Deep Dark', description: 'Sophisticated dark mode' },
];

export const FONT_PRESETS = [
  { id: 'sans', name: 'Modern Sans', class: 'font-sans' },
  { id: 'serif', name: 'Elegant Serif', class: 'font-serif' },
  { id: 'mono', name: 'Clean Mono', class: 'font-mono' },
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];