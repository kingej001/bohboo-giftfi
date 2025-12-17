import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { ConnectWalletPage } from '../ConnectWalletPage';
import { mockWallets } from '@solana/wallet-adapter-react';  // Mock for testing

describe('ConnectWalletPage', () => {
  test('renders connect button', () => {
    render(
      <BrowserRouter>
        <WalletProvider wallets={mockWallets} onError={jest.fn()}>
          <ConnectWalletPage />
        </WalletProvider>
      </BrowserRouter>
    );
    expect(screen.getByText('Connect Solana Wallet')).toBeInTheDocument();
  });

  test('shows connecting state', () => {
    // Mock connecting state – test logic
    render(<ConnectWalletPage />);  // Expand with mocks
    // Assertions...
  });
});