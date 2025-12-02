import { STORAGE_KEYS, CURRENCY } from './constants';

export const formatPrice = (value, currency = CURRENCY) => {
  if (value === null || value === undefined || value === '') return '-';
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(Number(value));
  } catch {
    return `₹${value}`;
  }
};

export const formatDate = (date, options) => {
  if (!date) return '-';
  try {
    const d = (date instanceof Date) ? date : new Date(date);
    return d.toLocaleDateString('en-IN', options || { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return '-';
  }
};

export const cn = (...classes) => classes.filter(Boolean).join(' ');
export const sleep = (ms = 300) => new Promise(res => setTimeout(res, ms));

export const saveToStorage = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
export const getFromStorage = (k, fallback = null) => {
  try { const raw = localStorage.getItem(k); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; }
};
export const removeFromStorage = (k) => { try { localStorage.removeItem(k); } catch {} };

export const setSession = (token, user) => {
  if (token) localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  if (user) localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};
export const clearSession = () => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
};

export const getErrorMessage = (err, fallback = 'Something went wrong') => {
  if (!err) return fallback;
  if (typeof err === 'string') return err;
  if (err.response && err.response.data) return err.response.data.message || err.response.data.error || fallback;
  if (err.message) return err.message;
  return fallback;
};
