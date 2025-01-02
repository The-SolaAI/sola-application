import '@dialectlabs/blinks/index.css';
import { useState, useEffect } from 'react';
import {
  Action,
  Blink,
  ActionsRegistry,
  Miniblink,
  useAction,
  useActionsRegistryInterval,
} from '@dialectlabs/blinks';
import { useActionSolanaWalletAdapter } from '../hooks/useActionSolanaWalletAdapter';
// import { useActionSolanaWallet } from '@dialectlabs/blinks/hooks/solana';

function Settings() {
  useActionsRegistryInterval();
  const rpc = process.env.SOLANA_RPC
    ? process.env.SOLANA_RPC
    : 'https://api.mainnet-beta.solana.com';
  const { adapter } = useActionSolanaWalletAdapter(rpc);
  const { action, isLoading } = useAction({
    url: 'solana-action:https://api.zk.tinys.pl/actions',
  });

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex min-w-[400px] flex-col items-center">
        <h1 className="mb-4 text-center text-4xl font-bold">Mini Blinks</h1>
        <div className="mb-4 w-full">
          {isLoading || !action ? (
            <span>Loading</span>
          ) : (
            <Blink
              adapter={adapter}
              action={action}
            />
          )}
        </div>
        {/* <WalletMultiButton /> */}
      </div>
    </div>
  );
}

export default Settings;
