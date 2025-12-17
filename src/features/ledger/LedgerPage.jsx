import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import styles from './styles/LedgerPage.module.css';
import TransactionRow from './components/TransactionRow';  // Default import

const LedgerPage = () => {
  const { publicKey } = useWallet();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (publicKey) {
      const connection = new Connection('https://api.devnet.solana.com');
      connection.getConfirmedSignaturesForAddress2(publicKey, { limit: 10 })
        .then((sigs) => {
          setTransactions(sigs.map(sig => ({ signature: sig.signature, date: new Date(sig.blockTime * 1000).toLocaleString() })));
          setLoading(false);
        })
        .catch(console.error);
    }
  }, [publicKey]);

  if (loading) return <div className={`${styles.loadingSpinner} text-center text-gray-500`}>Loading history...</div>;

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Ledger History 📊</h2>
      <div className={`${styles.historyList} frosted-card rounded-2xl p-4 space-y-2 overflow-y-auto max-h-[60vh]`}>
        {transactions.length === 0 ? (
          <p className={`${styles.emptyState} text-center text-gray-500`}>No transactions yet. Send a gift to start!</p>
        ) : (
          <ul className="space-y-3">
            {transactions.map((tx, index) => (
              <TransactionRow key={index} tx={tx} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LedgerPage;