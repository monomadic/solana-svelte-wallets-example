import * as Wallets from '@solana/wallet-adapter-wallets';

import type { Wallet } from '@solana/wallet-adapter-wallets';

export function getWallets(): Wallet[] {
	return [Wallets.getPhantomWallet(), Wallets.getLedgerWallet()];
}
