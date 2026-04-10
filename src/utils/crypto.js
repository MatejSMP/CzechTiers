import CryptoJS from 'crypto-js';

/**
 * Decrypts data using the provided password.
 */
export const decryptData = (encryptedData, password) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, password);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedText) return null;
    return JSON.parse(decryptedText);
  } catch (error) {
    return null;
  }
};

/**
 * Encrypts data using the provided password.
 */
export const encryptData = (data, password) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), password).toString();
};

/**
 * Hashes a string (for simple non-reversible checks like admin codes).
 */
export const hashString = (str) => {
  return CryptoJS.SHA256(str).toString();
};
