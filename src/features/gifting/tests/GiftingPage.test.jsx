import { render, screen, fireEvent } from '@testing-library/react';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { GiftingPage } from '../GiftingPage';
import { mockWallets } from '@solana/wallet-adapter-react';

describe('GiftingPage', () => {
  test('renders amount input', () => {
    render(
      <WalletProvider wallets={mockWallets} onError={jest.fn()}>
        <GiftingPage amount={50000} onAmountChange={jest.fn()} />
      </WalletProvider>
    );
    expect(screen.getByDisplayValue('50000')).toBeInTheDocument();
  });

  test('changes amount on button click', () => {
    const onChange = jest.fn();
    render(<GiftingPage amount={50000} onAmountChange={onChange} />);
    fireEvent.click(screen.getByText('10k'));
    expect(onChange).toHaveBeenCalledWith(10000);
  });
});