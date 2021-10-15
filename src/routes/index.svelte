<script lang="ts">
	import { onMount } from 'svelte';
	import { useWallet, initWallet } from '$lib/wallet/useWallet';
	import type { WalletName } from '@solana/wallet-adapter-wallets';
	import { getWallets } from '$lib/wallet';

	let wallets = [];

	const localStorageKey = 'walletAdapter';

	onMount(async () => {
		wallets = await getWallets();

		await initWallet({
			wallets,
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
