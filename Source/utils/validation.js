// src/utils/validation.js
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) {
    return 'Email is required';
  } else if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email';
  }
  return null; // No error
};

export const validatePassword = (password) => {
  if (!password.trim()) {
    return 'Password is required';
  } else if (password.trim().length < 6) {
    return 'Password must be at least 6 characters';
  }
  return null;
};

// You can add more like:
export const validateName = (name) => {
  if (!name.trim()) {
    return 'Name is required';
  }
  return null;
};
