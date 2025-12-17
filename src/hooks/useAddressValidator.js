import { useMemo } from 'react';

/**
 * Custom hook for Solana address validation.
 * @param {string} address - The address to validate.
 * @returns {object} Validation result.
 */
export const useAddressValidator = (address) => {
  return useMemo(() => {
    const isValid = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
    return {
      isValid,
      message: isValid ? 'Valid Solana address' : 'Invalid address',
      className: isValid ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50',
    };
  }, [address]);
};