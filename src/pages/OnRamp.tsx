import { useFundWallet } from '@privy-io/react-auth/solana';
import useAppState from '../store/zustand/AppState';
import { Button, Input } from '@headlessui/react';
import { useState } from 'react';
import { CreditCard } from 'react-feather';

const OnRamp = () => {
  const { fundWallet } = useFundWallet();
  const { appWallet } = useAppState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>('');

  const handleFundWallet = async () => {
    if (!appWallet?.address) {
      console.error('No wallet address available.');
      setError('No wallet connected. Please connect your wallet.');
      return;
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('Please enter a valid amount greater than 0.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await fundWallet(appWallet.address, {
        card: {
          preferredProvider: 'moonpay',
        },
        amount: amount,
      });
    } catch (err: any) {
      console.error('Error funding wallet:', err);
      setError(err?.message || 'An error occurred funding the wallet.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!appWallet?.address) {
    return (
      <div className="text-red-500 text-center">
        No wallet connected. Please connect your wallet.
      </div>
    );
  }

  const bgColor = 'bg-graydark';
  const cardBgColor = 'bg-bodydark1';
  const textColor = 'text-white';
  const hoverColor = 'hover:bg-bodydark1/80';

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-16 ">
      <div className=' text-title-xl font-semibold'>Easy On-Ramps</div>
      <div
        className={`${bgColor} rounded-xl p-8 shadow-sm w-2/6 h-2/4 flex flex-col justify-between`}
      >
        <div className="flex justify-center items-center mb-4 w-full h-full">
          <img src={'./card.svg'} className="h-52" />
        </div>
        <div>
          <div className="mb-4">
            <Input
              id="amount"
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="shadow appearance-none rounded w-full py-2 px-3 leading-tight"
              placeholder="Enter amount"
            />
          </div>
          <Button
            onClick={handleFundWallet}
            disabled={isLoading}
            className={`
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            ${cardBgColor} ${hoverColor} ${textColor} font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline
          `}
          >
            {isLoading ? 'Funding...' : 'Fund Wallet'}
          </Button>
        </div>
        {error && (
          <div className="mt-4 text-sm text-red-500 text-center">{error}</div>
        )}
      </div>
    </div>
  );
};

export default OnRamp;
