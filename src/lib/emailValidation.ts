// Common personal email domains to check against
const PERSONAL_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'yahoo.co.in',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'msn.com',
  'aol.com',
  'icloud.com',
  'mail.com',
  'protonmail.com',
  'rediffmail.com',
  'ymail.com',
  'zoho.com',
  'gmx.com',
  'yandex.com',
  'inbox.com',
  'mailinator.com',
  'tempmail.com',
  '10minutemail.com',
];

/**
 * Validates if an email is a business email (not a personal email)
 * @param email - The email address to validate
 * @returns true if it's a business email, false if it's a personal email
 */
export const isBusinessEmail = (email: string): boolean => {
  if (!email || !email.includes('@')) {
    return false;
  }

  const domain = email.split('@')[1]?.toLowerCase().trim();
  
  if (!domain) {
    return false;
  }

  // Check if domain is in the personal email list
  return !PERSONAL_EMAIL_DOMAINS.includes(domain);
};

/**
 * Validates phone number format (Indian phone numbers)
 * @param phone - The phone number to validate
 * @returns true if valid, false otherwise
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  if (!phone) {
    return false;
  }

  // Remove spaces, dashes, and plus signs
  const cleaned = phone.replace(/[\s\-+]/g, '');
  
  // Check if it's a valid Indian phone number (10 digits starting with 6-9)
  // Or with country code (91) + 10 digits
  const indianPhoneRegex = /^(\+91|91)?[6-9]\d{9}$/;
  
  return indianPhoneRegex.test(cleaned);
};

