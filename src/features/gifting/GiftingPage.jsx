/* global BigInt */  // Fixes ESLint 'BigInt' is not defined error

import React, { useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction } from '@solana/web3.js';
import {
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountIdempotentInstruction,
  createTransferCheckedInstruction,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import styles from './styles/GiftingPage.module.css';
import AmountCard from './components/AmountCard';
import RecipientInput from './components/RecipientInput';

const GiftingPage = ({ amount, onAmountChange }) => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [recipient, setRecipient] = useState('');
  const [note, setNote] = useState('Wishing you a magical day!');
  const [sending, setSending] = useState(false);

  const BOHBOO_MINT = new PublicKey('4xMXegyso9etbWGyCN9Y73hGBzmVireCBYwnEsivpump');
  const DECIMALS = 6;  // Confirmed correct for BOHBOO

  const handleSend = async () => {
    if (!publicKey || !connection) {
      alert('Wallet not connected.');
      return;
    }
    if (!amount || amount <= 0) {
      alert('Please select a valid amount.');
      return;
    }
    if (!recipient) {
      alert('Please enter a recipient address.');
      return;
    }

    let recipientPubkey;
    try {
      recipientPubkey = new PublicKey(recipient);
    } catch {
      alert('Invalid recipient address format.');
      return;
    }

    setSending(true);
    try {
      // Compute Associated Token Accounts (ATAs)
      const fromATA = getAssociatedTokenAddressSync(
        BOHBOO_MINT,
        publicKey,
        false,
        TOKEN_PROGRAM_ID
      );
      const toATA = getAssociatedTokenAddressSync(
        BOHBOO_MINT,
        recipientPubkey,
        false,
        TOKEN_PROGRAM_ID
      );

      // Build transaction
      const transaction = new Transaction();

      // Idempotent ATA creation for recipient (creates if needed, safe if exists)
      transaction.add(
        createAssociatedTokenAccountIdempotentInstruction(
          publicKey,      // payer
          toATA,          // ata
          recipientPubkey,// owner
          BOHBOO_MINT     // mint
        )
      );

      // Optional: idempotent for sender (rarely needed but safe)
      transaction.add(
        createAssociatedTokenAccountIdempotentInstruction(
          publicKey,
          fromATA,
          publicKey,
          BOHBOO_MINT
        )
      );

      // Transfer with checked decimals/mint
      const tokenAmount = BigInt(Math.round(amount * 10 ** DECIMALS));

      transaction.add(
        createTransferCheckedInstruction(
          fromATA,         // source
          BOHBOO_MINT,     // mint
          toATA,           // destination
          publicKey,       // owner
          tokenAmount,     // amount (as bigint)
          DECIMALS,        // decimals
          [],              // multisigners (none)
          TOKEN_PROGRAM_ID
        )
      );

      // Get fresh blockhash
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // Send via wallet (Phantom/Solflare will prompt)
      const signature = await sendTransaction(transaction, connection, {
        skipPreflight: false,
        maxRetries: 3,
      });

      // Confirm on-chain
      await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight,
      });

      alert(
        `✨ BOHBOO sent successfully to ${recipient.slice(0, 4)}...${recipient.slice(-4)}!\n` +
        `Amount: ${amount} BOHBOO\n` +
        `Tx: ${signature}\n` +
        `Note: ${note}\n` +
        `View on Solscan: https://solscan.io/tx/${signature}`
      );
    } catch (error) {
      console.error('Send error:', error);
      alert(
        `Send failed: ${error.message || error}\n\n` +
        `Tips:\n` +
        `- Ensure you have ~0.002-0.01 SOL for fees (higher if creating new ATA)\n` +
        `- Approve the transaction in Phantom/Solflare`
      );
    } finally {
      setSending(false);
    }
  };

  const isValidAddress = (addr) => /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(addr);

  return (
    <div className={`${styles.formContainer} max-w-md mx-auto space-y-6`}>
      <h2 className="text-2xl font-bold text-center flex items-center justify-center space-x-2">
        <span>🎁</span>
        <span>Send a Magical Gift</span>
      </h2>

      <AmountCard amount={amount} onAmountChange={onAmountChange} />

      <RecipientInput
        recipient={recipient}
        setRecipient={setRecipient}
        isValid={isValidAddress(recipient)}
      />

      <div className="frosted-card rounded-2xl p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gift Note (Optional)
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className={`${styles.noteTextarea} w-full p-3 rounded-xl border border-gray-300 h-20 resize-none`}
          placeholder="Wishing you a magical day!"
        />
      </div>

      <button
        onClick={handleSend}
        disabled={!isValidAddress(recipient) || sending || !amount || amount <= 0}
        className={`${styles.sendButton} w-full bg-bohboo-accent hover:bg-orange-400 text-white py-4 rounded-2xl flex items-center justify-center space-x-2 disabled:opacity-50`}
      >
        <span>✨</span>
        <span>{sending ? 'Sending Magic...' : 'Send Gift Now'}</span>
      </button>
    </div>
  );
};

export default GiftingPage;