<script lang="ts">
	import MollifyTTS from '$lib/tts';
	import { browser } from '$app/environment';
	import StopIcon from '../icons/StopIcon.svelte';
	import PauseIcon from '../icons/PauseIcon.svelte';
	import PlayIcon from '../icons/PlayIcon.svelte';

	export let text = '';

	const reader = browser ? new MollifyTTS(text) : null;

	async function cancel() {
		await reader?.cancel();
		console.log(reader);
	}
</script>

{#if reader}
	<form class="reader" on:submit|preventDefault>
		<button type="button" on:click={() => cancel()}><StopIcon /></button>
		{#if reader.state.speaking}
			<button type="button" on:click={() => reader.pause()}><PauseIcon /></button>
		{:else}
			<button disabled={reader.state.speaking} type="button" on:click={() => reader.speak()}><PlayIcon /></button>
		{/if}
	</form>
{/if}

<style lang="scss">
	.reader {
		display: flex;
		padding-top: 2px;
		gap: 0.5rem;

		button {
			appearance: none;
			border: none;
			background: none;
			outline: none;
			font-size: 2rem;
			padding: 0;
			cursor: pointer;
			max-width: 2rem;
			color: inherit;

			&:disabled {
				opacity: 0.25;
			}
		}

		.settings {
			display: flex;
			flex-direction: column;
			display: none;
		}

		.voice {
			display: none;
		}
	}
</style>
