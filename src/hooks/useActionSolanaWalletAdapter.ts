import {
  ActionConfig,
  createSignMessageText,
  type SignMessageVerificationOptions,
  verifySignMessageData,
} from '@dialectlabs/blinks-core';
import type { SignMessageData } from '@solana/actions-spec';
import { Connection, VersionedTransaction } from '@solana/web3.js';
import bs58 from 'bs58';
import { useMemo } from 'react';
import { decodeBase64 } from '../utils/base64';
import { useSolanaWallets } from '@privy-io/react-auth';

export function useActionSolanaWalletAdapter(
  rpcUrlOrConnection: string | Connection,
) {
  const { wallets } = useSolanaWallets();
  const wallet = wallets[0];

  const finalConnection = useMemo(() => {
    return typeof rpcUrlOrConnection === 'string'
      ? new Connection(rpcUrlOrConnection, 'confirmed')
      : rpcUrlOrConnection;
  }, [rpcUrlOrConnection]);

  const adapter = useMemo(() => {
    function verifySignDataValidity(
      data: string | SignMessageData,
      opts: SignMessageVerificationOptions,
    ) {
      if (typeof data === 'string') {
        // skip validation for string
        return true;
      }
      const errors = verifySignMessageData(data, opts);
      if (errors.length > 0) {
        console.warn(
          `[@dialectlabs/blinks] Sign message data verification error: ${errors.join(', ')}`,
        );
      }
      return errors.length === 0;
    }

    return new ActionConfig(finalConnection, {
      connect: () => {
        return Promise.resolve(wallet.address ?? null);
      },
      signTransaction: async (txData: string) => {
        console.log('txData', txData);
        try {
          const tx = await wallet.sendTransaction(
            VersionedTransaction.deserialize(decodeBase64(txData)),
            finalConnection,
          );
          return { signature: tx };
        } catch {
          return { error: 'Signing failed.' };
        }
      },
      signMessage: async (
        data: string | SignMessageData,
      ): Promise<
        | { signature: string }
        | {
            error: string;
          }
      > => {
        if (!wallet.signMessage || !wallet.address) {
          return { error: 'Signing failed.' };
        }
        try {
          // Optional data verification before signing
          const isSignDataValid = verifySignDataValidity(data, {
            expectedAddress: wallet.address,
          });
          if (!isSignDataValid) {
            return { error: 'Signing failed.' };
          }
          const text =
            typeof data === 'string' ? data : createSignMessageText(data);
          const encoded = new TextEncoder().encode(text);
          const signed = await wallet.signMessage(encoded);
          const encodedSignature = bs58.encode(signed);
          return { signature: encodedSignature };
        } catch (e) {
          return { error: 'Signing failed.' };
        }
      },
    });
  }, [finalConnection, wallet]);

  return { adapter };
}
