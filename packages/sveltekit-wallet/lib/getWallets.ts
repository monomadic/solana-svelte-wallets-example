import { Buffer } from 'buffer';

import type { Wallet } from '@solana/wallet-adapter-wallets/lib/types';
export async function getWallets(): Promise<Wallet[]> {
	global.Buffer = Buffer;

	import('process').then((process) => {
		global.process = process;
	});

	return import('@solana/wallet-adapter-wallets').then((Wallets) => {
		return [
			Wallets.getPhantomWallet(),
			Wallets.getLedgerWallet(),
			Wallets.getMathWallet(),
			Wallets.getSolflareWallet(),
			Wallets.getSolletWallet(),
			Wallets.getSolongWallet(),
			Wallets.getSafePalWallet(),
			Wallets.getCoin98Wallet()
		];
	});
}
