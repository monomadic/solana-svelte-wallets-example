<script lang="ts">
	import { onMount } from 'svelte';
	import { useWallet, initWallet } from '@monomadic/sveltekit-wallet';
	import type { WalletName, Wallet } from '@solana/wallet-adapter-wallets';

	export let wallets = [];
	export const localStorageKey = 'walletAdapter';

	import { Buffer } from 'buffer';

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

	onMount(async () => {
		// console.log(await import('sveltekit-wallet'));
		getWallets().then((_wallets) => {
			wallets = _wallets;
			initWallet({
				wallets,
				autoConnect: true,
				localStorageKey
			});
		});
	});

	async function selectWallet(walletName: string) {
		try {
			$useWallet.select(walletName as WalletName);
			$useWallet.connect();
		} catch (err) {
			console.error(err);
		}
	}
</script>

<div class="wrapper-content">
	{#if $useWallet?.connected}
		<button on:click={() => $useWallet.disconnect()}>
			{$useWallet.wallet.name}
			<img src={$useWallet.wallet.icon} alt={$useWallet.wallet.name} style="height: 20px" />
		</button>
	{:else}
		{#each wallets as wallet}
			<button on:click={() => selectWallet(wallet.name)}>
				<img src={wallet.icon} alt={wallet.name} style="height: 20px" />
				{wallet.name}
			</button>
		{/each}
	{/if}
</div>

<svelte:head>
	<script>
		global = globalThis; // for solana web3 repo
	</script>
</svelte:head>

<style>
	button {
		color: white;
		font-weight: bold;
		background-color: rgb(132, 0, 255);
		border-radius: 5px;
		border: 0;
		padding: 10px 30px;
		margin: 5px;
		display: block;
		cursor: pointer;
		width: 200px;
	}
	button:hover {
		background-color: rgb(190, 132, 245);
	}
</style>
