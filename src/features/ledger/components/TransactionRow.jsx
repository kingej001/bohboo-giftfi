import React from 'react';

const TransactionRow = ({ tx }) => (
  <li className="p-3 bg-white/50 rounded-xl text-sm">
    <div className="font-mono text-xs mb-1">{tx.signature.slice(0, 10)}...</div>
    <div className="text-gray-600">{tx.date}</div>
  </li>
);

export default TransactionRow;