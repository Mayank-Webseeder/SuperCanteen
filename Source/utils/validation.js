// utils/validation.js
export const validateEmail = email => {
 const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email.trim()) {
    return 'Email is required';
  } else if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email';
  }

  return null;
};


export const validatePassword = (password) => {
  if (!password.trim()) {
    return 'Password is required';
  }

  const trimmed = password.trim();

  if (trimmed.length < 8) {
    return 'Password must be at least 8 characters long';
  }

  const hasUpperCase = /[A-Z]/.test(trimmed);
  const hasLowerCase = /[a-z]/.test(trimmed);
  const hasNumber = /[0-9]/.test(trimmed);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(trimmed);

  if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
    return 'Password must include uppercase, lowercase, number, and special character';
  }

  return null;
};


export const validateName = name => {
  if (!name.trim()) {
    return 'Name is required';
  }
  return null;
};


export const stripHtml = (html) => {
  return html.replace(/<[^>]*>?/gm, '');
};
