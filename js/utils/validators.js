export function isNotEmpty(value) {
  return typeof value === "string" && value.trim().length > 0;
}
export function isValidName(value) {
  if (!isNotEmpty(value)) return false;
  const pattern = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,}$/;
  return pattern.test(value.trim());
}

export function isValidEmail(value) {
  if (!isNotEmpty(value)) return false;
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value.trim());
}

// Norwegian phone number: at least 8 digits, can include +, spaces
export function isValidPhone(value) {
  if (!isNotEmpty(value)) return false;
  const cleaned = value.replace(/\s+/g, "");
  const pattern = /^\+?\d{8,15}$/;
  return pattern.test(cleaned);
}

// Norwegian postalcode - 4 digits
export function isValidPostalCode(value) {
  if (!isNotEmpty(value)) return false;
  const pattern = /^\d{4}$/;
  return pattern.test(value.trim());
}

// Simple card number validation – 13–19 digits
export function isValidCardNumber(value) {
  if (!isNotEmpty(value)) return false;
  const cleaned = value.replace(/\s+/g, "");
  const pattern = /^\d{13,19}$/;
  return pattern.test(cleaned);
}

// Expiry MM/YY – checks that month is 01–12
export function isValidExpiry(value) {
  if (!isNotEmpty(value)) return false;
  const pattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
  return pattern.test(value.trim());
}

// CVV 3–4 digits
export function isValidCVV(value) {
  if (!isNotEmpty(value)) return false;
  const pattern = /^\d{3,4}$/;
  return pattern.test(value.trim());
}
