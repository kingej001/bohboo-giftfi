import React from 'react';
import { WalletModalButton } from '@solana/wallet-adapter-react-ui';

const WalletButton = ({ connecting }) => {
  return (
    <WalletModalButton
      disabled={connecting}
      className="w-full bg-yellow-400 hover:bg-orange-400 disabled:bg-yellow-300 disabled:cursor-not-allowed text-gray-800 font-semibold py-4 px-6 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105 active:scale-95"
    >
      <span>💰</span> {/* Or ✨ / 🦌👻 for more magic */}
      <span>{connecting ? 'Connecting...' : 'Connect Solana Wallet ✨'}</span>
    </WalletModalButton>
  );
};

export default WalletButton;