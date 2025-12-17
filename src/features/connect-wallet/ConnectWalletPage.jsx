import React, { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/ConnectWalletPage.module.css';
import WalletButton from './components/WalletButton';

const ConnectWalletPage = () => {
  const { connecting, connected } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (connected) {
      navigate('/send');
    }
  }, [connected, navigate]);

  return (
    <div className={`${styles.pageContainer} flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4`}>
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg max-w-md w-full">
        <div className="mb-6">
          <div className={`${styles.logoWrapper} flex justify-center mb-4`}>
            <img 
              src="/images/bohboocoin.jpg" 
              alt="Bohboo Icons" 
              className="w-20 h-20 object-contain rounded-full" 
              onError={(e) => { e.target.src = 'https://via.placeholder.com/80?text=🦌👻'; }}
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Unlock the Enchanted Portal</h2>
          <p className="text-gray-600">Connect your Solana wallet to send magical Bohboo gifts.</p>
        </div>
        <WalletButton connecting={connecting} />
        <p className="text-xs text-gray-500 mt-4 text-center">Securely supports Phantom, Solflare, etc.</p>
      </div>
    </div>
  );
};

export default ConnectWalletPage;