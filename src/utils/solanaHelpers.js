import { Transaction, SystemProgram, PublicKey } from '@solana/web3.js';

/**
 * Helper to create a transfer transaction (demo SOL; extend for SPL BohbooCoin).
 * @param {PublicKey} fromPubkey - Sender key.
 * @param {PublicKey} toPubkey - Recipient key.
 * @param {number} amount - Amount in Bohboo units (convert to lamports).
 * @returns {Transaction} The transaction.
 */
export const createTransferTransaction = async (fromPubkey, toPubkey, amount) => {
  const lamports = Math.floor(amount * 0.00002 * 1e9);  // Placeholder conversion
  const tx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey,
      toPubkey,
      lamports,
    })
  );
  return tx;
};