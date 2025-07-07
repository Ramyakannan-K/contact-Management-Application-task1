
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateContactForm = (data: {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumber: string;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.firstName.trim()) {
    errors.push('First name is required');
  }

  if (!data.lastName.trim()) {
    errors.push('Last name is required');
  }

  if (!data.address.trim()) {
    errors.push('Address is required');
  }

  if (!data.email.trim()) {
    errors.push('Email is required');
  } else if (!validateEmail(data.email)) {
    errors.push('Please enter a valid email address');
  }

  if (!data.phoneNumber.trim()) {
    errors.push('Phone number is required');
  } else if (!validatePhoneNumber(data.phoneNumber)) {
    errors.push('Please enter a valid phone number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
