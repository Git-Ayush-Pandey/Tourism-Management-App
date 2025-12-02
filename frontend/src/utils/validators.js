export const isEmail = (v) => /\S+@\S+\.\S+/.test(String(v || '').trim());
export const isRequired = (v) => String(v ?? '').trim().length > 0;
export const isPhone = (v) => /^\+?\d{10,14}$/.test(String(v || '').trim());
export const isStrongPassword = (v) => String(v || '').length >= 6;

export const validateSignup = ({ name, email, password }) => {
  const errors = {};
  if (!isRequired(name)) errors.name = 'Name is required';
  if (!isEmail(email)) errors.email = 'Valid email is required';
  if (!isStrongPassword(password)) errors.password = 'Password must be at least 6 characters';
  return errors;
};

export const validateLogin = ({ email, password }) => {
  const errors = {};
  if (!isEmail(email)) errors.email = 'Valid email is required';
  if (!isRequired(password)) errors.password = 'Password is required';
  return errors;
};
