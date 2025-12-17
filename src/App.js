import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import { ConnectWalletPage } from './features/connect-wallet';
import { GiftingPage } from './features/gifting';
import { LedgerPage } from './features/ledger';

function App() {
  const { publicKey, connected } = useWallet();
  const [giftAmount, setGiftAmount] = useState(50000);
  const location = useLocation();

  const shortenedAddress = publicKey 
    ? `${publicKey.toBase58().slice(0, 4)}…${publicKey.toBase58().slice(-6)}` 
    : '';

  if (!connected && (location.pathname === '/send' || location.pathname === '/ledger')) {
    return <ConnectWalletPage />;
  }

  return (
    <div className="app-container flex flex-col bg-bohboo-green">
      <Header connected={connected} shortenedAddress={shortenedAddress} />
      <main className="flex-1 p-4 pb-20 flex items-center justify-center">
        <Routes>
          <Route path="/" element={<ConnectWalletPage />} />
          <Route path="/send" element={<GiftingPage amount={giftAmount} onAmountChange={setGiftAmount} />} />
          <Route path="/ledger" element={<LedgerPage />} />
          <Route path="/more" element={<div className="text-center text-gray-500">More coming soon! ⋯</div>} />
        </Routes>
      </main>
      {location.pathname !== '/ledger' && location.pathname !== '/more' && <NavBar />}
    </div>
  );
}

export default App;