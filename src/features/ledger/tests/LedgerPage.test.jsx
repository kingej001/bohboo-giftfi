import { render, screen, waitFor } from '@testing-library/react';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { LedgerPage } from '../LedgerPage';
import { mockWallets } from '@solana/wallet-adapter-react';

describe('LedgerPage', () => {
  test('renders loading state', () => {
    render(
      <WalletProvider wallets={mockWallets} onError={jest.fn()}>
        <LedgerPage />
      </WalletProvider>
    );
    expect(screen.getByText('Loading history...')).toBeInTheDocument();
  });

  test('renders empty state', async () => {
    // Mock empty txs – use waitFor for async
    render(<LedgerPage />);  // Expand with mocks
    await waitFor(() => expect(screen.getByText('No transactions yet. Send a gift to start!')).toBeInTheDocument());
  });
});