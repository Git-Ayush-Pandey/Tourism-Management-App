export const REGIONS = ['Jammu', 'Kashmir', 'Ladakh'];

// Backend API base (Render-compatible)
export const API_BASE_URL =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_URL) ||
  (typeof process !== 'undefined' &&
    process.env &&
    process.env.VITE_API_URL) ||
  'https://tourism-backend.onrender.com/api';  // fallback for production

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
};

export const ROLES = { USER: 'user', ADMIN: 'admin' };
export const PAGE_SIZES = [10, 20, 50];
export const DATE_FORMAT_OPTIONS = { day: '2-digit', month: 'short', year: 'numeric' };
export const CURRENCY = 'INR';
