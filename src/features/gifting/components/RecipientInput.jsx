import React from 'react';

const RecipientInput = ({ recipient, setRecipient, isValid }) => (
  <div className="frosted-card rounded-2xl p-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">Recipient's Solana Address</label>
    <input
      type="text"
      value={recipient}
      onChange={(e) => setRecipient(e.target.value)}
      className={`w-full p-3 rounded-xl focus:outline-none ${isValid ? 'border-green-300 bg-green-50' : 'border-gray-300'}`}
      placeholder="Enter full address (e.g., 2p3b…eB4N9Z)"
    />
  </div>
);

export default RecipientInput;