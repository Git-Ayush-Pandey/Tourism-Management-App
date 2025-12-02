export const REGIONS = ['Jammu', 'Kashmir', 'Ladakh'];

export const API_BASE_URL =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_URL) ||
  (typeof process !== 'undefined' &&
    process.env &&
    process.env.VITE_API_URL) ||
  "http://localhost:5000/api"; 

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
};

export const ROLES = { USER: 'user', ADMIN: 'admin' };
export const PAGE_SIZES = [10, 20, 50];
export const DATE_FORMAT_OPTIONS = { day: '2-digit', month: 'short', year: 'numeric' };
export const CURRENCY = 'INR';
