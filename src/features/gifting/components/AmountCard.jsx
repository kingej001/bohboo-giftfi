import React from 'react';

const AmountCard = ({ amount, onAmountChange }) => (
  <div className="frosted-card rounded-2xl p-4 space-y-3">
    <label className="block text-sm font-medium text-gray-700">BohbooCoin Amount</label>
    <input
      type="number"
      value={amount}
      onChange={(e) => onAmountChange(Number(e.target.value))}
      className="w-full p-3 text-right rounded-xl border border-gray-300 bg-transparent"
      min="0"
    />
    <div className="flex justify-center space-x-2">
      {[10000, 50000, 100000].map((amt) => (
        <button
          key={amt}
          onClick={() => onAmountChange(amt)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${amount === amt ? 'bg-green-200 text-green-800' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}
        >
          {amt / 1000}k
        </button>
      ))}
    </div>
  </div>
);

export default AmountCard;