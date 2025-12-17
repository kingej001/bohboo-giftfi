import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Header = ({ connected, shortenedAddress }) => (
  <header className="flex flex-col p-4 pt-12 bg-bohboo-light frosted-card rounded-b-3xl mx-4 mt-4 shadow-sm z-10">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center space-x-2">
        <img 
          src="/images/bohboocoin.jpg" 
          alt="Bohboo Logo" 
          className="w-10 h-10 object-contain rounded-full" 
          onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=🦌'; }}
        />
        <h1 className="text-xl font-bold text-gray-800">Bohboo Gifting</h1>
      </div>
      <WalletMultiButton className="!bg-transparent !border !border-gray-300 !text-gray-600 !rounded-full !px-4 !py-1 !text-sm hover:!bg-gray-100" />
    </div>
    {connected && (
      <p className="text-xs text-gray-600 text-center">
        You are connected as: <span className="font-mono">{shortenedAddress}</span>
      </p>
    )}
  </header>
);

export default Header;