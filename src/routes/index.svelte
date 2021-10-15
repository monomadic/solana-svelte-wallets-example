<script lang="ts">
	import { onMount } from 'svelte';
	import { useWallet, initWallet } from '$lib/wallet/useWallet';
	import type { WalletName } from '@solana/wallet-adapter-wallets';
	import { Buffer } from 'buffer';

	const localStorageKey = 'walletAdapter';

	onMount(async () => {
		// setup some globals
		global.Buffer = Buffer;

		import('process').then((process) => {
			global.process = process;
		});

		const wallets = await import('@solana/wallet-adapter-wallets');

		await initWallet({
			wallets: [wallets.getPhantomWallet(), wallets.getLedgerWallet()],
			autoConnect: true,
			localStorageKey
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
		<button on:click={() => $useWallet.disconnect()}>disconnect wallet</button>
	{:else}
		<button on:click={() => selectWallet('Phantom')}>Phantom</button>
		<button on:click={() => selectWallet('Ledger')}>Ledger</button>
	{/if}
</div>

<svelte:head>
	<script>
		window.global = window;
		global = globalThis; // for solana web3 repo
	</script>
</svelte:head>
